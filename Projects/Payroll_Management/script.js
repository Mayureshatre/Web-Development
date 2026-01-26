$(document).ready(function(){
    $('#theme-toggle').click(function(){
        $('body').toggleClass('dark-mode');
        if($('body').hasClass('dark-mode')) {
            $(this).text('☀️ Light Mode');
        } else {
            $(this).text('🌙 Dark Mode');
        }
    });

    $('payroll-form').submit(function(event){
        event.preventDefault();
        let name = $('#emp-name').val();
        let basic = parseFloat($('#basic-salary').val());
        let allowance = parseFloat($('#allowance').val()) || 0;
        let deduction = parseFloat($('#deduction').val()) || 0;
        
        let netPay = basic + allowance - deduction;;

        let newRow = `
            <td> ${name} </td>
            <td> ${basic} </td>
            <td> ${allowance} </td>
            <td> ${deduction} </td>
            <td> ${netPay} </td>
            <td><button class = "delete-btn">Delete</button></td>
        `;
        $('#payroll-body').append(newRow);
        $('#payroll-form')[0].reset();
    });

    $('#payroll-body').on('click', '.delete-btn', function(){
        if(confirm('Are you sure you want to delete this record?')){
            $(this).closest('tr').remove();
        }
    });
});