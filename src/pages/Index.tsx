import DashboardLayout from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/card';
import { Package, FileText, TrendingUp, AlertCircle } from 'lucide-react';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>
          <div className="flex items-center gap-4">
            <select className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
              <option>Este ano</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-100 p-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total de Entregas</p>
                <p className="text-2xl font-semibold text-slate-900">127</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-100 p-3">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Notas de Empenho</p>
                <p className="text-2xl font-semibold text-slate-900">84</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-amber-100 p-3">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Em Andamento</p>
                <p className="text-2xl font-semibold text-slate-900">32</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Pendentes</p>
                <p className="text-2xl font-semibold text-slate-900">12</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-medium">Últimas Entregas</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900">Entrega #{i}</p>
                    <p className="text-sm text-slate-600">Destinatário {i}</p>
                  </div>
                  <span className="status-badge pending">Pendente</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-lg font-medium">Notas Recentes</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900">NE #{i}</p>
                    <p className="text-sm text-slate-600">Órgão {i}</p>
                  </div>
                  <span className="status-badge completed">Concluído</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;