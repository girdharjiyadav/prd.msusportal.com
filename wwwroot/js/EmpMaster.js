$(document).ready(function () {
    empList();
    //$('#empLoader').hide();

});

function emailValidation(emailID) {
    filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(emailID)) {
        return true;
    }
    else {
        return false;
    }
}

function addEmp() {
    var empfName = document.getElementById("empfName").value;
    var emplName = document.getElementById("emplName").value;
    var empEmail = document.getElementById("empEmail").value;
    var empPassword = document.getElementById("empPassword").value;
    var empConfPassword = document.getElementById("empConfPassword").value;
    var isAdmin = document.getElementById("isAdmin").checked;
    var isUpload = document.getElementById("isUpload").checked;
    var isDownlaod = document.getElementById("isDownlaod").checked;
    var isEnquiry = document.getElementById("isEnquiry").checked;
    var agencyID = document.getElementById("agencyID").value;
    var companyName = document.getElementById("empCompanyName").value;
    let companyLogo = $("#empCompanyLogo")[0].files;
    


    var empID = document.getElementById("empID").innerHTML;
    var saveType = document.getElementById("empBtn").innerHTML;

    if (emailValidation(empEmail) == false) {
        alert("Invalid E-Mail Address");
        return; 
    }

    else if (empPassword !== empConfPassword) {
        
        alert("Password and confirm password do not match.");
        return; 
    }
    else if (agencyID == "Select") {

        alert("Please select agency id..");
        return;
    }

    if (companyLogo.length > 0) {
        var formData = new FormData();
        formData.append('companyLogoData', companyLogo[0]);
        formData.append('companyName', companyName);
        formData.append('firstname', empfName);
        formData.append('lastname', emplName);
        formData.append('emailId', empEmail);
        formData.append('password', empPassword);
        formData.append('userid', empID);
        formData.append('isAdmin', isAdmin);
        formData.append('isUpload', isUpload);
        formData.append('isDownlaod', isDownlaod);
        formData.append('isEnquiry', isEnquiry);
        formData.append('SaveType', saveType);
        formData.append('agencyID', agencyID);


        $.ajax({

            type: 'POST',
            url: "api/EmpController/AddAlterEmp",
            contentType: false,
            processData: false,
            data: formData,
            success: function (data) {
                if (data.success) {
                    clearData();
                    Toast.fire({
                        icon: 'success',
                        title: '',
                        text: data.message,
                    })
                    $('#empList').DataTable().ajax.reload();
                    document.getElementById("isAdmin").checked = false;
                    document.getElementById("isUpload").checked = false;
                    document.getElementById("isDownlaod").checked = false;
                    document.getElementById("isEnquiry").checked = false;


                }
                else {
                    clearData()
                    Toast.fire({
                        icon: 'error',
                        title: 'oops!',
                        text: data.message,
                    })
                    document.getElementById("isAdmin").checked = false;
                    document.getElementById("isUpload").checked = false;
                    document.getElementById("isDownlaod").checked = false;
                    document.getElementById("isEnquiry").checked = false;
                }
            }
        })
    }
    else {
        Toast.fire({
            icon: 'error',
            title: 'oops!',
            text: 'Company LOGO is Missing....',
        })

    }

}

function clearData() {
     document.getElementById("empfName").value="";
     document.getElementById("emplName").value="";
     document.getElementById("empEmail").value="";
     document.getElementById("empPassword").value="";
     document.getElementById("empConfPassword").value="";
    document.getElementById("empCompanyName").value="";
    document.getElementById("empCompanyLogo").value="";
     document.getElementById("isAdmin").checked="False";
     document.getElementById("empID").innerHTML=0;
    document.getElementById("empBtn").innerHTML = "Save";
    document.getElementById("isAdmin").checked = false;
    document.getElementById("isUpload").checked = false;
    document.getElementById("isDownlaod").checked = false;
    document.getElementById("isEnquiry").checked = false;
    document.getElementById("agencyID").value = "Select";
    document.getElementById("empLabel").innerHTML = "Add Employee"

}

function empList() {
    var counter = 0;
    dataTable = $("#empList").DataTable({
        ajax: {
            'type': 'GET',
            'url': '/api/EmpController/EmpList',
            'contentType': 'application/json',
        },
        columns: [
            {
                'data': 'userid', 'render': function (data, type, row) {
                    counter++; // Increment counter
                    return `<span>${counter}</span>`;
                },
                'width': '1%', 'font-size': '6px'
            },
            {
                'data': 'userid', 'render': function (data, type, row) {
                    return `<a onclick=planDetails("${row.taskid}") data-toggle="modal" data-target="#plaDetails">${row.firstname}</a>`;
                },
                'width': '20%', 'font-size': '6px'
            },
            {
                'data': 'userid',
                'render': function (data, type, row) {

                    if (row.isAdmin == 1) {
                        return `<span>Admin</span>`;
                    } else {
                        return `<span>Employee</span>`;
                    }
                 
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'userid',
                'render': function (data, type, row) {
                    if (row.status == 1) {
                        return `<button onclick=updateStatus("${row.userid}") type="button" class="btn btn-success">Active</button>`
                    }
                    else {
                        return `<button onclick=updateStatus("${row.userid}") type="button" class="btn btn-danger">InActive</button>`
                    }
                },
                'width': '10%',
                'font-size': '6px'
            },
            
            {
                'data': 'userid',
                'render': function (data, type, row) {
                    return `
                <button onclick=getUserDetails("${row.userid}")  data-toggle="modal" data-target="#addEmpModal"  type="button" class="btn btn-primary"><i class="fa fa-edit"></i>Edit</button>
                <button onclick=deleteEmp("${row.userid}") type="button" class="btn btn-danger"><i class="fa fa-trash"></i>Delete</button>
               
            `;
                   
                },
                'width': '20%',
                'font-size': '6px'
            }
        ],

        "font- size": '1em',
        dom: 'lBfrtip',
        buttons: [

        ],
        "bDestroy": true,
        "paging": true,
        "searching": true,
        "ordering": true,
        "scrollX": true,
        "info": true,

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





function getUserDetails(userid) {
    var dataToSend2 = {
        userid: userid,
        SaveType: "GetData"
    };
    $.ajax({
        url: '/api/EmpController/EmpList',
        type: 'GET',
        contentType: 'application/json',
        data: dataToSend2,
        success: function (data) {
            if (data.success) {
                document.getElementById("empfName").value = data.data[0]["firstname"];
                document.getElementById("emplName").value = data.data[0]["lastname"];
                document.getElementById("empEmail").value = data.data[0]["emailId"];
                document.getElementById("empPassword").value = data.data[0]["password"];
                document.getElementById("empConfPassword").value = data.data[0]["password"];
                document.getElementById("isAdmin").checked = data.data[0]["isAdmin"];
                document.getElementById("isUpload").checked = data.data[0]["isUpload"];
                document.getElementById("isDownlaod").checked = data.data[0]["isDownlaod"];
                document.getElementById("isEnquiry").checked = data.data[0]["isEnquiry"];
                document.getElementById("agencyID").value = data.data[0]["agencyID"];
                document.getElementById("empCompanyName").value = data.data[0]["companyName"];
                /*document.getElementById("agencyID").value = data.data[0]["attachmentsUrl"];*/
                document.getElementById("empID").innerHTML = userid;
                document.getElementById("empLabel").innerHTML = "Update Employee"
                document.getElementById("empBtn").innerHTML = "Update"


            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: data.message
                })
            }
        }
    });
}



function deleteEmp(userid) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/api/EmpController/deleteEmp',
                type: 'DELETE',
                data: {
                    userid: userid
                },
                success: function (data) {
                    if (data.success) {

                        Toast.fire({
                            icon: 'success',
                            title: data.data
                        })
                        $('#empList').DataTable().ajax.reload();
                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: data.data
                        })
                    }
                }
            });

        };
    })

}


function updateStatus(userid) {
    var dataToSend2 = {
        userid : userid,
        SaveType :"ChangeStatus"
    };
  $.ajax({
        url: 'api/EmpController/AddAlterEmp',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend2),
        success: function (data) {
            if (data.success) {
                Toast.fire({
                    icon: 'success',
                    title: data.message
                })
                $('#empList').DataTable().ajax.reload();
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: data.message
                })
            }
        }
    });
}