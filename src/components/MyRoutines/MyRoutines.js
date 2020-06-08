import React, { useEffect, useState } from "react";
import "./MyRoutines.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchExerciseInfo } from "../../apiCalls";
import RoutineCard from "../RoutineCard/RoutineCard";

const MyRoutines = ({ workouts }) => {
	const [routineList, setRoutineList] = useState([]);

	useEffect(() => {
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

	const createRoutine = (routineList) => {
		return routineList.map((routine, i) => {
			return <RoutineCard key={i} {...routine} />;
		});
	};

	const cards = routineList.map((fullRoutine, i) => {
		return (
			<div key={i} className="full-routine">
				{createRoutine(fullRoutine)}
			</div>
		);
	});

	return (
		<>
			<h1>Your saved routines:</h1>
			{(routineList.length > 0 && (
				<div className="routines-container">
					<InfiniteScroll
						dataLength={routineList ? routineList.length : 0}
						loader={<h4>Loading...</h4>}
						scrollableTarget="routines-container">
						{cards}
					</InfiniteScroll>
				</div>
			)) || <p>Add some routines you pencil-necked S.O.B.</p>}
		</>
	);
};

export default MyRoutines;
