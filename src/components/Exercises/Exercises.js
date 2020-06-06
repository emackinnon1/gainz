import React, { useState, useEffect } from "react";
import "./Exercises.css";
import { fetchData } from "../../apiCalls";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const Exercises = ({ goal, muscle, equipment, setCurrentPlan, url }) => {
	const [exerciseList, setExerciseList] = useState([]);
	console.log(exerciseList);

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
				<ExerciseCard key={i} {...exercise} setCurrentPlan={setCurrentPlan} />
			);
		});
	};

	return (
		<>
			<div className="exercise-container scrollableDiv">
				<InfiniteScroll
					dataLength={exerciseList ? exerciseList.length : 0}
					loader={<h4>Loading...</h4>}
					scrollableTarget="scrollableDiv">
					{makeExerciseCards(exerciseList)}
				</InfiniteScroll>
			</div>
			{/* <Link to="/" className="new-search-btn">
				New Search
			</Link> */}
		</>
	);
};

export default Exercises;
