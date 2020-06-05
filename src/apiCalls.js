const urlExerciseCategory = "https://wger.de/api/v2/exercisecategory/";
const urlEquipment = "https://wger.de/api/v2/equipment/";

export const fetchCategories = async (url) => {
	const categories = await fetch(url);
	const response = await categories.json();
	return response.results;
};

export const fetchEquipment = async (url) => {
	const equipmentTypes = await fetch(url);
	const response = await equipmentTypes.json();
	return response.results;
};
