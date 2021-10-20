// Your code here
function createEmployeeRecord(array) {
  const record = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return record;
}

function createEmployeeRecords(arrayOfEmployees) {
  const result = [];
  for (let i = 0; i < arrayOfEmployees.length; i++) {
    let newRecord = createEmployeeRecord(arrayOfEmployees[i]);
    result.push(newRecord);
  }
  return result;
}

const newEvent = (function(type, dateStamp) {
  return Object.assign({}, {
    type: type,
    date: dateStamp.split(" ")[0],
    hour: parseInt(dateStamp.split(" ")[1], 10)
  })
})

function createTimeInEvent(record, dateStamp) {
  record.timeInEvents.push(newEvent("TimeIn", dateStamp));
  return record;
}

function createTimeOutEvent(record, dateStamp) {
  record.timeOutEvents.push(newEvent("TimeOut", dateStamp));
  return record;
}

function hoursWorkedOnDate(record, date) {
  const timeInEvent = record.timeInEvents.find(function(t) { return t.date === date });
  const timeOutEvent = record.timeOutEvents.find(function(t) { return t.date === date });
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(record, date) {
  return record.payPerHour * hoursWorkedOnDate(record, date);
}

function allWagesFor(record) {
  const dates = record.timeInEvents.map((event) => event.date)
  const wages = []
  for (let i = 0; i < dates.length; i++) {
    wages.push(wagesEarnedOnDate(record, dates[i]))
  }
  return wages.reduce((acc, daysWages) => daysWages + acc, 0);
}

function findEmployeeByFirstName(arrayOfEmployees, name) {
  return arrayOfEmployees.find(e => e.firstName === name);
}

function calculatePayroll(arrayOfEmployees) {
  const allEmployeeWages = arrayOfEmployees.map(employee => allWagesFor(employee));
  return allEmployeeWages.reduce((acc, employeeWages) => acc + employeeWages, 0);
}
