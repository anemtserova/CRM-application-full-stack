import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../store/appContext";

import "../../styles/demo.scss";

export const Home = () => {
	const { store, actions } = useContext(GlobalState);

	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) {
				actions.greetUser();
				actions.getFetch();
			}
		},
		[store.token]
	);

	return (
		<div className="container-fluid">
			{!store.token ? (
				<>
					<h1>Welcome to KeepItApp</h1>
					<Link to="/login">
						<button className="btn btn-primary">Login Here</button>
					</Link>
				</>
			) : (
				<div>
					<h1>{store.message}</h1>
					<Link to="/contacts">Go to Your Contacts</Link>
				</div>
			)}
		</div>
	);
};
