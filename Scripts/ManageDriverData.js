// jQuery functions to manipulate the main page and handle communication with
// the books web service via Ajax.
//
// Note that there is very little error handling in this file.  In particular, there
// is no validation in the handling of form data.  This is to avoid obscuring the 
// core concepts that the demo is supposed to show.

//Get all the drivers from the database//
function getAllDrivers()
{
    
    $.ajax({
        url: '/Insurance/Drivers',
        type: 'GET',
        cache: false,
        dataType: 'json',
        
        success: function (data) {
            createDriversTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
        
    });
}

//Get a specific driver from the database//
function getSpecificDriver()
{
    driverID = $('#IDInput').val()
    $.ajax({
        url: '/Insurance/Drivers/' + driverID,
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createDriversTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Create the table to display the driver data//
function createDriversTable(drivers)
{
    var strResult = '<div class="col-md-12">' + 
                    '<form onsubmit="getSpecificDriver()"> Search By ID: <input type="text" id="IDInput"><input type="submit"></form>' +
                    '<table class="table table-bordered table-hover">' +
                    '<table class="table table-bordered table-hover">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>ID</th>' +
                    '<th>Age</th>' +
                    '<th>Birth</th>' +
                    '<th>Education</th>' +
                    '<th>Gender</th>' +
                    '<th>HomeKids</th>' +
                    '<th>Home Value</th>' +
                    '<th>Income</th>' +
                    '<th>Kids Drive</th>' +
                    '<th>Marriage Status</th>' +
                    '<th>Occupation</th>' +
                    '<th>Parent 1</th>' +
                    '<th>Travel time</th>' +
                    '<th>YOJ</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';
    $.each(drivers, function (index, driver) 
    {                        
        strResult += "<tr><td>" + driver.DriverID + "</td><td> " + driver.Age + "</td><td>" + driver.Birth + "</td><td>" + driver.Education + "</td><td>" + driver.Gender + "</td><td>" + driver.HomeKids + "</td><td>" + driver.Home_Val + "</td><td>" + driver.Income + "</td><td>" + driver.KidsDriv + "</td><td>" + driver.MStatus + "</td><td>" + driver.Occupation + "</td><td>" + driver.Parent1 + "</td><td>" + driver.TravTime + "</td><td>" + driver.YOJ + "</td><td>";
        strResult += '<input type="button" value="Edit Driver" class="btn btn-sm btn-primary" onclick="editDriver(' + driver.DriverID + ');" />';
        strResult += '</td><td>';
        strResult += '<input type="button" value="Show Claims" class="btn btn-sm btn-primary" onclick="getDriverClaims(' + driver.DriverID + ');" />';
        strResult += '</td><td>';
        strResult += '<input type="button" value="Delete Driver" class="btn btn-sm btn-primary" onclick="deleteDriver(' + driver.DriverID + ');" />';
        strResult += "</td></tr>";
    });

    strResult += "</tbody></table></div>";
    $("#alldata").html(strResult);
}

//Create the form for adding new drivers to the database//
function createNewDriverForm()
{

    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';
    strResult += '<div class="form-group"><label for="DriverID" class="col-md-3 control-label">Driver ID</label><div class="col-md-9"><input type="text" class="form-control" id="DriverID"></div></div>';
    strResult += '<div class="form-group"><label for="Age" class="col-md-3 control-label">Age</label><div class="col-md-9"><input type="text" class="form-control" id="Age"></div></div>';
    strResult += '<div class="form-group"><label for="birthdateday" class="col-md-3 control-label">Birth Date</label><div class="col-md-1"><input type="text" class="form-control" id="birthdateday" placeholder="dd" size="2"></div><div class="col-md-1"><input type="text" class="form-control" id="birthdatemonth" placeholder="mm" size="2"></div><div class="col-md-1"><input type="text" class="form-control" id="birthdateyear" placeholder="yyyy" size="4"></div></div>';
    strResult += '<div class="form-group"><label for="Education" class="col-md-3 control-label">Education</label><div class="col-md-9"><input type="text" class="form-control" id="Education"></div></div>';
    strResult += '<div class="form-group"><label for="Gender" class="col-md-3 control-label">Gender</label><div class="col-md-9"><input type="text" class="form-control" id="Gender"></div></div>';
    strResult += '<div class="form-group"><label for="HomeKids" class="col-md-3 control-label">Home Kids</label><div class="col-md-9"><input type="text" class="form-control" id="HomeKids"></div></div>';
    strResult += '<div class="form-group"><label for="HomeVal" class="col-md-3 control-label">Home Value</label><div class="col-md-9"><input type="text" class="form-control" id="HomeVal"></div></div>';
    strResult += '<div class="form-group"><label for="Income" class="col-md-3 control-label">Income</label><div class="col-md-9"><input type="text" class="form-control" id="Income"></div></div>';
    strResult += '<div class="form-group"><label for="KidsDrive" class="col-md-3 control-label">Kids Drive</label><div class="col-md-9"><input type="text" class="form-control" id="KidsDriv"></div></div>';
    strResult += '<div class="form-group"><label for="MStatus" class="col-md-3 control-label">Marriage Status</label><div class="col-md-9"><input type="text" class="form-control" id="MStatus"></div></div>';
    strResult += '<div class="form-group"><label for="Occupation" class="col-md-3 control-label">Occupation</label><div class="col-md-9"><input type="text" class="form-control" id="Occupation"></div></div>';
    strResult += '<div class="form-group"><label for="Parent1" class="col-md-3 control-label">Parent1</label><div class="col-md-9"><input type="text" class="form-control" id="Parent1"></div></div>';
    strResult += '<div class="form-group"><label for="TravTime" class="col-md-3 control-label">Travel Time</label><div class="col-md-9"><input type="text" class="form-control" id="TravTime"></div></div>';
    strResult += '<div class="form-group"><label for="YOJ" class="col-md-3 control-label">YOJ</label><div class="col-md-9"><input type="text" class="form-control" id="YOJ"></div></div>';
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Add Driver" class="btn btn-sm btn-primary" onclick="addDriver();" />&nbsp;&nbsp;</div></div>';
    strResult += '</form></div>';
    $("#newdataform").html(strResult);
}

//Create the form for editing drivers in the database//
function createEditDriverForm(drivers)
{
    $.each(drivers, function (index, driver) 
    { 
        var birthDate = new Date(driver.Birth);
        var strResult = '<div class="col-md-12">';
        strResult += '<form class="form-horizontal" role="form">';
        strResult += '<div class="form-group"><label for="Age" class="col-md-3 control-label">Age</label><div class="col-md-9"><input type="text" class="form-control" id="Age" value="' + driver.Age + '"></div></div>';
        strResult += '<div class="form-group"><label for="birthdateday" class="col-md-3 control-label">Birth Date</label><div class="col-md-1"><input type="text" class="form-control" id="birthdateday" placeholder="dd" size="2" value="'+ birthDate.getDay() +'"></div><div class="col-md-1"><input type="text" class="form-control" id="birthdatemonth" placeholder="mm" size="2" value="'+ birthDate.getMonth() +'"></div><div class="col-md-1"><input type="text" class="form-control" id="birthdateyear" placeholder="yyyy" size="4" value="'+ birthDate.getFullYear() +'"></div></div>';
        strResult += '<div class="form-group"><label for="Education" class="col-md-3 control-label">Education</label><div class="col-md-9"><input type="text" class="form-control" id="Education" value="' + driver.Education + '"></div></div>';
        strResult += '<div class="form-group"><label for="Gender" class="col-md-3 control-label">Gender</label><div class="col-md-9"><input type="text" class="form-control" id="Gender" value="' + driver.Gender + '"></div></div>';
        strResult += '<div class="form-group"><label for="HomeKids" class="col-md-3 control-label">Home Kids</label><div class="col-md-9"><input type="text" class="form-control" id="HomeKids" value="' + driver.HomeKids + '"></div></div>';
        strResult += '<div class="form-group"><label for="HomeVal" class="col-md-3 control-label">Home Value</label><div class="col-md-9"><input type="text" class="form-control" id="HomeVal" value="' + driver.Home_Val + '"></div></div>';
        strResult += '<div class="form-group"><label for="Income" class="col-md-3 control-label">Income</label><div class="col-md-9"><input type="text" class="form-control" id="Income" value="' + driver.Income + '"></div></div>';
        strResult += '<div class="form-group"><label for="KidsDrive" class="col-md-3 control-label">Kids Drive</label><div class="col-md-9"><input type="text" class="form-control" id="KidsDriv" value="' + driver.KidsDriv + '"></div></div>';
        strResult += '<div class="form-group"><label for="MStatus" class="col-md-3 control-label">Marriage Status</label><div class="col-md-9"><input type="text" class="form-control" id="MStatus" value="' + driver.MStatus + '"></div></div>';
        strResult += '<div class="form-group"><label for="Occupation" class="col-md-3 control-label">Occupation</label><div class="col-md-9"><input type="text" class="form-control" id="Occupation" value="' + driver.Occupation + '"></div></div>';
        strResult += '<div class="form-group"><label for="Parent1" class="col-md-3 control-label">Parent1</label><div class="col-md-9"><input type="text" class="form-control" id="Parent1" value="' + driver.Parent1 + '"></div></div>';
        strResult += '<div class="form-group"><label for="TravTime" class="col-md-3 control-label">Travel Time</label><div class="col-md-9"><input type="text" class="form-control" id="TravTime" value="' + driver.TravTime + '"></div></div>';
        strResult += '<div class="form-group"><label for="YOJ" class="col-md-3 control-label">YOJ</label><div class="col-md-9"><input type="text" class="form-control" id="YOJ" value="' + driver.YOJ + '"></div></div>';
        strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Edit Driver" class="btn btn-sm btn-primary" onclick="editDriverValues(' + driver.DriverID + ');" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="getAllDrivers();" /></div></div>';
        strResult += '</form></div>';
        $("#alldata").html(strResult);
    });

}

//Add a driver to the database using the form we created//
function addDriver()
{
    var Birthdate = new Date($('#birthdateyear').val(), $('#birthdatemonth').val() - 1, $('#birthdateday').val()).toISOString().slice(0, 19).replace('T', ' ');
    var driver = {
		DriverID: $('#DriverID').val(),
        Age: $('#Age').val(),
        Birth: Birthdate,
        Education: $('#Education').val(),
        Gender: $('#Gender').val(),
        HomeKids: $('#HomeKids').val(),
        Home_Val: $('#HomeVal').val(),
        Income: $('#Income').val(),
        KidsDriv: $('#KidsDriv').val(),
        MStatus: $('#MStatus').val(),
        Occupation: $('#Occupation').val(),
        Parent1: $('#Parent1').val(),
        TravTime: $('#TravTime').val(),
        YOJ: $('#YOJ').val(),

    };

    $.ajax({
        url: '/Insurance/Drivers',
        type: 'POST',
        data: JSON.stringify(driver),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            alert("Record uploaded successfully.");
            getAllDrivers();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    
}

//Setup for creating the edit driver form//
//I am grabbing the values so we can see what we are editing//
function editDriver(driverID)
{

    $.ajax({
        url: '/Insurance/Drivers/' + driverID,
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {

            createEditDriverForm(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Edit a driver in the database using the form we created//
function editDriverValues(driverId)
{
    var Birthdate = new Date($('#birthdateyear').val(), $('#birthdatemonth').val() - 1, $('#birthdateday').val()).toISOString().slice(0, 19).replace('T', ' ');
    var driver = {
		DriverID: driverId,
        Age: $('#Age').val(),
        Birth: Birthdate,
        Education: $('#Education').val(),
        Gender: $('#Gender').val(),
        HomeKids: $('#HomeKids').val(),
        Home_Val: $('#HomeVal').val(),
        Income: $('#Income').val(),
        KidsDriv: $('#KidsDriv').val(),
        MStatus: $('#MStatus').val(),
        Occupation: $('#Occupation').val(),
        Parent1: $('#Parent1').val(),
        TravTime: $('#TravTime').val(),
        YOJ: $('#YOJ').val(),

    };

    $.ajax({
        url: '/Insurance/Drivers',
        type: 'PUT',
        data: JSON.stringify(driver),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            getAllDrivers();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Delete a driver from the database using their ID//
function deleteDriver(driverId)
{
    $.ajax({
        url: '/Insurance/Drivers/' + driverId,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            getAllDrivers();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Setup for the driver financial table//
function DriverHouseStats()
{
    $.ajax({
        url: '/Insurance/Drivers',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            console.log("DataReceived");
            createHouseChart(data);
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}