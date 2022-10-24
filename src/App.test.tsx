import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Home } from "@mui/icons-material";

test("renders home page", () => {
	render(<Home />);
	const title = screen.getByText(/Welcome. Millions of movies/i);
	expect(title).toBeInTheDocument();
});
