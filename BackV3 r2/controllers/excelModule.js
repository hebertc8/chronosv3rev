// const XLSX = require('XLSX');
const excel = require("exceljs");

// let toExportFileName = (excelFileName) => {
//     return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
// }

let exportAsExcelFile = (json, name, res) => {

let workbook = new excel.Workbook();
let worksheet = workbook.addWorksheet(name);

worksheet.columns = [
  { header: "idJobOffer", key: "idJobOffer", width: 5 },
  { header: "jobOfferName", key: "jobOfferName", width: 10 },
  { header: "jobOfferMonth", key: "jobOfferMonth", width: 10 },
  { header: "datetimeCreateOffer", key: "datetimeCreateOffer", width: 10 },
  { header: "deadLine", key: "deadLine", width: 10 },
  { header: "publisherIdccms", key: "publisherIdccms", width: 10 },
  { header: "publisherName", key: "publisherName", width: 10 },
  { header: "applicantIdccms", key: "applicantIdccms", width: 10 },
  { header: "applicantName", key: "applicantName", width: 10 },
  { header: "jobTitle", key: "jobTitle", width: 10 },
  { header: "trialPeriod", key: "trialPeriod", width: 10 },
  { header: "employeeStudies", key: "employeeStudies", width: 10 },
  { header: "englishLevel", key: "englishLevel", width: 10 },
  { header: "employeeSeniority(Months)", key: "employeeSeniority(Months)", width: 10 },
  { header: "3LastMonthCountAF", key: "3LastMonthCountAF", width: 10 },
  { header: "6LastMonthCountAF", key: "6LastMonthCountAF", width: 10 },
  { header: "city", key: "city", width: 10 },
  { header: "status", key: "status", width: 10 },
  { header: "employeeDocument", key: "employeeDocument", width: 10 },
  { header: "phoneNumber", key: "phoneNumber", width: 10 },
  { header: "email", key: "email", width: 10 },
  { header: "idccmsManager", key: "idccmsManager", width: 10 },
  { header: "managerEmail", key: "managerEmail", width: 10 },
  { header: "client", key: "client", width: 10 },
  { header: "nameMarket", key: "nameMarket", width: 10 },
  
];

// Add Array Rows
worksheet.addRows(json);

// res is a Stream object
res.setHeader(
  "Content-Type",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);
res.setHeader(
  "Content-Disposition",
  "attachment; filename=" + name + ".xlsx"
);

return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
});
//     const worksheet= XLSX.utils.json_to_sheet(json);
//     const workbook = {
//         Sheets: {
//             'data': worksheet
//         },
//         SheetNames: ['data']
//     };
//    XLSX.writeFile(workbook, toExportFileName(excelFileName));
}

module.exports = {exportExcel: exportAsExcelFile}