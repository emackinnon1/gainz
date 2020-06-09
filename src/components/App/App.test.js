import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import App from "./App";
import { MemoryRouter, Router } from "react-router-dom";
import "@testing-library/jest-dom";
import {
	exerciseTestData,
	exerciseSearchTestData,
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
			fetchData.mockResolvedValueOnce(exerciseSearchTestData);
			fetchData.mockResolvedValueOnce(equipmentTestData);

			const { getByText, getAllByRole, debug } = render(
				<MemoryRouter initialEntries={["/buildworkout"]}>
					<App />
				</MemoryRouter>
			);

			const categoryOption = await waitFor(() => getByText("Toes"));
			expect(categoryOption).toBeInTheDocument();
			const equipmentOption = await waitFor(() => getByText("Hairbrush"));
			expect(equipmentOption).toBeInTheDocument();

			const optionMenus = await waitFor(() => getAllByRole("combobox"));

			await act(async () => {
				userEvent.selectOptions(optionMenus[0], "strength");
				userEvent.selectOptions(optionMenus[1], "Toes");
				userEvent.selectOptions(optionMenus[2], "Hairbrush");
			});

			await act(async () => {
				userEvent.click(getByText("GET SWOLE"));
			});

			expect(getByText("Downward Dog")).toBeInTheDocument();
		});

		it("should allow a user to add an exercise to the current workout", async () => {
			fetchData.mockResolvedValueOnce(categoryTestData);
			fetchData.mockResolvedValueOnce(exerciseSearchTestData);
			fetchData.mockResolvedValueOnce(equipmentTestData);

			const { getByText, getAllByRole, getByTestId, debug } = render(
				<MemoryRouter initialEntries={["/buildworkout"]}>
					<App />
				</MemoryRouter>
			);

			const optionMenus = getAllByRole("combobox");

			await act(async () => {
				userEvent.selectOptions(optionMenus[0], "strength");
			});

			await act(async () => {
				userEvent.selectOptions(optionMenus[1], "8");
			});

			await act(async () => {
				userEvent.selectOptions(optionMenus[2], "8");
			});

			act(() => {
				userEvent.click(getByText("GET SWOLE"));
			});
			fetchData.mockResolvedValueOnce(exerciseSearchTestData);

			// should not have to click twice?
			await act(async () => {
				userEvent.click(getByText("Add to current workout"));
			});

			await act(async () => {
				userEvent.click(getByText("Add to current workout"));
			});

			const workoutType = await waitFor(() => getByText("strength workout"));
			expect(workoutType).toBeInTheDocument();
		});
	});
});
