<?php
    require "dbinfo.php";
    require "RestService.php";
    require "Car.php";
	require "Driver.php";
	require "Claim.php";
	
 
class InsuranceRestService extends RestService 
{
	private $values;
    
	public function __construct() 
	{
		// Passing in the string 'Insurance' to the base constructor ensures that
		// all calls are matched to be sure they are in the form http://server/insurance/x/y/z 
		parent::__construct("Insurance");
	}
/////////////////////////////////////////GET Requests//////////////////////////////////////////////////////////////////
	public function performGet($url, $parameters, $requestBody, $accept) 
	{
		switch (count($parameters))
		{
			//This will be regular get requests//
			case 2:
				header('Content-Type: application/json; charset=utf-8');
				// This header is needed to stop IE cacheing the results of the GET	
				header('no-cache,no-store');
				$this->getAllValues($parameters[1]);
				echo json_encode($this->values);
				break;

			//This will be the specified records//
			case 3:
				header('Content-Type: application/json; charset=utf-8');
				// This header is needed to stop IE cacheing the results of the GET	
				header('no-cache,no-store');
				$this->getSpecificValues($parameters[1], $parameters[2]);
				echo json_encode($this->values);

				break;				
			
			//This will be the driver or car specific claims//
			case 4:
				if($parameters[3] == "Claims"){
					header('Content-Type: application/json; charset=utf-8');
					// This header is needed to stop IE cacheing the results of the GET	
					header('no-cache,no-store');
					$this->getSpecificClaim($parameters[1], $parameters[2]);
					echo json_encode($this->values);
				}
				else{
					$this->methodNotAllowedResponse();
				}
				break;	

			default:	
				$this->methodNotAllowedResponse();
		}
	}

	//This will get all values from the table requested//
    private function getAllValues($tablename)
    {
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
	
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			$query = "select * from " . $tablename;
			if ($result = $connection->query($query))
			{

				//only return the right data. This should help stop sql injection.//
				if($tablename == "Cars"){
					while ($row = $result->fetch_assoc())
					{
						$this->values[] = new Car($row["CarID"], $row["BLUEBOOK"], $row["CAR_AGE"], $row["CAR_TYPE"], $row["CAR_USE"], $row["CLM_FREQ"], $row["MVR_PTS"], $row["RED_CAR"], $row["TIF"], $row["URBANICITY"]);
					}	
				}
				else if ($tablename == "Drivers"){
					while ($row = $result->fetch_assoc())
					{
						$this->values[] = new Driver($row["DriverID"], $row["AGE"], $row["BIRTH"], $row["EDUCATION"], $row["GENDER"], $row["HOMEKIDS"], $row["HOME_VAL"], $row["INCOME"], $row["KIDSDRIV"], $row["MSTATUS"], $row["OCCUPATION"], $row["PARENT1"], $row["TRAVTIME"], $row["YOJ"]);
					}
				}
				else if ($tablename == "Claims"){
					while ($row = $result->fetch_assoc())
					{
						$this->values[] = new Claim($row["ClaimID"], $row["CarID"], $row["DriverID"], $row["CLAIM_FLAG"], $row["CLM_AMT"], $row["OLDCLAIM"], $row["REVOKED"]);
					}
				}
				else{
					$this->methodNotAllowedResponse();
				}

				$result->close();
			}
			$connection->close();
		}
	}

	//This will get the specified values from the cars and drivers table//
	private function getSpecificValues($tablename, $valueID){
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
		
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			//If user wants car data it will query the car table.
			if($tablename == "Cars"){
				$query = "select * from " . $tablename . " where CarID = " . $valueID;
				if ($result = $connection->query($query))
				{
					if($row = $result->fetch_assoc()){

						$this->values[] = new Car($row["CarID"], $row["BLUEBOOK"], $row["CAR_AGE"], $row["CAR_TYPE"], $row["CAR_USE"], $row["CLM_FREQ"], $row["MVR_PTS"], $row["RED_CAR"], $row["TIF"], $row["URBANICITY"]);
						
					}

					$result->close();
					
				}
				else{
					$this->methodNotAllowedResponse();
				}
			}
			//If user wants the drivers we query drivers//
			else if($tablename == "Drivers"){
				$query = "select * from " . $tablename . " where DriverID = " . $valueID;
				if ($result = $connection->query($query))
				{
					if($row = $result->fetch_assoc()){

						$this->values[] = new Driver($row["DriverID"], $row["AGE"], $row["BIRTH"], $row["EDUCATION"], $row["GENDER"], $row["HOMEKIDS"], $row["HOME_VAL"], $row["INCOME"], $row["KIDSDRIV"], $row["MSTATUS"], $row["OCCUPATION"], $row["PARENT1"], $row["TRAVTIME"], $row["YOJ"]);
					}
					$result->close();
					
				}
				else{
					$this->methodNotAllowedResponse();
				}
			}
			//if user wants claims we query claims//
			else if($tablename == "Claims"){
				$query = "select * from " . $tablename . " where ClaimID = " . $valueID;
				if ($result = $connection->query($query))
				{
					if($row = $result->fetch_assoc()){

						$this->values[] = new Claim($row["ClaimID"], $row["CarID"], $row["DriverID"], $row["CLAIM_FLAG"], $row["CLM_AMT"], $row["OLDCLAIM"], $row["REVOKED"]);
					}
					$result->close();
					
				}
				else{
					$this->methodNotAllowedResponse();
				}
			}
			else{
				$this->methodNotAllowedResponse();
			}
			
			$connection->close();
		}
	}

	//Gets the specified claim//
	private function getSpecificClaim($tablename, $valueID){
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
		
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			
			if($tablename == "Cars"){
				$query = "select * from Claims where CarID = " . $valueID;
				if ($result = $connection->query($query))
				{
					while ($row = $result->fetch_assoc())
					{
						$this->values[] = new Claim($row["ClaimID"], $row["CarID"], $row["DriverID"], $row["CLAIM_FLAG"], $row["CLM_AMT"], $row["OLDCLAIM"], $row["REVOKED"]);
					}	
					$result->close();	
				}
				else{
					$this->methodNotAllowedResponse();
				}
			}
			else if($tablename == "Drivers"){
				$query = "select * from Claims where DriverID = " . $valueID;
				if ($result = $connection->query($query))
				{
					while ($row = $result->fetch_assoc())
					{
						$this->values[] = new Claim($row["ClaimID"], $row["CarID"], $row["DriverID"], $row["CLAIM_FLAG"], $row["CLM_AMT"], $row["OLDCLAIM"], $row["REVOKED"]);
					}
					$result->close();	
				}
				else{
					$this->methodNotAllowedResponse();
				}
			}
			$connection->close();
		}

	}
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////POST Requests/////////////////////////////////////////////////////////////////

	public function performPost($url, $parameters, $requestBody, $accept) 
	{
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;

		$newRecord = $this->extractDataFromJSON($requestBody, $parameters);


		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			//This adds a car to the database//
			if($parameters[1] == "Cars"){
				$sql = "insert into Cars (CarID, CAR_USE, BLUEBOOK ,TIF, CAR_TYPE, RED_CAR, CLM_FREQ,   
						  MVR_PTS, CAR_AGE, URBANICITY) 
						  values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
				// We pull the fields of the cars into local variables since 
				// the parameters to bind_param are passed by reference.
				$statement = $connection->prepare($sql);

				$CarID			= $newRecord->getID();
				$BlueBook 		= $newRecord->getBlueBook();
				$CarAge 		= $newRecord->getAge();
				$CarType 		= $newRecord->getType();
				$CarUse 		= $newRecord->getUse();
				$ClaimFrequency = $newRecord->getClaimFreq();
				$MVRPoints 		= $newRecord->getMVRP();
				$RedCar 		= $newRecord->getRedCar();
				$TIF 			= $newRecord->getTIF();
				$Urbanicity 	= $newRecord->getUrbanicity();


				$statement->bind_param('ississiiis', $CarID , $CarUse, $BlueBook, $TIF, $CarType, $RedCar, $ClaimFrequency, $MVRPoints, $CarAge, $Urbanicity);
			}
			//This adds a driver to the database//
			else if($parameters[1] == "Drivers"){
				$sql = "insert into Drivers (DriverID, KIDSDRIV, BIRTH, AGE, HOMEKIDS, YOJ, INCOME, 
						PARENT1, HOME_VAL, MSTATUS, GENDER, EDUCATION,  OCCUPATION, TRAVTIME) 
						  values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
				// We pull the fields of the drivers into local variables since 
				// the parameters to bind_param are passed by reference.
				$statement = $connection->prepare($sql);

				$DriverID			= $newRecord->getID();
				$Age 				= $newRecord->getAge();
				$Birth 				= date('Y-m-d', strtotime($newRecord->getBirth()));
				$Education 			= $newRecord->getEdu();
				$Gender 			= $newRecord->getGender();
				$HomeKids 			= $newRecord->getHomeKids();
				$Home_Val 			= $newRecord->getHome_Val();
				$Income 			= $newRecord->getIncome();
				$KidsDriv 			= $newRecord->getKidsDriv();
				$MStatus 			= $newRecord->getMstatus();
				$Occupation 		= $newRecord->getOccupation();
				$Parent1 			= $newRecord->getParent1();
				$TravTime 			= $newRecord->getTravTime();
				$YOJ				= $newRecord->getYOJ();


				$statement->bind_param('iisiiisssssssi', $DriverID, $KidsDriv, $Birth, $Age, $HomeKids,
										 $YOJ, $Income, $Parent1, $Home_Val, $MStatus, $Gender,
										 $Education, $Occupation, $TravTime);
			}
			//This adds a claim to the database//
			else if($parameters[1] == "Claims"){
				$sql = "insert into Claims (ClaimID, CarID, CLAIM_FLAG, CLM_AMT, DriverID, OLDCLAIM, REVOKED) 
						  values ( ?, ?, ?, ?, ?, ?, ?)";
				// We pull the fields of the claims into local variables since 
				// the parameters to bind_param are passed by reference.
				$statement = $connection->prepare($sql);
				
				$ClaimID			= $newRecord->getClaimID();
				$DriverID			= $newRecord->getDriverID();
				$CarID 				= $newRecord->getCarID();
				$ClaimFlag 			= $newRecord->getClaimFlag();
				$ClaimAmount 		= $newRecord->getClaimAmount();
				$OldClaim 			= $newRecord->getOldClaim();
				$Revoked 			= $newRecord->getRevoked();


				$statement->bind_param('iiisiss', $ClaimID ,$CarID, $ClaimFlag, $ClaimAmount, $DriverID, $OldClaim,
										 $Revoked);
			}
			else{
				$this->methodNotAllowedResponse();
			}


			$result = $statement->execute();
			if ($result == FALSE)
			{
				$this->methodNotAllowedResponse();
			}
			$statement->close();
			$connection->close();
			if ($result == TRUE)
			{
				// We need to return the status as 204 (no content) rather than 200 (OK) since
				// we are not returning any data
				$this->noContentResponse();
			}
			else
			{
				$this->methodNotAllowedResponse();
			}
		}
	}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////PUT REQUESTS////////////////////////////////

	public function performPut($url, $parameters, $requestBody, $accept) 
	{
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;

		$newRecord = $this->extractDataFromJSON($requestBody, $parameters);
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			//This edits a car value//
			if ($parameters[1] == "Cars"){
				$sql = "update Cars set CAR_USE = ?, BLUEBOOK = ?, TIF = ?, CAR_TYPE = ?, 
				RED_CAR = ?, CLM_FREQ = ?, MVR_PTS = ?, CAR_AGE = ?, URBANICITY = ? where CarID = ?";

				// We pull the fields of the book into local variables since 
				// the parameters to bind_param are passed by reference.
				$statement 		= $connection->prepare($sql);

				$CarID			= $newRecord->getID();
				$BlueBook 		= $newRecord->getBlueBook();
				$CarAge 		= $newRecord->getAge();
				$CarType 		= $newRecord->getType();
				$CarUse 		= $newRecord->getUse();
				$ClaimFrequency = $newRecord->getClaimFreq();
				$MVRPoints 		= $newRecord->getMVRP();
				$RedCar 		= $newRecord->getRedCar();
				$TIF 			= $newRecord->getTIF();
				$Urbanicity 	= $newRecord->getUrbanicity();

				if (!$statement) {
					$errorMessage = $connection->error;
					error_log("Error in prepare(): " . $errorMessage, 0);
					$this->errorResponse($errorMessage);
					return;
				}
				
				$statement->bind_param('ssissiiisi', $CarUse, $BlueBook, $TIF, $CarType, $RedCar, $ClaimFrequency, $MVRPoints, $CarAge, $Urbanicity, $CarID);
			
			}
			//This edits a driver value//
			else if ($parameters[1] == "Drivers"){

				$sql = "update Drivers set KIDSDRIV = ?, AGE = ?, BIRTH = ?, HOMEKIDS = ?, YOJ = ?, INCOME = ?, 
				PARENT1 = ?, HOME_VAL = ?, MSTATUS = ?, GENDER = ?, EDUCATION = ?,  OCCUPATION = ?, TRAVTIME = ? 
				where DriverID = ?";
				// We pull the fields of the car into local variables since 
				// the parameters to bind_param are passed by reference.
				$statement = $connection->prepare($sql);

				$DriverID			= $newRecord->getID();
				$Age 				= $newRecord->getAge();
				$Birth 				= date('Y-m-d', strtotime($newRecord->getBirth()));
				$Education 			= $newRecord->getEdu();
				$Gender 			= $newRecord->getGender();
				$HomeKids 			= $newRecord->getHomeKids();
				$Home_Val 			= $newRecord->getHome_Val();
				$Income 			= $newRecord->getIncome();
				$KidsDriv 			= $newRecord->getKidsDriv();
				$MStatus 			= $newRecord->getMstatus();
				$Occupation 		= $newRecord->getOccupation();
				$Parent1 			= $newRecord->getParent1();
				$TravTime 			= $newRecord->getTravTime();
				$YOJ				= $newRecord->getYOJ();
				if (!$statement) {
					$errorMessage = $connection->error;
					error_log("Error in prepare(): " . $errorMessage, 0);
					$this->errorResponse($errorMessage);
					return;
				}

				$statement->bind_param('iisiissssssssi', $KidsDriv, $Age, $Birth, $HomeKids,
										$YOJ, $Income, $Parent1, $Home_Val, $MStatus, $Gender,
										$Education, $Occupation, $TravTime, $DriverID);
			}
			//This edits a claim value//
			else if ($parameters[1] == "Claims"){
				$sql = "update Claims set CarID = ?, CLAIM_FLAG = ?, CLM_AMT = ?, DriverID = ?, OLDCLAIM = ?, REVOKED = ? where ClaimID = ?";
				// We pull the fields of the car into local variables since 
				// the parameters to bind_param are passed by reference.
				$statement = $connection->prepare($sql);
				
				$ClaimID			= $newRecord->getClaimID();
				$DriverID			= $newRecord->getDriverID();
				$CarID 				= $newRecord->getCarID();
				$ClaimFlag 			= $newRecord->getClaimFlag();
				$ClaimAmount 		= $newRecord->getClaimAmount();
				$OldClaim 			= $newRecord->getOldClaim();
				$Revoked 			= $newRecord->getRevoked();
				if (!$statement) {
					$errorMessage = $connection->error;
					error_log("Error in prepare(): " . $errorMessage, 0);
					$this->errorResponse($errorMessage);
					return;
				}

				$statement->bind_param('iisissi' ,$CarID, $ClaimFlag, $ClaimAmount, $DriverID, $OldClaim,
				$Revoked, $ClaimID);
			}
			else{
				$this->methodNotAllowedResponse();		
			}

			$result = $statement->execute();
			if ($result == FALSE)
			{
				$this->methodNotAllowedResponse();	
			}
			$statement->close();
			$connection->close();
			if ($result == TRUE)
			{
				// We need to return the status as 204 (no content) rather than 200 (OK) since
				// we are not returning any data
				$this->noContentResponse();
			}
			else
			{
				error_log("Error in performPut(): " . $errorMessage, 0);
				$this->methodNotAllowedResponse();	
			}

		}


	}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////DELETE Requests///////////////////////////////

	public function performDelete($url, $parameters, $requestBody, $accept) 
	{
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
		
		if (count($parameters) == 3)
		{
			$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
			if (!$connection->connect_error)
			{
				if ($parameters[1] == "Cars"){
					$id = $parameters[2];
					$sql = "delete from Cars where CarID = ?";
					$statement = $connection->prepare($sql);
					$statement->bind_param('i', $id);
				}
				if ($parameters[1] == "Drivers"){
					$id = $parameters[2];
					$sql = "delete from Drivers where DriverID = ?";
					$statement = $connection->prepare($sql);
					$statement->bind_param('i', $id);
				}
				if ($parameters[1] == "Claims"){
					$id = $parameters[2];
					$sql = "delete from Claims where ClaimID = ?";
					$statement = $connection->prepare($sql);
					$statement->bind_param('i', $id);
				}



				$result = $statement->execute();
				if ($result == FALSE)
				{
					$errorMessage = $statement->error;
				}
				$statement->close();
				$connection->close();
				if ($result == TRUE)
				{
					// We need to return the status as 204 (no content) rather than 200 (OK) since
					// we are not returning any data
					$this->noContentResponse();
				}
				else
				{
					$this->errorResponse($errorMessage);
				}
			}
		}
	}

///////////////////////////////////////////////////////////////////////////
/////////////////////////////Extract JSON Data/////////////////////////////
    private function extractDataFromJSON($requestBody, $parameters)
    {
		// This function is needed because of the perculiar way json_decode works. 
		// By default, it will decode an object into a object of type stdClass.  There is no
		// way in PHP of casting a stdClass object to another object type.  So we use the
		// approach of decoding the JSON into an associative array (that's what the second
		// parameter set to true means in the call to json_decode). Then we create a new
		// object using the elements of the associative array.
		$dataArray = json_decode($requestBody, true);
		switch($parameters[1]){
			case "Cars":
				$car = new Car($dataArray['CarID'],
								 $dataArray['BlueBook'],
								 $dataArray['CarAge'],
								 $dataArray['CarType'],
								 $dataArray['CarUse'],
								 $dataArray['ClaimFrequency'],
								 $dataArray['MVRPoints'],
								 $dataArray['RedCar'],
								 $dataArray['TIF'],
								 $dataArray['Urbanicity']);
				unset($dataArray);
				return $car;
			case "Drivers":
				$driver = new Driver($dataArray['DriverID'],
								$dataArray['Age'],
								$dataArray['Birth'],
								$dataArray['Education'],
								$dataArray['Gender'],
								$dataArray['HomeKids'],
								$dataArray['Home_Val'],
								$dataArray['Income'],
								$dataArray['KidsDriv'],
								$dataArray['MStatus'],
								$dataArray['Occupation'],
								$dataArray['Parent1'],
								$dataArray['TravTime'],
								$dataArray['YOJ']);
				unset($dataArray);
				return $driver;

			case "Claims" :
				$claim = new Claim($dataArray['ClaimID'],
								$dataArray['CarID'],
								$dataArray['DriverID'],
								$dataArray['ClaimFlag'],
								$dataArray['Claim_Amount'],
								$dataArray['OldClaim'],
								$dataArray['Revoked']);
				unset($dataArray);
				return $claim;

			default:
				$this->notImplementedResponse();
		}
		

		
	}

}
?>
