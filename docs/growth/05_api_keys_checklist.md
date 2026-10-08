# Checklist de accesos para mañana

**Regla:** nada de claves en el chat. Se cargan como variables de entorno en tu hosting y en un archivo `.env.local` en tu PC (que no se sube a git), o se autorizan desde el conector.

| # | Servicio | Qué necesito | Variable / dónde | Para qué |
|---|---|---|---|---|
| 1 | GA4 de Vermilion | ID de medición `G-...` (Admin → Flujos de datos). **La propiedad de tu última captura es `andicot-web-2`, otro proyecto** | `NEXT_PUBLIC_GA_ID` | Medir visitas y ventas |
| 2 | Tag Manager | Confirmar `GTM-WXWTWQK7` en el hosting | `NEXT_PUBLIC_GTM_ID` | Etiquetas y eventos |
| 3 | Meta | Cuenta publicitaria, Página, Instagram, Pixel | `NEXT_PUBLIC_META_PIXEL_ID`; token desde conector | Anuncios y publicación |
| 4 | WhatsApp Business Cloud API | Phone Number ID, token permanente, token de verificación del webhook | `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TOKEN`, `WHATSAPP_VERIFY_TOKEN` | CRM sin baneos |
| 5 | Search Console | Acceso a la propiedad vermilionroutes.com | Conector o permiso de usuario | Ver qué busca la gente |
| 6 | Gemini / Genkit | API key de Google AI Studio | `GOOGLE_GENAI_API_KEY` | Fábrica de contenido |
| 7 | Email | Mailchimp o HubSpot API key | `MAILCHIMP_API_KEY` o `HUBSPOT_TOKEN` | Secuencia de email |
| 8 | Postiz (opcional) | Token | `POSTIZ_API_KEY` | Programar posts |
| 9 | Microsoft Clarity (opcional) | Project ID | `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Mapas de calor |

**Decisiones que también necesito:** precios finales 3★/4★ (ocupación doble o por persona), comisión de afiliados, proveedor de vuelos o decisión de no ofrecerlos.
