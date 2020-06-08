import React, { useEffect, useState } from "react";
import "./CurrentWorkoutPlan.css";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { Link } from "react-router-dom";

const CurrentWorkoutPlan = ({
	currentPlan,
	setWorkouts,
	removeExercise,
	workouts,
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

	const addToWorkouts = (prevRoutines, newRoutine) => {
		setWorkouts([...prevRoutines, newRoutine]);
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
						addToWorkouts(workouts, currentPlan);
						setCurrentPlan([]);
					}}>
					Add to My Routines
				</button>
			)}
			<Link className="my-workouts-btn" to="/myroutines">
				See My Routines
			</Link>
		</>
	);
};

export default CurrentWorkoutPlan;
