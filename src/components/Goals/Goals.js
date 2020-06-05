import React, { useState, useEffect } from "react";
import "./Goals.css";
import { useForm } from "react-hook-form";
import { fetchData } from "../../apiCalls";
import { useHistory } from "react-router-dom";

const Goals = ({ setGoal, goal }) => {
	const history = useHistory();
	const { register, handleSubmit, errors, reset } = useForm();
	const [categories, setCategories] = useState([]);
	const [equipment, setEquipment] = useState([]);
	const urlExerciseCategories = "https://wger.de/api/v2/exercisecategory/";
	const urlEquipment = "https://wger.de/api/v2/equipment/";

	useEffect(() => {
		const getData = async () => {
			setCategories(await fetchData(urlExerciseCategories));
			setEquipment(await fetchData(urlEquipment));
		};
		getData();
	}, []);

	const makeMenu = (list) => {
		return list.map((list, i) => (
			<option key={i} value={list.id}>
				{list.name}
			</option>
		));
	};

	const handleGoalSubmission = (data) => {
		if (data) {
			setGoal(data);
			history.push(`/exercises/${data.muscle}/${data.equipment}`);
		}
	};

	return (
		<>
			<h2>What are your goals?</h2>
			<form onSubmit={handleSubmit(handleGoalSubmission)}>
				<div className="dropdown-container">
					<div>
						<p>Muscular goal for the session:</p>
						<select
							name="workoutGoal"
							ref={register({ required: "Please enter an answer!" })}
							className="goal-dropdown"
							defaultValue={""}>
							<option disabled value="">
								-- select an option --
							</option>
							<option value="strength">Strength</option>
							<option value="hypertrophy">Hypertrophy</option>
							<option value="endurance">Muscular Endurance</option>
						</select>
						{errors.goal && <p>{errors.goal.message}</p>}
					</div>
					<div>
						<p>Muscle group to train:</p>
						<select
							name="muscle"
							ref={register({ required: "Please enter an answer!" })}
							className="goal-dropdown"
							defaultValue={""}>
							<option disabled value="">
								-- select an option --
							</option>
							{makeMenu(categories)}
						</select>
						{errors.muscle && <p>{errors.muscle.message}</p>}
					</div>
					<div>
						<p>Available equipment:</p>
						<select
							name="equipment"
							ref={register({ required: "Please enter an answer!" })}
							className="goal-dropdown"
							defaultValue={""}>
							<option disabled value="">
								-- select an option --
							</option>
							{makeMenu(equipment)}
						</select>
						{errors.equipment && <p>{errors.equipment.message}</p>}
					</div>
				</div>
				<button type="submit" className="submit-goal-btn">
					LET'S GET SWOLE
				</button>
			</form>
		</>
	);
};

export default Goals;
