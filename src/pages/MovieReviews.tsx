import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import { reviewResults, reviewType } from "../types";
import { DataContext } from "../DataContext";
import { avatarImg, ifAvatarNull } from "../secret";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../api/fetchData";

const MovieReviews = () => {
	const { id } = useParams();

	const [reviews, setReviews] = React.useState<reviewType>();

	const getReviews = async () => {
		const response = await fetchMovieReviews(id);
		if (response) {
			console.log("reviews", response);
			const addNewProperty = { ...response, liked: false };
			setReviews(addNewProperty);
		}
	};

	React.useEffect(() => {
		getReviews();
	}, []);

	return (
		<Grid item margin={2}>
			<Typography>{reviews?.total_results} reviews</Typography>
			{reviews?.results.map((review: reviewResults) => (
				<Card key={review?.id} sx={{ display: "flex", height: 400 }}>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<CardContent sx={{ flex: "1 0 auto" }}>
							<Grid container justifyContent="space-between">
								<Grid item>
									{" "}
									<Typography component="div" variant="h5">
										A review by {review?.author}
									</Typography>
								</Grid>
								<Grid item>
									{" "}
									<Typography component="div" variant="h6">
										{review?.author_details?.rating}
										<StarRateIcon style={{ fill: "gold" }}></StarRateIcon>
									</Typography>
								</Grid>
							</Grid>

							<Typography component="div" variant="h6">
								{review?.updated_at.slice(0, 10)}
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
								component="div">
								{review?.content}
							</Typography>
						</CardContent>
					</Box>
					{review?.author_details?.avatar_path ? (
						<CardMedia
							component="img"
							height="200"
							sx={{ width: 200, marginTop: 2 }}
							image={`${avatarImg}${review?.author_details?.avatar_path}`}
							alt="user avatar "
						/>
					) : (
						<CardMedia
							component="img"
							height="200"
							sx={{ width: 200, marginTop: 2 }}
							image={`${avatarImg}${ifAvatarNull}`}
							alt="user avatar "
						/>
					)}
				</Card>
			))}
		</Grid>
	);
};
export default MovieReviews;
