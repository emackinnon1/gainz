import React from "react";
import "./ExerciseCard.css";
import ReactHtmlParser from "react-html-parser";

const ExerciseCard = ({ id, description, name, addExerciseToPlan, goal }) => {
	return (
		<div className="exercise-card">
			<h2>{name}</h2>
			{description && description.length > 0
				? ReactHtmlParser(description)
				: name}
			<button
				id={id}
				className="add-btn"
				data-name={name}
				onClick={(e) =>
					addExerciseToPlan(goal, e.target.id, e.target.dataset.name)
				}>
				Add to current workout
			</button>
		</div>
	);
};

export default ExerciseCard;
