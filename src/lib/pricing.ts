import { SeasonalRate } from '../types/villa';
import { format } from 'date-fns';

export interface RateConfig {
  baseNightlyRate: number;
  seasonalRates?: SeasonalRate[];
  weekendMultiplier?: number;
  newYearRate?: number;
}

export interface DailyRateInfo {
  date: Date;
  dateStr: string;
  rate: number;
  baseRate: number;
  isWeekend: boolean;
  seasonalLabel?: string;
}

export interface StayCalculation {
  nights: number;
  subtotal: number;
  averageNightlyRate: number;
  nightlyBreakdown: DailyRateInfo[];
  hasSeasonalRate: boolean;
  hasWeekendPremium: boolean;
}

export function formatDateToYMD(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateDailyRate(date: Date, config: RateConfig): { rate: number; isWeekend: boolean; seasonalLabel?: string } {
  const dateStr = formatDateToYMD(date);
  const dayOfWeek = date.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

  let currentRate = config.baseNightlyRate;
  let seasonalLabel: string | undefined;

  if (config.seasonalRates && config.seasonalRates.length > 0) {
    const matchedSeason = config.seasonalRates.find(
      (s) => dateStr >= s.startDate && dateStr <= s.endDate
    );
    if (matchedSeason) {
      currentRate = matchedSeason.rate;
      seasonalLabel = matchedSeason.label || 'Seasonal Rate';
    }
  }

  if (isWeekend) {
    const mult = config.weekendMultiplier ?? 1.1;
    currentRate = Math.round(currentRate * mult);
  }

  return { rate: currentRate, isWeekend, seasonalLabel };
}

export function calculateStayRates(
  from?: Date,
  to?: Date,
  config: RateConfig = { baseNightlyRate: 24000 }
): StayCalculation {
  if (!from || !to) {
    return {
      nights: 0,
      subtotal: 0,
      averageNightlyRate: config.baseNightlyRate,
      nightlyBreakdown: [],
      hasSeasonalRate: false,
      hasWeekendPremium: false,
    };
  }

  const startDate = new Date(from);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(to);
  endDate.setHours(0, 0, 0, 0);

  const breakdown: DailyRateInfo[] = [];
  let subtotal = 0;
  let hasSeasonal = false;
  let hasWeekend = false;

  const current = new Date(startDate);
  while (current < endDate) {
    const dayDate = new Date(current);
    const dayResult = calculateDailyRate(dayDate, config);

    if (dayResult.seasonalLabel) hasSeasonal = true;
    if (dayResult.isWeekend) hasWeekend = true;

    subtotal += dayResult.rate;
    breakdown.push({
      date: dayDate,
      dateStr: formatDateToYMD(dayDate),
      rate: dayResult.rate,
      baseRate: config.baseNightlyRate,
      isWeekend: dayResult.isWeekend,
      seasonalLabel: dayResult.seasonalLabel,
    });

    current.setDate(current.getDate() + 1);
  }

  const nights = breakdown.length;
  const avgRate = nights > 0 ? Math.round(subtotal / nights) : config.baseNightlyRate;

  return {
    nights,
    subtotal,
    averageNightlyRate: avgRate,
    nightlyBreakdown: breakdown,
    hasSeasonalRate: hasSeasonal,
    hasWeekendPremium: hasWeekend,
  };
}

export function getCurrentDisplayRate(
  baseRate: number,
  seasonalRates?: SeasonalRate[],
  weekendMultiplier: number = 1.1
): { rate: number; label: string | null } {
  const today = new Date();
  const dateStr = formatDateToYMD(today);
  const isWeekend = today.getDay() === 5 || today.getDay() === 6;

  let rate = baseRate;
  let label: string | null = null;

  if (seasonalRates && seasonalRates.length > 0) {
    const match = seasonalRates.find((s) => dateStr >= s.startDate && dateStr <= s.endDate);
    if (match) {
      rate = match.rate;
      label = match.label || 'Seasonal Rate';
    }
  }

  if (isWeekend) {
    rate = Math.round(rate * weekendMultiplier);
    label = label ? `${label} · Weekend Rate` : 'Weekend Rate';
  }

  return { rate, label };
}

export const GST_RATE = 0.18;

export function calculateGST(amount: number): number {
  return Math.round(amount * GST_RATE);
}

export function getRateBadgeText(stayCalc: StayCalculation): string | null {
  if (stayCalc.hasSeasonalRate) {
    const season = stayCalc.nightlyBreakdown.find((d) => d.seasonalLabel);
    return season?.seasonalLabel || 'Seasonal Rate';
  }
  if (stayCalc.hasWeekendPremium) {
    return 'Weekend Rate';
  }
  return null;
}

export function generateWhatsAppShareUrl({
  propertyName,
  pageUrl,
  checkIn,
  checkOut,
  guests,
  nightlyRate,
  nights,
  total,
  gstApplicable,
  gst,
}: {
  propertyName: string;
  pageUrl: string;
  checkIn?: Date;
  checkOut?: Date;
  guests: string;
  nightlyRate: number;
  nights: number;
  total: number;
  gstApplicable: boolean;
  gst: number;
}): string {
  const url = new URL(pageUrl);
  if (checkIn) url.searchParams.set('checkin', format(checkIn, 'yyyy-MM-dd'));
  if (checkOut) url.searchParams.set('checkout', format(checkOut, 'yyyy-MM-dd'));
  if (guests) url.searchParams.set('guests', guests);

  const lines = [`🏡 ${propertyName}`, ''];

  if (checkIn && checkOut) {
    lines.push(`📅 Check-in: ${format(checkIn, 'EEE, dd MMM yyyy')}`);
    lines.push(`📅 Check-out: ${format(checkOut, 'EEE, dd MMM yyyy')}`);
    lines.push(`🌙 ${nights} night${nights === 1 ? '' : 's'}`);
  }

  lines.push(`👥 ${guests} guest${guests === '1' ? '' : 's'}`);
  lines.push(`💰 ₹${nightlyRate.toLocaleString('en-IN')}/night${gstApplicable ? ' + GST' : ''}`);

  if (nights > 0 && total > 0) {
    lines.push(`💵 Total: ₹${total.toLocaleString('en-IN')}`);
    if (gstApplicable && gst > 0) {
      lines.push(`🧾 incl. GST (18%): ₹${gst.toLocaleString('en-IN')}`);
    }
  }

  lines.push('');
  lines.push(`🔗 View & book: ${url.toString()}`);

  return `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
}
