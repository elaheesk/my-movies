import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiImg } from "../secret";
import { movieType } from "../types";
import { Favorite, KeyboardArrowRight } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Modal,
	TextField,
	Typography,
} from "@mui/material";

interface CardProps {
	eachMovie: movieType;
	handleLike: (likedMovie: movieType) => void;
	handleEdit: (editedMovie: movieType) => void;
	handleSave: (savedMovie: movieType, review: string) => void;
	linkName: string;
}
const CardLayout = ({
	eachMovie,
	handleLike,
	handleEdit,
	handleSave,
	linkName,
}: CardProps) => {
	const navigate = useNavigate();
	const [reviewField, setReviewField] = React.useState<string>("");
	const [open, setOpen] = React.useState(false);

	const handleSaveComment = (selectedObject: movieType) => {
		handleSave(selectedObject, reviewField);
		setReviewField("");
	};

	const handleEditComment = (selectedObject: movieType) => {
		if (selectedObject?.writeComment) {
			setReviewField(selectedObject.writeComment);
		}
		handleEdit(selectedObject);
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	return (
		<Card>
			{" "}
			<CardMedia
				component="img"
				height="140"
				image={`${apiImg}${eachMovie?.backdrop_path}`}
				alt="pic"
				onClick={() => setOpen(!open)}
			/>
			<Modal
				open={open}
				onClose={() => setOpen(!open)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Overview
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{eachMovie?.overview}
					</Typography>
				</Box>
			</Modal>
			<Grid item>
				{" "}
				<CardContent>
					<Typography gutterBottom variant="h6" component="div">
						{eachMovie?.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{eachMovie?.release_date}
					</Typography>

					<Grid container justifyContent="space-between" marginY={2}>
						<Grid item>
							<Link
								to={`/${linkName}/${eachMovie?.id}`}
								style={{ textDecoration: "none" }}>
								Find out more
							</Link>
							<KeyboardArrowRight fontSize="small" />
						</Grid>
						<Grid item>
							{eachMovie?.liked ? (
								<Favorite
									style={{ fill: "red" }}
									onClick={() => handleLike(eachMovie)}
								/>
							) : (
								<Favorite
									style={{ fill: "gray" }}
									onClick={() => handleLike(eachMovie)}
								/>
							)}
						</Grid>
						<Grid container justifyContent="space-between" marginY={2}>
							<Grid item>
								<Button
									disableElevation
									size="small"
									onClick={() => handleEditComment(eachMovie)}>
									{eachMovie?.writeComment ? (
										<>Edit comment</>
									) : (
										<>Leave a comment</>
									)}
								</Button>
							</Grid>
							<Grid item>
								<Button
									onClick={() => navigate(`/reviewedmovie/${eachMovie?.id}`)}>
									See reviews
								</Button>
							</Grid>
						</Grid>
						<Grid container direction="column">
							<Grid item>
								{!reviewField && (
									<Typography>{eachMovie?.writeComment}</Typography>
								)}
							</Grid>
							{eachMovie?.editMode && (
								<React.Fragment>
									<Grid item>
										<TextField
											fullWidth
											id="outlined-multiline-static"
											label="Type comment"
											multiline
											rows={3}
											type="text"
											value={reviewField}
											onChange={(event: any) => {
												setReviewField(event.target.value);
											}}
										/>
									</Grid>
									<Grid item>
										<Button onClick={() => handleSaveComment(eachMovie)}>
											save
										</Button>
									</Grid>
								</React.Fragment>
							)}
						</Grid>
					</Grid>
				</CardContent>
			</Grid>
		</Card>
	);
};
export default CardLayout;
