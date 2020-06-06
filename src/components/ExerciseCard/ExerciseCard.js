import React, { useState, useEffect } from "react";
import "./ExerciseCard.css";
import ReactHtmlParser from "react-html-parser";

const ExerciseCard = ({ id, description, name }) => {
	console.log(typeof description);
	return (
		<div id={id}>
			<h3>{name}</h3>
			{description.length > 0 ? ReactHtmlParser(description) : name}
		</div>
	);
};

export default ExerciseCard;
