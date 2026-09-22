# Zentry

A responsive workplace operations demo for HR, payroll, time off, employee records, and room bookings.

> Local mock application. No backend, database, or production authentication.

## Stack

| Technology | Purpose |
| --- | --- |
| React 19 | User interface |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| React Router | Client-side routing |
| CSS | Responsive styling and themes |

## Quick start

```bash
npm install
npm run dev
```

Vite normally serves the app at `http://localhost:5173`.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build |

## Demo accounts

Both accounts use the password `zentry`.

| Portal | Email |
| --- | --- |
| HR | `maria.santos@zentry.com` |
| Guest | `yuki.tanaka@zentry.com` |

## Features

| Area | Capabilities |
| --- | --- |
| HR Overview | Headcount, payroll totals, leave, and room activity |
| People | Searchable employee directory |
| Time Off | Submit, approve, decline, timestamp, and record reasons |
| Payroll | Gross pay, deductions, net pay, and processing status |
| Calendar | Week, month, and year booking views |
| Bookings | Room requests, schedules, hosts, and status |
| Guest Portal | Book rooms, view payslips, browse people, and request leave |
| Notifications | Received requests and approval or decline updates |

## Status system

| Status | Color | Presentation |
| --- | --- | --- |
| Approved | Green | Italic decision timestamp |
| Declined | Red | Italic decision timestamp and reason |
| Pending | Amber | Compact bordered badge |

The interface supports light and dark themes and adapts to desktop, tablet, and mobile screens.

## Structure

| Path | Responsibility |
| --- | --- |
| `src/assets` | Images and brand assets |
| `src/components` | Shared layout and UI components |
| `src/context` | Application state providers |
| `src/hooks` | Shared React hooks |
| `src/services` | Formatting and scheduling utilities |
| `src/types` | TypeScript models |
| `src/data` | Mock application data |
| `src/features/guest` | Guest pages and panels |
| `src/features/hr` | HR pages and panels |
| `src/routes.tsx` | Application routes and access control |

## Workflow

Development work is kept on `develop`. The `main` branch remains empty until the first release.
