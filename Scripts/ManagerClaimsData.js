// jQuery functions to manipulate the main page and handle communication with
// the books web service via Ajax.
//
// Note that there is very little error handling in this file.  In particular, there
// is no validation in the handling of form data.  This is to avoid obscuring the 
// core concepts that the demo is supposed to show.

//Get all claims from the database//
function getAllClaims()
{
    $.ajax({
        url: '/Insurance/Claims',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            
            createClaimsTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Get a specific claim from the database//
function getSpecificClaim()
{
    claimID = $('#IDInput').val()
    $.ajax({
        url: '/Insurance/Claims/' + claimID,
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createClaimsTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Create a table to show all the claim data//
function createClaimsTable(claims)
{
   
    var strResult = '<div class="col-md-12">' + 
                    '<form onsubmit="getSpecificClaim()"> Input ID: <input type="text" id="IDInput"><input type="submit"></form>' +
                    '<table class="table table-bordered table-hover">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>ID</th>' +
                    '<th>CarID</th>' +
                    '<th>DriverID</th>' +
                    '<th>Claim Flag</th>' +
                    '<th>Claim Amount</th>' +
                    '<th>Old Claim</th>' +
                    '<th>Revoked</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';
    $.each(claims, function (index, claim) 
    {                  
              
        strResult += "<tr><td>" + claim.ClaimID + "</td><td> " + claim.CarID + "</td><td>" + claim.DriverID + "</td><td>" + claim.ClaimFlag + "</td><td>" + claim.Claim_Amount + "</td><td>" + claim.OldClaim + "</td><td>" + claim.Revoked + "</td><td>";
        strResult += '<input type="button" value="Edit Claim" class="btn btn-sm btn-primary" onclick="editClaim(' + claim.ClaimID + ');" />';
        strResult += '</td><td>';
        strResult += '<input type="button" value="Delete Claim" class="btn btn-sm btn-primary" onclick="deleteClaim(' + claim.ClaimID + ');" />';
        strResult += "</td></tr>";
        
    });

    strResult += "</tbody></table></div>";
    $("#alldata").html(strResult);
}

//Create a form for adding new claims to the database//
function createNewClaimForm()
{
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';
    strResult += '<div class="form-group"><label for="ClaimID" class="col-md-3 control-label">Claim ID</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimID"></div></div>';
    strResult += '<div class="form-group"><label for="CarID" class="col-md-3 control-label">Car ID</label><div class="col-md-9"><input type="text" class="form-control" id="CarID"></div></div>';
    strResult += '<div class="form-group"><label for="DriverID" class="col-md-3 control-label">Driver ID</label><div class="col-md-9"><input type="text" class="form-control" id="DriverID"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimFlag" class="col-md-3 control-label">Claim Flag</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimFlag"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimAmount" class="col-md-3 control-label">Claim Amount</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimAmount"></div></div>';
    strResult += '<div class="form-group"><label for="OldClaim" class="col-md-3 control-label">Old Claim</label><div class="col-md-9"><input type="text" class="form-control" id="OldClaim"></div></div>';
    strResult += '<div class="form-group"><label for="Revoked" class="col-md-3 control-label">Revoked</label><div class="col-md-9"><input type="text" class="form-control" id="Revoked"></div></div>';
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Add Claim" class="btn btn-sm btn-primary" onclick="addClaim();" />&nbsp;&nbsp;</div></div>';
    strResult += '</form></div>';
    $("#newdataform").html(strResult);
}

//Create a form for editing claims in the database//
function createEditClaimForm(claims)
{
    $.each(claims, function (index, claim) 
    {  
        var strResult = '<div class="col-md-12">';
        strResult += '<form class="form-horizontal" role="form">';
        strResult += '<div class="form-group"><label for="CarID" class="col-md-3 control-label">Car ID</label><div class="col-md-9"><input type="text" class="form-control" id="CarID" value="' + claim.CarID + '"></div></div>';
        strResult += '<div class="form-group"><label for="DriverID" class="col-md-3 control-label">Driver ID</label><div class="col-md-9"><input type="text" class="form-control" id="DriverID" value="' + claim.DriverID + '"></div></div>';
        strResult += '<div class="form-group"><label for="ClaimFlag" class="col-md-3 control-label">Claim Flag</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimFlag" value="' + claim.ClaimFlag + '"></div></div>';
        strResult += '<div class="form-group"><label for="ClaimAmount" class="col-md-3 control-label">Claim Amount</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimAmount" value="' + claim.Claim_Amount + '"></div></div>';
        strResult += '<div class="form-group"><label for="OldClaim" class="col-md-3 control-label">Old Claim</label><div class="col-md-9"><input type="text" class="form-control" id="OldClaim" value="' + claim.OldClaim + '"></div></div>';
        strResult += '<div class="form-group"><label for="Revoked" class="col-md-3 control-label">Revoked</label><div class="col-md-9"><input type="text" class="form-control" id="Revoked" value="' + claim.Revoked + '"></div></div>';
        strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Add Claim" class="btn btn-sm btn-primary" onclick="editClaimValues(' + claim.ClaimID + ');" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="getAllClaims();" /></div></div>';
        strResult += '</form></div>';
        $("#alldata").html(strResult);
    });
}

//Get the claims specific to the driver//
function getDriverClaims(driverID)
{
    $.ajax({
        url: '/Insurance/Drivers/' + driverID + '/Claims',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {

            createClaimsTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Get the claims specific to a car//
function getCarClaims(carID)
{
    $.ajax({
        url: '/Insurance/Cars/' + carID + '/Claims',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createClaimsTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Add a claim to the database using the form we created//
function addClaim()
{
    var claim = {
        ClaimID: $('#ClaimID').val(),
		CarID: $('#CarID').val(),
        DriverID: $('#DriverID').val(),
        ClaimFlag: $('#ClaimFlag').val(),
        Claim_Amount: $('#ClaimAmount').val(),
        OldClaim: $('#OldClaim').val(),
        Revoked: $('#Revoked').val()
    };

    $.ajax({
        url: '/Insurance/Claims',
        type: 'POST',
        data: JSON.stringify(claim),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            alert("Record uploaded successfully.");
            getAllClaims();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    
}

//Setup for editing a claim//
//grabs the data so we know what we are editing//
function editClaim(claimId)
{

    $.ajax({
        url: '/Insurance/Claims/' + claimId,
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {

            createEditClaimForm(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Edit the value in the database using the data on the form created//
function editClaimValues(claimId)
{
    var claim = {
        ClaimID: claimId,
		CarID: $('#CarID').val(),
        DriverID: $('#DriverID').val(),
        ClaimFlag: $('#ClaimFlag').val(),
        Claim_Amount: $('#ClaimAmount').val(),
        OldClaim: $('#OldClaim').val(),
        Revoked: $('#Revoked').val()
    };

    $.ajax({
        url: '/Insurance/Claims',
        type: 'PUT',
        data: JSON.stringify(claim),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            getAllClaims();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Delete a claim from the database//
function deleteClaim(claimId)
{
    $.ajax({
        url: '/Insurance/Claims/' + claimId,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            getAllClaims();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Setup for the non-revoked claim amount graph//
function ClaimValueStats()
{
    $.ajax({
        url: '/Insurance/Claims',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            console.log("DataReceived");
            createClaimsChart(data);
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}