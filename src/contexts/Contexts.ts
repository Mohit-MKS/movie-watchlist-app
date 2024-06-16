import { useContext } from "react";
import { AppContext } from "./AppContext";
import { SearchContext } from "./SearchContext";


export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within an SearchProvider');
  }
  return context;
};