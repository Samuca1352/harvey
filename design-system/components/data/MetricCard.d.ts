import * as React from 'react';

/**
 * @startingPoint section="Data" subtitle="KPI tile with mini bar chart" viewport="700x200"
 */
export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  /** e.g. "+1 this month", "-08% vs yesterday", "1 needs attention" */
  delta?: string;
  /** Drives the chart color and the delta color */
  tone?: 'green' | 'red' | 'orange' | 'blue' | 'neutral';
  deltaTone?: 'green' | 'red' | 'orange' | 'blue' | 'neutral';
  /** levels: 0–1 per slot; the highlight slot renders a filled bar, others a hairline marker */
  chart?: MiniChartProps;
}
export function MetricCard(props: MetricCardProps): JSX.Element;
export function MiniChart(props: MiniChartProps): JSX.Element;
export interface MiniChartProps { levels?: number[]; highlight?: number; tone?: 'green' | 'red' | 'orange' | 'blue'; color?: string; }
