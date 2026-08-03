import fs from "node:fs/promises";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const root = "C:/Users/haris/Documents/github/etsy-shop/H4HappyLiving";
const tmp = `${root}/tmp/baby-shower-research`;
const out = `${root}/research/niches/baby-shower-invitations`;
const rows = JSON.parse(await fs.readFile(`${tmp}/normalized_rows.json`, "utf8"));
const s = JSON.parse(await fs.readFile(`${tmp}/summary.json`, "utf8"));
const wb = Workbook.create();
const comp = wb.worksheets.add("Competitors");
const eb = wb.worksheets.add("EverBee");
const kw = wb.worksheets.add("Keywords");
const rv = wb.worksheets.add("Reviews");
const navy="#24364B", sage="#7C9A92", ink="#263238", cream="#F7F2E8";

function title(sh, rg, text) {
  sh.getRange(rg).merge();
  const r=sh.getRange(rg);
  r.values=[[text]];
  r.format.fill=navy;
  r.format.font={bold:true,color:"#FFFFFF",size:16};
  r.format.rowHeight=28;
}
function head(r) {
  r.format.fill=sage;
  r.format.font={bold:true,color:"#FFFFFF"};
  r.format.wrapText=true;
  r.format.borders={preset:"all",style:"thin",color:"#D6E0DD"};
}
function grid(r) {
  r.format.font={color:ink,size:10};
  r.format.wrapText=true;
  r.format.verticalAlignment="top";
  r.format.borders={preset:"all",style:"thin",color:"#E1E7E5"};
}

