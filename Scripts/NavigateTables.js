//Chooses the get function used when selecting a table on the dropdown//
function chooseGet() {
    table = document.getElementById("getselect").value;
    switch(table){
        case "cars":
            //alert("Getting all cars.")
            getAllCars();
            break;
        case "drivers":
            //alert("Getting all drivers.")
            getAllDrivers();
            break;
        case "claims":
            //alert("Getting all claims.")
            getAllClaims();
            break;
        default:
            alert("Error");
    }
}

//Chooses the form to show when selecting a table on the Add data dropdown//
function chooseAdd(){
    table = document.getElementById("editselect").value;
    switch(table){
        case "cars":
            
            createNewCarForm();
            
            break;
        case "drivers":

            createNewDriverForm();
            
            break;
        case "claims":
            
            createNewClaimForm();
            break;
        default:
            alert("Error");
    }
}

//Chooses the chart from the 4 available currently using the dropdown//
function chooseChart(){
    chart = document.getElementById("chartSelect").value;

    switch(chart){
        case "cars":
            CarAmountStats();
            break;
        case "drivers":
            DriverHouseStats();
            break;
        case "claims":
            ClaimValueStats();
            break;
        case "cartypes":
            CarTypeStats();
            break;

    }
}

// HTML for the statistics page//
function Statistics(){
    var strResult = 
            '<h2>Chart View</h2>' +
            '<label for="chartSelect">Choose a Graph:</label>' +
            '<select onchange="chooseChart()" id="chartSelect" name="chartselect" id="chartselect">' +
            '<option value="cars">Private Vs Commercial</option>' +
            '<option value="drivers">Age Vs Financial</option>' +
            '<option value="claims">Accepted Claim Amount</option>' +
            '<option value="cartypes">Car Types</option>' +
            '</select>' +
            '<div id="chart">' +
            '</div>' +
            '<div class="col-md-12">' + 
            '<h2>Table View</h2>' +
            '<label for="tables">Choose a table:</label>' +
            '<select onchange="chooseGet()" id="getselect" name="tables" id="tables">' +
            '<option value="drivers">Drivers</option>' +
            '<option value="cars">Cars</option>' +
            '<option value="claims">Claims</option>' +
            '</select>' +
            '<div id="alldata" class="row">' +
            '</div>'
            

    $("#Content").html(strResult);

    CarAmountStats();
    chooseGet();
}

//HTML for the Add Data page//
function Add(){
    var strResult = 
            '<div class="col-md-12">' + 
            '<h2>Add Data</h2>' +
            '<label for="tables">Choose a table:</label>' +

            '<select onchange="chooseAdd()" id="editselect" name="tables" id="tables">' +
            '<option value="drivers">Drivers</option>' +
            '<option value="cars">Cars</option>' +
            '<option value="claims">Claims</option>' +
            '</select>' +
            '<div id="newdataform" class="row">' +
            '</div>'
            

    $("#Content").html(strResult);
    chooseAdd()
}

//HTML for the Documentation page//
function Documentation(){
    var strResult = 
            '<div id="apiDocumentation">' +
            '<h2>API Documentation</h2>' +
            '<div class="requestBox">' +
            '<div class="titleBox" style="background-color: #37ae37;">' +
            '<h3>GET Request</h3>' +
            '</div>' +
            '<p>' +
            'The GET request retrieves data from the server.' +
            '<br>' +
            'Endpoint:' +
            '<br>' +
            '/Insurance/{Table Name}' +
            '<br>' +
            'Optional:' +
            '<br>' +
            '/{ID} - Get a specific ID.' +
            '<br>' +
            '/{ID}/Claims -- Get a specific Claim of a Car or Driver.' +
            '</p>' +
            '</div>' +
            '<div class="requestBox">' +
            '<div class="titleBox" style="background-color: #a4b85c;"">' +
            '<h3>POST Request</h3>' +
            '</div>' +
            '<p>' +
            'The POST request creates a new resource on the server.' +
            '<br>' +
            'Endpoint: /Insurance/{Table Name}' +
            '<br>' +
            'Body: { "property1": "value1", "property2": "value2" ...}' +
            '</p>' +
            '</div>' +
            '<div class="requestBox">' +
            '<div class="titleBox" style="background-color: #cf8d54;">' +
            '<h3>PUT Request</h3>' +
            '</div>' +
            '<p>' +
            'The PUT request updates an existing resource on the server.' +
            '<br>' +
            'Endpoint: /Insurance/{TableName}/{id}' +
            '<br>' +
            'Body: { "property1": "updatedValue1", "property2": "updatedValue2" ...}' +
            '</p>' +
            '</div>' +
            '<div class="requestBox">' +
            '<div class="titleBox" style="background-color: #e46363;">' +
            '<h3>DELETE Request</h3>' +
            '</div>' +
            '<p>' +
            'The DELETE request deletes a resource from the server.' +
            '<br>' +
            'Endpoint: /Insurance/{TableName}/{id}' +
            '</p>' +
            '</div>' +
            '</div>'

    
    $("#Content").html(strResult);

}