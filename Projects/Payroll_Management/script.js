$(document).ready(function () {
  $("#theme-toggle").click(function () {
    $("body").toggleClass("dark-mode");
    if ($("body").hasClass("dark-mode")) {
      $(this).text("☀️ Light Mode");
    } else {
      $(this).text("🌙 Dark Mode");
    }
  });

  let employees = [];
  if (localStorage.getItem("payrollData")) {
    employees = JSON.parse(localStorage.getItem("payrollData"));
    generateTable();
  }

  $("#payroll-form").submit(function (event) {
    event.preventDefault();
    // alert("button Clicked!");
    let name = $("#emp-name").val();
    let basic = parseFloat($("#basic-salary").val());
    let allowance = parseFloat($("#allowance").val()) || 0;
    let deduction = parseFloat($("#deduction").val()) || 0;
    let netPay = basic + allowance - deduction;

    let newEmployee = {
      name: name,
      basic: basic,
      allowance: allowance,
      deduction: deduction,
      netPay: netPay,
    };
    employees.push(newEmployee);
    localStorage.setItem("payrollData", JSON.stringify(employees));
    generateTable();

    $("#payroll-form")[0].reset();
  });

  $("#payroll-body").on("click", ".delete-btn", function () {
    if (confirm("Are you sure you want to delete this record?")) {
      let index = $(this).closest("tr").data("index");
      employees.splice(index, 1);
      localStorage.setItem("payrollData", JSON.stringify(employees));
      generateTable();
    }
  });

  function generateTable() {
    $("#payroll-body").empty();

    employees.forEach(function (emp, index) {
      let row = `
        <tr data-index = "${index}">
        <td>${emp.name}</td>
        <td>${emp.basic}</td>
        <td>${emp.allowance}</td>
        <td>${emp.deduction}</td>
        <td>${emp.netPay}</td>
        <td id = "btn-container"><button class = "delete-btn">Delete</button></td>
        </tr>
      `;
      $("#payroll-body").append(row);
    });
  }
});
