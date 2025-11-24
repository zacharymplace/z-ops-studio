/**
 * Z$ Ops Studio — Adaptive → Sheets Sync Utility (Demo)
 *
 * Reads an Adaptive export (CSV) from Google Drive, cleans the data,
 * and loads it into a structured sheet called "Adaptive_Sync".
 */

function syncAdaptiveExport() {
  const folder = DriveApp.getFoldersByName("adaptive_exports").next();
  const files = folder.getFiles();
  
  if (!files.hasNext()) {
    throw new Error("No Adaptive export file found in adaptive_exports folder.");
  }
  
  const file = files.next();
  const raw = file.getBlob().getDataAsString();
  
  const rows = Utilities.parseCsv(raw);
  
  // Clean header row
  const headers = rows[0].map(h => h.trim().toLowerCase().replace(/\s+/g, "_"));
  
  // Clean data rows
  const cleaned = rows.slice(1).map(r =>
    r.map(v => typeof v === "string" ? v.trim() : v)
  );
  
  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName("Adaptive_Sync");
  if (!sheet) sheet = ss.insertSheet("Adaptive_Sync");

  sheet.clearContents();
  
  // Write header
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Write data
  if (cleaned.length > 0) {
    sheet.getRange(2, 1, cleaned.length, cleaned[0].length).setValues(cleaned);
  }

  SpreadsheetApp.flush();
  
  Logger.log("Adaptive export synced successfully!");
}
