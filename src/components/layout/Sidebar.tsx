import { Package, FileText, Home, Settings, LogIn, BarChart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-6">
      <nav className="space-y-1">
        <NavLink to="/" className="sidebar-link">
          <Home className="h-5 w-5" />
          Dashboard
        </NavLink>
        <NavLink to="/entregas" className="sidebar-link">
          <Package className="h-5 w-5" />
          Entregas
        </NavLink>
        <NavLink to="/notas" className="sidebar-link">
          <FileText className="h-5 w-5" />
          Notas de Empenho
        </NavLink>
        <NavLink to="/relatorios" className="sidebar-link">
          <BarChart className="h-5 w-5" />
          Relatórios
        </NavLink>
        <NavLink to="/configuracoes" className="sidebar-link">
          <Settings className="h-5 w-5" />
          Configurações
        </NavLink>
        <NavLink to="/login" className="sidebar-link">
          <LogIn className="h-5 w-5" />
          Sair
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;