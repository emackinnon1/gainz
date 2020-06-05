import React, { useState, useEffect } from "react";
import "./ExerciseCard.css";

const ExerciseCard = (props) => {
	console.log(props);
	return <p>{props.id}</p>;
};

export default ExerciseCard;
