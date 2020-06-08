import React, { useEffect, useState } from "react";
import "./MyWorkouts.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchExerciseInfo } from "../../apiCalls";
import MyWorkoutCard from "../WorkoutCard/WorkoutCard";
import ReactHtmlParser from "react-html-parser";

const MyWorkouts = ({ workouts }) => {
	const [routineList, setRoutineList] = useState([]);
	// console.log("myworkouts", workouts);

	useEffect(() => {
		// setWorkoutList([]);
		const getData = async () => {
			if (!workouts) {
				return;
			}
			const routines = workouts.map((routine) => {
				const returnedWorkouts = routine.map(async (exercise) => {
					const url = `https://wger.de/api/v2/exerciseinfo/${exercise.exerciseId}/`;
					return {
						...(await fetchExerciseInfo(url)),
						muscleGoal: exercise.goal,
						id: exercise.exerciseId,
					};
				});
				return Promise.all(returnedWorkouts);
			});
			setRoutineList(await Promise.all(routines));
		};
		getData();
	}, [workouts]);

	const cards = routineList.map((routine) => {
		return routine.map((exercise) => {
			return (
				<div className="routine-card">
					<h2>{exercise.name}</h2>
				</div>
			);
		});
	});

	console.log(routineList);

	return (
		<>
			<h1>Your saved routines:</h1>
			{cards}
		</>
	);
};

export default MyWorkouts;
