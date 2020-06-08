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
			<Link className="get-huge-btn" to="/buildworkout">
				LET'S GET HUGE
			</Link>
			<p>Call us at 1-800-GET-JUICED for our recommended list of steroids.</p>
		</>
	);
};

export default Home;
