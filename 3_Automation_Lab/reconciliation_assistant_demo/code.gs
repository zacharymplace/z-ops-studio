/**
 * Z$ Ops Studio — Reconciliation Assistant (Demo)
 * 
 * Compares two Sheets ("Source" and "Target"), identifies mismatches,
 * and outputs exceptions into a new sheet.
 */

function runReconciliation() {
  const ss = SpreadsheetApp.getActive();

  const source = ss.getSheetByName("Source");
  const target = ss.getSheetByName("Target");

  const sourceData = source.getRange(2, 1, source.getLastRow() - 1, source.getLastColumn()).getValues();
  const targetData = target.getRange(2, 1, target.getLastRow() - 1, target.getLastColumn()).getValues();

  // Convert arrays into maps keyed by ID
  const sourceMap = buildMap(sourceData);
  const targetMap = buildMap(targetData);

  const mismatches = [];

  // Check mismatched or missing IDs
  for (const id in sourceMap) {
    if (!targetMap[id]) {
      mismatches.push([id, "Missing in Target", JSON.stringify(sourceMap[id])]);
      continue;
    }

    const s = sourceMap[id];
    const t = targetMap[id];

    if (!recordsMatch(s, t)) {
      mismatches.push([id, "Field mismatch", `Source: ${JSON.stringify(s)} | Target: ${JSON.stringify(t)}`]);
    }
  }

  // Check items in target not found in source
  for (const id in targetMap) {
    if (!sourceMap[id]) {
      mismatches.push([id, "Missing in Source", JSON.stringify(targetMap[id])]);
    }
  }

  writeExceptions(ss, mismatches);
}


function buildMap(data) {
  const map = {};
  data.forEach(row => {
    const id = row[0];
    if (id) map[id] = row;
  });
  return map;
}


function recordsMatch(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}


function writeExceptions(ss, mismatches) {
  let sheet = ss.getSheetByName("Exceptions");
  if (!sheet) sheet = ss.insertSheet("Exceptions");
  sheet.clear();

  sheet.getRange(1, 1, 1, 3).setValues([["ID", "Issue", "Details"]]);

  if (mismatches.length > 0) {
    sheet.getRange(2, 1, mismatches.length, 3).setValues(mismatches);
  }

  SpreadsheetApp.flush();
}
