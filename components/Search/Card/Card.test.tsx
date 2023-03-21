import React from "react";
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
    it("renders with title and subtitle", () => {
        const { getByText } = render(
            <Card title="Test Title" subtitle="Test Subtitle">
                <p>Test Content</p>
            </Card>
        );

        expect(getByText("Test Title")).toBeInTheDocument();
        expect(getByText("Test Subtitle")).toBeInTheDocument();
        expect(getByText("Test Content")).toBeInTheDocument();
    });

    it("renders without title and subtitle", () => {
        const { getByText, queryByText } = render(
            <Card>
                <p>Test Content</p>
            </Card>
        );

        expect(queryByText("Test Title")).not.toBeInTheDocument();
        expect(queryByText("Test Subtitle")).not.toBeInTheDocument();
        expect(getByText("Test Content")).toBeInTheDocument();
    });
});
