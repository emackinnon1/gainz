import React, { useState, useEffect, Component } from "react";
import "./Goals.css";
import { useForm } from "react-hook-form";
import { fetchCategories } from "../../apiCalls";

const Goals = ({ setGoal }) => {
	const { register, handleSubmit, errors, reset } = useForm();
	const [categories, setCategories] = useState([]);

	const submit = (data) => {
		console.log(data);
	};

	useEffect(() => {
		const getData = async () => {
			setCategories(await fetchCategories());
		};
		getData();
	}, []);

	const makeMenu = (list) => {
		return list.map((list, i) => (
			<option key={i} value={list.name}>
				{list.name}
			</option>
		));
	};
	console.log(categories);
	return (
		<>
			<h2>What are your goals?</h2>
			<form onSubmit={handleSubmit(submit)}>
				<p>Goal for the session:</p>
				<select name="goal" ref={register} className="goal">
					<option value="strength">Strength</option>
					<option value="hypertrophy">Hypertrophy</option>
					<option value="endurance">Muscular Endurance</option>
				</select>
				<p>Muscle group to train:</p>
				<select>{makeMenu(categories)}</select>
				<input type="submit" className="submit-goal-btn" />
			</form>
		</>
	);
};

export default Goals;
