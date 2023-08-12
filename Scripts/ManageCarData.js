// jQuery functions to manipulate the main page and handle communication with
// the books web service via Ajax.
//
// Note that there is very little error handling in this file.  In particular, there
// is no validation in the handling of form data.  This is to avoid obscuring the 
// core concepts that the demo is supposed to show.

//Get all the cars from the database//
function getAllCars()
{
    $.ajax({
        url: '/Insurance/Cars',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createCarsTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Get a specified car from the database//
function getSpecificCar()
{
    carID = $('#IDInput').val()
    $.ajax({
        url: '/Insurance/Cars/' + carID,
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createCarsTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Get a claim specific to a car//
function getCarClaim(carID)
{
    $.ajax({
        url: '/Insurance/Drivers/' + carID + '/Claims',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createCarsTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Create the table to show all the car data//
function createCarsTable(cars)
{
    var strResult = '<div class="col-md-12">' + 
                    '<form onsubmit="getSpecificCar()"> Input ID: <input type="text" id="IDInput"><input type="submit"></form>' +
                    '<table class="table table-bordered table-hover">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>ID</th>' +
                    '<th>Car Age</th>' +
                    '<th>Blue Book</th>' +
                    '<th>Car Type</th>' +
                    '<th>Car Use</th>' +
                    '<th>Claim Frequency</th>' +
                    '<th>MVR Points</th>' +
                    '<th>Red Car</th>' +
                    '<th>TIF</th>' +
                    '<th>Urbanicity</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';
    $.each(cars, function (index, car) 
    {                        
        strResult += "<tr><td>" + car.CarID + "</td><td> " + car.CarType + "</td><td>" + car.BlueBook + "</td><td>" + car.CarType + "</td><td>" + car.CarUse + "</td><td>" + car.ClaimFrequency + "</td><td>" + car.MVRPoints + "</td><td>" + car.RedCar + "</td><td>" + car.TIF + "</td><td>" + car.Urbanicity + "</td><td>";
        strResult += '<input type="button" value="Edit Car" class="btn btn-sm btn-primary" onclick="editCar(' + car.CarID + ');" />';
        strResult += '</td><td>';
        strResult += '<input type="button" value="Show Car Claims" class="btn btn-sm btn-primary" onclick="getCarClaims(' + car.CarID + ');" />';
        strResult += '</td><td>';
        strResult += '<input type="button" value="Delete Car" class="btn btn-sm btn-primary" onclick="deleteCar(' + car.CarID + ');" />';
        strResult += "</td></tr>";
    });

    strResult += "</tbody></table></div>";
    $("#alldata").html(strResult);
}

//Create a form for adding new cars to the database//
function createNewCarForm()
{
 
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';
    strResult += '<div class="form-group"><label for="CarID" class="col-md-3 control-label">Car ID</label><div class="col-md-9"><input type="text" class="form-control" id="CarID"></div></div>';
    strResult += '<div class="form-group"><label for="CarAge" class="col-md-3 control-label">Car Age</label><div class="col-md-9"><input type="text" class="form-control" id="CarAge"></div></div>';
    strResult += '<div class="form-group"><label for="BlueBook" class="col-md-3 control-label">Blue Book</label><div class="col-md-9"><input type="text" class="form-control" id="BlueBook"></div></div>';
    strResult += '<div class="form-group"><label for="CarUse" class="col-md-3 control-label">Car Use</label><div class="col-md-9"><input type="text" class="form-control" id="CarUse"></div></div>';
    strResult += '<div class="form-group"><label for="CarType" class="col-md-3 control-label">Car Type</label><div class="col-md-9"><input type="text" class="form-control" id="CarType"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimFrequency" class="col-md-3 control-label">Claim Frequency</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimFrequency"></div></div>';
    strResult += '<div class="form-group"><label for="MVRPoints" class="col-md-3 control-label">MVRPoints</label><div class="col-md-9"><input type="text" class="form-control" id="MVRPoints"></div></div>';
    strResult += '<div class="form-group"><label for="RedCar" class="col-md-3 control-label">RedCar</label><div class="col-md-9"><input type="text" class="form-control" id="RedCar"></div></div>';
    strResult += '<div class="form-group"><label for="TIF" class="col-md-3 control-label">TIF</label><div class="col-md-9"><input type="text" class="form-control" id="TIF"></div></div>';
    strResult += '<div class="form-group"><label for="Urbanicity" class="col-md-3 control-label">Urbanicity</label><div class="col-md-9"><input type="text" class="form-control" id="Urbanicity"></div></div>';
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Add Car" class="btn btn-sm btn-primary" onclick="addCar();" />&nbsp;&nbsp;</div></div>';
    strResult += '</form></div>';
    $("#newdataform").html(strResult);

}

//Create a form for editing cars in the database//
function createEditCarForm(cars)
{
    
    $.each(cars, function (index, car) 
    {  
        var strResult = '<div class="col-md-12">';
        strResult += '<form class="form-horizontal" role="form">';
        strResult += '<div class="form-group"><label for="CarAge" class="col-md-3 control-label">Car Age</label><div class="col-md-9"><input type="text" class="form-control" id="CarAge" value="' + car.CarAge + '"></div></div>';
        strResult += '<div class="form-group"><label for="BlueBook" class="col-md-3 control-label">Blue Book</label><div class="col-md-9"><input type="text" class="form-control" id="BlueBook" value="' + car.BlueBook + '"></div></div>';
        strResult += '<div class="form-group"><label for="CarUse" class="col-md-3 control-label">Car Use</label><div class="col-md-9"><input type="text" class="form-control" id="CarUse" value="' + car.CarUse + '"></div></div>';
        strResult += '<div class="form-group"><label for="CarType" class="col-md-3 control-label">Car Type</label><div class="col-md-9"><input type="text" class="form-control" id="CarType" value="' + car.CarType + '"></div></div>';
        strResult += '<div class="form-group"><label for="ClaimFrequency" class="col-md-3 control-label">Claim Frequency</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimFrequency" value="' + car.ClaimFrequency + '"></div></div>';
        strResult += '<div class="form-group"><label for="MVRPoints" class="col-md-3 control-label">MVRPoints</label><div class="col-md-9"><input type="text" class="form-control" id="MVRPoints" value="' + car.MVRPoints + '"></div></div>';
        strResult += '<div class="form-group"><label for="RedCar" class="col-md-3 control-label">RedCar</label><div class="col-md-9"><input type="text" class="form-control" id="RedCar" value="' + car.RedCar + '"></div></div>';
        strResult += '<div class="form-group"><label for="TIF" class="col-md-3 control-label">TIF</label><div class="col-md-9"><input type="text" class="form-control" id="TIF" value="' + car.TIF + '"></div></div>';
        strResult += '<div class="form-group"><label for="Urbanicity" class="col-md-3 control-label">Urbanicity</label><div class="col-md-9"><input type="text" class="form-control" id="Urbanicity" value="' + car.Urbanicity + '"></div></div>';
        strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Edit Car" class="btn btn-sm btn-primary" onclick="editCarValues(' + car.CarID + ');" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="getAllCars();" /></div></div>';
        strResult += '</form></div>';
        $("#alldata").html(strResult);
    }); 
}

//Add a car to the database using the form created//
function addCar()
{
    var car = {
		CarID: $('#CarID').val(),
        BlueBook: $('#BlueBook').val(),
        CarAge: $('#CarAge').val(),
        CarType: $('#CarType').val(),
        CarUse: $('#CarUse').val(),
        ClaimFrequency: $('#ClaimFrequency').val(),
        MVRPoints: $('#MVRPoints').val(),
        RedCar: $('#RedCar').val(),
        TIF: $('#TIF').val(),
        Urbanicity: $('#Urbanicity').val(),

    };

    $.ajax({
        url: '/Insurance/Cars',
        type: 'POST',
        data: JSON.stringify(car),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            alert("Record uploaded successfully.");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    
}

//setup for the edit car form//
//It will grab the value first so we know what we are editing//
function editCar(carID)
{
    $.ajax({
        url: '/Insurance/Cars/' + carID,
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createEditCarForm(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Edit the record using the form we created//
function editCarValues(carId)
{
    var car = {
		CarID: carId,
        BlueBook: $('#BlueBook').val(),
        CarAge: $('#CarAge').val(),
        CarType: $('#CarType').val(),
        CarUse: $('#CarUse').val(),
        ClaimFrequency: $('#ClaimFrequency').val(),
        MVRPoints: $('#MVRPoints').val(),
        RedCar: $('#RedCar').val(),
        TIF: $('#TIF').val(),
        Urbanicity: $('#Urbanicity').val(),

    };

    $.ajax({
        url: '/Insurance/Cars',
        type: 'PUT',
        data: JSON.stringify(car),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            getAllCars();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    
}

//Delete a car in the database//
function deleteCar(carId)
{
    $.ajax({
        url: '/Insurance/Cars/' + carId,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            getAllCars();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Setup for the Private Vs Commercial graph//
function CarAmountStats()
{
    $.ajax({
        url: '/Insurance/Cars',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {

            createAmountChart(data);
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Setup for the car type statistics graph//
function CarTypeStats() {
    $.ajax({
      url: '/Insurance/Cars',
      type: 'GET',
      cache: false,
      dataType: 'json',
      success: function (data) {
        createCarTypeChart(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
      }
    });
}