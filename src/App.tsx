import { Grid } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNavigationBar from "./components/SideNavigationBar";
import { DataContext } from "./DataContext";
import { handleLikePropety } from "./helperFunctions";
import DetailedPage from "./pages/DetailedPage";
import Home from "./pages/Home";
import MovieReviews from "./pages/MovieReviews";
import Movies from "./pages/Movies";
import MyLikes from "./pages/MyLikes";
import { movieType } from "./types";
import "./App.css";
import { fetchMovies } from "./api/fetchData";

const App = () => {
	const [movies, setMovies] = React.useState<movieType[]>([]);
	const [likedList, setLikedList] = React.useState<movieType[]>([]);
	const [currentPage, setCurrentPage] = React.useState(1);
	const pages = [1, 2, 3, 4, 5];
	const dataContext = React.useContext(DataContext);

	const getMovies = async () => {
		const response = await fetchMovies(currentPage);

		const modifiedMovies = response?.results.map((moviePop: movieType) => {
			return { ...moviePop, liked: false, editMode: false, writeComment: "" };
		});

		dataContext.setMovies([...modifiedMovies]);
	};
	React.useEffect(() => {
		getMovies();
	}, [currentPage]);
	const likeMovies = (chosenMovie: movieType) => {
		const returnValue = handleLikePropety(movies, chosenMovie);
		console.log("returnValue", returnValue);

		setMovies([...returnValue]);
	};

	const editMovies = (selectedItem: movieType) => {
		const newLikedList = movies.map((item: movieType) => {
			if (selectedItem.id === item.id) {
				return {
					...selectedItem,
					editMode: !item.editMode, //editMode ändras till true
				};
			} else {
				return item;
			}
		});
		if (newLikedList?.length) {
			setMovies(newLikedList);
		}
	};

	const saveMovies = (selectedItem: movieType, inputVal: string) => {
		const newLikedList = movies.map((item: movieType) => {
			if (selectedItem.id === item.id) {
				return {
					...selectedItem,
					editMode: !item.editMode, //editMode ändras till true
					writeComment: inputVal,
				};
			} else {
				return item;
			}
		});
		if (newLikedList?.length) {
			setMovies(newLikedList);
		}
	};

	React.useEffect(() => {
		const filterMovies = movies.filter((item: movieType) => item.liked);
		setLikedList([...filterMovies]);
	}, [movies]);

	return (
		<Grid className="App">
			<DataContext.Provider
				value={{
					likedList,
					setLikedList,
					movies,
					setMovies,
					likeMovies,
					editMovies,
					saveMovies,
				}}>
				<BrowserRouter>
					<Grid container>
						<Grid item xs={12} paddingTop={4}>
							<SideNavigationBar />
						</Grid>
						<Grid item xs={9} paddingTop={5}>
							<Routes>
								<Route path="movies/:id" element={<DetailedPage />} />
								<Route path="reviewedmovie/:id" element={<MovieReviews />} />
								<Route path="/" element={<Home />} />
								<Route path="movies" element={<Movies />} />
								<Route path="mylikes" element={<MyLikes />} />
							</Routes>
						</Grid>
					</Grid>
				</BrowserRouter>
			</DataContext.Provider>
		</Grid>
	);
};

export default App;
