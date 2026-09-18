import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {  it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { BudgetForm } from "./../components/BudgetForm";

it("adds a new budget and clears inputs", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <BudgetForm />
    </MemoryRouter>
  );

  await user.type(screen.getByPlaceholderText(/Customer name/i), "Toni");
  await user.type(screen.getByPlaceholderText(/Phone number/i), "612345678");
  await user.type(screen.getByPlaceholderText(/Email/i), "toni@example.com");

  await user.click(screen.getByRole("button", { name: /Add budget/i }));


  expect(screen.getByPlaceholderText(/Customer name/i)).toHaveValue("");
  expect(screen.getByPlaceholderText(/Phone number/i)).toHaveValue("");
  expect(screen.getByPlaceholderText(/Email/i)).toHaveValue("");


  expect(screen.getByText(/toni@example.com/i)).toBeInTheDocument();
});
