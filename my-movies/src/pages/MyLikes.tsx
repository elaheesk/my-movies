import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";
import { apiImg } from "../secret";
import { movieType } from "../types";

const MyLikes = () => {
	const navigate = useNavigate();
	const removeLiked = (item: movieType) => {
		dataContext?.likeMovies(item);
	};
	const dataContext = React.useContext(DataContext);

	let unknownUrl = `${apiImg}`;
	return (
		<Grid item>
			{!!dataContext?.likedList?.length &&
				dataContext?.likedList.map((showObject: movieType) => (
					<Grid item margin={2} key={showObject?.id}>
						<Card sx={{ maxWidth: 345, height: 650 }}>
							<CardMedia
								component="img"
								height="140"
								image={`${unknownUrl}${showObject?.backdrop_path}`}
								alt="green iguana"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{showObject?.title}
								</Typography>
								<Grid container justifyContent="space-between">
									<Grid item>
										<Typography variant="body1" color="text.secondary">
											{showObject?.release_date}
										</Typography>
									</Grid>
									<Grid item>
										<Button onClick={() => removeLiked(showObject)}>
											Remove
										</Button>
									</Grid>
								</Grid>
							</CardContent>
							<CardContent>
								<Typography variant="body2" color="text.secondary">
									{showObject?.overview}
								</Typography>
								<Typography variant="body1" color="text.secondary">
									{showObject?.writeComment}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
		</Grid>
	);
};
export default MyLikes;
