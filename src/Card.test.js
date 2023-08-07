import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";


//smoke test
test("it renders without crashing", () => {
    render(<Card />)
  })
  
  //snapshot test
  test("it matches snapshot", () => {
    const {asFragment} = render(<Card />);
    expect(asFragment()).toMatchSnapshot()
  })