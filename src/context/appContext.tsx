import React, { createContext, useCallback, useContext, useState } from "react";
import Drawer from "../components/Drawer";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

export interface AppContext {
  toggleDrawer: () => void;
}

const appContext = createContext<AppContext | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [drawerVisibility, setDrawerVisibility] = useState<boolean>(false);

  const toggleDrawer = useCallback(() => {
    setDrawerVisibility((prevData) => !prevData);
  }, [setDrawerVisibility]);

  return (
    <appContext.Provider value={{ toggleDrawer }}>
      <div className="relative h-screen w-screen bg-violet-100 flex">
        <Drawer visibility={drawerVisibility} toggle={toggleDrawer} />
        <SideBar />
        <div className="w-full flex flex-col">
          <TopBar toggleDrawer={toggleDrawer} />
          <div className="h-full w-full p-2 overflow-y-auto flex">
            {children}
          </div>
        </div>
      </div>
    </appContext.Provider>
  );
};

export const useApp = () => {
  return useContext(appContext);
};
