import React from "react";
import { fetchMovies } from "../api/fetchData";
import { movieType } from "../types";
import { DataContext } from "../DataContext";
import CardLayout from "../components/CardLayout";
import { Button, Grid, Typography } from "@mui/material";
const Movies = () => {
	const [currentPage, setCurrentPage] = React.useState(1);
	const pages = [1, 2, 3, 4, 5];
	const dataContext = React.useContext(DataContext);

	// const getMovies = async () => {
	// 	const response = await fetchMovies(currentPage);

	// 	const modifiedMovies = response?.results.map((moviePop: movieType) => {
	// 		return { ...moviePop, liked: false, editMode: false, writeComment: "" };
	// 	});
	// 	console.log(
	// 		"modifiedMovies när körs denna? blir like false?",
	// 		modifiedMovies
	// 	);

	// 	dataContext.setMovies([...modifiedMovies]);
	// };

	React.useEffect(() => {
		console.log("do u see movies", dataContext.movies);

		// getMovies();
	}, [currentPage]);

	return (
		<Grid container spacing={3} item xs={12}>
			<Typography variant="h3" gutterBottom>
				{/* Backend filtering */}
			</Typography>
			<Grid
				xs={12}
				sm={12}
				container
				flexWrap="nowrap"
				style={{ marginTop: "60px" }}>
				{pages.map((page) => (
					<Grid key={page} justifyContent="center">
						<Button variant="outlined" onClick={() => setCurrentPage(page)}>
							{page}
						</Button>
					</Grid>
				))}
			</Grid>
			{dataContext?.movies.map((movie: movieType) => (
				<Grid
					key={movie.id}
					item
					xs={12}
					sm={6}
					md={4}
					container
					rowSpacing={1}>
					<CardLayout
						eachMovie={movie}
						handleLike={dataContext?.likeMovies}
						linkName="movies"
						handleEdit={dataContext?.editMovies}
						handleSave={dataContext?.saveMovies}
					/>
				</Grid>
			))}
		</Grid>
	);
};
export default Movies;
