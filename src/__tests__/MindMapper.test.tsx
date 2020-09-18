import React from "react";
import { render } from "@testing-library/react";

import MindMapper from "../MindMapper";

describe("MindMapper", () => {
  test("should render successfully", async () => {
    const { findByText } = render(<MindMapper />);
    await findByText(/start mapping/i);
  });
});
