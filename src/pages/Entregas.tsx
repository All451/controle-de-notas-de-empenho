import { Package } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card } from "../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Delivery } from "@/lib/types";

const Entregas = () => {
  const { data: deliveries, isLoading } = useQuery({
    queryKey: ["deliveries"],
    queryFn: async () => {
      // Temporary mock data
      return [
        {
          id: 1,
          numero_entrega: "ENT001",
          destinatario: "João Silva",
          endereco: "Rua A, 123",
          data_entrega: "2024-03-15",
          itens: "Item 1, Item 2"
        },
        {
          id: 2,
          numero_entrega: "ENT002",
          destinatario: "Maria Santos",
          endereco: "Av B, 456",
          data_entrega: "2024-03-16",
          itens: "Item 3, Item 4"
        }
      ] as Delivery[];
    }
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Entregas</h2>
          <a
            href="/nova-entrega"
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            <Package className="h-4 w-4" />
            Nova Entrega
          </a>
        </div>

        <Card className="overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Destinatário</th>
                <th>Endereço</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveries?.map((delivery) => (
                <tr key={delivery.id}>
                  <td>{delivery.numero_entrega}</td>
                  <td>{delivery.destinatario}</td>
                  <td>{delivery.endereco}</td>
                  <td>{delivery.data_entrega}</td>
                  <td>
                    <span className="status-badge pending">Pendente</span>
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

export default Entregas;
