
/** @vitest-environment jsdom */

import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import AuthForm from "./AuthForm";

afterEach(() => {
  cleanup();
});

describe("AuthForm", () => {
  const props = {
    isRegister: false,
    username: "",
    setUsername: vi.fn(),
    password: "",
    setPassword: vi.fn(),
    handleAuth: vi.fn(),
    toggleRegister: vi.fn(),
    message: ""
  };

  it("displays the login form", () => {
    render(<AuthForm {...props} />);

   expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Password (8+ characters)")
    ).toBeInTheDocument();
  });

  it("updates the username and password", () => {
    render(<AuthForm {...props} />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Subashini" }
    });

    fireEvent.change(
      screen.getByPlaceholderText("Password (8+ characters)"),
      { target: { value: "password123" } }
    );

    expect(props.setUsername).toHaveBeenCalledWith("Subashini");
    expect(props.setPassword).toHaveBeenCalledWith("password123");
  });

  it("calls handleAuth when the login form is submitted", () => {
    render(<AuthForm {...props} />);

    fireEvent.submit(screen.getByRole("button", { name: "Login" }).closest("form"));

    expect(props.handleAuth).toHaveBeenCalled();
  });

  it("calls toggleRegister when Create Account is clicked", () => {
    render(<AuthForm {...props} />);

    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    expect(props.toggleRegister).toHaveBeenCalled();
  });

  it("displays the registration form", () => {
    render(<AuthForm {...props} isRegister={true} />);

   expect(screen.getByRole("heading", { name: "Create Account" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to Login" })).toBeInTheDocument();
  });
});
