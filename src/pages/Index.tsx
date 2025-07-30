import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Dashboard from './Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Design System Navigation */}
      <div className="bg-gradient-primary text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Fintech App</h1>
            <p className="text-white/80 text-sm">Modern banking experience</p>
          </div>
          <Link to="/components">
            <Button variant="secondary" size="sm" className="bg-white/20 text-white border-0 hover:bg-white/30">
              📖 Design System
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Main Dashboard */}
      <Dashboard />
    </div>
  );
};

export default Index;
