# ClassFund AI

An evidence-driven classroom funding dashboard powered by PayPal Sandbox data, AI-ready workflows, and AG Studio embedded analytics.

## What the prototype demonstrates

- Classroom funding requests with urgency, accessibility needs, goals, evidence, and milestones.
- PayPal Sandbox-shaped payment records with captured and pending states.
- An AG Studio dashboard in edit mode with three data sources: `classroomRequests`, `paymentRecords`, and `impactMilestones`.
- A judge-friendly impact action center that connects funding gaps to payment and evidence outcomes.

## Run locally

```powershell
npm install
Copy-Item .env.example .env
# Add the AG Studio trial key to .env
npm run dev
```

Open `http://127.0.0.1:5173`.

## AG Studio workflow

1. Open **Build in Studio**.
2. Create a table from `classroomRequests` and group it by `school` or `urgency`.
3. Add a KPI for `fundingGap` from `impactMilestones`.
4. Add a payment-progress widget using `paymentRecords`.
5. Use the Studio AI module as the foundation for an approved agent harness.

## Important

The sample is a prototype. It does not process real payments. The AG Studio trial key is local-only and must never be committed.
