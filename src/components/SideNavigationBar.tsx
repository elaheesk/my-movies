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
				position: "fixed",
				paddingLeft: "20px",
			}}>
			<Toolbar>
				<Link to="/">
					<Typography fontSize={"large"}> Home</Typography>
				</Link>
			</Toolbar>

			<Toolbar>
				<Link to="movies">
					<Typography fontSize={"large"}> Movies</Typography>
				</Link>
			</Toolbar>
			<Toolbar>
				<Link to="mylikes">
					<Typography fontSize={"large"}> Liked movies</Typography>
				</Link>
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
			</Toolbar>
		</Grid>
	);
};
export default SideNavigationBar;
