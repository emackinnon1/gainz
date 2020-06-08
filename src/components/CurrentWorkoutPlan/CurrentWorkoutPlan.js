import React, { useEffect, useState } from "react";
import "./CurrentWorkoutPlan.css";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
// import { fetchExerciseInfo } from "../../apiCalls";

const CurrentWorkoutPlan = ({
	currentPlan,
	setWorkouts,
	removeExercise,
	workouts,
}) => {
	// const [workingPlan, setWorkingPlan] = useState([]);

	// useEffect(() => {
	// 	setWorkingPlan([]);
	// 	const getData = async () => {
	// 		currentPlan.map(async (exercise) => {
	// 			const url = `https://wger.de/api/v2/exerciseinfo/${exercise.exerciseId}/`;
	// 			const newExercise = {
	// 				...(await fetchExerciseInfo(url)),
	// 				muscleGoal: exercise.goal,
	// 				id: exercise.exerciseId,
	// 			};
	// 			console.log("nE", newExercise);
	// 			setWorkingPlan([...workingPlan, newExercise]);
	// 		});
	// 	};
	// 	getData();
	// }, []);

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
					onClick={() => addToWorkouts(workouts, currentPlan)}>
					Add this plan to My Workouts
				</button>
			)}
		</>
	);
};

export default CurrentWorkoutPlan;
