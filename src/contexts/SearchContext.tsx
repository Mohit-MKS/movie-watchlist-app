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
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(1);


  return (
    <SearchContext.Provider value={{ query, setQuery, movies, setMovies, totalPage, setTotalPage, currentPage, setcurrentPage }}>
      {children}
    </SearchContext.Provider>
  );
};
