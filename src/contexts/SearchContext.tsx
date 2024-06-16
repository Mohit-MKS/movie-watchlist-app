import { createContext, useState, ReactNode, FC } from 'react';
import { IMovie } from '../models/movies.model';
import { ISearchContext } from '../models/search-context-model';

export const SearchContext = createContext<ISearchContext | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<IMovie[]>([]);


  return (
    <SearchContext.Provider value={{ query, setQuery, movies, setMovies }}>
      {children}
    </SearchContext.Provider>
  );
};
