import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Dashboard from './Dashboard';
import { SidebarNav } from '@/components/ui/SidebarNav';
import BlueberryLogo from '@/components/ui/blueberry-logo';
import { AlertsDropdown } from '@/components/fintech/AlertsDropdown';
import { UserAvatar } from '@/components/fintech/UserAvatar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-row">
      <SidebarNav />
      <div className="flex-1 flex flex-col min-h-screen">
      {/* Design System Navigation */}
      <header className="bg-popover/90 backdrop-blur-md text-foreground p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <BlueberryLogo />
            <span className="text-primary font-extrabold">blueberry</span> <span className="text-primary font-light">bank</span>
          </h1>
          <div className="flex items-center gap-3">
            <AlertsDropdown />
            <UserAvatar 
              name="Marcus Björke" 
              email="mbjorke@gmail.com"
              imageUrl="/marcus-bjorke.jpeg"
            />
          </div>
        </div>
      </header>
      
      {/* Main Dashboard */}
      <Dashboard />
      </div>
    </div>
  );
};

export default Index;
