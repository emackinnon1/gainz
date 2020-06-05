import React, { useState, useEffect } from "react";
import "./Exercises.css";
import { fetchExercises } from "../../apiCalls";

const Exercises = ({ muscle, equipment }) => {
	const [exerciseList, setExerciseList] = useState([]);

	console.log(muscle, equipment);

	const urlExercises = `https://wger.de/api/v2/exercise/?category=${muscle}&language=2&license_author=wger.de`;

	useEffect(() => {
		const getData = async () => {
			setExerciseList(await fetchExercises(urlExercises));
		};
		getData();
	}, []);

	return (
		<>
			<h1>Choose exercises from the following:</h1>
		</>
	);
};

export default Exercises;
