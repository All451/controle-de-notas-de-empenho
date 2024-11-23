import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

interface DeliveryChartProps {
  data: Array<{ month: string; count: number; }>;
}

export const DeliveryChart = ({ data }: DeliveryChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entregas por Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              bar: {
                theme: {
                  light: "#9b87f5",
                  dark: "#7E69AB",
                },
              },
            }}
          >
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="count" fill="var(--color-bar)" />
              <ChartTooltip />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};