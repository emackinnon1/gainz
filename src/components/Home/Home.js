import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<h1>What's up you skinny little thing.</h1>
			<h2>Tired of being out of shape and ugly? Just be ugly!</h2>
			<p>Call us at 1-800-GET-JUICED for our recommended list of steroids.</p>
			<Link className="get-huge-btn" to="/buildworkout">
				LET'S GET HUGE
			</Link>
		</>
	);
};

export default Home;
