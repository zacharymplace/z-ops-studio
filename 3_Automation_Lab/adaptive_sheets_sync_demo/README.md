# Adaptive → Sheets Sync Utility — Demo

This automation demonstrates how to pull exported Workday Adaptive Planning data into a structured Google Sheet. It normalizes the format, cleans headers, and prepares the data for reporting, forecasting, and downstream automations.

## 🎯 What This Demo Shows
- Automated import of Adaptive export files  
- Header cleaning and normalization  
- Structured data placement in Google Sheets  
- Removes manual copy/paste workflows  
- Sets the foundation for future FP&A automations

## 📂 Files Included
- `code.gs` — Google Apps Script that reads an uploaded export file  
- `sample_output.md` — Example of clean normalized data  
- `README.md` — Documentation for the demo

## 🧰 Requirements
- Google Sheet named **Adaptive_Sync**
- Adaptive export uploaded to **/adaptive_exports** folder in Drive
- Export must be a CSV or TSV file
- Columns expected: Version, Time, Account, Department, Amount (demo schema)

## 🚀 Use Case
FP&A teams often export Adaptive data manually, paste it into Excel or Sheets, and attempt to reformat it by hand.  
This demo shows how a simple automation can eliminate that entire workflow and create a consistent, trustworthy data source.
