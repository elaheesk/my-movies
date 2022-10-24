export interface movieType {
	backdrop_path: string;
	first_air_date?: string;
	id: number;
	name?: string;
	original_language: string;
	title?: string;
	release_date?: string;
	overview: string;
	popularity: number;
	vote_average: number;
	liked?: boolean;
	editMode?: boolean;
	writeComment?: string;
}
export interface reviewType {
	results: reviewResults[];
	total_pages: number;
	id: number;
	page: number;
	total_results: number;
}

export interface reviewResults {
	author: string;
	author_details: {
		avatar_path: string;
		name: string;
		rating: number;
		username: string;
	};
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}
export interface ContextData {
	movies: movieType[];
	setMovies: (para: movieType[]) => void;
	likedList: any;
	setLikedList: any;
	likeMovies: (para: movieType) => void;
	editMovies: (para: movieType) => void;
	saveMovies: (para: movieType, para2: string) => void;
}
