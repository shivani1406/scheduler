import React from "react";
import { render, cleanup, waitForElement, wait, fireEvent, queryByAltText, getByText, getByAltText, getAllByTestId, prettyDOM, getByPlaceholderText, queryByText, queryAllByAltText } from "@testing-library/react";

import axios from 'axios';
import Application from "components/Application";
import Empty from "components/Appointment/Empty";

beforeEach(() => {
  jest.resetModules();
});

afterEach(cleanup);
it("renders without crashing", () => {
  render(<Application />);
});
