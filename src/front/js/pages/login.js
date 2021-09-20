import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(GlobalState);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const token = sessionStorage.getItem("token");

	const handleLogin = () => {
		const opts = {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		};
		fetch("https://3001-apricot-gull-2kgbaff4.ws-eu16.gitpod.io/api/token", opts)
			.then(response => {
				if (response.status == 200) return response.json();
				else alert("There has been an error.");
			})
			.then(data => {
				console.log("This came from the backend", data);
				sessionStorage.setItem("token", data.access_token);
			})
			.catch(error => console.log("There was an error!", error));
	};

	return (
		<div className="container-fluid d-flex flex-column align-items-center ">
			<div className="d-flex justify-content-center w-25">
				<h1>User Login</h1>
			</div>
			{token && token != "" && token != undefined ? (
				<>
					<h2>You are logged in with token</h2>
					<h4 className="w-50">{username}</h4>
				</>
			) : (
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
					<button onClick={handleLogin} type="submit" className="m-1 btn btn-secondary">
						Login
					</button>
				</div>
			)}
		</div>
	);
};
