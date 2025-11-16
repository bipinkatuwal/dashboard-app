import Home from "../pages/Home";
import Data from "../pages/Data";
import ThemeToggler from "./ThemeToggler";

const MainContent = ({ activeView }: { activeView: string }) => {
  return (
    <div className="flex-1 bg-primary p-8">
      <div className="relative max-w-7xl mx-auto flex flex-col">
        <ThemeToggler />
        {activeView === "home" ? <Home /> : <Data />}
      </div>
    </div>
  );
};

export default MainContent;
