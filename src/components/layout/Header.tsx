import { Bell, Search } from 'lucide-react';
import { Input } from '../ui/input';

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-900">Sistema de Entregas</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-8 w-64"
            />
          </div>
          
          <button className="relative rounded-full p-2 hover:bg-slate-100">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;