const urlExerciseCategory = "https://wger.de/api/v2/exercisecategory/";

export const fetchCategories = async () => {
	const categories = await fetch(urlExerciseCategory);
	const response = await categories.json();
	return response.results;
};
