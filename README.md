# ⚡ GrowthHub – Budget Calculator App

A web application to quickly and easily calculate digital budgets.  
It allows you to add clients with their data (name, phone, email), select services (SEO, Ads, Web, etc.), calculate totals, and manage the list of pending budgets.

<div align="center">
  <img src="src/assets/screenshots/GrowthHub_Dk.png" width="65%" alt="GrowthHub desktop" />
  <img src="src/assets/screenshots/GrowthHub_MV.png" width="25%" alt="GrowthHub mobile" />
</div>

[![Demo](https://img.shields.io/badge/View%20Demo-9932CC?style=for-the-badge)](https://triflip.github.io/budgets-calculator/)

---

## 🚀 Features

- Form to add budgets with field validation.
- Controlled inputs for name, phone, and email.
- Budget list with search and sorting (by client or by date).
- Modern design with **TailwindCSS** and reusable components.
- Navigation with **React Router**.
- Tests with **Vitest** and **Testing Library**.

## 🛠️ Tools used

- **React** – Library for building the UI.
- **TypeScript** – Static typing for more robustness.
- **Vite** – Ultra-fast bundler and dev server.
- **TailwindCSS** – Styling with utility-first CSS.
- **Vitest + Testing Library** – Testing framework.
- **WAVE** – Accessibility tool to validate best practices.

---

## 🧠 Architecture decisions

- Feature-based folder structure.
- Separation between pages, features and shared UI.
- Controlled components for form handling.

## 📂 Project structure

![GrowthHub project structure](src/assets/screenshots/structure.png)

## 🧪 Testing

Run the tests with:

```bash
npm run test
```

## ♿ Accessibility

- Semantic HTML
- Keyboard navigation

---

## 📦 Local installation

1. Clone the repository:

   ```bash
   git clone https://github.com/triflip/budgets-calculator
   cd budgets-calculator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run in development mode:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

- Color contrast validated with WAVE

The project follows best practices with React + TypeScript + Tailwind for scalability and maintainability.
