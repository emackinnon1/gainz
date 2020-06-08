import React, { useEffect, useState } from "react";
import "./CurrentWorkoutPlan.css";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { fetchExerciseInfo } from "../../apiCalls";

const CurrentWorkoutPlan = ({
	currentPlan,
	setWorkouts,
	removeExercise,
	workouts,
}) => {
	const [workingPlan, setWorkingPlan] = useState([]);

	useEffect(() => {
		console.log(workingPlan);
		setWorkingPlan([]);
		const getData = async () => {
			let plan = [];
			currentPlan.map(async (exercise) => {
				const url = `https://wger.de/api/v2/exerciseinfo/${exercise.exerciseId}/`;
				const newExercise = {
					...(await fetchExerciseInfo(url)),
					muscleGoal: exercise.goal,
					id: exercise.exerciseId,
				};
				setWorkingPlan([...workingPlan, newExercise]);
			});
		};
		getData();
	}, [currentPlan]);

	const displayWorkouts = (plan, i) => {
		return plan.map((exercise, i) => {
			return (
				<WorkoutCard
					key={i}
					exerciseId={exercise.id}
					name={exercise.name}
					muscleGoal={exercise.muscleGoal}
					removeExercise={removeExercise}
					index={i}
				/>
			);
		});
	};

	const addToFavorites = (prevRoutines, newRoutine) => {
		setWorkouts([...prevRoutines, newRoutine]);
	};

	console.log("workingPlan", workingPlan);
	console.log("currentPlan", currentPlan);

	return (
		<>
			<h1>Your current plan:</h1>
			{currentPlan.length === 0 && <p>Add exercises to your plan, dummy!</p>}
			<div className="current-plan-container">
				{displayWorkouts(workingPlan)}
			</div>
			{currentPlan.length > 0 && (
				<button
					className="add-workout-btn"
					onClick={() => addToFavorites(workouts, workingPlan)}>
					Add this plan to My Workouts
				</button>
			)}
		</>
	);
};

export default CurrentWorkoutPlan;
