import React, { useState, useEffect, Component } from "react";
import "./App.css";
// import { useRoutes } from "hookrouter";
import { Route, Switch, Link } from "react-router-dom";
import WorkoutBuilder from "../WorkoutBuilder/WorkoutBuilder";
import Exercises from "../Exercises/Exercises";
import CurrentWorkoutPlan from "../CurrentWorkoutPlan/CurrentWorkoutPlan";

export const App = () => {
	const [exercises, setExercises] = useState([]);
	const [workouts, setWorkout] = useState([]);
	const [goal, setGoal] = useState({});
	const [currentPlan, setCurrentPlan] = useState({});

	// const apiKey = "d5768092543cdecc8aba83fd6bbecc2e33e1d5b4";

	return (
		<div className="App">
			<header className="App-header">
				<h1>GAINZ</h1>
				<h3>Lord forgive me for these gains I'm about to receive 🙏</h3>
				<div className="nav-btn-container">
					<Link className="start-over-btn" to="/">
						Start Over
					</Link>
					<Link className="my-workouts-btn" to="/myworkouts">
						My Workouts
					</Link>
				</div>
			</header>
			<div className="wrapper">
				<Switch>
					<Route path="/" render={() => <Home />} />
					<Route
						path="/buildworkout"
						render={() => (
							<>
								<WorkoutBuilder setGoal={setGoal} goal={goal} />{" "}
								<CurrentWorkoutPlan />
								<Exercises goal={goal} setCurrentPlan={setCurrentPlan} />
							</>
						)}
					/>
					{/* <Route
						path="/exercises/:muscle/:equipment"
						render={({ match }) => (
							<>
								<CurrentWorkoutPlan />
								<Exercises
									goal={goal}
									muscle={match.params.muscle}
									equipment={match.params.equipment}
									setCurrentPlan={setCurrentPlan}
								/>
							</>
						)}
					/> */}
				</Switch>
			</div>
			<h2>Tired of being out of shape and ugly? Just be ugly!</h2>
			<p>Call us at 1-800-GET-JUICED for our recommended list of steroids.</p>
		</div>
	);
};

export default App;
