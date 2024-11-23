import { FileText } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card } from "../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { PurchaseOrder } from "@/lib/types";

const NotasEmpenho = () => {
  const { data: purchaseOrders, isLoading } = useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: async () => {
      // Temporary mock data
      return [
        {
          id: 1,
          num_nota_empenho: "NE001/2024",
          num_pregao: "PE 001/2024",
          nome_orgao: "Secretaria de Educação",
          local_da_entrega: "Almoxarifado Central",
          data_cadastro: "2024-03-10",
          status: "Em andamento"
        },
        {
          id: 2,
          num_nota_empenho: "NE002/2024",
          num_pregao: "PE 002/2024",
          nome_orgao: "Secretaria de Saúde",
          local_da_entrega: "Hospital Municipal",
          data_cadastro: "2024-03-12",
          status: "Pendente"
        }
      ] as PurchaseOrder[];
    }
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Notas de Empenho</h2>
          <a href="/nova-nota">
            <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">
              <FileText className="h-4 w-4" />
              Nova Nota
            </button>
          </a>
        </div>

        <Card className="overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Pregão</th>
                <th>Órgão</th>
                <th>Local de Entrega</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders?.map((order) => (
                <tr key={order.id}>
                  <td>{order.num_nota_empenho}</td>
                  <td>{order.num_pregao}</td>
                  <td>{order.nome_orgao}</td>
                  <td>{order.local_da_entrega}</td>
                  <td>{order.data_cadastro}</td>
                  <td>
                    <span className="status-badge pending">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NotasEmpenho;
