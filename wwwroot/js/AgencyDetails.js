$(document).ready(function () {
    AgencyList();
    //$('#empLoader').hide();

});


function AgencyList() {
    var counter = 0;
    dataTable = $("#AgencyList").DataTable({
        ajax: {
            'type': 'GET',
            'url': '/api/AgencyController/GetAgencyData',
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
                'data': 'contract_Year', 'render': function (data, type, row) {
                    return `<span>${row.contract_Year}</span>`;
                },
                'width': '5%', 'font-size': '6px'
            },
            {
                'data': 'employee_Type',
                'render': function (data, type, row) {

                    return `<span>${row.employee_Type}</span>`;

                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'employee_ID',
                'render': function (data, type, row) {
                    return `<span>${row.employee_ID}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'full_Name',
                'render': function (data, type, row) {
                    return `<span>${row.full_Name}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'primary_Role',
                'render': function (data, type, row) {
                    return `<span>${row.primary_Role}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'payroll_Id',
                'render': function (data, type, row) {
                    return `<span>${row.payroll_Id}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'payee_Employee_Id',
                'render': function (data, type, row) {
                    return `<span>${row.payee_Employee_Id}</span>`;
                },
                'width': '10%',
                'font-size': '6px'
            },
            {
                'data': 'payee_Name',
                'render': function (data, type, row) {
                    return `<span>${row.payee_Name}</span>`;
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
                <button data-row='${JSON.stringify(row)}' data-toggle ="modal" data-target="#AgencyModal" onclick="getAgencyDetails(this)"   type="button" class="btn btn-primary"><i class="fa fa-edit"></i>Edit</button>

                `;

                },
                'width': '20%',
                'font-size': '6px'
            }
        ],
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'pdf',
                text: '<i class="fa fa-file-pdf-o mr-2"></i>Download Pdf',
                title: 'AGENCY DETAILS',
                exportOptions: {
                    columns: [3, 4, 5, 6, 7, 8, 9],
                },
            },
            {
                extend: "excel",
                text: '<i class="fa fa-file-excel-o mr-2"></i>Download Excel',
                title: 'AGENCY DETAILS',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                },
            }
        ],
        "bDestroy": true,
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
function getAgencyDetails(button) {
    var rowData = JSON.parse(button.getAttribute('data-row'));
    console.log(rowData);
    document.getElementById("E2eis_Seq_Number").value = rowData.e2eis_Seq_Number;
    document.getElementById("Contract_Year").value = rowData.contract_Year;
    document.getElementById("Employee_Type").value = rowData.employee_Type;
    document.getElementById("Employee_ID").value = rowData.employee_ID;
    document.getElementById("Full_Name").value = rowData.full_Name;
    document.getElementById("Primary_Role").value = rowData.primary_Role;
    document.getElementById("Monthly_Renewal_Writing_Agent_Comp_Tier").value = rowData.monthly_Renewal_Writing_Agent_Comp_Tier;
    document.getElementById("Pre_ACA_Writing_Agent_Comp_Tier").value = rowData.pre_ACA_Writing_Agent_Comp_Tier;
    document.getElementById("LTL_Writing_Agent_Comp_Tier").value = rowData.ltL_Writing_Agent_Comp_Tier;
    document.getElementById("Med_Sup_Writing_Agent_Comp_Tier").value = rowData.med_Sup_Writing_Agent_Comp_Tier;
    document.getElementById("Dental_NewSale_Writing_Agent_Comp_Tier").value = rowData.dental_NewSale_Writing_Agent_Comp_Tier;
    document.getElementById("ACA_NewSale_Writing_Agent_Comp_Tier").value = rowData.acA_NewSale_Writing_Agent_Comp_Tier;
    document.getElementById("Group_Writing_Agent_Comp_Tier").value = rowData.group_Writing_Agent_Comp_Tier;
    document.getElementById("Ancillary_Renewal_Writing_Agent_Comp_Tier").value = rowData.ancillary_Renewal_Writing_Agent_Comp_Tier;
    document.getElementById("Payroll_Id").value = rowData.payroll_Id;
    document.getElementById("Payee_Employee_Id").value = rowData.payee_Employee_Id;
    document.getElementById("Payee_Name").value = rowData.payee_Name;
    document.getElementById("Main_Upline_Employee_ID").value = rowData.main_Upline_Employee_ID;
    document.getElementById("Main_Upline_Full_Name").value = rowData.main_Upline_Full_Name;
    document.getElementById("Role_End_Date").value = rowData.role_End_Date;
    document.getElementById("Role_End_Reason").value = rowData.role_End_Reason;
    document.getElementById("All_Sales_Payee").value = rowData.all_Sales_Payee;
    document.getElementById("Submitting_Agent").value = rowData.submitting_Agent;
    document.getElementById("Secondary_Role").value = rowData.secondary_Role;
    document.getElementById("Department_Entity_ID").value = rowData.department_Entity_ID;
    document.getElementById("Department_Name").value = rowData.department_Name;
    document.getElementById("Health_ACA_Employee_Tier").value = rowData.health_ACA_Employee_Tier;
    document.getElementById("Agency_ID").value = rowData.agency_ID;
    document.getElementById("Record_Load_Date").value = rowData.record_Load_Date;
    document.getElementById("Record_Loaded_By").value = rowData.record_Loaded_By;
    document.getElementById("Record_Data_Source").value = rowData.record_Data_Source;
    document.getElementById("Record_Flag_Status").value = rowData.record_Flag_Status;


    // Access row data attributes using dot notation, e.g., rowData.agency_ID
}



function updateAgencyDetails() {

    var E2eis_Seq_Number= document.getElementById("E2eis_Seq_Number").value;
    var Contract_Year= document.getElementById("Contract_Year").value;
    var Employee_Type= document.getElementById("Employee_Type").value;
    var Employee_ID= document.getElementById("Employee_ID").value;
    var Full_Name= document.getElementById("Full_Name").value;
    var Primary_Role= document.getElementById("Primary_Role").value;
    var Monthly_Renewal_Writing_Agent_Comp_Tier= document.getElementById("Monthly_Renewal_Writing_Agent_Comp_Tier").value;
    var Pre_ACA_Writing_Agent_Comp_Tier= document.getElementById("Pre_ACA_Writing_Agent_Comp_Tier").value;
    var LTL_Writing_Agent_Comp_Tier= document.getElementById("LTL_Writing_Agent_Comp_Tier").value;
    var Med_Sup_Writing_Agent_Comp_Tier= document.getElementById("Med_Sup_Writing_Agent_Comp_Tier").value;
    var Dental_NewSale_Writing_Agent_Comp_Tier= document.getElementById("Dental_NewSale_Writing_Agent_Comp_Tier").value;
    var ACA_NewSale_Writing_Agent_Comp_Tier= document.getElementById("ACA_NewSale_Writing_Agent_Comp_Tier").value;
    var Group_Writing_Agent_Comp_Tier= document.getElementById("Group_Writing_Agent_Comp_Tier").value;
    var Ancillary_Renewal_Writing_Agent_Comp_Tier= document.getElementById("Ancillary_Renewal_Writing_Agent_Comp_Tier").value;
    var Payroll_Id= document.getElementById("Payroll_Id").value;
    var Payee_Employee_Id= document.getElementById("Payee_Employee_Id").value;
    var Payee_Name= document.getElementById("Payee_Name").value;
    var Main_Upline_Employee_ID= document.getElementById("Main_Upline_Employee_ID").value;
    var Main_Upline_Full_Name= document.getElementById("Main_Upline_Full_Name").value;
    var Role_End_Date= document.getElementById("Role_End_Date").value;
    var Role_End_Reason= document.getElementById("Role_End_Reason").value;
    var All_Sales_Payee= document.getElementById("All_Sales_Payee").value;
    var Submitting_Agent= document.getElementById("Submitting_Agent").value;
    var Secondary_Role= document.getElementById("Secondary_Role").value;
    var Department_Entity_ID= document.getElementById("Department_Entity_ID").value;
    var Department_Name= document.getElementById("Department_Name").value;
    var Health_ACA_Employee_Tier= document.getElementById("Health_ACA_Employee_Tier").value;
    var Agency_ID= document.getElementById("Agency_ID").value;
    var Record_Load_Date= document.getElementById("Record_Load_Date").value;
    var Record_Loaded_By= document.getElementById("Record_Loaded_By").value;
    var Record_Data_Source= document.getElementById("Record_Data_Source").value;
    var Record_Flag_Status = document.getElementById("Record_Flag_Status").value;


    var dataToSend = {
        E2eis_Seq_Number: E2eis_Seq_Number,
        Contract_Year: Contract_Year,
        Employee_Type: Employee_Type,
        Employee_ID: Employee_ID,
        Full_Name: Full_Name,
        Primary_Role: Primary_Role,
        Monthly_Renewal_Writing_Agent_Comp_Tier: Monthly_Renewal_Writing_Agent_Comp_Tier,
        Pre_ACA_Writing_Agent_Comp_Tier: Pre_ACA_Writing_Agent_Comp_Tier,
        LTL_Writing_Agent_Comp_Tier: LTL_Writing_Agent_Comp_Tier,
        Med_Sup_Writing_Agent_Comp_Tier: Med_Sup_Writing_Agent_Comp_Tier,
        Dental_NewSale_Writing_Agent_Comp_Tier: Dental_NewSale_Writing_Agent_Comp_Tier,
        ACA_NewSale_Writing_Agent_Comp_Tier: ACA_NewSale_Writing_Agent_Comp_Tier,
        Group_Writing_Agent_Comp_Tier: Group_Writing_Agent_Comp_Tier,
        Ancillary_Renewal_Writing_Agent_Comp_Tier: Ancillary_Renewal_Writing_Agent_Comp_Tier,
        Payroll_Id: Payroll_Id,
        Payee_Employee_Id: Payee_Employee_Id,
        Payee_Name: Payee_Name,
        Main_Upline_Employee_ID: Main_Upline_Employee_ID,
        Main_Upline_Full_Name: Main_Upline_Full_Name,
        Role_End_Date: Role_End_Date,
        Role_End_Reason: Role_End_Reason,
        All_Sales_Payee: All_Sales_Payee,
        Submitting_Agent: Submitting_Agent,
        Secondary_Role: Secondary_Role,
        Department_Entity_ID: Department_Entity_ID,
        Department_Name: Department_Name,
        Health_ACA_Employee_Tier: Health_ACA_Employee_Tier,
        Agency_ID: Agency_ID,
        Record_Load_Date: Record_Load_Date,
        Record_Loaded_By: Record_Loaded_By,
        Record_Data_Source: Record_Data_Source,
        Record_Flag_Status: Record_Flag_Status
    };
    $.ajax({
        url: '/api/AgencyController/UpdateAgencyDeatils',
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
                $('#AgencyList').DataTable().ajax.reload();
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