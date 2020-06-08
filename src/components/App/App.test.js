import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
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

			const button = getByText("LET'S GET HUGE");
			expect(button).toBeInTheDocument();
		});
	});
});
