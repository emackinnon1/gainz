import React, { useState, useEffect } from "react";
import "./Exercises.css";
import { fetchData } from "../../apiCalls";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Exercises = ({ goal, currentPlan, addExerciseToPlan }) => {
	// console.log(goal);
	const [exerciseList, setExerciseList] = useState([]);

	const urlExercises = `https://wger.de/api/v2/exercise/?category=${goal.muscle}&equipment=${goal.equipment}&language=2&license_author=wger.de`;

	const makeExerciseCards = (list) => {
		if (!list) {
			return;
		}
		return list.map((exercise, i) => {
			return (
				<ExerciseCard
					key={i}
					{...exercise}
					currentPlan={currentPlan}
					goal={goal}
					addExerciseToPlan={addExerciseToPlan}
				/>
			);
		});
	};

	useEffect(() => {
		let mounted = true;
		const getData = async () => {
			setExerciseList(await fetchData(urlExercises));
		};
		if (mounted) {
			getData();
		}
		return () => (mounted = false);
	}, [goal, urlExercises]);

	return (
		<>
			<h1>Add exercises to your plan:</h1>
			<div className="exercise-container scrollableDiv">
				{exerciseList && exerciseList.length === 0 ? (
					<p>Search for exercises!</p>
				) : (
					<InfiniteScroll
						dataLength={exerciseList ? exerciseList.length : 0}
						loader={<h4>Loading...</h4>}
						scrollableTarget="exercise-container">
						{makeExerciseCards(exerciseList)}
					</InfiniteScroll>
				)}
			</div>
		</>
	);
};

export default Exercises;
