import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import WorkoutBuilder from "../WorkoutBuilder/WorkoutBuilder";
import Exercises from "../Exercises/Exercises";
import CurrentWorkoutPlan from "../CurrentWorkoutPlan/CurrentWorkoutPlan";
import Home from "../Home/Home";
import MyRoutines from "../MyRoutines/MyRoutines";

export const App = () => {
	const [workouts, setWorkouts] = useState([]);
	const [goal, setGoal] = useState({});
	const [currentPlan, setCurrentPlan] = useState([]);

	// const apiKey = "d5768092543cdecc8aba83fd6bbecc2e33e1d5b4";

	const addExerciseToPlan = (goals, exerciseId, name) => {
		const exercise = {
			goal: goals.workoutGoal,
			exerciseId,
			name,
		};
		setCurrentPlan([...currentPlan, exercise]);
	};

	const removeExercise = (index) => {
		let modifiedPlan = [...currentPlan];
		modifiedPlan.splice(index, 1);
		setCurrentPlan([...modifiedPlan]);
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>GAINZ</h1>
				<h3>Lord forgive me for these gains I'm about to receive 🙏</h3>
				<div className="nav-btn-container">
					<Link className="home-btn" to="/">
						Home
					</Link>
					<Link className="my-workouts-btn" to="/myroutines">
						My Routines
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
								<WorkoutBuilder setGoal={setGoal} />
								<Exercises
									goal={goal}
									currentPlan={currentPlan}
									setCurrentPlan={setCurrentPlan}
									addExerciseToPlan={addExerciseToPlan}
								/>
								<CurrentWorkoutPlan
									currentPlan={currentPlan}
									setWorkouts={setWorkouts}
									workouts={workouts}
									removeExercise={removeExercise}
									setCurrentPlan={setCurrentPlan}
								/>
							</>
						)}
					/>
					<Route
						path="/myroutines"
						render={() => <MyRoutines workouts={workouts} />}
					/>
				</Switch>
			</div>
		</div>
	);
};

export default App;
