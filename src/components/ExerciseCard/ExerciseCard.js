import React, { useState, useEffect } from "react";
import "./ExerciseCard.css";
import ReactHtmlParser from "react-html-parser";

const ExerciseCard = ({ id, description, name, setCurrentPlan }) => {
	return (
		<div id={id} className="exercise-card">
			<h2>{name}</h2>
			{description.length > 0 ? ReactHtmlParser(description) : name}
			<button className="add-btn">Add to current workout</button>
		</div>
	);
};

export default ExerciseCard;
