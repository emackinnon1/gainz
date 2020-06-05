export const fetchData = async (url) => {
	const categories = await fetch(url);
	const response = await categories.json();
	return response.results;
};
