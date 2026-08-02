import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = "C:/Users/haris/Documents/github/etsy-shop/H4HappyLiving";
const productRoot = `${root}/products/mortgage-payoff-scenario-planner`;
const outputRoot = `${root}/outputs/019fb600-f44c-7903-ac98-fc26e08d05c2`;
const previewRoot = `${outputRoot}/previews`;
const listingImages = `${productRoot}/etsy-shop/listing-images`;
const outputXlsx = `${outputRoot}/H4HappyLiving_Mortgage_Payoff_Scenario_Planner.xlsx`;
const deliverableXlsx = `${productRoot}/deliverables/H4HappyLiving_Mortgage_Payoff_Scenario_Planner.xlsx`;

await fs.mkdir(previewRoot, { recursive: true });
await fs.mkdir(listingImages, { recursive: true });
await fs.mkdir(path.dirname(deliverableXlsx), { recursive: true });

const C = {
  evergreen: "#285247",
  ink: "#24332F",
  cream: "#FFF9F1",
  sage: "#B8D2C5",
  gold: "#F2B84B",
  sky: "#77AFC2",
  coral: "#E77B68",
  leaf: "#7FAE74",
  white: "#FFFFFF",
  line: "#D7E2DC",
  input: "#EAF4FF",
  inputText: "#1F4E79",
  formulaText: "#000000",
  linkText: "#008000",
  warning: "#FFF1DE",
  error: "#FCE8E6",
};

const wb = Workbook.create();
const start = wb.worksheets.add("Start Here");
const inputs = wb.worksheets.add("Your Mortgage");
const dash = wb.worksheets.add("Dashboard");
const amort = wb.worksheets.add("Amortization");
const log = wb.worksheets.add("Payment Log");
const checks = wb.worksheets.add("Checks");

function baseSheet(sheet) {
  sheet.showGridLines = false;
  sheet.getRange("A1:Z600").format.font = { name: "Arial", color: C.ink, size: 10 };
}

function title(sheet, range, text, subtitle) {
  sheet.mergeCells(range);
  sheet.getRange(range.split(":")[0]).values = [[text]];
  sheet.getRange(range).format = {
    fill: C.evergreen,
    font: { name: "Arial", size: 22, bold: true, color: C.white },
    verticalAlignment: "center",
    horizontalAlignment: "left",
  };
  const startCell = range.split(":")[0];
  const row = Number(startCell.match(/\d+/)[0]);
  const endCol = range.split(":")[1].match(/[A-Z]+/)[0];
  sheet.mergeCells(`A${row + 2}:${endCol}${row + 2}`);
  sheet.getRange(`A${row + 2}`).values = [[subtitle]];
  sheet.getRange(`A${row + 2}:${endCol}${row + 2}`).format = {
    fill: C.cream,
    font: { name: "Arial", size: 11, color: C.ink, italic: true },
    verticalAlignment: "center",
  };
}

function sectionHeader(sheet, range, text, fill = C.sage) {
  sheet.mergeCells(range);
  const cell = range.split(":")[0];
  sheet.getRange(cell).values = [[text]];
  sheet.getRange(range).format = {
    fill,
    font: { name: "Arial", size: 12, bold: true, color: C.ink },
    verticalAlignment: "center",
  };
}

function setColumnWidths(sheet, widths) {
  for (const [col, width] of Object.entries(widths)) {
    sheet.getRange(`${col}:${col}`).format.columnWidth = width;
  }
}

for (const sheet of [start, inputs, dash, amort, log, checks]) baseSheet(sheet);

// Start Here
title(
  start,
  "A1:J2",
  "Your mortgage, made clearer",
  "Compare extra-payment choices with a calm, transparent fixed-rate payoff model."
);
setColumnWidths(start, { A: 4, B: 7, C: 20, D: 18, E: 18, F: 5, G: 18, H: 18, I: 18, J: 4 });
start.getRange("1:1").format.rowHeight = 30;
start.getRange("2:2").format.rowHeight = 30;
start.getRange("4:4").format.rowHeight = 24;
sectionHeader(start, "B5:E5", "Quick start");
const steps = [
  ["1", "Enter your loan", "Open Your Mortgage and replace the blue input cells with the details from your latest statement."],
  ["2", "Name two strategies", "Try a realistic monthly extra and an alternative. Add a one-time payment only if you expect one."],
  ["3", "Compare the result", "Open Dashboard to review projected payoff dates, months saved, and estimated interest differences."],
  ["4", "Confirm the model", "Open Checks. READY means the workbook reconciles for the values entered; it is not lender approval."],
];
start.getRange("B7:D10").values = steps;
for (let r = 7; r <= 10; r++) start.mergeCells(`D${r}:E${r}`);
start.getRange("B7:B10").format = {
  fill: C.gold,
  font: { bold: true, color: C.ink, size: 14 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
start.getRange("C7:C10").format.font = { bold: true, color: C.evergreen };
start.getRange("D7:D10").format.wrapText = true;
start.getRange("B7:D10").format.borders = { preset: "all", style: "thin", color: C.line };
start.getRange("7:10").format.rowHeight = 60;

sectionHeader(start, "G5:I5", "Workbook map");
start.getRange("G7:I12").values = [
  ["Sheet", "Use it for", "Edit?"],
  ["Your Mortgage", "Loan and strategy inputs", "Blue cells"],
  ["Dashboard", "Decision summary and chart", "No"],
  ["Amortization", "Detailed three-scenario schedules", "No"],
  ["Payment Log", "Record actual payments", "Blue cells"],
  ["Checks", "Input and formula status", "No"],
];
start.getRange("G7:I7").format = { fill: C.evergreen, font: { bold: true, color: C.white } };
start.getRange("G8:I12").format.borders = { preset: "all", style: "thin", color: C.line };
start.getRange("I8:I12").format.horizontalAlignment = "center";

sectionHeader(start, "B14:I14", "Read before using");
start.mergeCells("B16:I18");
start.getRange("B16").values = [[
  "For personal planning only. This workbook estimates a standard U.S. fixed-rate mortgage with monthly payments and interest compounded monthly. It excludes taxes, insurance, escrow, fees, refinancing, balloon structures, variable rates, lender-specific posting rules, and prepayment restrictions. Confirm important decisions with your lender or a qualified professional."
]];
start.getRange("B16:I18").format = {
  fill: C.warning,
  font: { color: C.ink, size: 10 },
  wrapText: true,
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: C.gold },
};
start.mergeCells("B20:I21");
start.getRange("B20").formulas = [[`="MODEL STATUS: "&Checks!B20`]];
start.getRange("B20:I21").format = {
  fill: C.sage,
  font: { bold: true, color: C.evergreen, size: 15 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "outside", style: "medium", color: C.evergreen },
};
start.getRange("B23:I23").values = [["Color key", "Blue text = customer input", "Black = formula", "Green = linked result", "", "", "", ""]];
start.getRange("B23").format.font = { bold: true };
start.getRange("C23").format.font = { color: C.inputText, bold: true };
start.getRange("D23").format.font = { color: C.formulaText, bold: true };
start.getRange("E23").format.font = { color: C.linkText, bold: true };
start.freezePanes.freezeRows(4);

// Inputs
title(inputs, "A1:I2", "Your mortgage", "Replace only the blue cells. All dollar amounts are in USD.");
setColumnWidths(inputs, { A: 4, B: 29, C: 18, D: 4, E: 23, F: 18, G: 4, H: 23, I: 18 });
sectionHeader(inputs, "B5:C5", "Loan setup");
inputs.getRange("B6:C12").values = [
  ["Current principal balance", 325000],
  ["Annual interest rate", 0.065],
  ["Remaining term (years)", 30],
  ["First payment date", 46235],
  ["", ""],
  ["Calculated minimum payment", ""],
  ["Maximum schedule months", 480],
];
inputs.getRange("C11").formulas = [[`=IF(OR(C6<=0,C8<=0),"",IF(C7=0,C6/(C8*12),C6*(C7/12)/(1-(1+C7/12)^(-C8*12))))`]];
inputs.getRange("B6:B12").format.font = { bold: true, color: C.ink };
inputs.getRange("C6:C9").format = { fill: C.input, font: { color: C.inputText, bold: true } };
inputs.getRange("C11:C12").format = { fill: C.cream, font: { color: C.formulaText, bold: true } };
inputs.getRange("B6:C12").format.borders = { preset: "all", style: "thin", color: C.line };
inputs.getRange("C6").format.numberFormat = "$#,##0.00";
inputs.getRange("C7").format.numberFormat = "0.000%";
inputs.getRange("C8").format.numberFormat = "0";
inputs.getRange("C9").format.numberFormat = "mmm d, yyyy";
inputs.getRange("C11").format.numberFormat = "$#,##0.00";
inputs.getRange("C12").format.numberFormat = "0";

sectionHeader(inputs, "E5:F5", "Strategy A · steady + lump sum", C.gold);
inputs.getRange("E6:F10").values = [
  ["Monthly extra payment", 250],
  ["One-time extra payment", 5000],
  ["Apply lump sum at payment #", 12],
  ["Strategy name", "Steady + lump sum"],
  ["INPUT cells", "Blue text"],
];
sectionHeader(inputs, "H5:I5", "Strategy B · accelerated monthly", C.sky);
inputs.getRange("H6:I10").values = [
  ["Monthly extra payment", 500],
  ["One-time extra payment", 0],
  ["Apply lump sum at payment #", 12],
  ["Strategy name", "Accelerated monthly"],
  ["INPUT cells", "Blue text"],
];
for (const range of ["F6:F9", "I6:I9"]) {
  inputs.getRange(range).format = { fill: C.input, font: { color: C.inputText, bold: true } };
}
inputs.getRange("E6:F10").format.borders = { preset: "all", style: "thin", color: C.line };
inputs.getRange("H6:I10").format.borders = { preset: "all", style: "thin", color: C.line };
inputs.getRange("F6:F7").format.numberFormat = "$#,##0.00";
inputs.getRange("I6:I7").format.numberFormat = "$#,##0.00";
inputs.getRange("F8").format.numberFormat = "0";
inputs.getRange("I8").format.numberFormat = "0";

sectionHeader(inputs, "B15:I15", "What each strategy means");
inputs.getRange("B17:I20").values = [
  ["Baseline", "Required payment only; no extra principal.", "", "", "", "", "", ""],
  ["Strategy A", "Uses the monthly and one-time extras entered above.", "", "", "", "", "", ""],
  ["Strategy B", "Tests a different monthly and one-time extra combination.", "", "", "", "", "", ""],
  ["Tip", "Start with an amount you could sustain, then compare a more ambitious option.", "", "", "", "", "", ""],
];
for (let r = 17; r <= 20; r++) {
  inputs.mergeCells(`C${r}:I${r}`);
}
inputs.getRange("B17:B20").format.font = { bold: true, color: C.evergreen };
inputs.getRange("B17:I20").format.borders = { preset: "all", style: "thin", color: C.line };
inputs.getRange("C17:I20").format.wrapText = true;
inputs.getRange("17:20").format.rowHeight = 30;

inputs.getRange("C6").dataValidation = { rule: { type: "decimal", operator: "greaterThan", formula1: 0 } };
inputs.getRange("C7").dataValidation = { rule: { type: "decimal", operator: "between", formula1: 0, formula2: 0.25 } };
inputs.getRange("C8").dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 40 } };
for (const cell of ["F6", "F7", "I6", "I7"]) {
  inputs.getRange(cell).dataValidation = { rule: { type: "decimal", operator: "greaterThanOrEqual", formula1: 0 } };
}
for (const cell of ["F8", "I8"]) {
  inputs.getRange(cell).dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 480 } };
}
inputs.freezePanes.freezeRows(4);

// Amortization schedule
title(amort, "A1:X2", "Amortization engine", "Formula sheet · baseline plus two extra-payment strategies · do not edit.");
const amortHeaders = [
  "Payment #", "Payment date",
  "Begin balance", "Interest", "Scheduled", "Total paid", "Principal", "End balance",
  "Begin balance", "Interest", "Scheduled", "Monthly extra", "One-time extra", "Total paid", "Principal", "End balance",
  "Begin balance", "Interest", "Scheduled", "Monthly extra", "One-time extra", "Total paid", "Principal", "End balance",
];
amort.getRange("A4:X4").values = [[
  "Timing", "", "Baseline", "", "", "", "", "",
  "Strategy A", "", "", "", "", "", "", "",
  "Strategy B", "", "", "", "", "", "", "",
]];
amort.mergeCells("A4:B4");
amort.mergeCells("C4:H4");
amort.mergeCells("I4:P4");
amort.mergeCells("Q4:X4");
amort.getRange("A4:X4").format = {
  fill: C.sage,
  font: { bold: true, color: C.ink, size: 11 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
amort.getRange("A5:X5").values = [amortHeaders];
amort.getRange("A5:X5").format = {
  fill: C.evergreen,
  font: { bold: true, color: C.white, size: 9 },
  wrapText: true,
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "all", style: "thin", color: C.line },
};
setColumnWidths(amort, {
  A: 10, B: 14, C: 15, D: 12, E: 13, F: 13, G: 13, H: 15,
  I: 15, J: 12, K: 13, L: 13, M: 13, N: 13, O: 13, P: 15,
  Q: 15, R: 12, S: 13, T: 13, U: 13, V: 13, W: 13, X: 15,
});
amort.getRange("A6:X485").format.borders = { preset: "all", style: "thin", color: "#E7ECE9" };
amort.getRange("A6:B485").format.fill = C.cream;
amort.getRange("I6:P485").format.fill = "#FFFCF2";
amort.getRange("Q6:X485").format.fill = "#F5FAFC";
amort.getRange("A6").values = [[1]];
amort.getRange("A7").formulas = [["=A6+1"]];
amort.getRange("A7:A485").fillDown();
amort.getRange("B6").formulas = [[`='Your Mortgage'!$C$9`]];
amort.getRange("B7").formulas = [["=EDATE(B6,1)"]];
amort.getRange("B7:B485").fillDown();

// Baseline formulas.
amort.getRange("C6:H6").formulas = [[
  `='Your Mortgage'!$C$6`,
  `=IF(C6>0,C6*'Your Mortgage'!$C$7/12,0)`,
  `=IF(C6>0,MIN('Your Mortgage'!$C$11,C6+D6),0)`,
  "=E6",
  "=MAX(0,F6-D6)",
  "=MAX(0,C6-G6)",
]];
amort.getRange("C7:H7").formulas = [[
  "=H6",
  `=IF(C7>0,C7*'Your Mortgage'!$C$7/12,0)`,
  `=IF(C7>0,MIN('Your Mortgage'!$C$11,C7+D7),0)`,
  "=E7",
  "=MAX(0,F7-D7)",
  "=MAX(0,C7-G7)",
]];
amort.getRange("C7:H485").fillDown();

// Strategy A formulas.
amort.getRange("I6:P6").formulas = [[
  `='Your Mortgage'!$C$6`,
  `=IF(I6>0,I6*'Your Mortgage'!$C$7/12,0)`,
  `=IF(I6>0,MIN('Your Mortgage'!$C$11,I6+J6),0)`,
  `=IF(I6>0,MIN('Your Mortgage'!$F$6,MAX(0,I6+J6-K6)),0)`,
  `=IF(AND(A6='Your Mortgage'!$F$8,I6>0),MIN('Your Mortgage'!$F$7,MAX(0,I6+J6-K6-L6)),0)`,
  "=K6+L6+M6",
  "=MAX(0,N6-J6)",
  "=MAX(0,I6-O6)",
]];
amort.getRange("I7:P7").formulas = [[
  "=P6",
  `=IF(I7>0,I7*'Your Mortgage'!$C$7/12,0)`,
  `=IF(I7>0,MIN('Your Mortgage'!$C$11,I7+J7),0)`,
  `=IF(I7>0,MIN('Your Mortgage'!$F$6,MAX(0,I7+J7-K7)),0)`,
  `=IF(AND(A7='Your Mortgage'!$F$8,I7>0),MIN('Your Mortgage'!$F$7,MAX(0,I7+J7-K7-L7)),0)`,
  "=K7+L7+M7",
  "=MAX(0,N7-J7)",
  "=MAX(0,I7-O7)",
]];
amort.getRange("I7:P485").fillDown();

// Strategy B formulas.
amort.getRange("Q6:X6").formulas = [[
  `='Your Mortgage'!$C$6`,
  `=IF(Q6>0,Q6*'Your Mortgage'!$C$7/12,0)`,
  `=IF(Q6>0,MIN('Your Mortgage'!$C$11,Q6+R6),0)`,
  `=IF(Q6>0,MIN('Your Mortgage'!$I$6,MAX(0,Q6+R6-S6)),0)`,
  `=IF(AND(A6='Your Mortgage'!$I$8,Q6>0),MIN('Your Mortgage'!$I$7,MAX(0,Q6+R6-S6-T6)),0)`,
  "=S6+T6+U6",
  "=MAX(0,V6-R6)",
  "=MAX(0,Q6-W6)",
]];
amort.getRange("Q7:X7").formulas = [[
  "=X6",
  `=IF(Q7>0,Q7*'Your Mortgage'!$C$7/12,0)`,
  `=IF(Q7>0,MIN('Your Mortgage'!$C$11,Q7+R7),0)`,
  `=IF(Q7>0,MIN('Your Mortgage'!$I$6,MAX(0,Q7+R7-S7)),0)`,
  `=IF(AND(A7='Your Mortgage'!$I$8,Q7>0),MIN('Your Mortgage'!$I$7,MAX(0,Q7+R7-S7-T7)),0)`,
  "=S7+T7+U7",
  "=MAX(0,V7-R7)",
  "=MAX(0,Q7-W7)",
]];
amort.getRange("Q7:X485").fillDown();
amort.getRange("B6:B485").format.numberFormat = "mmm yyyy";
for (const range of ["C6:H485", "I6:P485", "Q6:X485"]) {
  amort.getRange(range).format.numberFormat = "$#,##0.00";
}
amort.freezePanes.freezeRows(5);
amort.freezePanes.freezeColumns(2);

// Dashboard
title(dash, "A1:N2", "Mortgage payoff dashboard", "A decision view—not a promise. Results update when Your Mortgage inputs change.");
setColumnWidths(dash, {
  A: 14, B: 14, C: 14, D: 14, E: 13, F: 14, G: 14, H: 14, I: 14,
  J: 10, K: 14, L: 14, M: 14, N: 14,
});
sectionHeader(dash, "A5:D5", "Baseline");
sectionHeader(dash, "F5:I5", "Strategy A", C.gold);
sectionHeader(dash, "K5:N5", "Strategy B", C.sky);
for (const range of ["A6:D11", "F6:I11", "K6:N11"]) {
  dash.getRange(range).format.borders = { preset: "outside", style: "medium", color: C.line };
}
dash.getRange("A6:B11").values = [
  ["Minimum payment", ""],
  ["Payoff date", ""],
  ["Payments", ""],
  ["Total interest", ""],
  ["Months saved", ""],
  ["Interest saved", ""],
];
dash.getRange("F6:G11").values = [
  ["Monthly extra", ""],
  ["Payoff date", ""],
  ["Payments", ""],
  ["Total interest", ""],
  ["Months saved", ""],
  ["Interest saved", ""],
];
dash.getRange("K6:L11").values = [
  ["Monthly extra", ""],
  ["Payoff date", ""],
  ["Payments", ""],
  ["Total interest", ""],
  ["Months saved", ""],
  ["Interest saved", ""],
];
dash.getRange("C6:C11").formulas = [[
  `='Your Mortgage'!$C$11`,
], [
  `=EDATE('Your Mortgage'!$C$9,COUNTIF(Amortization!$C$6:$C$485,">0")-1)`,
], [
  `=COUNTIF(Amortization!$C$6:$C$485,">0")`,
], [
  `=SUM(Amortization!$D$6:$D$485)`,
], ["=0"], ["=0"]];
dash.getRange("H6:H11").formulas = [[
  `='Your Mortgage'!$F$6`,
], [
  `=EDATE('Your Mortgage'!$C$9,COUNTIF(Amortization!$I$6:$I$485,">0")-1)`,
], [
  `=COUNTIF(Amortization!$I$6:$I$485,">0")`,
], [
  `=SUM(Amortization!$J$6:$J$485)`,
], [
  `=$C$8-H8`,
], [
  `=$C$9-H9`,
]];
dash.getRange("M6:M11").formulas = [[
  `='Your Mortgage'!$I$6`,
], [
  `=EDATE('Your Mortgage'!$C$9,COUNTIF(Amortization!$Q$6:$Q$485,">0")-1)`,
], [
  `=COUNTIF(Amortization!$Q$6:$Q$485,">0")`,
], [
  `=SUM(Amortization!$R$6:$R$485)`,
], [
  `=$C$8-M8`,
], [
  `=$C$9-M9`,
]];
for (const range of ["A6:B11", "F6:G11", "K6:L11"]) {
  dash.getRange(range).format.font = { bold: true, color: C.ink };
}
for (const range of ["C6:C11", "H6:H11", "M6:M11"]) {
  dash.getRange(range).format = {
    font: { bold: true, color: C.linkText, size: 11 },
    horizontalAlignment: "right",
  };
}
for (const cell of ["C6", "C9", "C11", "H6", "H9", "H11", "M6", "M9", "M11"]) {
  dash.getRange(cell).format.numberFormat = "$#,##0.00";
}
for (const cell of ["C7", "H7", "M7"]) dash.getRange(cell).format.numberFormat = "mmm yyyy";
for (const cell of ["C8", "C10", "H8", "H10", "M8", "M10"]) dash.getRange(cell).format.numberFormat = "0";

sectionHeader(dash, "A14:N14", "Side-by-side decision table");
dash.getRange("A16:N20").values = [
  ["Scenario", "Monthly extra", "Lump sum", "At payment #", "Payoff date", "Payments", "Months saved", "Total interest", "Interest saved", "", "", "", "", ""],
  ["Baseline", 0, 0, "-", "", "", 0, "", 0, "", "", "", "", ""],
  ["Strategy A", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["Strategy B", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["Best time result", "", "", "", "", "", "", "", "", "", "", "", "", ""],
];
dash.mergeCells("I16:N16");
for (let r = 17; r <= 20; r++) dash.mergeCells(`I${r}:N${r}`);
dash.getRange("A16:N16").format = { fill: C.evergreen, font: { bold: true, color: C.white }, wrapText: true };
dash.getRange("A17:N20").format.borders = { preset: "all", style: "thin", color: C.line };
dash.getRange("B17:H19").formulas = [
  ["=0", "=0", `="-"`, "=$C$7", "=$C$8", "=0", "=$C$9"],
  [`='Your Mortgage'!$F$6`, `='Your Mortgage'!$F$7`, `='Your Mortgage'!$F$8`, "=$H$7", "=$H$8", "=$H$10", "=$H$9"],
  [`='Your Mortgage'!$I$6`, `='Your Mortgage'!$I$7`, `='Your Mortgage'!$I$8`, "=$M$7", "=$M$8", "=$M$10", "=$M$9"],
];
dash.getRange("I17:I19").formulas = [["=0"], ["=$H$11"], ["=$M$11"]];
dash.getRange("I17:N19").format.horizontalAlignment = "center";
dash.getRange("B20").formulas = [[`=IF(H18=H19,"Tie",IF(H18<H19,'Your Mortgage'!$F$9,'Your Mortgage'!$I$9))`]];
dash.mergeCells("B20:H20");
dash.getRange("B20:H20").format = { fill: C.cream, font: { bold: true, color: C.evergreen, size: 11 } };
dash.getRange("B17:C19").format.numberFormat = "$#,##0.00";
dash.getRange("E17:E19").format.numberFormat = "mmm yyyy";
dash.getRange("H17:I19").format.numberFormat = "$#,##0.00";
dash.getRange("D17:G19").format.horizontalAlignment = "center";

sectionHeader(dash, "A23:N23", "Projected balance over time");
const chart = dash.charts.add("line", { chartType: "line", title: "Projected mortgage balance", hasLegend: true });
const baselineSeries = chart.series.add("Baseline");
baselineSeries.categoryFormula = "'Amortization'!$A$6:$A$485";
baselineSeries.formula = "'Amortization'!$H$6:$H$485";
baselineSeries.fill = C.evergreen;
const aSeries = chart.series.add("Strategy A");
aSeries.categoryFormula = "'Amortization'!$A$6:$A$485";
aSeries.formula = "'Amortization'!$P$6:$P$485";
aSeries.fill = C.gold;
const bSeries = chart.series.add("Strategy B");
bSeries.categoryFormula = "'Amortization'!$A$6:$A$485";
bSeries.formula = "'Amortization'!$X$6:$X$485";
bSeries.fill = C.sky;
chart.title = "Projected mortgage balance";
chart.titleTextStyle.fontSize = 12;
chart.hasLegend = true;
chart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 8 } };
chart.yAxis = { numberFormatCode: "$#,##0", min: 0 };
chart.setPosition("A25", "N43");
dash.mergeCells("A45:N47");
dash.getRange("A45").values = [[
  "Estimated results assume every scheduled and extra payment posts exactly as modeled. A shorter projected term or lower estimated interest does not account for lender rules, opportunity cost, taxes, or changes to your circumstances."
]];
dash.getRange("A45:N47").format = {
  fill: C.warning,
  font: { color: C.ink, size: 9 },
  wrapText: true,
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: C.gold },
};
dash.freezePanes.freezeRows(4);

// Payment log
title(log, "A1:H2", "Payment log", "Optional tracker · record what actually happened; this log does not alter the payoff scenarios.");
setColumnWidths(log, { A: 11, B: 14, C: 17, D: 17, E: 17, F: 14, G: 35, H: 24 });
log.getRange("A5:H5").values = [[
  "Payment #", "Due date", "Planned minimum", "Planned extra", "Actual total", "Status", "Notes", "Statement / confirmation"
]];
log.getRange("A5:H5").format = {
  fill: C.evergreen,
  font: { bold: true, color: C.white },
  wrapText: true,
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "all", style: "thin", color: C.line },
};
log.getRange("A6").values = [[1]];
log.getRange("A7").formulas = [["=A6+1"]];
log.getRange("A7:A365").fillDown();
log.getRange("B6").formulas = [[`=IF(A6<='Your Mortgage'!$C$8*12,EDATE('Your Mortgage'!$C$9,A6-1),"")`]];
log.getRange("B6:B365").fillDown();
log.getRange("C6").formulas = [[`=IF(B6="","",'Your Mortgage'!$C$11)`]];
log.getRange("C6:C365").fillDown();
log.getRange("D6").formulas = [[`=IF(B6="","",'Your Mortgage'!$F$6+IF(A6='Your Mortgage'!$F$8,'Your Mortgage'!$F$7,0))`]];
log.getRange("D6:D365").fillDown();
log.getRange("A6:D365").format.fill = C.cream;
log.getRange("E6:H365").format = { fill: C.input, font: { color: C.inputText } };
log.getRange("A6:H365").format.borders = { preset: "all", style: "thin", color: "#E7ECE9" };
log.getRange("B6:B365").format.numberFormat = "mmm d, yyyy";
log.getRange("C6:E365").format.numberFormat = "$#,##0.00";
log.getRange("F6:F365").dataValidation = { rule: { type: "list", values: ["Pending", "Paid", "Skipped"] } };
log.getRange("F6:F365").conditionalFormats.add("containsText", { text: "Paid", format: { fill: "#E7F4EA", font: { color: C.evergreen, bold: true } } });
log.getRange("F6:F365").conditionalFormats.add("containsText", { text: "Skipped", format: { fill: C.error, font: { color: "#9C2B1B", bold: true } } });
log.freezePanes.freezeRows(5);

// Checks
title(checks, "A1:E2", "Model checks", "READY means the entered values pass the workbook's internal consistency tests.");
setColumnWidths(checks, { A: 34, B: 14, C: 52, D: 4, E: 4 });
checks.getRange("A5:C5").values = [["Check", "Result", "What it protects"]];
checks.getRange("A5:C5").format = { fill: C.evergreen, font: { bold: true, color: C.white } };
checks.getRange("A6:C18").values = [
  ["Principal is positive", "", "Prevents an empty or negative loan"],
  ["Interest rate is 0%–25%", "", "Keeps the model within the intended range"],
  ["Term is a whole 1–40 years", "", "Fits within the 480-payment engine"],
  ["First payment date is valid", "", "Creates a reliable payoff date"],
  ["Extra payments are nonnegative", "", "Prevents invalid strategy assumptions"],
  ["Lump-sum months fit the term", "", "Ensures the one-time payment can occur"],
  ["Baseline reaches $0", "", "Confirms scheduled payoff within the term"],
  ["Both strategies reach $0", "", "Confirms extra-payment payoff completion"],
  ["Baseline principal reconciles", "", "Principal paid equals starting balance"],
  ["Strategy A principal reconciles", "", "Principal paid equals starting balance"],
  ["Strategy B principal reconciles", "", "Principal paid equals starting balance"],
  ["No negative ending balances", "", "Confirms payoff truncation works"],
  ["Representative cash flows reconcile", "", "Beginning balance + interest − payment = ending balance"],
];
checks.getRange("B6:B18").formulas = [
  [`=IF('Your Mortgage'!C6>0,"OK","FIX")`],
  [`=IF(AND('Your Mortgage'!C7>=0,'Your Mortgage'!C7<=25%),"OK","FIX")`],
  [`=IF(AND('Your Mortgage'!C8>=1,'Your Mortgage'!C8<=40,MOD('Your Mortgage'!C8,1)=0),"OK","FIX")`],
  [`=IF(ISNUMBER('Your Mortgage'!C9),"OK","FIX")`],
  [`=IF(MIN('Your Mortgage'!F6:F7,'Your Mortgage'!I6:I7)>=0,"OK","FIX")`],
  [`=IF(AND('Your Mortgage'!F8>=1,'Your Mortgage'!F8<='Your Mortgage'!C8*12,'Your Mortgage'!I8>=1,'Your Mortgage'!I8<='Your Mortgage'!C8*12),"OK","FIX")`],
  [`=IF(Amortization!H485<=0.01,"OK","FIX")`],
  [`=IF(AND(Amortization!P485<=0.01,Amortization!X485<=0.01),"OK","FIX")`],
  [`=IF(ABS(SUM(Amortization!G6:G485)-'Your Mortgage'!C6)<=0.01,"OK","FIX")`],
  [`=IF(ABS(SUM(Amortization!O6:O485)-'Your Mortgage'!C6)<=0.01,"OK","FIX")`],
  [`=IF(ABS(SUM(Amortization!W6:W485)-'Your Mortgage'!C6)<=0.01,"OK","FIX")`],
  [`=IF(MIN(Amortization!H6:H485,Amortization!P6:P485,Amortization!X6:X485)>=0,"OK","FIX")`],
  [`=IF(AND(ABS(Amortization!C6+Amortization!D6-Amortization!F6-Amortization!H6)<=0.01,ABS(Amortization!I65+Amortization!J65-Amortization!N65-Amortization!P65)<=0.01,ABS(Amortization!Q185+Amortization!R185-Amortization!V185-Amortization!X185)<=0.01),"OK","FIX")`],
];
checks.getRange("A6:C18").format.borders = { preset: "all", style: "thin", color: C.line };
checks.getRange("A6:A18").format.font = { bold: true, color: C.ink };
checks.getRange("B6:B18").format = { font: { bold: true }, horizontalAlignment: "center" };
checks.getRange("B6:B18").conditionalFormats.add("containsText", { text: "OK", format: { fill: "#E7F4EA", font: { color: C.evergreen, bold: true } } });
checks.getRange("B6:B18").conditionalFormats.add("containsText", { text: "FIX", format: { fill: C.error, font: { color: "#9C2B1B", bold: true } } });
checks.mergeCells("A20:A21");
checks.mergeCells("B20:C21");
checks.getRange("A20").values = [["MODEL STATUS"]];
checks.getRange("B20").formulas = [[`=IF(COUNTIF(B6:B18,"FIX")=0,"READY","REVIEW INPUTS")`]];
checks.getRange("A20:A21").format = {
  fill: C.evergreen,
  font: { bold: true, color: C.white, size: 13 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
checks.getRange("B20:C21").format = {
  fill: C.sage,
  font: { bold: true, color: C.evergreen, size: 15 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "outside", style: "medium", color: C.evergreen },
};
checks.mergeCells("A23:C26");
checks.getRange("A23").values = [[
  "Audit note: the workbook uses a monthly fixed-rate payment formula and caps the final scheduled/extra payment so no scenario pays more than the remaining balance plus that month's interest. Human testing in desktop Excel and after Google Sheets import is still required before an Etsy launch."
]];
checks.getRange("A23:C26").format = { fill: C.warning, wrapText: true, verticalAlignment: "center" };
checks.freezePanes.freezeRows(5);

// Global print-friendly and row formatting.
for (const sheet of [start, inputs, dash, checks]) {
  sheet.getUsedRange().format.verticalAlignment = "center";
}
start.getUsedRange().format.wrapText = true;
inputs.getUsedRange().format.wrapText = true;
checks.getUsedRange().format.wrapText = true;

// Export once, then retain an identical product-folder copy.
const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(outputXlsx);
await fs.copyFile(outputXlsx, deliverableXlsx);

// Render every sheet for QA; promote the customer-facing previews to the product folder.
const sheetNames = ["Start Here", "Your Mortgage", "Dashboard", "Amortization", "Payment Log", "Checks"];
const fileNames = {
  "Start Here": "start-here.png",
  "Your Mortgage": "your-mortgage.png",
  "Dashboard": "dashboard.png",
  "Amortization": "amortization.png",
  "Payment Log": "payment-log.png",
  "Checks": "checks.png",
};
const renderRanges = {
  "Start Here": "A1:J23",
  "Your Mortgage": "A1:I20",
  "Dashboard": "A1:N47",
  "Amortization": "A1:X30",
  "Payment Log": "A1:H30",
  "Checks": "A1:E26",
};
for (const sheetName of sheetNames) {
  const preview = await wb.render({ sheetName, range: renderRanges[sheetName], scale: 1, format: "png" });
  const bytes = new Uint8Array(await preview.arrayBuffer());
  await fs.writeFile(`${previewRoot}/${fileNames[sheetName]}`, bytes);
}
await fs.copyFile(`${previewRoot}/dashboard.png`, `${listingImages}/prototype-dashboard.png`);
await fs.copyFile(`${previewRoot}/your-mortgage.png`, `${listingImages}/prototype-inputs.png`);
await fs.copyFile(`${previewRoot}/start-here.png`, `${listingImages}/prototype-start-here.png`);

export { wb, outputXlsx, deliverableXlsx, previewRoot };
