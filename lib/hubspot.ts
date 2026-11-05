/**
 * HubSpot CRM Integration Module
 * Sincroniza contactos y solicitudes de viaje directamente en HubSpot CRM.
 */

export interface HubSpotContactPayload {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  destination?: string;
  travelDates?: string;
  guestsCount?: string;
  message?: string;
  leadSource?: string;
  locale?: string;
}

/**
 * Crea o actualiza un contacto en HubSpot usando la API v3.
 */
export async function syncLeadToHubSpot(data: HubSpotContactPayload): Promise<{ success: boolean; id?: string; error?: string }> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    console.warn('[HubSpot] HUBSPOT_ACCESS_TOKEN no está configurado en .env. Omitiendo sincronización.');
    return { success: false, error: 'HUBSPOT_ACCESS_TOKEN missing' };
  }

  if (!data.email) {
    return { success: false, error: 'Email is required for HubSpot contact sync' };
  }

  // Separar nombre y apellido si vienen juntos
  let firstname = data.firstname || '';
  let lastname = data.lastname || '';
  if (!lastname && firstname.includes(' ')) {
    const parts = firstname.split(' ');
    firstname = parts[0];
    lastname = parts.slice(1).join(' ');
  }

  const properties: Record<string, string> = {
    email: data.email,
    ...(firstname ? { firstname } : {}),
    ...(lastname ? { lastname } : {}),
    ...(data.phone ? { phone: data.phone } : {}),
    ...(data.message ? { message: data.message } : {}),
    ...(data.leadSource ? { hs_lead_status: 'NEW', leadsource: data.leadSource } : { hs_lead_status: 'NEW' }),
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ properties }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      return { success: true, id: result.id };
    }

    // Si ya existe el contacto (409 Conflict), intentamos actualizarlo
    if (response.status === 409) {
      const errorJson = await response.json();
      const existingId = errorJson?.message?.match(/ID: (\d+)/)?.[1];
      if (existingId) {
        const updateRes = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ properties }),
        });
        if (updateRes.ok) {
          const updatedResult = await updateRes.json();
          return { success: true, id: updatedResult.id };
        }
      }
      return { success: true, error: 'Contact already exists in HubSpot (409)' };
    }

    const errText = await response.text();
    console.error(`[HubSpot Error] Status ${response.status}:`, errText);
    return { success: false, error: errText };
  } catch (error: any) {
    const isTimeout = error.name === 'AbortError';
    console.error('[HubSpot Network/Timeout Error]:', isTimeout ? 'Request timeout after 6s' : error.message);
    return { success: false, error: error.message };
  }
}
