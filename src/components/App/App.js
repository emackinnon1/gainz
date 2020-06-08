import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import WorkoutBuilder from "../WorkoutBuilder/WorkoutBuilder";
import Exercises from "../Exercises/Exercises";
import CurrentWorkoutPlan from "../CurrentWorkoutPlan/CurrentWorkoutPlan";
import Home from "../Home/Home";

export const App = () => {
	const [workouts, setWorkouts] = useState([]);
	const [goal, setGoal] = useState({});
	const [currentPlan, setCurrentPlan] = useState([]);

	// const apiKey = "d5768092543cdecc8aba83fd6bbecc2e33e1d5b4";

	const addExerciseToPlan = (goals, exerciseId) => {
		console.log(currentPlan);
		const exercise = {
			goal: goals.workoutGoal,
			exerciseId,
		};
		setCurrentPlan([...currentPlan, exercise]);
	};

	const removeExercise = (index) => {
		const modifiedPlan = currentPlan.splice(index, 1);
		console.log(modifiedPlan);
		setCurrentPlan([...modifiedPlan]);
	};

	console.log(workouts);

	return (
		<div className="App">
			<header className="App-header">
				<h1>GAINZ</h1>
				<h3>Lord forgive me for these gains I'm about to receive 🙏</h3>
				<div className="nav-btn-container">
					<Link className="home-btn" to="/">
						Home
					</Link>
					<Link className="my-workouts-btn" to="/myworkouts">
						My Workouts
					</Link>
				</div>
			</header>
			<div className="wrapper">
				<Switch>
					<Route exact path="/" render={() => <Home />} />
					<Route
						path="/buildworkout"
						render={() => (
							<>
								<WorkoutBuilder setGoal={setGoal} goal={goal} />
								<CurrentWorkoutPlan
									currentPlan={currentPlan}
									setWorkouts={setWorkouts}
									workouts={workouts}
									removeExercise={removeExercise}
								/>
								<Exercises
									goal={goal}
									currentPlan={currentPlan}
									setCurrentPlan={setCurrentPlan}
									addExerciseToPlan={addExerciseToPlan}
								/>
							</>
						)}
					/>
				</Switch>
			</div>
		</div>
	);
};

export default App;
