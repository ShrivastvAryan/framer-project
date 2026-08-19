# Skillpath — Framer Junior Developer Assignment

A responsive landing page for **Skillpath**, a fictional learning platform, built in Framer with a React/TypeScript Code Component.

The main focus of the project is the dynamic **Courses** section, which fetches live course and country data from the provided API and handles loading, errors, empty results, currency selection, and responsive layouts.

## Live Demo

**Framer:**
grounded-time-948793.framer.app/
---

## Features

### Dynamic Courses

Courses are fetched from the provided API at runtime rather than being hardcoded.

Each course displays:

* Course name
* Course description
* Main category
* Course type
* Price
* Refundable status when applicable

The grid automatically adapts to the number of courses returned by the API.

### Country-Based Currency

The country endpoint determines which currency is displayed.

* `IN` → Indian Rupees using `pricePaise`
* `US` → US Dollars using `priceUsdCents`

Prices are converted from their API units before being displayed.

For example:

* `199900` paise → `₹1,999`
* `3999` cents → `$39.99`

### Error Handling

The API intentionally fails occasionally, so the component handles failures without breaking the page.

The courses section includes:

* Loading state with skeleton cards
* Course API error state
* Retry button
* Empty state
* Country API failure fallback
* Currency loading state

If country detection fails but courses load successfully, the courses remain visible and USD is used as a fallback with a notice to the user.

### Responsive Layout

The courses grid is responsive:

* **Desktop:** 3 columns
* **Tablet:** 2 columns
* **Mobile:** 1 column

The layout uses CSS Grid and does not assume a fixed number of courses.

### Framer Property Controls

The Code Component exposes two controls in the Framer panel:

* **Accent Color** — controls the visual accent used by the component
* **Card Radius** — controls the course card border radius

This allows basic visual customization without modifying the code.

---

## Tech Stack

* React
* TypeScript
* Framer Code Components
* CSS Grid
* Browser Fetch API
* `Intl.NumberFormat`

No authentication or non-GET API requests are used.

---

## API Endpoints

### Courses

`GET /assignment/course-data`

Returns the available courses.

### Country

`GET /assignment/country-code`

Returns either:

```text
IN
```

or:

```text
US
```

The response determines which price field is used.

---

## Project Structure

```text
skillpath-framer-assignment/
├── CoursesGrid.tsx
└── README.md
```

`CoursesGrid.tsx` contains the complete courses Code Component, including API requests, state management, UI states, responsive styling, and Framer property controls.

---

## Design Approach

I kept the course section intentionally simple and focused on clarity.

The priority was to make the component resilient to the unreliable API rather than assuming that requests would always succeed. The course data and country data are treated as independent requests, so a failure in country detection does not unnecessarily remove successfully loaded courses.

The UI also avoids depending on a specific number of courses, since the API can return different counts between requests.

---

## AI Usage

AI was used during development as a coding assistant, primarily for structuring the initial implementation and reviewing possible approaches.

I reviewed and modified the generated code myself, particularly around API error handling, currency fallback behavior, responsive layout, loading/empty states, and Framer property controls.

I can explain the implementation and the reasoning behind the decisions made in the submitted code.

**AI tool used:** Claude Code, Framer inbuilt Agent

**Shared AI conversation:**
https://claude.ai/share/a9ea5681-e9dd-4371-8cb4-4b354c7ad5f9

---

## Future Improvements

With more time, I would improve:

* Search and filtering
* Price sorting
* More polished loading animations
* Better accessibility and keyboard interaction
* More detailed course metadata
* Better state management using modern libraries such as tanstack.
* Would have wrote code in more components so that debugging would be much easier.
* Introducing Caching so that the site will become for efficient.

The current implementation prioritizes the core requirements and reliable handling of the intentionally flaky API.
