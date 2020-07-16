import React, { useState, useEffect } from "react";
import "./WorkoutBuilder.css";
import { useForm } from "react-hook-form";
import { fetchData } from "../../apiCalls";

const WorkoutBuilder = ({ setGoal }) => {
	const { register, handleSubmit, errors } = useForm();
	const [categories, setCategories] = useState([]);
	const [equipment, setEquipment] = useState([]);
	const urlExerciseCategories = "https://wger.de/api/v2/exercisecategory/";
	const urlEquipment = "https://wger.de/api/v2/equipment/";

	const getShit = async () => {
		const things = await fetch(urlEquipment);
		const response = await things.json();
		console.log("getShit", response);
	};

	// getShit();

	useEffect(() => {
		let mounted = true;
		const getData = async () => {
			setCategories(await fetchData(urlExerciseCategories));
			setEquipment(await fetchData(urlEquipment));
		};
		if (mounted) {
			getData();
		}
		return () => (mounted = false);
	}, []);

	const makeMenu = (list) => {
		if (!list) {
			return;
		}
		return list.map((list, i) => (
			<option key={i} value={list.id}>
				{list.name}
			</option>
		));
	};

	const handleGoalSubmission = (data) => {
		if (data) {
			setGoal(data);
		}
	};

	return (
		<>
			<div className="form-container">
				<form onSubmit={handleSubmit(handleGoalSubmission)}>
					<div className="dropdown-container">
						<div>
							<p>Training goal:</p>
							<select
								data-testid="select-goal"
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
							{errors.workoutGoal && <p>{errors.workoutGoal.message}</p>}
						</div>
						<div>
							<p>Muscle group:</p>
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
							<p>Equipment:</p>
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
						GET SWOLE
					</button>
				</form>
			</div>
		</>
	);
};

export default WorkoutBuilder;
