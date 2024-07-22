
$(document).ready(function () {
    $('#loader').hide()
   
});


/*
function uploadData() {
    // $('#uplaodingDiv').show();
    let File1 = $("#excelFile")[0].files;
    var masteragency = document.getElementById("masteragency").value;
    var fileType = document.getElementById("filetype").value;
    var fileDate = document.getElementById("fileDate").value;

    // Move FormData instantiation outside of the conditional check
    var formData = new FormData();

    // Always append data to formData, regardless of File1.length
    for (i = 0; i < File1.length; i++) {
        formData.append('fileData', File1[i]);
        formData.append('MasterAgency', masteragency);
        formData.append('FileType', fileType);
        formData.append('FileDate', fileDate);
        // formData.append('vouchername', "SALE_ORDER");
    }
    document.getElementById("uplaodingDiv").style.display = "block";

    if (File1.length > 0) {
       

        $.ajax({
            type: 'Post',
            url: "api/authController/UploadExcel",
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            data: formData,
            success: function (data) {
                // Your success handling code

                if (data.success) {
                    document.getElementById("uplaodingDiv").style.display = "block";
                    // $('#uplaodingDiv').hide();
                    ClearExcelData();
                    Toast.fire({
                        icon: 'success',
                        title: 'Hurray!',
                        text: data.message,
                    })
                }
                else {
                    document.getElementById("uplaodingDiv").style.display = "block";
                    // $('#uplaodingDiv').hide();
                    ClearExcelData();
                    Toast.fire({
                        icon: 'error',
                        title: 'oops!',
                        text: data.message,
                    })

                }
            }
        });
    } else {
        document.getElementById("uplaodingDiv").style.display = "block";
        // $('#uplaodingDiv').hide();
        Toast.fire({
            icon: 'error',
            title: 'oops!',
            text: 'File data is empty, please pick an Excel file',
        })
    }
}
*/

function uploadData() {

  //  document.getElementById("uplaodingDiv").style.display = "block";
 //   $('#uplaodingDiv').show();
    let File1 = $("#excelFile")[0].files;
    var masteragency=document.getElementById("masteragency").value;
    var fileType= document.getElementById("filetype").value;
    var fileDate= document.getElementById("fileDate").value;
    if (File1.length > 0) {
        var formData = new FormData();
        formData.append('fileData', File1[0]);
        formData.append('MasterAgency', masteragency);
        formData.append('FileType', fileType);
        formData.append('FileDate', fileDate);
       /* for (i = 0; i < File1.length; i++) {
            
            formData.append('fileData', File1[i]);
            formData.append('MasterAgency', masteragency);
            formData.append('FileType', fileType);
            formData.append('FileDate', fileDate);
           // formData.append('vouchername', "SALE_ORDER");
        }*/
       
        $.ajax({
            type: 'Post',
            url: "api/authController/UploadExcel",
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            data: formData,
            beforeSend: function () {
                document.getElementById("uplaodingDiv").style.display = "block";
            },
            success: function (data) {
                if (data.success) {
                    document.getElementById("uplaodingDiv").style.display = "none";
                   // $('#uplaodingDiv').hide();
                    ClearExcelData();
                    Toast.fire({
                        icon: 'success',
                        title: '',
                        text: data.message,
                    })
                   }
                else {
                    document.getElementById("uplaodingDiv").style.display = "none";
                   // $('#uplaodingDiv').hide();
                    ClearExcelData();
                    Toast.fire({
                        icon: 'error',
                        title: 'oops!',
                        text: data.message,
                    })
                  
                }
            }
        });
    }
    else {
        document.getElementById("uplaodingDiv").style.display = "none";
       // $('#uplaodingDiv').hide();
        Toast.fire({
            icon: 'error',
            title: 'oops!',
            text: 'File data is empty please pick a excel file',
        })
     
    }
}




function ClearExcelData() {
   document.getElementById("masteragency").value = "--Selected--";
   document.getElementById("filetype").value="--Selected--";
    document.getElementById("fileDate").value = "";
    document.getElementById("excelFile").value = "";
}


