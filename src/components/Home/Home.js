import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<h1>Hey you skinny little wimp.</h1>
			<h3>Tired of being out of shape and ugly? Just be ugly!</h3>
			<p>
				Use this app to turn those PVC pipes you call "arms" into magnificent
				meat rods of power that even Mike Tyson would be proud of.
			</p>
			<p>
				To use this app, pick the goal of the exercise, the muscle group you
				would like to workout and the equipment you have available and click the
				search button. Pick three to four exercises to add them to your initial
				plan. You can search as many times as you want to find different
				muscular goal, exercise and equipment combinations. Once you have a plan
				that you like, add them to your saved routines. In your saved routines
				you can see more information about the individual exercises and how many
				reps and sets you should do for an optimal workout.
			</p>
			<Link className="get-huge-btn" to="/buildworkout">
				LET'S GET HUGE
			</Link>
			<p>Call us at 1-800-GET-JUICED for our recommended list of steroids.</p>
		</>
	);
};

export default Home;
