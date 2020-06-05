import React, { useState, useEffect, Component } from "react";
import "./App.css";
// import { useRoutes } from "hookrouter";
import { Route, Switch, Link } from "react-router-dom";
import Goals from "../Goals/Goals";

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
				<Link className="start-over-btn" to="/">
					Start Over
				</Link>
				<Link className="my-workouts-btn" to="/workouts">
					My Workouts
				</Link>
			</header>
			<div className="wrapper">
				<Switch>
					<Route exact path="/" render={() => <Goals setGoal={setGoal} />} />
				</Switch>
			</div>
		</div>
	);
};

export default App;
