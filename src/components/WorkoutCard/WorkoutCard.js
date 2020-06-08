import React, { useState, useEffect } from "react";
import "./WorkoutCard.css";
import { fetchExerciseInfo } from "../../apiCalls";

const WorkoutCard = ({ index, name, muscleGoal, removeExercise }) => {
	return (
		<div className="workout-card">
			<button
				id={index}
				className="delete-exercise-btn"
				onClick={(e) => {
					removeExercise(e.target.id);
				}}>
				X
			</button>
			<div className="card-header">
				<h3>{name}</h3>
			</div>
			<p>{muscleGoal} workout</p>
		</div>
	);
};

export default WorkoutCard;
