import { CommercialPerformancePanel } from '@/components/admin/CommercialPerformancePanel';

export default async function CommercialAnalyticsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CommercialPerformancePanel locale={locale} />;
}
