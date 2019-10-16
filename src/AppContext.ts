import React from "react";
import { Photo } from "./components/CardList"

interface IState {
  favorites: Photo[],
  setFavorites: (favorites: Photo[]) => void
}

export const AppContext = React.createContext<IState>({
  favorites: [],
  setFavorites: () => {}
});
