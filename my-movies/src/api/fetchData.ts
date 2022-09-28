import { apiMoviesKey } from "../secret";
import { movieType } from "../types";

export const fetchMovies = async (pageNumber: number) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=${apiMoviesKey}&page=${pageNumber}`
	);
	if (response) {
		return await response.json();
	} else {
		throw new Error("Please check you network connection");
	}
};

export const fetchSingleMovie = async (id: string | undefined) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${apiMoviesKey}&language=en-US`
	);
	if (response) {
		return await response.json();
	} else {
		throw new Error("Please check you network connection");
	}
};

export const fetchMovieReviews = async (id: string | undefined) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiMoviesKey}&language=en-US`
	);
	if (response) {
		return await response.json();
	} else {
		throw new Error("Please check you network connection");
	}
};

export const fetchSearchedMovie = async (name: string) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${apiMoviesKey}&query=${name}`
	);
	if (response.ok) {
		return await response.json();
	} else {
		throw new Error("Please check you network connection");
	}
};
