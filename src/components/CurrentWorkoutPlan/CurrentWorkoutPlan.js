import React, { useEffect, useState } from "react";
import "./CurrentWorkoutPlan.css";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { Link } from "react-router-dom";

const CurrentWorkoutPlan = ({
	currentPlan,
	setRoutines,
	removeExercise,
	routines,
	setCurrentPlan,
}) => {
	const displayWorkouts = (plan, i) => {
		return plan.map((exercise, i) => {
			return (
				<WorkoutCard
					key={i}
					exerciseId={exercise.exerciseId}
					name={exercise.name}
					muscleGoal={exercise.goal}
					removeExercise={removeExercise}
					index={i}
				/>
			);
		});
	};

	const addToRoutines = (prevRoutines, newRoutine) => {
		setRoutines([...prevRoutines, newRoutine]);
	};

	return (
		<>
			<h1>Your current plan:</h1>
			{currentPlan.length === 0 && <p>Add exercises to your plan, dummy!</p>}
			<div className="current-plan-container">
				{displayWorkouts(currentPlan)}
			</div>
			{currentPlan.length > 0 && (
				<button
					className="add-workout-btn"
					onClick={() => {
						addToRoutines(routines, currentPlan);
						setCurrentPlan([]);
					}}>
					Add to My Routines
				</button>
			)}
			<Link className="my-routines-btn" to="/myroutines">
				Go to My Routines
			</Link>
		</>
	);
};

export default CurrentWorkoutPlan;
