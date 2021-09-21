import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../store/appContext";

import "../../styles/demo.scss";

export const Home = () => {
	const { store, actions } = useContext(GlobalState);

	useEffect(() => {
		actions.greetUser();
	}, []);

	return (
		<div className="container-fluid h-100">
			<h1>Welcome to KeepItApp</h1>

			<Link to="/login">
				<button className="btn btn-primary">Login Here</button>
			</Link>
		</div>
	);
};
