$(document).ready(function () {

    var cookies = getCookies();
    if (cookies['agencyID'] == "101") {
        AgencyRates();
    } else {
        AIAAgencyRatesList();
    }
  
   
    //$('#empLoader').hide();

});



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


function AgencyRates() {
    var counter = 0;
    dataTable = $("#AgencyRates").DataTable({
        ajax: {
            'type': 'GET',
            'url': '/api/AgencyController/AgencyRatesData',
            'contentType': 'application/json',
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
                'data': 'year', 'render': function (data, type, row) {
                    return `<span>${row.year}</span>`;
                },
                'width': '5%', 'font-size': '6px'
            },
            {
                'data': 'agent_Contract_Type',
                'render': function (data, type, row) {

                    return `<span>${row.agent_Contract_Type}</span>`;

                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'e2E_Plan_Description',
                'render': function (data, type, row) {
                    return `<span>${row.e2E_Plan_Description}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'fB_Commission_Flat_Rate',
                'render': function (data, type, row) {
                    return `<span>${row.fB_Commission_Flat_Rate}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'standard_Amount',
                'render': function (data, type, row) {
                    return `<span>${row.standard_Amount}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'payment_Type',
                'render': function (data, type, row) {
                    return `<span>${row.payment_Type}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'agency_Name',
                'render': function (data, type, row) {
                    return `<span>${row.agency_Name}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
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
                'data': 'agency_ID',
                'render': function (data, type, row) {
                    return `<span>${row.agency_ID}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'record_Load_Date',
                'render': function (data, type, row) {
                    return `<span>${row.record_Load_Date}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },

            {
                'data': 'agency_ID',
                'render': function (data, type, row, meta) {
                    return `
                <button data-row='${JSON.stringify(row)}' data-toggle ="modal" data-target="#AgencyModal" onclick="getAgencyRatesDetails(this)"   type="button" class="btn btn-primary"><i class="fa fa-edit"></i>Edit</button>
            `;

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
                text: '<i class="fa fa-file-pdf-o mr-2"></i>Download Pdf',
                title: 'AGENCY RATES ABI(101)',
                exportOptions: {
                    columns: [1,2,3,4,5,6,7],
                },
            },
            {
                extend: "excel",
                text: '<i class="fa fa-file-excel-o mr-2"></i>Download Excel',
                title: 'AGENCY RATES ABI(101)',
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

        language: {
            searchPlaceholder: "Search records",
            emptyTable: "Please Wait data retrieval in progress",
            width: '100%',
        },
    }
    );
    dataTable.buttons().container().addClass('ml-4');
    dataTable.on('order.dt ', function () {
        dataTable.column(0, { order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

}

function AIAAgencyRatesList() {
    $('#empLoader').show();
    $.ajax({
        url: '/api/AgencyController/AIAAgencyRates',
        type: 'GET',
        contentType: 'application/json',
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
            if ($.fn.DataTable.isDataTable('#AIAAgencyRates')) {
                $('#AIAAgencyRates').DataTable().clear().destroy();
            }

            var dataTable = $("#AIAAgencyRates").DataTable({
                data: res.data,
                columns: [
                    {
                        'data': null, 'render': function (data, type, row, meta) {
                            return meta.row + 1; // Index
                        },
                        'width': '1%', 'font-size': '6px'
                    },
                        { 'data': 'year', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'segment', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'agent_Role', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'comp_Statement', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'product_Type', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'commission_Type', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'agency_Comp_Type', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'contract_Starts_With', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'e2E_Plan_Description', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'frequency', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'carrier_Rate', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'employee_Rate', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'payment_Rate', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'override_Rate', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'rate_Type', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'enrollment_Year_Start', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'enrollment_Year_End', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'group_Size_Range_Start', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'group_Size_Range_End', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'group_County', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'tier1_Amount', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'tier2_Amount', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'tier3_Amount', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'state', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'department', 'width': '5%', 'font-size': '6px' },
                        {
                            'data': 'e2eis_Seq_Number',
                                'render': function (data, type, row, meta) {
                                    return `
                        <button data-row='${JSON.stringify(row)}' data-toggle ="modal" data-target="#AIAAgencyModal" onclick="AIAgetAgencyRatesDetails(this)"   type="button" class="btn btn-primary"><i class="fa fa-edit"></i>Edit</button>
                    `;

                                },
                                'width': '20%',
                                'font-size': '6px'
                            }

                   
                ],
                "font-size": '1em',
                dom: 'lBfrtip',
                buttons: [
                    {
                        extend: 'pdf',
                        text: '<i class="fa fa-file-pdf-o mr-2"></i>Download Pdf',
                        title: 'AGENCY RATES ABI(102)',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6, 7],
                        },
                    },
                    {
                        extend: "excel",
                        text: '<i class="fa fa-file-excel-o mr-2"></i>Download Excel',
                        title: 'AGENCY RATES ABI(102)',
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


function AIAgetAgencyRatesDetails(button) {
    var rowData = JSON.parse(button.getAttribute('data-row'));
    console.log(rowData);
    document.getElementById("AIAE2eis_Seq_Number").value = rowData.e2eis_Seq_Number;
    document.getElementById("AIAYear").value = rowData.year;
    document.getElementById("AIASegment").value = rowData.segment;
    document.getElementById("AIAAgent_Role").value = rowData.agent_Role;
    document.getElementById("AIAComp_Statement").value = rowData.comp_Statement;
    document.getElementById("AIAProduct_Type").value = rowData.product_Type;
    document.getElementById("AIACommission_Type").value = rowData.commission_Type;
    document.getElementById("AIAAgency_Comp_Type").value = rowData.agency_Comp_Type;
    document.getElementById("AIAContract_Starts_With").value = rowData.contract_Starts_With;
    document.getElementById("AIAE2E_Plan_Description").value = rowData.e2E_Plan_Description;
    document.getElementById("AIAFrequency").value = rowData.frequency;
    document.getElementById("AIACarrier_Rate").value = rowData.carrier_Rate;
    document.getElementById("AIAEmployee_Rate").value = rowData.employee_Rate;
    document.getElementById("AIAPayment_Rate").value = rowData.payment_Rate;
    document.getElementById("AIAOverride_Rate").value = rowData.override_Rate;
    document.getElementById("AIARate_Type").value = rowData.rate_Type;
    document.getElementById("AIAEnrollment_Year_Start").value = rowData.enrollment_Year_Start;
    document.getElementById("AIAEnrollment_Year_End").value = rowData.enrollment_Year_End;
    document.getElementById("AIAGroup_Size_Range_Start").value = rowData.group_Size_Range_Start;
    document.getElementById("AIAGroup_Size_Range_End").value = rowData.group_Size_Range_End;
    document.getElementById("AIAGroup_County").value = rowData.group_County;
    document.getElementById("AIATier1_Amount").value = rowData.tier1_Amount;
    document.getElementById("AIATier2_Amount").value = rowData.tier2_Amount;
    document.getElementById("AIATier3_Amount").value = rowData.tier3_Amount;
    document.getElementById("AIAState").value = rowData.state;
    document.getElementById("AIADepartment").value = rowData.department;

    // Access row data attributes using dot notation, e.g., rowData.agency_ID
}

function getAgencyRatesDetails(button) {
    var rowData = JSON.parse(button.getAttribute('data-row'));
    console.log(rowData);
    document.getElementById("E2eis_Seq_Number").value = rowData.e2eis_Seq_Number;
    document.getElementById("Year").value = rowData.year;
    document.getElementById("Segment").value = rowData.segment;
    document.getElementById("Agent_Contract_Type").value = rowData.agent_Contract_Type;
    document.getElementById("FB_Comp_Statement").value = rowData.fB_Comp_Statement;
    document.getElementById("FB_Product_ID").value = rowData.fB_Product_ID
    document.getElementById("FB_Comp_Type").value = rowData.fB_Comp_Type
    document.getElementById("Agency_Comp_Type").value = rowData.agency_Comp_Type
    document.getElementById("Contract_Starts_With").value = rowData.contract_Starts_With
    document.getElementById("E2E_Plan_Description").value = rowData.e2E_Plan_Description
    document.getElementById("Frequency").value = rowData.frequency
    document.getElementById("FB_Commission_Flat_Rate").value = rowData.fB_Commission_Flat_Rate
    document.getElementById("Standard_Amount").value = rowData.standard_Amount
    document.getElementById("Percent_Of_FB_Payment").value = rowData.percent_Of_FB_Payment
    document.getElementById("Override_Percent_Of_FB_Payment").value = rowData.override_Percent_Of_FB_Payment
    document.getElementById("Payment_Type").value = rowData.payment_Type
    document.getElementById("Tier1_Percent_Of_FB_Payment").value = rowData.tier1_Percent_Of_FB_Payment
    document.getElementById("Tier2_Percent_Of_FB_Payment").value = rowData.tier2_Percent_Of_FB_Payment
    document.getElementById("Tier3_Percent_Of_FB_Payment").value = rowData.tier3_Percent_Of_FB_Payment
    document.getElementById("Tier4_Percent_Of_FB_Payment").value = rowData.tier4_Percent_Of_FB_Payment
    document.getElementById("Enrollment_Year_Start").value = rowData.enrollment_Year_Start
    document.getElementById("Enrollment_Year_End").value = rowData.enrollment_Year_End
    document.getElementById("Group_Size_Range_Start").value = rowData.group_Size_Range_Start
    document.getElementById("Group_Size_Range_End").value = rowData.group_Size_Range_End
    document.getElementById("Group_County").value = rowData.group_County
    document.getElementById("Tier1_Amount").value = rowData.tier1_Amount
    document.getElementById("Tier2_Amount").value = rowData.tier2_Amount
    document.getElementById("Tier3_Amount").value = rowData.tier3_Amount
    document.getElementById("Carrier").value = rowData.carrier
    document.getElementById("Agency_Name").value = rowData.agency_Name
    document.getElementById("Tier5_Percent_Of_FB_Payment").value = rowData.tier5_Percent_Of_FB_Payment
    document.getElementById("Tier6_Percent_Of_FB_Payment").value = rowData.tier6_Percent_Of_FB_Payment
    document.getElementById("Tier7_Percent_Of_FB_Payment").value = rowData.tier7_Percent_Of_FB_Payment
    document.getElementById("Tier8_Percent_Of_FB_Payment").value = rowData.tier8_Percent_Of_FB_Payment
    document.getElementById("Tier9_Percent_Of_FB_Payment").value = rowData.tier9_Percent_Of_FB_Payment
    document.getElementById("Tier10_Percent_Of_FB_Payment").value = rowData.tier10_Percent_Of_FB_Payment
    document.getElementById("Agency_ID").value = rowData.agency_ID
    document.getElementById("Record_Load_Date").value = rowData.record_Load_Date
    document.getElementById("Record_Loaded_By").value = rowData.record_Loaded_By
    document.getElementById("Record_Data_Source").value = rowData.record_Data_Source
    document.getElementById("Record_Flag_Status").value = rowData.record_Flag_Status

    // Access row data attributes using dot notation, e.g., rowData.agency_ID
}



function updateAgencyRates() {

    var E2eis_Seq_Number = document.getElementById("E2eis_Seq_Number").value;
    var Year =document.getElementById("Year").value;
    var Segment =document.getElementById("Segment").value;
    var Agent_Contract_Type =document.getElementById("Agent_Contract_Type").value;
    var FB_Comp_Statement =document.getElementById("FB_Comp_Statement").value;
    var FB_Product_ID =document.getElementById("FB_Product_ID").value;
    var FB_Comp_Type =document.getElementById("FB_Comp_Type").value;
    var Agency_Comp_Type =document.getElementById("Agency_Comp_Type").value;
    var Contract_Starts_With =document.getElementById("Contract_Starts_With").value;
    var E2E_Plan_Description =document.getElementById("E2E_Plan_Description").value;
    var Frequency =document.getElementById("Frequency").value;
    var FB_Commission_Flat_Rate =document.getElementById("FB_Commission_Flat_Rate").value;
    var Standard_Amount =document.getElementById("Standard_Amount").value;
    var Percent_Of_FB_Payment =document.getElementById("Percent_Of_FB_Payment").value;
    var Override_Percent_Of_FB_Payment =document.getElementById("Override_Percent_Of_FB_Payment").value;
    var Payment_Type =document.getElementById("Payment_Type").value;
    var Tier1_Percent_Of_FB_Payment =document.getElementById("Tier1_Percent_Of_FB_Payment").value;
    var Tier2_Percent_Of_FB_Payment =document.getElementById("Tier2_Percent_Of_FB_Payment").value;
    var Tier3_Percent_Of_FB_Payment =document.getElementById("Tier3_Percent_Of_FB_Payment").value;
    var Tier4_Percent_Of_FB_Payment =document.getElementById("Tier4_Percent_Of_FB_Payment").value;
    var Enrollment_Year_Start =document.getElementById("Enrollment_Year_Start").value;
    var Enrollment_Year_End =document.getElementById("Enrollment_Year_End").value;
    var Group_Size_Range_Start =document.getElementById("Group_Size_Range_Start").value;
    var Group_Size_Range_End =document.getElementById("Group_Size_Range_End").value;
    var Group_County =document.getElementById("Group_County").value;
    var Tier1_Amount =document.getElementById("Tier1_Amount").value;
    var Tier2_Amount =document.getElementById("Tier2_Amount").value;
    var Tier3_Amount =document.getElementById("Tier3_Amount").value;
    var Carrier =document.getElementById("Carrier").value;
    var Agency_Name =document.getElementById("Agency_Name").value;
    var Tier5_Percent_Of_FB_Payment =document.getElementById("Tier5_Percent_Of_FB_Payment").value;
    var Tier6_Percent_Of_FB_Payment =document.getElementById("Tier6_Percent_Of_FB_Payment").value;
    var Tier7_Percent_Of_FB_Payment =document.getElementById("Tier7_Percent_Of_FB_Payment").value;
    var Tier8_Percent_Of_FB_Payment =document.getElementById("Tier8_Percent_Of_FB_Payment").value;
    var Tier9_Percent_Of_FB_Payment =document.getElementById("Tier9_Percent_Of_FB_Payment").value;
    var Tier10_Percent_Of_FB_Payment =document.getElementById("Tier10_Percent_Of_FB_Payment").value;
    var Agency_ID =document.getElementById("Agency_ID").value;
    var Record_Load_Date =document.getElementById("Record_Load_Date").value;
    var Record_Loaded_By =document.getElementById("Record_Loaded_By").value;
    var Record_Data_Source =document.getElementById("Record_Data_Source").value;
    var Record_Flag_Status =document.getElementById("Record_Flag_Status").value;

    var dataToSend = {
        E2eis_Seq_Number: E2eis_Seq_Number,
        Year: Year,
        Segment: Segment,
        Agent_Contract_Type: Agent_Contract_Type,
        FB_Comp_Statement: FB_Comp_Statement,
        FB_Product_ID: FB_Product_ID,
        FB_Comp_Type: FB_Comp_Type,
        Agency_Comp_Type: Agency_Comp_Type,
        Contract_Starts_With: Contract_Starts_With,
        E2E_Plan_Description: E2E_Plan_Description,
        Frequency: Frequency,
        FB_Commission_Flat_Rate: FB_Commission_Flat_Rate,
        Standard_Amount: Standard_Amount,
        Percent_Of_FB_Payment: Percent_Of_FB_Payment,
        Override_Percent_Of_FB_Payment: Override_Percent_Of_FB_Payment,
        Payment_Type: Payment_Type,
        Tier1_Percent_Of_FB_Payment: Tier1_Percent_Of_FB_Payment,
        Tier2_Percent_Of_FB_Payment: Tier2_Percent_Of_FB_Payment,
        Tier3_Percent_Of_FB_Payment: Tier3_Percent_Of_FB_Payment,
        Tier4_Percent_Of_FB_Payment: Tier4_Percent_Of_FB_Payment,
        Enrollment_Year_Start: Enrollment_Year_Start,
        Enrollment_Year_End: Enrollment_Year_End,
        Group_Size_Range_Start: Group_Size_Range_Start,
        Group_Size_Range_End: Group_Size_Range_End,
        Group_County: Group_County,
        Tier1_Amount: Tier1_Amount,
        Tier2_Amount: Tier2_Amount,
        Tier3_Amount: Tier3_Amount,
        Carrier: Carrier,
        Agency_Name: Agency_Name,
        Tier5_Percent_Of_FB_Payment: Tier5_Percent_Of_FB_Payment,
        Tier6_Percent_Of_FB_Payment: Tier6_Percent_Of_FB_Payment,
        Tier7_Percent_Of_FB_Payment: Tier7_Percent_Of_FB_Payment,
        Tier8_Percent_Of_FB_Payment: Tier8_Percent_Of_FB_Payment,
        Tier9_Percent_Of_FB_Payment: Tier9_Percent_Of_FB_Payment,
        Tier10_Percent_Of_FB_Payment: Tier10_Percent_Of_FB_Payment,
        Agency_ID: Agency_ID,
        Record_Load_Date: Record_Load_Date,
        Record_Loaded_By: Record_Loaded_By,
        Record_Data_Source: Record_Data_Source,
        Record_Flag_Status: Record_Flag_Status,
    };
    $.ajax({
        url: '/api/AgencyController/UpdateAgencyRateDeatils',
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
                $('#AgencyRates').DataTable().ajax.reload();

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




function AIAupdateAgencyRates() {

    var E2eis_Seq_Number = document.getElementById("AIAE2eis_Seq_Number").value;
    var Year = document.getElementById("AIAYear").value;
    var Segment = document.getElementById("AIASegment").value;
    var Agent_Role = document.getElementById("AIAAgent_Role").value;
    var Comp_Statement = document.getElementById("AIAComp_Statement").value;
    var Product_Type = document.getElementById("AIAProduct_Type").value;
    var Commission_Type = document.getElementById("AIACommission_Type").value;
    var Agency_Comp_Type = document.getElementById("AIAAgency_Comp_Type").value;
    var Contract_Starts_With = document.getElementById("AIAContract_Starts_With").value;
    var E2E_Plan_Description = document.getElementById("AIAE2E_Plan_Description").value;
    var Frequency = document.getElementById("AIAFrequency").value;
    var Carrier_Rate = document.getElementById("AIACarrier_Rate").value;
    var Employee_Rate = document.getElementById("AIAEmployee_Rate").value;
    var Payment_Rate = document.getElementById("AIAPayment_Rate").value;
    var Override_Rate = document.getElementById("AIAOverride_Rate").value;
    var Rate_Type = document.getElementById("AIARate_Type").value;
    var Enrollment_Year_Start = document.getElementById("AIAEnrollment_Year_Start").value;
    var Enrollment_Year_End = document.getElementById("AIAEnrollment_Year_End").value;
    var Group_Size_Range_Start = document.getElementById("AIAGroup_Size_Range_Start").value;
    var Group_Size_Range_End = document.getElementById("AIAGroup_Size_Range_End").value;
    var Group_County = document.getElementById("AIAGroup_County").value;
    var Tier1_Amount = document.getElementById("AIATier1_Amount").value;
    var Tier2_Amount = document.getElementById("AIATier2_Amount").value;
    var Tier3_Amount = document.getElementById("AIATier3_Amount").value;
    var State = document.getElementById("AIAState").value;
    var Department = document.getElementById("AIADepartment").value;

    var dataToSend = {
        E2eis_Seq_Number: E2eis_Seq_Number,
        Year:Year,
        Segment:Segment,
        Agent_Role:Agent_Role,
        Comp_Statement:Comp_Statement,
        Product_Type:Product_Type,
        Commission_Type:Commission_Type,
        Agency_Comp_Type:Agency_Comp_Type,
        Contract_Starts_With:Contract_Starts_With,
        E2E_Plan_Description:E2E_Plan_Description,
        Frequency:Frequency,
        Carrier_Rate:Carrier_Rate,
        Employee_Rate:Employee_Rate,
        Payment_Rate:Payment_Rate,
        Override_Rate:Override_Rate,
        Rate_Type:Rate_Type,
        Enrollment_Year_Start:Enrollment_Year_Start,
        Enrollment_Year_End:Enrollment_Year_End,
        Group_Size_Range_Start:Group_Size_Range_Start,
        Group_Size_Range_End:Group_Size_Range_End,
        Group_County:Group_County,
        Tier1_Amount:Tier1_Amount,
        Tier2_Amount:Tier2_Amount,
        Tier3_Amount:Tier3_Amount,
        State:State,
        Department:Department
    };
    $.ajax({
        url: '/api/AgencyController/AIAUpdateAgencyRateDeatils',
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
                location.reload();

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