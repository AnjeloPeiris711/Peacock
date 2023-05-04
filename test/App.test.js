// import React from "react";
// import '@testing-library/jest-dom';
// import { render, fireEvent } from "@testing-library/react";
// import App from "../src/components/App";

// describe("App Component", () => {
//   test("renders Tab component", () => {
//     const { getByText } = render(<App />);
//     const tabElement = getByText(/Tab/i);
//     expect(tabElement).toBeInTheDocument();
//   });

//   test("renders Setting component", () => {
//     const { getByText } = render(<App />);
//     const settingElement = getByText(/Setting/i);
//     expect(settingElement).toBeInTheDocument();
//   });

//   test("renders About component", () => {
//     const { getByText } = render(<App />);
//     const aboutElement = getByText(/About/i);
//     expect(aboutElement).toBeInTheDocument();
//   });

//   test("renders Nav component", () => {
//     const { getByText } = render(<App />);
//     const navElement = getByText(/Nav/i);
//     expect(navElement).toBeInTheDocument();
//   });

//   test("toggles setting on click of Tab", () => {
//     const { getByText, getByTestId } = render(<App />);
//     const tabElement = getByText(/Tab/i);
//     const settingElement = getByTestId("setting");
//     expect(settingElement).toHaveClass("hidden");
//     fireEvent.click(tabElement);
//     expect(settingElement).not.toHaveClass("hidden");
//   });
// });
