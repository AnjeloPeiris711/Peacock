import React from "react";
import '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/react";
import Nav from "../src/components/nav/Nav";

describe("Nav component", () => {
  test("renders three links", () => {
    const { getAllByRole } = render(<Nav />);
    const links = getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  test("sets active class for clicked link", () => {
    const { getByTitle } = render(<Nav />);
    const link = getByTitle("Settings");
    fireEvent.click(link);
    expect(link).toHaveClass("active");
  });

  test("updates active link when clicked", () => {
    const { getByTitle } = render(<Nav />);
    const exploreLink = getByTitle("Explore");
    const aboutMeLink = getByTitle("About me");

    fireEvent.click(exploreLink);
    expect(exploreLink).toHaveClass("active");
    expect(aboutMeLink).not.toHaveClass("active");

    fireEvent.click(aboutMeLink);
    expect(exploreLink).not.toHaveClass("active");
    expect(aboutMeLink).toHaveClass("active");
  });
});

