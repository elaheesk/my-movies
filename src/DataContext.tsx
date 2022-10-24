import React from "react";
import { ContextData, movieType } from "./types";

export const DataContext = React.createContext<ContextData>({
	movies: [],
	setMovies: () => {},

	likedList: [],
	setLikedList: () => {},
	// handleAddToWatchList: () => {},
	likeMovies: () => {},
	editMovies: () => {},
	saveMovies: () => {},
});
