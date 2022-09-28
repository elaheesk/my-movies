import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchSingleMovie } from "../api/fetchData";
import { apiImg } from "../secret";
import { movieType } from "../types";

const DetailedPage = () => {
	const { id } = useParams();

	const [details, setDetails] = React.useState<movieType>();

	const getMovie = async () => {
		const response = await fetchSingleMovie(id);
		if (response) {
			const addNewProperty = { ...response, liked: false };
			setDetails(addNewProperty);
		}
	};

	React.useEffect(() => {
		getMovie();
	}, []);

	let unknownUrl = `${apiImg}`;
	return (
		<Grid item margin={2}>
			<Card sx={{ display: "flex", height: 400 }}>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<CardContent sx={{ flex: "1 0 auto" }}>
						<Grid container justifyContent="space-between">
							<Grid item>
								{" "}
								<Typography component="div" variant="h5">
									{details?.title}
								</Typography>
							</Grid>
							<Grid item>
								{" "}
								<Typography component="div" variant="h6">
									{" "}
									IMDb Rating{" "}
									<StarRateIcon style={{ fill: "gold" }}></StarRateIcon>
									{details?.vote_average}
								</Typography>
							</Grid>
						</Grid>

						<Typography component="div" variant="h6">
							{details?.release_date}
						</Typography>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							component="div">
							{details?.overview}
						</Typography>
					</CardContent>
				</Box>
				<CardMedia
					component="img"
					height="300"
					sx={{ width: 400, marginTop: 2 }}
					image={`${unknownUrl}${details?.backdrop_path}`}
					alt="Live from space album cover"
				/>
			</Card>
		</Grid>
	);
};
export default DetailedPage;
