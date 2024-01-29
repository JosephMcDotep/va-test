import { render, screen, fireEvent } from "@testing-library/react";
import Tag from "./Tag";

describe("Tag component", () => {
  it("renders tag with correct label", () => {
    render(<Tag label="Test Tag" onClick={() => {}} />);
    expect(screen.getByText("Test Tag")).toBeInTheDocument();
  });

  it("calls onClick when tag is clicked", () => {
    const onClickMock = jest.fn();
    render(<Tag label="Test Tag" onClick={onClickMock} />);

    // Simulate a click on the tag
    fireEvent.click(screen.getByText("Test Tag"));

    // Check if the onClick function was called
    expect(onClickMock).toHaveBeenCalled();
  });

  // Add more tests as needed
});
