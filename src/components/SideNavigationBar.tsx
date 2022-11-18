import { Favorite } from "@mui/icons-material";
import { Badge, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../DataContext";

const SideNavigationBar = () => {
	const dataContext = React.useContext(DataContext);

	return (
		<Grid
			item
			style={{
				paddingLeft: " 10px",
			}}>
			<Link
				style={{
					padding: "0 8px",
				}}
				to="/">
				Home
			</Link>
			<Link
				style={{
					padding: "0 10px",
				}}
				to="movies">
				Movies
			</Link>
			<Link to="mylikes">Liked movies</Link>
			{dataContext?.likedList?.length ? (
				<Badge badgeContent={dataContext?.likedList?.length} color="primary">
					<Favorite
						style={{ fill: "red", paddingLeft: "5px" }}
						fontSize="small"
					/>
				</Badge>
			) : (
				<Badge badgeContent={dataContext?.likedList?.length} color="primary">
					<Favorite
						style={{ fill: "gray", paddingLeft: "5px" }}
						fontSize="small"
					/>
				</Badge>
			)}
		</Grid>
	);
};
export default SideNavigationBar;
