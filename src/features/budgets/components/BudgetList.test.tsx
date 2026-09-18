import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { BudgetList } from "./BudgetList";

vi.mock("./BudgetSearch", () => ({
  BudgetSearch: ({ searchTerm, setSearchTerm }: any) => (
    <input
      data-testid="search-input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  ),
}));

const mockBudgets = [
  {
    id: 1,
    client: "Alice Smith",
    phone: "123456789",
    email: "alice@example.com",
    services: ["SEO", "Ads"],
    total: 700,
    date: "2024-01-15",
  },
  {
    id: 2,
    client: "Bob Jones",
    phone: "987654321",
    email: "bob@example.com",
    services: ["Web"],
    total: 500,
    date: "2024-01-10",
  },
  {
    id: 3,
    client: "Charlie Brown",
    phone: "555555555",
    email: "charlie@example.com",
    services: ["SEO", "Web"],
    total: 800,
    date: "2024-01-20",
  },
];

describe("BudgetList", () => {
  it("renders the title and budgets list", () => {
    render(<BudgetList budgets={mockBudgets} />);
    
    expect(screen.getByText(/Pending budgets/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob Jones/i)).toBeInTheDocument();
    expect(screen.getByText(/Charlie Brown/i)).toBeInTheDocument();
  });

  it("renders all budget information correctly", () => {
    render(<BudgetList budgets={mockBudgets} />);
    
    // Verifica el primer pressupost
    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123456789/)).toBeInTheDocument();
    expect(screen.getByText(/SEO, Ads/)).toBeInTheDocument();
    expect(screen.getByText(/700 €/)).toBeInTheDocument();
  });

  it("shows empty list when no budgets provided", () => {
    render(<BudgetList budgets={[]} />);
    
    expect(screen.getByText(/Pending budgets/i)).toBeInTheDocument();
    expect(screen.queryByText(/Client:/)).not.toBeInTheDocument();
  });

  it("sorts budgets by client name when clicking Sort by Client button", async () => {
    const user = userEvent.setup();
    render(<BudgetList budgets={mockBudgets} />);
    
    const sortButton = screen.getByRole("button", { name: /Sort by Client/i });
    await user.click(sortButton);
    
    const clients = screen.getAllByText(/Client:/i);
    // Després d'ordenar alfabèticament: Alice, Bob, Charlie
    expect(clients[0]).toHaveTextContent("Alice Smith");
    expect(clients[1]).toHaveTextContent("Bob Jones");
    expect(clients[2]).toHaveTextContent("Charlie Brown");
  });

  it("sorts budgets by date when clicking Sort by Date button", async () => {
    const user = userEvent.setup();
    render(<BudgetList budgets={mockBudgets} />);
    
    const sortButton = screen.getByRole("button", { name: /Sort by Date/i });
    await user.click(sortButton);
    
    const dates = screen.getAllByText(/Date:/i);
    // Després d'ordenar per data: 2024-01-10, 2024-01-15, 2024-01-20
    expect(dates[0]).toHaveTextContent("2024-01-10");
    expect(dates[1]).toHaveTextContent("2024-01-15");
    expect(dates[2]).toHaveTextContent("2024-01-20");
  });

  it("resets to original order when clicking Reset button", async () => {
    const user = userEvent.setup();
    render(<BudgetList budgets={mockBudgets} />);
    
    // Primer ordena per client
    await user.click(screen.getByRole("button", { name: /Sort by Client/i }));
    
    // Després reseteja
    await user.click(screen.getByRole("button", { name: /Reset/i }));
    
    const clients = screen.getAllByText(/Client:/i);
    // Torna a l'ordre original: Alice, Bob, Charlie
    expect(clients[0]).toHaveTextContent("Alice Smith");
    expect(clients[1]).toHaveTextContent("Bob Jones");
    expect(clients[2]).toHaveTextContent("Charlie Brown");
  });

  it("filters budgets by client name", async () => {
    const user = userEvent.setup();
    render(<BudgetList budgets={mockBudgets} />);
    
    const searchInput = screen.getByTestId("search-input");
    await user.type(searchInput, "Alice");
    
    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
    expect(screen.queryByText(/Bob Jones/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Charlie Brown/i)).not.toBeInTheDocument();
  });

  it("filters budgets by email", async () => {
    const user = userEvent.setup();
    render(<BudgetList budgets={mockBudgets} />);
    
    const searchInput = screen.getByTestId("search-input");
    await user.type(searchInput, "bob@example");
    
    expect(screen.getByText(/Bob Jones/i)).toBeInTheDocument();
    expect(screen.queryByText(/Alice Smith/i)).not.toBeInTheDocument();
  });

  it("filters budgets by phone number", async () => {
    const user = userEvent.setup();
    render(<BudgetList budgets={mockBudgets} />);
    
    const searchInput = screen.getByTestId("search-input");
    await user.type(searchInput, "555555555");
    
    expect(screen.getByText(/Charlie Brown/i)).toBeInTheDocument();
    expect(screen.queryByText(/Alice Smith/i)).not.toBeInTheDocument();
  });

  it("clears search term when clicking Reset button", async () => {
    const user = userEvent.setup();
    render(<BudgetList budgets={mockBudgets} />);
    
    const searchInput = screen.getByTestId("search-input");
    await user.type(searchInput, "Alice");
    
    expect(screen.queryByText(/Bob Jones/i)).not.toBeInTheDocument();
    
    await user.click(screen.getByRole("button", { name: /Reset/i }));
    
    // Després de resetar, tots els pressupostos tornen a aparèixer
    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob Jones/i)).toBeInTheDocument();
    expect(screen.getByText(/Charlie Brown/i)).toBeInTheDocument();
  });

  it("displays services correctly for each budget", () => {
    render(<BudgetList budgets={mockBudgets} />);
    
    expect(screen.getByText(/SEO, Ads/)).toBeInTheDocument();
    expect(screen.getByText(/Services: Web/)).toBeInTheDocument();
    expect(screen.getByText(/SEO, Web/)).toBeInTheDocument();
  });

  it("renders all three action buttons", () => {
    render(<BudgetList budgets={mockBudgets} />);
    
    expect(screen.getByRole("button", { name: /Sort by Client/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sort by Date/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
  });
});