# Grounded Budget

A mobile-first, static budgeting PWA built with plain HTML, CSS, and JavaScript. It can be hosted on GitHub Pages with no build process or backend.

## Features

- Monthly calendar budgets and fixed 14-day periods, anchored by default to **2026-10-21**.
- Income and expense items with name, planned amount, actual amount, date, frequency, and category.
- Frequencies: once, weekly, every two weeks, monthly, and annually.
- Search, filter by type/category, and sort by date, name, planned amount, actual amount, or type.
- Actual amounts against planned items, plus standalone expense/income transactions.
- Locally saved period snapshots that preserve item values and totals as they were when saved.
- Debt tracking and a snowball/avalanche payoff estimate with a 0–100% leftover budget slider.
- JSON backup export/import and PWA offline app-shell caching.

## Publish on GitHub Pages

1. Create a repository, e.g. `grounded-budget`.
2. Upload the **contents** of this folder to the repository root, with `index.html` at the root.
3. Go to **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. Once deployed, open the Pages URL on your phone and use the browser menu's **Install app** or **Add to Home screen** action.

All paths are relative, so the app works at a repository URL such as `https://username.github.io/grounded-budget/`. GitHub Pages provides HTTPS, required for service workers and PWA offline support.

## Local testing

From this directory run:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Opening `index.html` directly with a `file://` URL does not support service workers.

## How periods work

- Bi-weekly periods are inclusive 14-day ranges anchored to the configured date. The default anchor is October 21, 2026.
- Monthly periods are calendar months.
- A budget item's date is its first/next occurrence; its planned amount is per occurrence.
- Weekly items can appear twice in a 14-day period. Monthly occurrences on the 29th–31st are clamped to the last day of shorter months.
- An actual amount entered for a planned item is the total for that item in the selected period. Standalone transactions count as actuals based on their transaction date.
- Saving a snapshot for a period that already has one asks before replacing it. Editing the current budget does not update snapshots.
- Budget data is not synced between devices. Use JSON export/import to transfer or back up data.

## Debt estimate caveat

The debt calculator estimates monthly interest at APR/12, applies minimum payments, then allocates remaining funds by avalanche (highest APR first) or snowball (smallest balance first). It assumes rates and minimums remain constant. Lender calculation rules, fees, and payment timing can differ, so treat this as an estimate rather than a statement.

## Privacy

All data is stored in the browser's `localStorage`. There is no bank connection, account, or application server. Anyone using the same browser profile may be able to access it, and clearing site data can erase it. Export backups regularly and store them somewhere safe.

## License

MIT. See `LICENSE`.
