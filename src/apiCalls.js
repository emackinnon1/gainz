export const fetchData = async (url) => {
	const categories = await fetch(url);
	const response = await categories.json();
	return response.results;
};

export const fetchExerciseInfo = async (url) => {
	const data = await fetch(url);
	const response = await data.json();
	return response;
};
