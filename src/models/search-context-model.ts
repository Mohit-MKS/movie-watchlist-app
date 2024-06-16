import { Dispatch, SetStateAction } from "react";
import { IMovie } from "./movies.model";

interface ISearchContext {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  movies: IMovie[];
  setMovies: Dispatch<SetStateAction<IMovie[]>>;
}

export type { ISearchContext }