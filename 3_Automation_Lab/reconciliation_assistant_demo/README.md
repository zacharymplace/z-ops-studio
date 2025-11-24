# Reconciliation Assistant — Automation Demo

This automation compares two Google Sheets datasets, identifies mismatches, and outputs a clean exception report. It eliminates the manual scanning finance teams do during reconciliations.

## 🎯 What This Demo Shows
- Cross-sheet comparison  
- Automated mismatch detection  
- Clean exception output for review  
- Reusable logic for AP, Treasury, Accounting, FP&A  
- Zero manual scanning

## 🧰 Requirements
Sheets with identical column structures in:
- **Sheet A** — "Source"  
- **Sheet B** — "Target"

Columns assumed:
- ID  
- Date  
- Account  
- Amount  
- Description  

(These can be customized.)

## 📂 Files Included
- `code.gs` — The reconciliation logic  
- `sample_output.md` — Example mismatch report  
- `README.md` — Workflow explanation
