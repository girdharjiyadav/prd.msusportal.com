$(document).ready(function () {
  /*  $('#loader').hide()*/
    controlList();
    attachmentsList();
   
  
});
// Declare a global variable to store the data list
var dataList = [];
function controlList() {
    $.ajax({
        'url': '/api/authController/controlList',
        'type': 'GET',
        'contentType': 'application/json',
        success: function (data) {
            if (data.success) {
                // Clear the existing data list before populating with new data
                dataList = [];
                // Iterate through the received data and push it to the dataList array
                for (var i = 0; i < data.data.length; i++) {
                    dataList.push(data.data[i]);

                }
                if (dataList[0]["moduleName"] == "Attachment" && dataList[0]["isCreate"] == 1) {
                   // document.getElementById("addAttachmentsBtn").style.display = "block";
                   // document.cookie = "isCreate=1";

                    document.getElementById("uploadList").style.display ="block"

                } else {
                  //  document.cookie = "isCreate=0";
                    //document.getElementById("addAttachmentsBtn").style.display = "none";
                    document.getElementById("uploadList").style.display = "none"
                   
                }


                if (dataList[0]["moduleName"] == "Attachment" && dataList[0]["isprint"] == 1) {
                    // document.getElementById("addAttachmentsBtn").style.display = "block";
                    // document.cookie = "isCreate=1";

                    document.getElementById("enquiryDiv").style.display = "block"

                } else {
                    //  document.cookie = "isCreate=0";
                    //document.getElementById("addAttachmentsBtn").style.display = "none";
                    document.getElementById("enquiryDiv").style.display = "none"

                }


                if (dataList[0]["moduleName"] == "Attachment" && dataList[0]["isView"] == 1) {
                    document.getElementById("downlaodList").style.display = "block"
                    
                    document.getElementById("downloadSelected").style.display = "block"
                } else {
                    document.getElementById("downlaodList").style.display = "none"
                    document.getElementById("downloadSelected").style.display = "none"
                    
                }



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




function attachmentsList() {
    dataTable = $("#attachmentsList").DataTable({
        ajax: {
            'type': 'GET',
            'url': 'api/taskController/attachmentsList',
            'contentType': 'application/json',
        },
        columns: [
            {
                'data': null,
                'render': function (data, type, row, meta) {
                    return '-';
                },
                'width': '5%'
            },
           /* { 'data': null, 'defaultContent': '-', 'width': '1%', 'font-size': '6px' },*/
            {
                'data': 'id',
                'render': function (data, type, row) {
                    return `<span>${row.attachmentsDesc}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'id',
                'render': function (data, type, row) {
                    return `<span>${row.fileName}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'id',
                'render': function (data, type, row) {
                    var taskDate = new Date(row.createdDate);
                    var formattedDate = taskDate.toLocaleDateString('en-in', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
                    return `<span>${formattedDate}</span>`;
                },
                'width': '20%',
                'font-size': '6px'
            },
            
            {
                'data': 'id', 'render': function (data, type, row) {
                    return `<span>${row.createdBy}</span>`;
                },
                'width': '10%', 'font-size': '6px'
            },
            
            {
                'data': 'id',
                'render': function (data, type, row) {
                    if (dataList[0]["moduleName"] == "Attachment" && dataList[0]["isView"] == 1) {
                        return `
                <button  onclick="DownloadAttachments('${row.attachmentsUrl}', '${row.fileName}')" type="button" class="btn btn-success"><i class="fa fa-download"></i> Download</button>
                <button onclick=ViewAttachments("${row.attachmentsUrl}") type="button" class="btn btn-primary"><i class="fa fa-eye"></i> View</button>
                 <button type="button" onclick=deleteAttachments("${row.id}") class="btn btn-danger"><i class="fa fa-trash"></i> Delete</button>
            `;
                    } else {
                        return null;
                    }
                },
                'width': '30%',
                'font-size': '6px'
            }
        ],
        select: {
            style: 'multi' // Enable multi-row selection
        },
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

    // Handle click on table header checkbox to toggle all checkboxes
    $('#selectAllCheckbox').on('change', function () {
        var isChecked = $(this).prop('checked');
        $('.row-checkbox').prop('checked', isChecked);
        $('#attachmentsList tbody tr').toggleClass('selected', isChecked);
    });
   
    $('#attachmentsList tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
    });

    // Function to count selected attachments 
    $('#downloadSelected').on('click', function () {
        var selectedAttachmentUrls = [];
        var selectedFileName = [];
        $('#attachmentsList tbody tr.selected').each(function () {
            var rowData = dataTable.row($(this)).data();
            selectedFileName.push(rowData.fileName);
            selectedAttachmentUrls.push(rowData.attachmentsUrl);
        });

        if (selectedAttachmentUrls.length > 0) {
            downloadMultipleAttachments(selectedAttachmentUrls, selectedFileName);
        } else {
            alert('No attachments selected for download.');
        }
    });
}


/*function downloadMultipleAttachments(attachmentUrls) {
    
    attachmentUrls.forEach(function (attachmentUrl) {
        // Construct the full URL for each attachment file
        var url = "/files/" + attachmentUrl;

        // Create a temporary anchor element
        var link = document.createElement('a');
        link.href = url;
        link.download = attachmentUrl; // Set the filename for the downloaded file
        link.target = '_blank'; 

        // Append the anchor element to the document body
        document.body.appendChild(link);

        // Trigger the click event on the anchor element
        link.click();

        // Remove the anchor element from the document body
        document.body.removeChild(link);
    });
}*/


function downloadMultipleAttachments(selectedAttachmentUrls, selectedFileNames) {

    var selectedAttachmentUrlsArray = [];
    for (let i = 0; i < selectedAttachmentUrls.length; i++) {
        selectedAttachmentUrlsArray.push("/files/" + selectedAttachmentUrls[i]);
    }

    var zip = new JSZip();
    var promises = [];

    
    selectedAttachmentUrlsArray.forEach(function (attachmentUrl,index) {
        var fileName = selectedFileNames[index] || "unnamed";

        // Fetch the content of each file
        promises.push(fetch(attachmentUrl).then(response => response.blob()).then(function (blob) {
          //  var filename = attachmentUrl.split('/').pop();
            var customFilename = `${fileName}`;
            // Add the file to the zip archive

            zip.file(customFilename, blob);
        }));
    });

    // Genrate the Zip File
    Promise.all(promises).then(() => {
        zip.generateAsync({ type: "blob" }).then(function (content) {
            var link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download =  'attachments.zip';
            link.click();
        });
    });

}




function ViewAttachments(attachmentsUrl) {
    var url = "/files/" + attachmentsUrl
    // Open the PDF file in a new tab
    window.open(url, '_blank');
}
function DownloadAttachments(attachmentsUrl, fileName) {
    // Construct the full URL for the PDF file
    var url = "/files/" + attachmentsUrl;

    // Create a temporary anchor element
    var link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Set the filename for the downloaded file
    link.target = '_blank'; // Open in a new tab if needed

    // Append the anchor element to the document body
    document.body.appendChild(link);

    // Trigger the click event on the anchor element
    link.click();

    // Remove the anchor element from the document body
    document.body.removeChild(link);
}

function uploadFileTime() {
    document.getElementById("horizontalLoader").style.display = "block";
    setTimeout(function () {
        uploadFile()
    }, 2000);
    
}


function uploadFile() {
   

    let files = $("#fileData")[0].files;
    var attachmentsDesc = document.getElementById("attachmentsDesc").value;
    // Check if the attachments description is empty
    if (attachmentsDesc.trim() === "") {
        $('#loader').hide();
        Toast.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Attachments description cannot be empty',
        });
        return; // Stop execution if the description is empty
    }


    if (files.length > 0) {
        var formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('attachmentsFile', files[i]); // Use this loop to handle multiple files
        }
        formData.append('AttachmentsDesc', attachmentsDesc);
       
        $.ajax({
            type: 'POST',
            url: "api/taskController/UploadAttachments",
            contentType: false,
            processData: false,
            data: formData,

            success: function (data) {
                document.getElementById("horizontalLoader").style.display = "none";
                document.getElementById("attachmentsDesc").value = "";
                document.getElementById("fileData").value = "";
                $('#attachmentsList').DataTable().ajax.reload();
                if (data.success) {
                    Toast.fire({
                        icon: 'success',
                        title: '',
                        text: data.message,
                    });
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Oops!',
                        text: data.message,
                    });
                }
            },
            error: function (xhr, status, error) {
                document.getElementById("horizontalLoader").style.display = "none";
             
                Toast.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Error occurred while uploading files',
                });
            }
        });
    } else {
        document.getElementById("horizontalLoader").style.display = "none";
        document.getElementById("attachmentsDesc").value = "";
        document.getElementById("fileData").value = "";
        Toast.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'File data is empty. Please select a file',
        });
    }
}




function deleteAttachments(attachmentID) {
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
                url: 'api/taskController/deleteAttachments',
                type: 'DELETE',
                data: {
                    attachmentID: attachmentID
                },
                success: function (data) {
                    if (data.success) {
                        Toast.fire({
                            icon: 'success',
                            title: data.message
                        })
                        $('#attachmentsList').DataTable().ajax.reload();
                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: data.message
                        })
                    }
                }
            });

        };
    })

}