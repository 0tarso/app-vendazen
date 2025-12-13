import { Text } from "react-native";
import { COLORS } from "../constants/Colors";
import { ReactElement } from "react";

type ChartFormatData = {
  created_at: Date | string;
  amount: number;
  payment_method?: string
};

const monthLabels = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export function formatToChartByMonth<T extends ChartFormatData>(
  items: T[],
  year: number
): { value: number, label: string, topLabelComponent: () => ReactElement }[] {
  const totalsByMonth: Record<number, number> = {};

  for (let m = 0; m < 12; m++) totalsByMonth[m] = 0;

  items.forEach((item) => {
    const date = new Date(item.created_at);
    if (date.getFullYear() !== year) return;

    const monthIndex = date.getMonth();
    totalsByMonth[monthIndex] += item.amount;
  });

  const barData = Object.entries(totalsByMonth).map(
    ([monthIndex, total]) => ({
      value: total,
      label: monthLabels[Number(monthIndex)],
      topLabelComponent: () => (
        <Text style={{ color: COLORS.GreenPrimary, fontFamily: 'MontserratRegular', fontSize: 14, width: 80, textAlign: "center" }}> {total.toFixed(2)} </Text>
      )
    })
  );

  return barData;
}

const PAYMENT_COLORS: Record<string, string> = {
  'PIX': '#177AD5',
  'CASH': '#79D45F',
  'CREDIT CARD': '#FFC300',
  'DEBIT CARD': '#FF5733',
  default: '#999999'
};

export function formatPaymentMethodPercentageForPieChart<T extends ChartFormatData>(
  items: T[]
): { method: string; value: number; color: string; text: string }[] {
  if (!items || items.length === 0) return [];

  console.log(items)
  const total = items.length;

  const countByMethod: Record<string, number> = {};

  items.forEach((item) => {
    const method = item.payment_method || "desconhecido";
    if (!countByMethod[method]) countByMethod[method] = 0;
    countByMethod[method] += 1;
  });

  const result = Object.entries(countByMethod).map(([method, count]) => {
    const percentage = Number(((count / total) * 100).toFixed(0));

    return {
      method,
      value: percentage,
      color: PAYMENT_COLORS[method] ?? PAYMENT_COLORS.default,
      text: `${percentage}%`
    };
  });

  return result;
}

