import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(GlobalState);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {};

	return (
		<div className="container-fluid d-flex flex-column align-items-center ">
			<div className="d-flex justify-content-center w-25">
				<h1>User Login</h1>
			</div>
			<div className="d-flex flex-column justify-content-center w-25">
				<input
					type="text"
					placeholder="username"
					value={username}
					onChange={e => setUsername(e.target.value)}
					className="m-1"
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					className="m-1"
				/>
				<button type="submit" className="m-1">
					Login
				</button>
			</div>
		</div>
	);
};
