import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders mind mapper", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Mind Mapper/i);
  expect(linkElement).toBeInTheDocument();
});
