/**
 * Z$ Ops Studio — Close Task Tracker & SLA Monitor (Demo)
 *
 * Scans all close tasks, checks due dates vs. today,
 * updates SLA status, and flags overdue items.
 */

function checkCloseTasks() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName("Close_Tasks");

  const lastRow = sheet.getLastRow();
  const data = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  // Format: [Task, Owner, Due Date, Status, Notes]

  const today = new Date();
  const results = [];

  data.forEach((row, i) => {
    const task = row[0];
    const owner = row[1];
    const due = new Date(row[2]);
    const status = row[3] || "Not Started";

    let sla = "On Track";

    if (status === "Completed") {
      sla = "Completed";
    } else if (today > due) {
      sla = "Overdue";
    } else {
      const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 1) sla = "At Risk";
    }

    results.push([task, owner, due, status, sla, row[4]]);
  });

  // Write back results with SLA column
  sheet.getRange(1, 1, 1, 6).setValues([["Task", "Owner", "Due Date", "Status", "SLA", "Notes"]]);
  sheet.getRange(2, 1, results.length, 6).setValues(results);

  SpreadsheetApp.flush();
}

/**
 * Optional: Send email reminders to owners for overdue tasks.
 */
function sendOverdueReminders() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName("Close_Tasks");

  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
  // Format: [Task, Owner, Due Date, Status, SLA, Notes]

  data.forEach(row => {
    const sla = row[4];
    const email = row[1];

    if (sla === "Overdue" && email.includes("@")) {
      const msg = `
Your close task "${row[0]}" is overdue.

Due Date: ${row[2]}
Status: ${row[3]}

Please update the Close Tracker.

– Z$ Ops Studio Automation Lab Demo
      `;
      MailApp.sendEmail(email, "Overdue Close Task", msg);
    }
  });
}
