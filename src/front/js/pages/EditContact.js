import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(GlobalState);
	let contact = store.contacts.find((el, i) => el.id == props.match.params.id);
	const [editedContact, setEditedContact] = useState({
		full_name: contact.full_name,
		email: contact.email,
		address: contact.address,
		phone: contact.phone,
		kite: contact.id
	});
	const handleInput = e => {
		setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
	};
	const handleSave = () => {
		actions.editFetch(editedContact);
		props.history.push("/");
	};
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit contact {contact.id}</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control"
							name="full_name"
							placeholder="Full Name"
							value={editedContact.full_name}
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
							value={editedContact.email}
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
							value={editedContact.phone}
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
							value={editedContact.address}
						/>
					</div>
					<button onClick={handleSave} type="button" className="btn btn-primary form-control">
						Save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {
	entity: PropTypes.object,
	match: PropTypes.object,
	history: PropTypes.object
};
