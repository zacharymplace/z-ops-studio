# Vendor Run-Rate Automation — Demo

This automation calculates vendor run-rates based on historical spend, applies inflation %, volume %, and occurrence floor adjustments, and outputs a clean forecast table for the finance team.

## 🎯 What This Demo Shows
- Automated vendor run-rate logic  
- Handling driver-based forecasting (inflation, volume, occurrence floor)  
- Clean transformation from raw AP data → forecast model  
- Practical automation aligned with real treasury & FP&A workflows  

## 🧰 Requirements
A Google Sheet with:
- **AP Data Sheet** (past 6–12 months of vendor spend)
- **Drivers Sheet** (inflate %, volume %, occurrence floor)
- **Output Sheet** (“Vendor Forecast”)

## 📂 Files Included
- `code.gs` — main automation logic  
- `sample_output.md` — example calculated forecast  
- `README.md` — workflow explanation

## 🚀 Use Case
Forecasting outflows for vendors based on historical run-rate is a common finance workflow that is usually manual and error-prone.  
This demo shows how to automate the entire calculation process in seconds.
