import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { Download } from "lucide-react";
import { StatisticsCards } from "@/components/reports/StatisticsCards";
import { DeliveryChart } from "@/components/reports/DeliveryChart";
import { generatePDF } from "@/utils/pdfGenerator";
import { format } from "date-fns";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/layout/DashboardLayout";

const mockDeliveryData = [
  { month: 'Jan', count: 12 },
  { month: 'Fev', count: 19 },
  { month: 'Mar', count: 15 },
  { month: 'Abr', count: 22 },
  { month: 'Mai', count: 25 },
  { month: 'Jun', count: 18 },
];

const Relatorios = () => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reportType, setReportType] = useState("entregas");

  const { data: deliveries, isLoading: isLoadingDeliveries } = useQuery({
    queryKey: ["deliveries"],
    queryFn: async () => {
      return [
        { id: 1, numero_entrega: "ENT001", destinatario: "João Silva", data_entrega: "2024-03-15" },
        { id: 2, numero_entrega: "ENT002", destinatario: "Maria Santos", data_entrega: "2024-03-16" },
      ];
    },
  });

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return [
        { id: 1, num_nota_empenho: "NE001/2024", nome_orgao: "Secretaria de Educação", data_cadastro: "2024-03-10" },
        { id: 2, num_nota_empenho: "NE002/2024", nome_orgao: "Secretaria de Saúde", data_cadastro: "2024-03-12" },
      ];
    },
  });

  const handleGeneratePDF = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um período para gerar o relatório.",
        variant: "destructive",
      });
      return;
    }

    const doc = generatePDF(
      startDate, 
      endDate, 
      reportType === "entregas" ? deliveries || [] : [], 
      reportType === "notas" ? orders || [] : []
    );
    
    doc.save(`relatorio-${format(new Date(), 'dd-MM-yyyy')}.pdf`);
    
    toast({
      title: "Sucesso",
      description: "Relatório gerado com sucesso!",
    });
  };

  if (isLoadingDeliveries || isLoadingOrders) {
    return <div>Carregando...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Relatórios</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                placeholderText="Data inicial"
              />
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                placeholderText="Data final"
              />
            </div>
            <div className="flex flex-col gap-2">
              <ToggleGroup type="single" value={reportType} onValueChange={(value) => value && setReportType(value)}>
                <ToggleGroupItem value="entregas" aria-label="Relatório de Entregas">
                  Entregas
                </ToggleGroupItem>
                <ToggleGroupItem value="notas" aria-label="Relatório de Notas">
                  Notas
                </ToggleGroupItem>
              </ToggleGroup>
              <Button
                onClick={handleGeneratePDF}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </div>

        <StatisticsCards 
          deliveriesCount={deliveries?.length || 0}
          ordersCount={orders?.length || 0}
        />

        <DeliveryChart data={mockDeliveryData} />
      </div>
    </DashboardLayout>
  );
};

export default Relatorios;