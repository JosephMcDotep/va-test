import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("renders button with children", () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(onClickMock).toHaveBeenCalled();
  });
});
