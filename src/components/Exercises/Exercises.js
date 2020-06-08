import React, { useState, useEffect } from "react";
import "./Exercises.css";
import { fetchData } from "../../apiCalls";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Exercises = ({ goal, currentPlan, addExerciseToPlan }) => {
	const [exerciseList, setExerciseList] = useState([]);

	const urlExercises = `https://wger.de/api/v2/exercise/?category=${goal.muscle}&equipment=${goal.equipment}&language=2&license_author=wger.de`;

	useEffect(() => {
		const getData = async () => {
			setExerciseList(await fetchData(urlExercises));
		};
		getData();
		makeExerciseCards(exerciseList);
	}, [goal]);

	useEffect(() => {
		makeExerciseCards(exerciseList);
	}, [exerciseList]);

	const makeExerciseCards = (list) => {
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

	return (
		<>
			<h1>Add exercises to your plan:</h1>
			<div className="exercise-container scrollableDiv">
				{exerciseList.length === 0 ? (
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
