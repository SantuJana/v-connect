import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import Icon from "../assets/icon.png";

export type LoaderContextType = {
  showLoader: () => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export const LoaderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [visibility, setVisibility] = useState<boolean>(false);

  const showLoader = useCallback(() => {
    setVisibility(true);
  }, [setVisibility]);

  const hideLoader = useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {visibility && (
        <>
          <div className="absolute top-0 right-0 bottom-0 left-0"></div>
          <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src={Icon}
              alt=""
              className="h-14 w-14 object-contain animate-spin"
            />
          </div>
        </>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoaderContext = () => {
  return useContext(LoaderContext);
};
