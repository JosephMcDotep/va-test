import { render, screen } from "@testing-library/react";
import Article from "./Article";

const mockArticle = {
  articleTitle: "Test Article",
  articleTag: { label: "Test Tag" },
  articleDescription: "Test description",
  articleImage: "test-image.jpg",
  articleLink: { url: "https://example.com" },
};

describe("Article component", () => {
  it("renders article with correct content", () => {
    render(<Article {...mockArticle} />);
    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("Test Tag")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByAltText("Test Article")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });
});
