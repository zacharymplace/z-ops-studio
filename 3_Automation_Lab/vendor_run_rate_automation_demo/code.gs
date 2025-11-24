/**
 * Z$ Ops Studio — Vendor Run-Rate Automation (Demo)
 *
 * Calculates average vendor spend, applies driver adjustments,
 * and outputs a forecast-ready table.
 */

function generateVendorRunRateForecast() {
  const ss = SpreadsheetApp.getActive();

  const apSheet = ss.getSheetByName("AP_Data");
  const driverSheet = ss.getSheetByName("Drivers");
  const outputSheet = ss.getSheetByName("Vendor_Forecast") || ss.insertSheet("Vendor_Forecast");

  // Pull AP data
  const apData = apSheet.getRange(2, 1, apSheet.getLastRow() - 1, 3).getValues();
  // Format: [Vendor, Month, Amount]

  // Pull drivers
  const drivers = driverSheet.getRange(2, 1, driverSheet.getLastRow() - 1, 4).getValues();
  // Format: [Vendor, Inflation%, Volume%, OccurrenceFloor%]

  const driverMap = {};
  drivers.forEach(row => {
    const vendor = row[0];
    driverMap[vendor] = {
      inflation: row[1],
      volume: row[2],
      occurrence: row[3]
    };
  });

  // Aggregate AP data
  const vendorTotals = {};
  apData.forEach(row => {
    const vendor = row[0];
    const amount = row[2];

    if (!vendorTotals[vendor]) vendorTotals[vendor] = [];
    vendorTotals[vendor].push(amount);
  });

  const forecastRows = [];

  for (const vendor in vendorTotals) {
    const amounts = vendorTotals[vendor];
    const average = amounts.reduce((a, b) => a + b, 0) / amounts.length;

    const d = driverMap[vendor] || { inflation: 0, volume: 0, occurrence: 1 };

    const inflated = average * (1 + d.inflation);
    const volumized = inflated * (1 + d.volume);
    const occurrenceAdjusted = volumized * d.occurrence;

    forecastRows.push([
      vendor,
      average,
      d.inflation,
      d.volume,
      d.occurrence,
      occurrenceAdjusted
    ]);
  }

  // Write output
  outputSheet.clear();
  outputSheet.getRange(1, 1, 1, 6).setValues([[
    "Vendor", "Avg Run Rate", "Inflation%", "Volume%", "Occurrence Floor", "Forecast Amount"
  ]]);

  if (forecastRows.length > 0) {
    outputSheet.getRange(2, 1, forecastRows.length, 6).setValues(forecastRows);
  }

  SpreadsheetApp.flush();
}
