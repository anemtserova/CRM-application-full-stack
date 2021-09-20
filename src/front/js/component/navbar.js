import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<span className="navbar-brand mb-0 h1">KeepItApp</span>

			<div className="ml-auto">
				<Link to="/contacts">
					<button className="btn btn-primary">Your Contacts</button>
				</Link>
			</div>
		</nav>
	);
};
