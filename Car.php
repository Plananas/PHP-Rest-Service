<?php
class Car
{
    public $CarID;
    public $BlueBook;
    public $CarAge;
    public $CarType;
    public $CarUse;
    public $ClaimFrequency;
    public $MVRPoints;
    public $RedCar;
    public $TIF;
    public $Urbanicity;


    public function __construct($id, $bluebook, $age, $type, $use, $claimfrequency, $mvrpoints, $redcar, $tif, $urbanicity)
    {
        $this->CarID = $id;
        $this->BlueBook = $bluebook;
        $this->CarAge = $age;
        $this->CarType = $type;
        $this->CarUse = $use;
        $this->ClaimFrequency = $claimfrequency;
        $this->MVRPoints = $mvrpoints;
        $this->RedCar = $redcar;
        $this->TIF = $tif;
        $this->Urbanicity = $urbanicity;

    }

    public function getID()
    {
        return $this->CarID;
    }
    public function getBlueBook()
    {
        return $this->BlueBook;
    }
    public function getAge()
    {
        return $this->CarAge;
    }
    public function getType()
    {
        return $this->CarType;
    }
    public function getUse()
    {
        return $this->CarUse;
    }
    public function getClaimFreq()
    {
        return $this->ClaimFrequency;
    }
    public function getMVRP()
    {
        return $this->MVRPoints;
    }
    public function getRedCar()
    {
        return $this->RedCar;
    }
    public function getTIF()
    {
        return $this->TIF;
    }
    public function getUrbanicity()
    {
        return $this->Urbanicity;
    }

}
?>
