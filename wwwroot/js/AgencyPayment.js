$(document).ready(function () {
  /*  AgencyPayments();*/
    //GetCommissionResearchSolution();
    //$('#empLoader').hide();
    $('#searchType').val('Agent Number');
    $('#searchData').val('0');

    GetCommissionResearchSolution()
   
   
});

function GetCommissionResearchSolution() {
    $('#empLoader').show();
    var searchType = $('#searchType').val();
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();
    var searchData = $('#searchData').val();

    if (searchType == "Month & Year") {
        if (fromDate == "" && toDate == "")
            return alert('Please select from and toDate');
    } else {
        if (searchData == "") return alert('Please Enter Search Details');
    }

    $.ajax({
        url: '/api/AgencyController/GetData_ABI_COMMISSION_ALL_SALES_REPORT_HISTORY',
        type: 'GET',
        contentType: 'application/json',
        data: {
            search: searchData,
            searchType: searchType,
            fromDate: fromDate,
            toDate: toDate
        },
        success: function (res) {
            $('#empLoader').hide();
            if (!res.success) {
                Toast.fire({
                    icon: 'error',
                    title: '',
                    text: res.message,
                });
                return;
            }

            console.log('Data received from server:', res.data); // Debugging log
            console.log('Success status:', res.success);

            // Clear existing DataTable if it exists
            if ($.fn.DataTable.isDataTable('#CommissionResearchSolution')) {
                $('#CommissionResearchSolution').DataTable().clear().destroy();
            }

            var dataTable = $("#CommissionResearchSolution").DataTable({
                data: res.data,
                columns: [
                    {
                        'data': null, 'render': function (data, type, row, meta) {
                            return meta.row + 1; // Index
                        },
                        'width': '1%', 'font-size': '6px'
                    },
                    /*{
                        'data': 'e2eis_Seq_Number', 'render': function (data, type, row) {
                            return `<span>${row.e2eis_Seq_Number}</span>`;
                        },
                        'width': '1%', 'font-size': '6px'
                    },*/
                    {
                        'data': 'compMonth', 'render': function (data, type, row) {
                            return `<span>${row.compMonth}</span>`;
                        },
                        'width': '5%', 'font-size': '6px'
                    },
                    {
                        'data': 'carrier',
                        'render': function (data, type, row) {
                            return `<span>${row.carrier}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'compStatementSource',
                        'render': function (data, type, row) {
                            return `<span>${row.compStatementSource}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'writingAgentNumber',
                        'render': function (data, type, row) {
                            return `<span>${row.writingAgentNumber}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'writingAgentName',
                        'render': function (data, type, row) {
                            return `<span>${row.writingAgentName}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'contractId',
                        'render': function (data, type, row) {
                            return `<span>${row.contractId}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    
                    
                    {
                        'data': 'originalEffectiveDate',
                        'render': function (data, type, row) {
                            return `<span>${formatDateString(row.originalEffectiveDate)}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'coverageFromDate',
                        'render': function (data, type, row) {
                            return `<span>${formatDateString(row.coverageFromDate)}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'coverageToDate',
                        'render': function (data, type, row) {
                            return `<span> ${formatDateString(row.coverageToDate)}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'cancelDate',
                        'render': function (data, type, row) {
                            return `<span> ${formatDateString(row.cancelDate)}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'rateType',
                        'render': function (data, type, row) {
                            return `<span> ${row.rateType}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'commissionType',
                        'render': function (data, type, row) {
                            return `<span> ${row.commissionType}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'accountingDate',
                        'render': function (data, type, row) {
                            return `<span> ${formatDateString(row.accountingDate)}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'agencyPaymentAmount',
                        'render': function (data, type, row) {
                            return row.agencyPaymentAmount ? `<span> ${row.agencyPaymentAmount}</span>` : `<span></span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'agentCommission',
                        'render': function (data, type, row) {
                            return row.agentCommission ? `<span> ${row.agentCommission}</span>` : `<span></span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'agentPayee',
                        'render': function (data, type, row) {
                            return `<span> ${row.agentPayee}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'agentPayeeName',
                        'render': function (data, type, row) {
                            return `<span> ${row.agentPayeeName}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                   
                ],
                "font-size": '1em',
                dom: 'lBfrtip',
                buttons: [
                    {
                        extend: 'pdf',
                        text: '<i class="fa fa-file-pdf-o mr-2"></i>Download Pdf',
                        title: 'AGENCY COMMISSION RESEARCH',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6, 7],
                        },
                    },
                    {
                        extend: "excel",
                        text: '<i class="fa fa-file-excel-o"></i>Download Excel',
                        title: 'AGENCY COMMISSION RESEARCH',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        },
                    }
                ],
                "bDestroy": true,
                "paging": true,
                "searching": true,
                "ordering": true,
                "scrollX": true,
                "info": true,
                "autoWidth": false,
                language: {
                    searchPlaceholder: "Search records",
                    emptyTable: "Please Wait data retrieval in progress",
                    width: '100%',
                },
            });
            dataTable.buttons().container().addClass('ml-4');
            // Reset the counter each time new data is loaded
            dataTable.on('order.dt', function () {
                dataTable.column(0, { order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });
}


/*function GetCommissionResearchSolution() {
 
    var searchType = $('#searchType').val();
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();
    var searchData = $('#searchData').val();

    if (searchType == "Month & Year")
    {
        if (fromDate == "" && toDate== "")
        return alert('Please select from and toDate ')
    }
    else
    {
        if (searchData == "") return alert('Please Enter Search Details')
    }
    $.ajax({
        url: '/api/AgencyController/GetData_ABI_COMMISSION_ALL_SALES_REPORT_HISTORY',
        type: 'GET',
        contentType: 'application/json',
        data: {
            search:  searchData,
            searchType: searchType,
            fromDate: fromDate,
            toDate: toDate
        },
        success: function (res) {
          
            if (!res.success) {
                Toast.fire({
                    icon: 'error',
                    title: '',
                    text: res.message,
                })
                return
            }
           var dataTable = $("#CommissionResearchSolution").DataTable({
                data: res.data,
                columns: [
                    {
                        'data': 'e2eis_Seq_Number', 'render': function (data, type, row) {
                            counter++; // Increment counter
                            return `<span>${counter}</span>`;
                        },
                        'width': '1%', 'font-size': '6px'
                    },
                    {
                        'data': 'e2eis_Seq_Number', 'render': function (data, type, row) {
                            return `<span>${row.e2eis_Seq_Number}</span>`;
                        },
                        'width': '1%', 'font-size': '6px'
                    },
                    {
                        'data': 'compMonth', 'render': function (data, type, row) {
                            return `<span>${row.compMonth}</span>`;
                        },
                        'width': '5%', 'font-size': '6px'
                    },
                    {
                        'data': 'carrier',
                        'render': function (data, type, row) {

                            return `<span>${row.carrier}</span>`;

                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'compStatementSource',
                        'render': function (data, type, row) {
                            return `<span>${row.compStatementSource}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'writingAgentNumber',
                        'render': function (data, type, row) {
                            return `<span>${row.writingAgentNumber}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'writingAgentName',
                        'render': function (data, type, row) {
                            return `<span>${row.writingAgentName}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'contractId',
                        'render': function (data, type, row) {
                            return `<span>${row.contractId}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'coverageToDate',
                        'render': function (data, type, row) {
                            return `<span> ${formatDateString(row.coverageToDate)}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'coverageFromDate',
                        'render': function (data, type, row) {
                            return `<span>${formatDateString(row.coverageFromDate)}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'originalEffectiveDate',
                        'render': function (data, type, row) {
                            return `<span>${formatDateString(row.originalEffectiveDate)}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'cancelDate',
                        'render': function (data, type, row) {
                            return `<span> ${formatDateString(row.cancelDate)}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'rateType',
                        'render': function (data, type, row) {
                            return `<span> ${row.rateType}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'commissionType',
                        'render': function (data, type, row) {
                            return `<span> ${row.commissionType}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'accountingDate',
                        'render': function (data, type, row) {
                            return `<span> ${formatDateString(row.accountingDate)}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'agencyPaymentAmount',
                        'render': function (data, type, row) {
                            if (row.agencyPaymentAmount) {
                                return `<span> ${row.agencyPaymentAmount}</span>`;
                            } else {
                                return `<span></span>`;
                            }

                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'agentPayee',
                        'render': function (data, type, row) {
                            return `<span> ${row.agentPayee}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'agentPayeeName',
                        'render': function (data, type, row) {
                            return `<span> ${row.agentPayeeName}</span>`;
                        },
                        'width': '10%',
                        'font-size': '6px'
                    },
                    {
                        'data': 'agentCommission',
                        'render': function (data, type, row) {
                            if (row.agentCommission) {
                                return `<span>  ${row.agentCommission}</span>`;
                            }
                            else {
                                return `<span></span>`;
                            }

                        },
                        'width': '10%',
                        'font-size': '6px'
                    },

                    *//* {
                           'data': 'e2eis_Seq_Number',
                           'render': function (data, type, row, meta) {
                               return `
                           <button data-row='${JSON.stringify(row)}' data-toggle ="modal" data-target="#AgencyPaymentModal" onclick="getAgencyPaymentsDetails(this)"   type="button" class="btn btn-primary"><i class="fa fa-edit"></i>Edit</button>
                       `;
           
                           },
                           'width': '20%',
                           'font-size': '6px'
                       }*//*
                ],
                "font- size": '1em',
                dom: 'lBfrtip',
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

            });
            dataTable.on('order.dt', function () {
                dataTable.column(0, { order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });

}*/

function AgencyPayments() {
    var yearID = document.getElementById("yearId").value;
    var counter = 0;
    dataTable = $("#AgencyPayments").DataTable({
        ajax: {
            'type': 'GET',
             url: '/api/AgencyController/GetAgencyPayments',
            'contentType': 'application/json',
            data: {
                yearID: yearID
            }
        },
        columns: [
            {
                'data': 'e2eis_Seq_Number', 'render': function (data, type, row) {
                    counter++; // Increment counter
                    return `<span>${counter}</span>`;
                },
                'width': '1%', 'font-size': '6px'
            },
            {
                'data': 'accountingDate', 'render': function (data, type, row) {
                    return `<span>${row.accountingDate}</span>`;
                },
                'width': '5%', 'font-size': '6px'
            },
            {
                'data': 'subscriberFirstName',
                'render': function (data, type, row) {

                    return `<span>${row.subscriberFirstName}</span>`;

                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'subscriberLastName',
                'render': function (data, type, row) {
                    return `<span>${row.subscriberLastName}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'productType',
                'render': function (data, type, row) {
                    return `<span>${row.productType}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'fbContractId',
                'render': function (data, type, row) {
                    return `<span>${row.fbContractId}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'fbPaymentAmount',
                'render': function (data, type, row) {
                    return `<span>${row.fbPaymentAmount}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'county',
                'render': function (data, type, row) {
                    return `<span>${row.county}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'fbWritingAgentId',
                'render': function (data, type, row) {
                    return `<span>${row.fbWritingAgentId}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'record_Loaded_By',
                'render': function (data, type, row) {
                    return `<span>${row.record_Loaded_By}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'record_Load_Date',
                'render': function (data, type, row) {
                    return `<span> ${ row.record_Load_Date }</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },

            {
                'data': 'e2eis_Seq_Number',
                'render': function (data, type, row, meta) {
                    return `
                <button data-row='${JSON.stringify(row)}' data-toggle ="modal" data-target="#AgencyPaymentModal" onclick="getAgencyPaymentsDetails(this)"   type="button" class="btn btn-primary"><i class="fa fa-edit"></i>Edit</button>
            `;

                },
                'width': '20%',
                'font-size': '6px'
            }
        ],

        "font- size": '1em',
        dom: 'lBfrtip',
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

}
function getAgencyPaymentsDetails(button) {
    var rowData = JSON.parse(button.getAttribute('data-row'));
    console.log(rowData);
    document.getElementById("e2eis_Seq_Number").value = rowData.e2eis_Seq_Number;
    document.getElementById("CompMonth").value = rowData.compMonth;
    document.getElementById("Carrier").value = rowData.carrier;
    document.getElementById("ComStatementSource").value = rowData.compStatementSource;
    document.getElementById("WritingAgentNumber").value = rowData.writingAgentNumber;
    document.getElementById("WritingAgentName").value = rowData.writingAgentName;
    document.getElementById("ContractID").value = rowData.contractId;
    document.getElementById("CoverageToDate").value = rowData.coverageToDate; 
    document.getElementById("CoverageFromDate").value = rowData.coverageFromDate;
    document.getElementById("OriginalEffectiveDate").value = rowData.originalEffectiveDate;
    document.getElementById("CancelDate").value = rowData.cancelDate;
    document.getElementById("RateType").value = rowData.rateType;
    document.getElementById("CommissionType").value = rowData.commissionType;
    document.getElementById("AccountingDate").value = rowData.accountingDate;
    document.getElementById("AgencyPaymentAmount").value = rowData.agencyPaymentAmount;
    document.getElementById("AgentPayee").value = rowData.agentPayee;
    document.getElementById("AgentPayeeName").value = rowData.agentPayeeName; 
    document.getElementById("AgentCommission").value = rowData.agentCommission;


   

    // Access row data attributes using dot notation, e.g., rowData.agency_ID
}



function updateAgencyPayments() {

   


    var dataToSend = {
        e2eis_Seq_Number:document.getElementById("e2eis_Seq_Number").value,
        CompMonth:document.getElementById("CompMonth").value,
        Carrier:document.getElementById("Carrier").value,
        ComStatementSource:document.getElementById("ComStatementSource").value,
        WritingAgentNumber:document.getElementById("WritingAgentNumber").value,
        WritingAgentName:document.getElementById("WritingAgentName").value,
        ContractID:document.getElementById("ContractID").value,
        CoverageToDate:document.getElementById("CoverageToDate").value,
        CoverageFromDate:document.getElementById("CoverageFromDate").value,
        OriginalEffectiveDate:document.getElementById("OriginalEffectiveDate").value,
        CancelDate:document.getElementById("CancelDate").value,
        RateType:document.getElementById("RateType").value,
        CommissionType :document.getElementById("CommissionType").value,
        AccountingDate :document.getElementById("AccountingDate").value,
        AgencyPaymentAmount :document.getElementById("AgencyPaymentAmount").value,
        AgentPayee :document.getElementById("AgentPayee").value,
        AgentPayeeName:document.getElementById("AgentPayeeName").value,
        AgentCommission:document.getElementById("AgentCommission").value
    };
    $.ajax({
        url: '/api/AgencyController/UpdatePaymentsDeatils',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
        success: function (data) {
            if (data.success) {
                Toast.fire({
                    icon: 'success',
                    title: '',
                    text: data.message,
                })
                $('#CommissionResearchSolution').DataTable().ajax.reload();

            }
            else {
                clearData()
                Toast.fire({
                    icon: 'error',
                    title: 'oops!',
                    text: data.message,
                })
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

function searchType() {
  var searchType= $('#searchType').val();
    if (searchType == "Month & Year") {
        document.getElementById("searchBoxDiv").style.display="none"
        document.getElementById("fromDiv").style.display="block"
        document.getElementById("toDiv").style.display="block"
    }
    else {
        document.getElementById("fromDiv").style.display = "none"
        document.getElementById("toDiv").style.display = "none"
        document.getElementById("searchBoxDiv").style.display = "block"
    }
}