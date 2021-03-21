import React from "react";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

const setup = () => {
  const utils = render(<App />);
  const roomSizeInput = utils.getByLabelText("room-size");
  const initialPositionInput = utils.getByLabelText("initial-position");
  const result = utils.getByLabelText("result");
  const commandInput = utils.getByLabelText("command");
  const submitButton = utils.getByTestId("submit");

  return {
    roomSizeInput,
    initialPositionInput,
    commandInput,
    submitButton,
    result,
    ...utils,
  };
};

describe("RobotController", () => {
  it("should have the right message in the result section after a valid simulation", () => {
    const {
      roomSizeInput,
      initialPositionInput,
      commandInput,
      submitButton,
      result,
    } = setup();

    // give input of 5,5 to room size input
    userEvent.type(roomSizeInput, "5,5");

    // give input of 1,2,N to room size input
    userEvent.type(initialPositionInput, "1,2,N");

    // give input of RFRFFRFRF to command input
    userEvent.type(commandInput, "RFRFFRFRF");

    //click the submit button
    userEvent.click(submitButton);

    // view the result in result section and compare the value
    expect(result).toHaveTextContent("(1,3, N)");
  });

  afterAll(cleanup);
});
