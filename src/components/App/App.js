import React, { useState, useEffect, Component } from "react";
import "./App.css";
// import { useRoutes } from "hookrouter";
import { Route, Switch, Link } from "react-router-dom";
import Goals from "../Goals/Goals";
import Exercises from "../Exercises/Exercises";
import CurrentWorkoutPlan from "../CurrentWorkoutPlan/CurrentWorkoutPlan";

export const App = () => {
	const [exercises, setExercises] = useState([]);
	const [workouts, setWorkout] = useState([]);
	const [goal, setGoal] = useState({});

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
					<Route
						exact
						path="/"
						render={() => <Goals setGoal={setGoal} goal={goal} />}
					/>
					<Route
						path="/exercises/:muscle/:equipment"
						render={({ match }) => (
							<>
								<CurrentWorkoutPlan />
								<Exercises
									goal={goal}
									muscle={match.params.muscle}
									equipment={match.params.equipment}
								/>
							</>
						)}
					/>
				</Switch>
			</div>
			<h2>Tired of being out of shape and ugly? Just be ugly!</h2>
			<p>Call us at 1-800-GET-JUICED for our recommended list of steroids.</p>
		</div>
	);
};

export default App;
