import React from "react";
import "./ExerciseCard.css";
import ReactHtmlParser from "react-html-parser";

const ExerciseCard = ({
	id,
	description,
	name,
	currentPlan,
	addExerciseToPlan,
	goal,
}) => {
	return (
		<div className="exercise-card">
			<h2>{name}</h2>
			{description.length > 0 ? ReactHtmlParser(description) : name}
			<button
				id={id}
				className="add-btn"
				onClick={(e) => addExerciseToPlan(goal, e.target.id)}>
				Add to current workout
			</button>
		</div>
	);
};

export default ExerciseCard;
