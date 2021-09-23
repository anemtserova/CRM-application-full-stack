import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import RetroPhonePhoto from "../../img/retro-phone.jpg";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";

export const ContactCard = props => {
	const { store, actions } = useContext(GlobalState);
	const [state, setState] = useState({});

	const includeNote = () => {
		const userNote = store.noteArray.find((el, i) => el.userId == props.entity.id);
		// props.entity.note = userNote && userNote.note;
		// console.log("USERNOTE", userNote);
		return userNote && userNote.note;
	};
	// useEffect(() => {
	// 	includeNote();
	// }, []);
	// console.log("USER contact", props.entity);

	return (
		<li className="list-group-item">
			<div className="row w-100">
				<div className="col-12 col-sm-6 col-md-3 px-0">
					<img
						src={RetroPhonePhoto}
						alt="Retro phone image"
						className="mx-auto d-block"
						style={{ maxWidth: "75%" }}
					/>
				</div>
				<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
					<div className=" float-right">
						<Link to={"/edit/" + props.entity.id}>
							<button className="btn">
								<i className="fas fa-pencil-alt mr-3" />
							</button>
						</Link>
						<button className="btn" onClick={() => props.onDelete()}>
							<i className="fas fa-trash-alt" />
						</button>
					</div>
					<label className="name lead">{props.entity.full_name}</label>
					<br />
					<i className="fas fa-map-marker-alt text-muted mr-3" />
					<span className="text-muted">{props.entity.address}</span>
					<br />
					<span
						className="fa fa-phone fa-fw text-muted mr-3"
						data-toggle="tooltip"
						title=""
						data-original-title=""
					/>
					<span className="text-muted small">{props.entity.phone}</span>
					<br />
					<span
						className="fa fa-envelope fa-fw text-muted mr-3"
						data-toggle="tooltip"
						data-original-title=""
						title=""
					/>
					<span className="text-muted small text-truncate">{props.entity.email}</span>
					<br />
					<span
						className="fas fa-pen-alt text-muted mr-3"
						data-toggle="tooltip"
						data-original-title=""
						title=""
					/>
					<span className="text-muted ">{includeNote()}</span>
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
