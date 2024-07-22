$(document).ready(function () {
    taskList();

});

function taskList() {
    dataTable = $("#taskList").DataTable({
        ajax: {
            'type': 'GET',
            'url': '/api/taskController/TaskList',
            'contentType': 'application/json',
        },
        columns: [
            { 'data': null, 'defaultContent': '-', 'width': '1%', 'font-size': '6px' },
            {
                'data': 'taskid',
                'render': function (data, type, row) {
                    return `<a href="#" onclick="planDetails('${row.taskid}')" data-toggle="modal" data-target="#plaDetails" style="text-decoration: underline; cursor: pointer;">${row.taskname}</a>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'taskid',
                'render': function (data, type, row) {
                    var taskDate = new Date(row.logInTime);
                    var formattedDate = taskDate.toLocaleDateString('en-in', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
                    return `<span>${formattedDate}</span>`;
                },
                'width': '20%',
                'font-size': '6px'
            },
            {
                'data': 'taskid',
                'render': function (data, type, row) {
                    var taskDate = new Date(row.logOutTime);
                    var formattedDate = taskDate.toLocaleDateString('en-in', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
                    if (row.logOutTime == '0001-01-01T00:00:00') {
                        return `<center><span>-</span></center>`;
                    } else {
                        return `<span> ${formattedDate}</span>`;
                    }

                    
                },
                'width': '20%',
                'font-size': '6px'
            },
            {
                'data': 'taskid', 'render': function (data, type, row) {
                    const timeDifference = calculateTimeDifference(row.logInTime, row.logOutTime);
                    const totalHours = timeDifference.hours;
                    const totalMinutes = timeDifference.minutes;
                    if (row.logOutTime == '0001-01-01T00:00:00') {
                        return `<center><span>-</span></center>`;
                    } else {
                        return `<span>${totalHours != 0 ? totalHours + ' hours' : ''} ${totalMinutes != 0 ? totalMinutes + ' minutes' : ''}</span>`;
                    }
                   
                },
                'width': '20%', 'font-size': '6px'
            },

            {
                'data': 'taskid', 'render': function (data, type, row) {
                    return `<span>${row.assignTo}</span>`;
                },
                'width': '10%', 'font-size': '6px'
            },

            {
                'data': 'taskid',
                'render': function (data, type, row) {
                    var taskDate = new Date(row.logInTime);
                    var currentDate = new Date();

                    var cookies = getCookies();
                    if (taskDate.getDate() === currentDate.getDate() &&
                        taskDate.getMonth() === currentDate.getMonth() &&
                        taskDate.getFullYear() === currentDate.getFullYear() && (cookies['fullname']) == row.assignTo){
                        return ` 
                <button onclick=updatePlan("${row.taskid}") data-toggle="modal" data-target="#addCategoryModal" type="button" class="btn btn-success"><i class="fa fa-edit "></i>Edit</button>
                <button onclick=deletePlan("${row.taskid}") type="button" class="btn btn-danger"><i class="fa fa-trash"></i>Delete</button>
            `;
                    } else {
                        return `
                <button disabled onclick=updatePlan("${row.taskid}") data-toggle="modal" data-target="#addCategoryModal" type="button" class="btn btn-success"><i class="fa fa-edit "></i>Edit</button>
                <button disabled onclick=deletePlan("${row.taskid}") type="button" class="btn btn-danger"><i class="fa fa-trash"></i>Delete</button>
            `;
                    }
                },
                'width': '20%',
                'font-size': '6px'
            }
        ],

        "font- size": '1em',
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'pdf',
                text: '<i class="fa fa-file-pdf-o"></i> Pdf',
                title: 'ATTANDANCE REPORT',
                exportOptions: {
                    columns: [5, 2, 3, 4, 1],
                },
            },
            {
                extend: "colvis"
            }
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




function createTask() {
    var shortDescription = document.getElementById("shortDescription").value;
    var morningPlan = document.getElementById("morningPlan").value;
    var actualPlan = document.getElementById("actualPlan").value;
    var saveType = document.getElementById("btnType").innerHTML;
    var taskId = document.getElementById("planID").innerHTML;
    var dataToSend = {
        taskname: shortDescription,
        morningPlan: morningPlan,
        actualPlan: actualPlan,
        SaveType: saveType,
        taskid: taskId
    };
    $.ajax({
        url: 'api/taskController/AddUpdateTask',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
        success: function (data) {
            if (data.success) {
                clearData();
                Toast.fire({
                    icon: 'success',
                    title: '',
                    text: data.message,
                })
                $('#taskList').DataTable().ajax.reload();
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: 'oops!',
                    text: data.message,
                })
            }
        }
    })
}

function clearData() {
    document.getElementById("shortDescription").value="";
    document.getElementById("morningPlan").value="";
    document.getElementById("actualPlan").value="";
   document.getElementById("btnType").innerHTML ="Save";
}

function addPlanBtn() {

    document.getElementById("actualPlan").disabled = true;
    document.getElementById("morningPlan").disabled = false;
}


function updatePlan(taskid) {
    document.getElementById("planLabel").innerHTML ="Update Plan"
    document.getElementById("btnType").innerHTML = "Update"
    document.getElementById("actualPlan").disabled = false;
    document.getElementById("morningPlan").disabled = true;

    $.ajax({
        url: 'api/taskController/getPlanData',
        type: 'GET',
        data: {
            taskId: taskid
        },
        success: function (data) {
            if (data.success) {
                document.getElementById("shortDescription").value = data.data[0].taskname;
                document.getElementById("morningPlan").value = data.data[0].morningPlan;
                document.getElementById("planID").innerHTML = data.data[0].taskid;
                document.getElementById("actualPlan").value = data.data[0].actualPlan;
                var cookies = getCookies();
                if (data.data[0].assignTo != cookies['fullname']) {
                    document.getElementById("btnType").disabled = true;
                   
                } else {
                    document.getElementById("btnType").disabled = false;
                  
                }
              
               
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: data.data
                })
            }
        }
    });


}

function planDetails(taskid) {

    $.ajax({
        url: 'api/taskController/getPlanData',
        type: 'GET',
        data: {
            taskId: taskid
        },
        success: function (data) {
            if (data.success) {
                document.getElementById("planDesciption").innerHTML = data.data[0].taskname;
                document.getElementById("morningPlanDesc").innerHTML = data.data[0].morningPlan;
                document.getElementById("actualPlanDesc").innerHTML = data.data[0].actualPlan;
                document.getElementById("planOwner").innerHTML = data.data[0].assignTo;
                document.getElementById("loginTime").innerHTML = formatDateString(data.data[0].logInTime);
                document.getElementById("LogoutTime").innerHTML = data.data[0].logOutTime !="0001-01-01T00:00:00"? formatDateString(data.data[0].logOutTime):"";
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: data.data
                })
            }
        }
    });


}



function deletePlan(taskid) {
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
                url: 'api/taskController/deletePlan',
                type: 'DELETE',
                data: {
                    taskId:taskid
                },
                success: function (data) {
                    if (data.success) {

                        Toast.fire({
                            icon: 'success',
                            title: data.data
                        })
                        $('#taskList').DataTable().ajax.reload();
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


// Function to retrieve cookies and return them as an object
function getCookies() {
    // Retrieve all cookies
    var cookies = document.cookie;

    // Split the string into individual cookies
    var cookieArray = cookies.split(';');

    // Create an object to store key-value pairs of cookies
    var cookieData = {};

    // Loop through each cookie and parse it into key-value pairs
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim(); // Trim any leading or trailing spaces
        var separatorIndex = cookie.indexOf('=');
        var cookieName = cookie.substring(0, separatorIndex);
        var cookieValue = decodeURIComponent(cookie.substring(separatorIndex + 1));
        cookieData[cookieName] = cookieValue;
    }

    // Return the object containing cookies
    return cookieData;
}


function formatDateString(originalDateString) {
    const originalDate = new Date(originalDateString);

    // Function to get month name
    function getMonthName(month) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month];
    }

    // Function to format time in 12-hour format with AM/PM
    function formatTime(date) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)
        return hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
    }

    // Get components of the date
    const day = originalDate.getDate();
    const month = getMonthName(originalDate.getMonth());
    const year = originalDate.getFullYear();
    const time = formatTime(originalDate);

    // Formatted date string
    const formattedDateString = `${day}-${month}-${year} at ${time}`;

    return formattedDateString;
}


function calculateTimeDifference(start, end) {
    const startTime = new Date(start);
    const endTime = new Date(end);

    // Calculate the difference in milliseconds
    let timeDifference = endTime - startTime;

    // Convert milliseconds to hours and minutes
    let hours = Math.floor(timeDifference / (1000 * 60 * 60));
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes };
}