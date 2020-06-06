import React, { useState, useEffect } from "react";
import "./Exercises.css";
import { fetchData } from "../../apiCalls";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Exercises = ({ muscle, equipment }) => {
	const [exerciseList, setExerciseList] = useState([]);

	const urlExercises = `https://wger.de/api/v2/exercise/?category=${muscle}&language=2&license_author=wger.de`;

	useEffect(() => {
		const getData = async () => {
			setExerciseList(await fetchData(urlExercises));
		};
		getData();
	}, []);

	useEffect(() => {
		makeExerciseCards(exerciseList);
	}, [exerciseList]);

	const makeExerciseCards = (list) => {
		return list.map((exercise, i) => {
			return <ExerciseCard key={i} {...exercise} />;
		});
	};

	return (
		<>
			<h1>Choose exercises from the following:</h1>
			<div className="exercise-container scrollableDiv">
				<InfiniteScroll
					dataLength={exerciseList ? exerciseList.length : 0}
					loader={<h4>Loading...</h4>}
					scrollableTarget="scrollableDiv">
					{makeExerciseCards(exerciseList)}
				</InfiniteScroll>
			</div>
		</>
	);
};

export default Exercises;
