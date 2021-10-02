import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import RetroPhonePhoto from "../../img/retro-phone.jpg";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";

export const ContactCard = props => {
	const { store, actions } = useContext(GlobalState);
	const [state, setState] = useState({});
	//const userNote = [];

	const includeNote = () => {
		// const userNote = store.noteArray.map(el => {
		// 	el.userId == props.entity.id;
		// });
		const userNote = store.noteArray.filter((el, i) => el.userId == props.entity.id);
		// props.entity.note = userNote && userNote.note;
		console.log("userNote from includeNote() ", userNote);
		console.log("whole store.noteArray ", store.noteArray);
		return userNote && userNote.note;
	};

	const displayNote = (noteToDisplay, i) => {
		if (noteToDisplay.note && noteToDisplay.note != "" && noteToDisplay.userId == props.entity.id) {
			return (
				<div className="d-flex justify-content-between w-100" key={i}>
					<div className="text-muted">{noteToDisplay.note}</div>
					<div>
						<i onClick={() => actions.deleteNote(i)} className="fas fa-trash-alt text-muted" />
					</div>
				</div>
			);
			{
			}
		}
	};

	return (
		<li className="list-group-item my-1 card-style">
			<div className="d-flex flex-row w-100 ">
				<div className="d-flex justify-content-center align-items-center w-50">
					<img
						src={RetroPhonePhoto}
						alt="Retro phone image"
						className="align-self-center justify-content-center"
						style={{ maxWidth: "75%", maxHeight: "100%" }}
					/>
				</div>
				<div className="d-flex flex-column w-50 p-2 pl-4 m-3 info-box">
					<div className=" d-flex flex-row justify-content-end">
						<Link to={"/edit/" + props.entity.id}>
							<button className="btn">
								<i className="fas fa-pencil-alt mr-3" />
							</button>
						</Link>
						<button className="btn " onClick={() => props.onDelete()}>
							<i className="fas fa-trash-alt" />
						</button>
					</div>
					<h2 className="name heading-1">{props.entity.full_name}</h2>
					<div className="d-flex flex-row mb-2">
						<i className="fas fa-map-marker-alt text-muted mr-3" />
						<p className="text-muted">{props.entity.address}</p>
					</div>
					<div className="d-flex flex-row mb-2">
						<i className="fa fa-phone fa-fw text-muted mr-3" />
						<p className="text-muted">{props.entity.phone}</p>
					</div>
					<div className="d-flex flex-row mb-2">
						<i className="fa fa-envelope fa-fw text-muted mr-3" />
						<p className="text-muted text-truncate">{props.entity.email}</p>
					</div>
					<div className="d-flex flex-row mb-2">
						<i className="fas fa-pen-alt text-muted mr-3" />
						<div className="text-muted w-75">
							{includeNote()}
							{store.noteArray && store.noteArray.map((el, i) => displayNote(el, i))}
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

/**
 * Define the data-types for
 * your component's properties
 **/
ContactCard.propTypes = {
	history: PropTypes.object,
	onDelete: PropTypes.func,
	entity: PropTypes.object
};

/**
 * Define the default values for
 * your component's properties
 **/
ContactCard.defaultProps = {
	onDelete: null
};
