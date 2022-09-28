import {
	Box,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { fetchSearchedMovie } from "../api/fetchData";
import { movieType } from "../types";
import { apiImg } from "../secret";
import CardLayout from "../components/CardLayout";
import { DataContext } from "../DataContext";
const Home = () => {
	const [inputValue, setInputValue] = React.useState<string>("");
	const [searchedMovie, setSearchedMovie] = React.useState([]);
	const dataContext = React.useContext(DataContext);
	const getSearched = async () => {
		if (inputValue) {
			const response = await fetchSearchedMovie(inputValue);
			const filtered = response.results
				.filter((moviee: any) =>
					moviee.title.toLowerCase().startsWith(inputValue.toLowerCase())
				)
				.map((moviee: movieType) => {
					return {
						...moviee,
						liked: false,
						editMode: false,
						writeComment: "",
					};
				});

			setSearchedMovie(filtered);
		} else {
			setSearchedMovie([]);
		}
	};

	React.useEffect(() => {
		getSearched();
	}, [inputValue]);

	const style = {
		bgcolor: "background.paper",
		borderRadius: "5%",
		boxShadow: 24,
		p: 2,
	};

	return (
		<Grid>
			<Typography variant="h3" gutterBottom>
				Search for movies
			</Typography>
			<TextField
				sx={{ margin: 5 }}
				value={inputValue}
				id="outlined-basic"
				label="Outlined"
				variant="outlined"
				onChange={(event: any) => {
					setInputValue(event.target.value);
				}}
			/>
			<Grid container>
				{searchedMovie.length ? (
					searchedMovie.map((movie: movieType) => (
						<Grid item xs={12} sm={6} md={4} container>
							<CardLayout
								key={movie.id}
								eachMovie={movie}
								handleLike={dataContext?.likeMovies}
								linkName="movies"
								handleEdit={dataContext?.editMovies}
								handleSave={dataContext?.saveMovies}
							/>
						</Grid>
					))
				) : (
					<Card>
						<Box sx={style}>
							<CardContent>
								<Typography variant="h4" gutterBottom>
									Welcome. Millions of movies, TV shows and people to discover.
									Explore now.
								</Typography>
							</CardContent>
						</Box>
					</Card>
				)}
			</Grid>
		</Grid>
	);
};
export default Home;
