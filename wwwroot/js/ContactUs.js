$(document).ready(function () {
    enquiryList();

});
Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})



function enquiryList() {
    dataTable = $("#enquiryList").DataTable({
        ajax: {
            'type': 'GET',
            'url': '/api/EnquiryController/EnquiryList',
            'contentType': 'application/json',
        },
        columns: [
            { 'data': null, 'defaultContent': '-', 'width': '1%', 'font-size': '6px' },
            { 'data': 'fullName', 'defaultContent': '-', 'width': '1%', 'font-size': '6px' },
            { 'data': 'email', 'defaultContent': '-', 'width': '1%', 'font-size': '6px' },
            { 'data': 'subject', 'defaultContent': '-', 'width': '1%', 'font-size': '6px' },
            { 'data': 'description', 'defaultContent': '-', 'width': '1%', 'font-size': '6px' },
            
            {
                'data': 'createdDate',
                'render': function (data, type, row) {
                    return `<span> ${formatDateString(row.createdDate)}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            
        ],

        "font- size": '1em',
        dom: 'lBfrtip',
        buttons: [

        ],
       
        "bDestroy": true,
        "ordering": true,
        "scrollX": false,
        "overflow- x": true,
        "responsive": true,
        "fixedHeader": true,
        language: {
            searchPlaceholder: "Search records",
            emptyTable: "No data found",
            width: '100%',
        },
    }
    );
    dataTable.on('order.dt ', function () {
        dataTable.column(0, { order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}

function addEnquiry() {

    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    if (fullName == "" || email == "" || subject == "" || message == "") {
        return alert("Please fill all required Fields");
    }

    var dataToSend = {
        fullName: fullName,
        email: email,
        subject: subject,
        description: message,
       
    };
    $.ajax({
        url: '/api/EnquiryController/AddEnquiry',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
        success: function (data) {
            if (data.success) {
                document.getElementById("fullName").value="";
                document.getElementById("email").value="";
                document.getElementById("subject").value="";
                document.getElementById("message").value = "";
                document.getElementById("messgaeLabel").style.display = "block";
            }
            else {
               
            }
        }
    })
}




function formatDateString(dateString) {


    if (dateString != "") {
        // Convert the string to a Date object
        const date = new Date(dateString);

        // Extract the month, day, and year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();

        // Format the date as MM/DD/YYYY
        return `${month}/${day}/${year}`;
    } else {
        return `-`;
    }

}