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
		<div className="container">
			{!store.token ? (
				<>
					<p className="heading-1"> Welcome to KeepIt.App</p>
					<Link to="/login">
						<button className="btn btn-style">Log In Here</button>
					</Link>
				</>
			) : (
				<div>
					<p className="heading-1">{store.message}</p>
					<Link className="heading-3" to="/contacts">
						Go to Your Contacts
					</Link>
				</div>
			)}
		</div>
	);
};
