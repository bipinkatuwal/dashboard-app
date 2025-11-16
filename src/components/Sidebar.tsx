import { Database, Home } from "lucide-react";
import React from "react";

type ActiveViewType = string;

interface ChildComponentProps {
  activeView: ActiveViewType;
  setActiveView: React.Dispatch<React.SetStateAction<ActiveViewType>>;
}

const Sidebar = ({ activeView, setActiveView }: ChildComponentProps) => {
  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "data", label: "User Data", icon: Database },
  ];
  return (
    <div className="w-20 md:w-64 bg-primary text-text-primary min-h-screen p-4 border-r border-border">
      <div className="mb-8">
        <h1 className="text-2xl text-foreground text-text-primary font-bold hidden md:block">
          Dashboard
        </h1>

        <h1 className="text-2xl text-foreground text-text-primary font-bold md:hidden text-center">
          D
        </h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center md:space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === item.id
                  ? "bg-accent text-white"
                  : "text-foreground hover:bg-primary-hover"
              }`}
            >
              <Icon size={20} />
              <span className="hidden md:block">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
