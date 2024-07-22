$(document).ready(function () {
    GetBOBGridTable()
});

var cookies = getCookies();
function GetBOBGridTable() {
    $('#empLoader').show();
    $.ajax({
        url: '/api/BOBController/GetBobData',
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
            if ($.fn.DataTable.isDataTable('#BOBGridTable')) {
                $('#BOBGridTable').DataTable().clear().destroy();
            }


            var coloums103 = [{
                'data': null, 'render': function (data, type, row, meta) {
                    return meta.row + 1; // Index
                },
                'width': '1%', 'font-size': '6px'
            },
                { 'data': 'e2eis_Seq_Number', 'width': '5%', 'font-size': '6px' },
                { 'data': 'carrier', 'width': '5%', 'font-size': '6px' },
                { 'data': 'owning_Agent_of_Record', 'width': '5%', 'font-size': '6px' },
                { 'data': 'assigned_Agent_Number', 'width': '5%', 'font-size': '6px' },
                { 'data': 'broker_Start_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'broker_End_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'product_Type', 'width': '5%', 'font-size': '6px' },
                { 'data': 'product_Description', 'width': '5%', 'font-size': '6px' },
                { 'data': 'imS_Transaction_ID', 'width': '5%', 'font-size': '6px' },
                { 'data': 'policy_Status', 'width': '5%', 'font-size': '6px' },
                { 'data': 'policy_ID', 'width': '5%', 'font-size': '6px' },
                { 'data': 'group_Name', 'width': '5%', 'font-size': '6px' },
                { 'data': 'member_Count', 'width': '5%', 'font-size': '6px' },
                { 'data': 'on_Off_Exchange', 'width': '5%', 'font-size': '6px' },
                { 'data': 'exchange_Subscriber_ID', 'width': '5%', 'font-size': '6px' },
                { 'data': 'coverage_Type', 'width': '5%', 'font-size': '6px' },
                { 'data': 'subscriber_Original_Effective_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'coverage_Start__Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'coverage_End_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'paid_Through_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'subscriber_First_Name', 'width': '5%', 'font-size': '6px' },
                { 'data': 'subscriber_Middle_Name', 'width': '5%', 'font-size': '6px' },
                { 'data': 'subscriber_Last_Name', 'width': '5%', 'font-size': '6px' },
                { 'data': 'subscriber_Full_Name', 'width': '5%', 'font-size': '6px' },
                { 'data': 'subscriber_DOB', 'width': '5%', 'font-size': '6px' },
                { 'data': 'subscriber_Email', 'width': '5%', 'font-size': '6px' },
                { 'data': 'address', 'width': '5%', 'font-size': '6px' },
                { 'data': 'address_2', 'width': '5%', 'font-size': '6px' },
                { 'data': 'zip_Code', 'width': '5%', 'font-size': '6px' },
                { 'data': 'city', 'width': '5%', 'font-size': '6px' },
                { 'data': 'state', 'width': '5%', 'font-size': '6px' },
                { 'data': 'county', 'width': '5%', 'font-size': '6px' },
                { 'data': 'app_Submit_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'member_Phone_Number_1', 'width': '5%', 'font-size': '6px' },
                { 'data': 'member_Phone_Number_2', 'width': '5%', 'font-size': '6px' },
                { 'data': 'compensation_Type', 'width': '5%', 'font-size': '6px' },
                { 'data': 'compensation_Period', 'width': '5%', 'font-size': '6px' },
                { 'data': 'compensation_Amount', 'width': '5%', 'font-size': '6px' },
                { 'data': 'payee_Name', 'width': '5%', 'font-size': '6px' },
                { 'data': 'main_Upline_Agent', 'width': '5%', 'font-size': '6px' },
                { 'data': 'group_Team_Sales', 'width': '5%', 'font-size': '6px' },
                { 'data': 'transition_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'assigned_Agent_Name', 'width': '5%', 'font-size': '6px' },];

            var coloums104 = [

                {
                    'data': null, 'render': function (data, type, row, meta) {
                        return meta.row + 1; // Index
                    },
                    'width': '1%', 'font-size': '6px'
                },
                { 'data': 'e2eis_Seq_Number', 'width': '5%', 'font-size': '6px' },
                { 'data': 'carrier', 'width': '5%', 'font-size': '6px' },
                { 'data': 'broker_Start_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'broker_End_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'imS_Transaction_ID', 'width': '5%', 'font-size': '6px' },
                { 'data': 'policy_Status', 'width': '5%', 'font-size': '6px' },
                { 'data': 'policy_ID', 'width': '5%', 'font-size': '6px' },
                { 'data': 'member_Count', 'width': '5%', 'font-size': '6px' },
                { 'data': 'subscriber_Original_Effective_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'coverage_Start__Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'coverage_End_Date', 'width': '5%', 'font-size': '6px' },
                { 'data': 'state', 'width': '5%', 'font-size': '6px' },
                { 'data': 'county', 'width': '5%', 'font-size': '6px' },
                { 'data': 'group_Team_Sales', 'width': '5%', 'font-size': '6px' },
            ];

            var selectedColumns;
            if (cookies['agencyID'] == "103") {
                selectedColumns = coloums103;
            } else if (cookies['agencyID'] == "104") {
                selectedColumns = coloums104;
            }


            var dataTable = $("#BOBGridTable").DataTable({
                data: res.data,
                columns: selectedColumns,
                "font-size": '1em',
                dom: 'lBfrtip',
                buttons: [
                    {
                        extend: 'pdf',
                        text: '<i class="fa fa-file-pdf-o mr-2"></i>Download Pdf',
                        title: 'BOB AGENCY DATA',
                        exportOptions: {
                            columns: [1, 2, 3, 5, 6, 7],
                        },
                    },
                    {
                        extend: "excel",
                        text: '<i class="fa fa-file-excel-o mr-2"></i>Download Excel',
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