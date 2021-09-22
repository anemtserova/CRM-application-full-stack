import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";
import PropTypes from "prop-types";

export const AddContact = props => {
	const { store, actions } = useContext(GlobalState);
	//let contactId = store.contacts.find((el, i) => el.id == props.match.params.id);
	const [contact, setContact] = useState({
		name: null,
		email: null,
		address: null,
		phone: null,
		note: null
	});

	const [noteList, setNoteList] = useState([]);

	const handleInput = e => {
		// console.log(e.target);
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const saveNote = () => {
		fetch(store.userApi, {
			method: "PUT",
			body: JSON.stringify(
				setNoteList({
					label: contact.note,
					done: false
				})
			),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log("data from PUT ", data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	const handleSave = () => {
		actions.postFetch(contact);
		saveNote();
		props.history.push("/contacts");
		console.log("This is the note ", contact.note);
		console.log("This is the note list", noteList);
	};
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control"
							name="name"
							placeholder="Full Name"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							onChange={handleInput}
							type="email"
							className="form-control"
							name="email"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							onChange={handleInput}
							type="phone"
							className="form-control"
							name="phone"
							placeholder="Enter phone"
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control"
							name="address"
							placeholder="Enter address"
						/>
					</div>
					<div className="form-group">
						<label>Note</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control"
							name="note"
							placeholder="Write a note"
						/>
					</div>
					<button onClick={() => handleSave()} type="button" className="btn btn-primary form-control">
						Save
					</button>
					<Link className="mt-3 w-100 text-center" to="/contacts">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

AddContact.propTypes = {
	history: PropTypes.object
};
