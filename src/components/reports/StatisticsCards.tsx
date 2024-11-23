import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Package } from "lucide-react";

interface StatisticsCardsProps {
  deliveriesCount: number;
  ordersCount: number;
}

export const StatisticsCards = ({ deliveriesCount, ordersCount }: StatisticsCardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Total de Entregas
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deliveriesCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Total de Notas de Empenho
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ordersCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};