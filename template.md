# 🧠 NerdHub — Project Showcase Portal

## 📘 Project Overview
**NerdHub** is a sleek dark-mode **single-page application (SPA)** built using **React + TypeScript + Vite**, acting as a **hub** for showcasing multiple small projects hosted under a single subdomain (e.g., `nerd.varzone.in`).

Each project (e.g., `project1`, `project2`, `project3`) exists as a subdirectory under `src/`.  
The hub dynamically lists all these sub-projects as vertically arranged, interactive **showcase boxes**, each linking to the corresponding sub-route (`/project1`, `/project2`, etc).

The entire page uses **shadcn/ui** components for design consistency and **TailwindCSS** for styling.

---

## 🎯 Goals & Requirements

### 1. Core Functionality
- Create a **dynamic hub page** that:
  - Reads a `projects.json` file to determine the available sub-projects.
  - Dynamically generates showcase cards/buttons for each project.
  - Routes to `/<project-name>` when clicked (React Router-based).
- All projects reside as folders in `src/`.
- The hub should be responsive, minimalistic, and optimized for dark mode.

### 2. Design Goals
- Sleek **dark theme** using `shadcn/ui` components.
- Centralized vertical layout (list-style showcase).
- Each project card should:
  - Occupy ~75% of the viewport width.
  - Be vertically stacked with uniform spacing.
  - Include hover and focus animations (e.g., scale/blur).
  - Display project title and short description.

### 3. Dynamic Configuration
- A JSON configuration file defines all projects:
  ```json
  {
    "projects": [
      {
        "name": "Project 1",
        "path": "project1",
        "description": "A simple HTML + CSS landing page."
      },
      {
        "name": "Project 2",
        "path": "project2",
        "description": "A small React experiment with animations."
      },
      {
        "name": "Project 3",
        "path": "project3",
        "description": "A visualization dashboard built with Chart.js."
      }
    ]
  }
````

* The React app reads this file dynamically and renders the cards accordingly.

---

## 🧩 Project Structure

The current repository already includes:

```
nerd-hub/
│
├── src/
│   ├── main.tsx                 # React entry
│   ├── App.tsx                  # Root app component
│   ├── components/              # Custom components (ProjectCard, Layout, etc.)
│   ├── routes/                  # Route configuration
│   ├── project1/                # Sub-project 1 (React or static)
│   ├── project2/                # Sub-project 2
│   ├── project3/                # Sub-project 3
│   ├── projects.json            # JSON config file listing available projects
│
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Implementation Steps for AI Agent

### Step 1: Setup UI and Routing

* Use `react-router-dom` for navigation.
* Create a main route (`/`) for the hub page.
* Create dynamic routes for each project based on the `path` key from `projects.json`.

### Step 2: Fetch and Parse Project Data

* Import or fetch `projects.json` inside `App.tsx`.
* Store parsed data in a state variable.
* Map over the list to render dynamic project cards.

### Step 3: Create Reusable Components

* **ProjectCard.tsx**

  * Uses `Card`, `CardHeader`, `CardContent` from `shadcn/ui`.
  * Displays `name` and `description`.
  * On click, routes to `/project-name`.

* **Layout.tsx**

  * Centers content both vertically and horizontally.
  * Uses dark background with accent color for hover states.

### Step 4: Styling & Theming

* Enable **dark mode** globally using Tailwind config.
* Use subtle animations (Framer Motion optional).
* Each card should fill ~75% width on desktop and 90% on mobile.

### Step 5: Final Routing

* Ensure `/project1`, `/project2`, etc., render their respective folders.
* Use `React.lazy()` + `Suspense` for lazy loading sub-projects to improve performance.

---

## 🎨 UI Sketch (Textual)

```
 -----------------------------------------------
|                                               |
|        [ NerdHub ]                            |
|                                               |
|        ┌───────────────────────────────┐      |
|        |  Project 1                    |      |
|        |  A simple HTML + CSS site     |      |
|        └───────────────────────────────┘      |
|                                               |
|        ┌───────────────────────────────┐      |
|        |  Project 2                    |      |
|        |  React animations demo        |      |
|        └───────────────────────────────┘      |
|                                               |
|        ┌───────────────────────────────┐      |
|        |  Project 3                    |      |
|        |  Visualization dashboard      |      |
|        └───────────────────────────────┘      |
|                                               |
 -----------------------------------------------
```

---

## 🧱 Dependencies

* `react`
* `react-router-dom`
* `shadcn/ui`
* `tailwindcss`
* `framer-motion` *(optional for subtle animations)*

---

## 🚀 Expected Behavior

* On visiting `nerd.varzone.in`, user sees the list of available sub-projects.
* Clicking a card takes them to `nerd.varzone.in/project-name`.
* Each sub-project runs independently within the main app routing.

---

## ✅ Stretch Goals

* Add smooth transition animations between routes.
* Include project thumbnails or icons on cards.
* Add search/filter for projects.
* Optional dark/light mode toggle.

---

## 🧭 Summary

**NerdHub** serves as a centralized showcase platform for multiple personal mini-projects under one subdomain.
It is built to be modular, dynamic, and easily expandable by simply updating `projects.json`.

---

*End of Specification*

```

---

Would you like me to generate the **starter code** (React + shadcn + routing + dynamic loading logic) that matches this spec next?  
It’ll be a single self-contained `App.tsx` + minimal `projects.json` + `ProjectCard` component setup.
```
