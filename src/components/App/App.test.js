import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import App from "./App";
import { MemoryRouter, Router } from "react-router-dom";
import "@testing-library/jest-dom";
import {
	exerciseTestData,
	equipmentTestData,
	categoryTestData,
} from "./AppTestData";
import userEvent from "@testing-library/user-event";
import { fetchData, fetchExerciseInfo } from "../../apiCalls";

jest.mock("../../apiCalls");

describe("App", () => {
	describe("Unit tests", () => {
		it("Should render the correct information", () => {
			const { getByText } = render(
				<MemoryRouter>
					<App />
				</MemoryRouter>
			);
			const title = getByText("GAINZ");
			expect(title).toBeInTheDocument();

			const button = getByText("My Routines");
			expect(button).toBeInTheDocument();
		});
	});

	describe("Integration tests", () => {
		it("Should navigate to the workout builder url", async () => {
			fetchData.mockResolvedValueOnce(categoryTestData);
			fetchData.mockResolvedValueOnce(equipmentTestData);

			const { getByText } = render(
				<MemoryRouter>
					<App />
				</MemoryRouter>
			);

			await act(async () => {
				userEvent.click(getByText("LET'S GET HUGE"));
			});

			const workoutBuilderBtn = getByText("GET SWOLE");
			expect(workoutBuilderBtn).toBeInTheDocument();
			const categoryOption = await waitFor(() => getByText("Toes"));
			expect(categoryOption).toBeInTheDocument();
		});

		it("Should let the user search for exercises to add to their current workout", async () => {
			fetchData.mockResolvedValueOnce(categoryTestData);
			fetchData.mockResolvedValueOnce(equipmentTestData);

			const { getByText, debug } = render(
				<MemoryRouter initialEntries={["/buildworkout"]}>
					<App />
				</MemoryRouter>
			);

			const categoryOption = await waitFor(() => getByText("Toes"));
			expect(categoryOption).toBeInTheDocument();
			const equipmentOption = await waitFor(() => getByText("Hairbrush"));
			expect(equipmentOption).toBeInTheDocument();

			// await act(async () => {
			// 	userEvent.click(getByText("GET SWOLE"));
			// });
		});
	});
});
