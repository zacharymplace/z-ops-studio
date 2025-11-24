/**
 * Z$ Ops Studio — Daily Cash Position Automation (Lite Demo)
 * 
 * Pulls daily bank balances from a Google Sheet,
 * calculates variances, and generates a summary blurb.
 */

function generateDailyCashBlurb() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName("Daily Cash");
  
  // Assume last row contains the latest data
  const lastRow = sheet.getLastRow();
  const data = sheet.getRange(lastRow, 1, 1, 5).getValues()[0];
  
  const date = data[0];
  const bank = data[1];
  const opening = data[2];
  const ending = data[3];
  const variance = ending - opening;
  
  const blurb = `
Daily Cash Position — ${date}

Bank: ${bank}
Opening Balance: $${opening.toLocaleString()}
Ending Balance: $${ending.toLocaleString()}
Variance: $${variance.toLocaleString()}

Summary:
The daily cash position changed by $${variance.toLocaleString()}, driven by inflows/outflows across operating accounts.

Z$ Ops Studio — Automation Lab Demo
  `;
  
  Logger.log(blurb);
  return blurb;
}
