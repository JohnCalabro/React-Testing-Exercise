import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

//smoke test
test("it renders without crashing", () => {
  render(<Carousel />)
})

//snapshot test
test("it matches snapshot", () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot()
})


//failing test to correct w/ bug fix:
test("it goes back on left arrow", () => {
  const { getByTestId, queryByAltText } = render(<Carousel />);
  //grab left and right arrow icons (< class=fas fa...)""
  const lArrow = getByTestId("left-arrow")
  const rArrow = getByTestId("right-arrow")

  // fire off events to test them
  fireEvent.click(rArrow)
  fireEvent.click(lArrow)

  // if am on image 2/3 and I press back I should be on img 1/3 
  //instead pressing the left icon moves me forward which causes the first
  //img by Richard P. to not be present thus causing this test to fail,
  //by adding a getBack (name also Beatles reference) function where we decrement
  // the index instead we fix the bug and the test passes
  expect (queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
})


//hidden tests

test("hides left arrow", () => {
  const { getByTestId } = render(<Carousel />);
  const lArrow = getByTestId("left-arrow");

  expect(lArrow).toHaveClass("hidden");
})

test("hides rigth arrow", () => {
  const { getByTestId } = render(<Carousel />);
  const rArrow = getByTestId("right-arrow");
  expect(rArrow).toHaveClass("hidden");
})