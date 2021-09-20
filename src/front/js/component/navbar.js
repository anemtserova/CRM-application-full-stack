import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(GlobalState);

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<span className="navbar-brand mb-0 h1">KeepItApp</span>

			<div className="ml-auto">
				{!store.token ? (
					<div className="ml-auto">
						<Link to="/login">
							<button className="btn btn-primary">Log In</button>
						</Link>
					</div>
				) : (
					<button className="btn btn-warning" onClick={() => actions.logout()}>
						Log Out
					</button>
				)}
			</div>
		</nav>
	);
};
