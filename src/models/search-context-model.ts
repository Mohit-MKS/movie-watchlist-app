import { Dispatch, SetStateAction } from "react";
import { IMovie } from "./movies.model";

interface ISearchContext {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  movies: IMovie[];
  setMovies: Dispatch<SetStateAction<IMovie[]>>;
  totalPage: number;
  setTotalPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  setcurrentPage: Dispatch<SetStateAction<number>>;
}

export type { ISearchContext }