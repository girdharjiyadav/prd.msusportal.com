$(document).ready(function () {
    GetCommissionResearchSolution()
});

function GetCommissionResearchSolution() {
    $('#empLoader').show();
    $.ajax({
        url: '/api/AgencyController/GetData_AIA_COMMISSION_PAYMENT_HISTORY',
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
            if ($.fn.DataTable.isDataTable('#CommissionPaymentHistory')) {
                $('#CommissionPaymentHistory').DataTable().clear().destroy();
            }

            var dataTable = $("#CommissionPaymentHistory").DataTable({
                data: res.data,
                columns: [
                    {
                        'data': null, 'render': function (data, type, row, meta) {
                            return meta.row + 1; // Index
                        },
                        'width': '1%', 'font-size': '6px'
                    },
                        { 'data': 'carrier_Name', 'width': '5%', 'font-size': '6px'},
                        { 'data': 'agency_Name', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'agent_Name', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'agent_ID', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'agent_Number', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'agent_Commission_Note', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'effective_Date', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'client_Name', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'policy_ID', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'policy_Number', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'stmt_Coverage_Type', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'bill_From_Date', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'month_of_Bill_From_Date', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'lives', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'premium_Amount', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'commission_Amount', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'commission_Entry_Note', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'revenue_Type', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'balance_Forwarded', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'agency_Code', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'broker_Start_Date', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'broker_End_Date', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'product_Type', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'product_Description', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'imS_Transaction_ID', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'policy_Status', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'member_Count', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'on_Off_Exchange', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'boB_Coverage_Type', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'coverage_Start__Date', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'coverage_End_Date', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'paid_Through_Date', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'subscriber_First_Name', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'subscriber_Middle_Name', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'subscriber_Last_Name', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'subscriber_Full_Name', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'state', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'city', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'county', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'ims_Agent_Id', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'runner_Full_Name', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'runner_Role', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'override_Employee_Id', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'override_Payee_Name', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'override_Payee_Role', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'department_Employee_Id', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'department_Full_Name', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'department_Role', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'payment_Rate', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'rate', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'rate_Type', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'depart_Rate', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'depart_Rate_Type', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'agent_Commission', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'department_Commission', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'compensatioN_TYPE', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'removecommission', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'agent_Statement_Date', 'width': '5%', 'font-size': '6px' },
                        { 'data': 'comments', 'width': '5%', 'font-size': '6px' },
                ],
                "font-size": '1em',
                dom: 'lBfrtip',
                buttons: [
                    {
                        extend: 'pdf',
                        text: '<i class="fa fa-file-pdf-o mr-2"></i>Download Pdf',
                        title: 'AIA COMMISSION PAYMENT HISTORY',
                        exportOptions: {
                            columns: [3, 5, 6, 7, 8, 9],
                        },
                    },
                    {
                        extend: "excel",
                        text: '<i class="fa fa-file-excel-o mr-2"></i>Download Excel',
                        title: 'AIA COMMISSION PAYMENT HISTORY',
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
            dataTable.on('order.dt', function () {
                dataTable.column(0, { order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });
}


