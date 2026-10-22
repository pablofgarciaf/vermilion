import type { LeadEmailDelivery, LeadEmailStatus } from '@/types/crm';
import type { NotifyNewLeadResult } from '@/lib/email';

type One = NotifyNewLeadResult['alert'] | NotifyNewLeadResult['acknowledgement'];

function toDelivery(r: One): LeadEmailDelivery {
  if (r === 'failed') return 'failed';
  if (r === 'skipped') return 'none';
  if (!('reason' in r)) return 'sent';
  return r.reason === 'smtp_not_configured' ? 'not_configured' : 'no_recipient';
}

/** Resume el resultado de notifyNewLead para guardarlo en la solicitud y mostrarlo en el CRM. */
export function toLeadEmailStatus(result: NotifyNewLeadResult): LeadEmailStatus {
  return {
    team: toDelivery(result.alert),
    customer: toDelivery(result.acknowledgement),
    checkedAt: new Date().toISOString(),
  };
}
