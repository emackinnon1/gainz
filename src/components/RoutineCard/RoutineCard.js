import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./RoutineCard.css";

const RoutineCard = ({
	name,
	category,
	muscles,
	muscles_secondary,
	equipment,
	description,
	muscleGoal,
}) => {
	const findRepRange = (muscularGoal) => {
		if (muscularGoal === "hypertrophy") {
			return "8-12";
		} else if (muscularGoal === "strength") {
			return "3-6";
		} else if (muscularGoal === "endurance") {
			return "15-25";
		}
	};

	return (
		<div className="routine-card">
			<h2>{name}</h2>
			<p>Exercise category: {category.name}</p>
			<p>Muscles used: {muscles.map((muscle) => muscle.name).toString()}</p>
			<p>
				Secondary muscles used:{" "}
				{muscles_secondary.map((muscle) => muscle.name).toString()}
			</p>
			<p>Equipment needed: {equipment.map((equip) => equip.name).toString()}</p>
			{description.length > 0 ? ReactHtmlParser(description) : name}
			<p>Do 3-4 sets of {findRepRange(muscleGoal)} reps of this exercise.</p>
		</div>
	);
};

export default RoutineCard;
