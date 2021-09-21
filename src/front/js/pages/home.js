import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../store/appContext";

import "../../styles/demo.scss";

export const Home = () => {
	const { store, actions } = useContext(GlobalState);

	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) actions.greetUser();
		},
		[store.token]
	);

	return (
		<div className="container-fluid">
			<h1>Welcome to KeepItApp</h1>

			{!store.token ? (
				<Link to="/login">
					<button className="btn btn-primary">Login Here</button>
				</Link>
			) : (
				<div>
					<p>{store.message}</p>
					<Link to="/contacts">Go to Your Contacts</Link>
				</div>
			)}
		</div>
	);
};
