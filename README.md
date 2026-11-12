# Career Progression Simulator (v1.0.0)
### Interactive Business Simulation Platform for Management Leadership

**Career Progression Simulator** is a game-like business management simulation platform where B-School, management, and commerce students develop and demonstrate practical executive skills by operating virtual enterprises, making management decisions, and experiencing their real-time operational and financial consequences.

---

## 🌟 Product Philosophy
> **"Observe a business, understand its situation, make management decisions, watch the business respond, adapt your strategy, and achieve measurable business outcomes."**

Students do not answer multiple-choice exam questions. Instead, they inherit a running production facility, monitor live factory telemetry, calibrate machine lines, balance raw materials, evaluate capital expenditure investments, negotiate customer contract deadlines, and navigate dynamic market events.

---

## 🏭 Core Scenario: Apex Beverages (Operations Manager)
- **Role:** Operations Manager
- **Domain:** Manufacturing
- **Duration:** 7 Virtual Days (168 Discrete Hourly Ticks)
- **Starting Treasury:** $100,000 Cash
- **Initial Equipment:** 1 Bottling Line (Apex Line 01) delivering 800 bottles/day
- **Initial Inventory:** 6,000 units raw preform/syrup ($2.00/unit cost)
- **Anchor Contract:** Global Supermarkets (5,000 bottles @ $12/bottle, Due Day 5)
- **Scheduled Event:** Day 3, 09:00 - Spot surge demand from Metro Retailers (3,200 bottles @ $16/bottle, Delivery period 4 days / Day 7)
- **CapEx Opportunities:** Deploy up to 5 bottling lines ($20,000 each, +200 bottles/day throughput)
- **Solvency Rule:** Negative treasury below -$10,000 triggers immediate plant liquidation and bankruptcy failure.

---

## 🛠️ Technology Stack
- **Frontend Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling & Design System:** Tailwind CSS + Lucide React (Dark Industrial Theme: `#0B0F14`, `#151B23`, `#1D2632`, `#38BDF8`)
- **Animations:** Framer Motion (Conveyor belt bottle flow, mechanical rotary gears, real-time liquid vats)
- **State Management:** Zustand + Reactive Simulation Loop
- **Simulation Engine:** Deterministic, standalone TypeScript library independent from UI/DOM
- **Validation:** Zod Schema Validation
- **Charts & Telemetry:** Recharts (Interactive Sparklines, Cash Flow Trends, Profit Margins)
- **Testing:** Vitest (18 automated tests covering engine ticks, commands, determinism, scenario validation, and full playthrough)

---

## 🏗️ Architectural Layering
Strict separation of concerns is maintained between business logic and presentation:
```
src/
├── app/                              # Next.js App Router Pages
│   ├── page.tsx                      # Landing Page
│   ├── dashboard/page.tsx            # Student Dashboard
│   ├── scenarios/page.tsx            # Simulation Catalog
│   ├── scenarios/apex-beverages/     # Scenario Briefing & Context
│   ├── simulation/apex-beverages/    # Immersive Factory Game Environment
│   ├── simulation/results/           # Post-Run Executive Scorecard
│   ├── leaderboard/                  # Cohort Ranking & Benchmarks
│   ├── history/                      # Audit Trail of Prior Runs
│   └── profile/                      # Competency Matrix
├── engine/                           # Authoritative Simulation Engine
│   ├── clock/                        # Discrete simulation clock & hour/day converter
│   ├── state/                        # Authoritative state models
│   ├── commands/                     # CommandProcessor & validation rules
│   ├── events/                       # EventScheduler & domain events
│   ├── production/                   # MachineManager & ProductionEngine
│   ├── inventory/                    # InventoryManager (raw materials, finished goods)
│   ├── orders/                       # OrderManager (EDD dispatch, deadlines, revenues)
│   ├── finance/                      # FinanceManager (CapEx, OpEx, P&L, balance sheet)
│   ├── assessment/                   # Performance assessment & grading
│   └── engine.ts                     # Main SimulationEngine facade
├── scenarios/                        # Declarative Scenario Configurations
│   ├── definitions/                  # Apex Beverages scenario specification
│   └── registry.ts                   # Catalog registry across 9 domains
├── world/                            # Factory World Visualization
│   └── manufacturing/                # Living SVG & DOM manufacturing plant
├── components/                       # UI Components
│   ├── controls/                     # SimulationControlBar & ManagementControlsPanel
│   ├── metrics/                      # BusinessIntelligencePanel with Recharts
│   ├── inspection/                   # MachineInspectionModal
│   └── shared/                       # AppNavbar, ToastAlert
└── types/                            # Typed Domain Interfaces
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- pnpm (or npm / yarn)

### 2. Installation
```bash
# Clone the repository
git clone <repository_url>
cd merfy

# Install dependencies
pnpm install
```

### 3. Running Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Running the Automated Test Suite
```bash
pnpm test
```
Runs all 18 Vitest tests across engine rules, command validation, determinism, scenario validation, and end-to-end integration playthrough.

### 5. Building for Production
```bash
pnpm build
pnpm start
```

---

## 🎮 Strategic Game Loop
1. **Launch Scenario:** Open `/scenarios/apex-beverages` and examine baseline parameters.
2. **Accept Anchor Contract:** Enter the factory at `/simulation/apex-beverages`, view ORDER-001 from Global Supermarkets, and accept the contract.
3. **Expand Capacity:** Evaluate whether to invest $20,000 for Line 02 to raise production from 800 to 1,000 bottles/day.
4. **Monitor Supply Buffer:** Ensure raw materials do not drop below the safety buffer (reorder batches of 2,000 or 4,000 units).
5. **Day 3 Demand Surge:** On Day 3 at 09:00, Metro Retailers arrives with a spot contract for 3,200 bottles @ $16/bottle. Decide whether to accept and buy Line 03.
6. **Clock Speeds:** Toggle simulation speeds between 1x, 2x, and 5x, or pause at critical junctures.
7. **Performance Results:** Upon Day 7 completion, review your letter grade (A+ through F), net profit, capital efficiency, and provisional assessment rubric.
