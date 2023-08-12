<?php
class Driver
{
    public $DriverID;
    public $Age;
    public $Birth;
    public $Education;
    public $Gender;
    public $HomeKids;
    public $Home_Val;
    public $Income;
    public $KidsDriv;
    public $MStatus;
    public $Occupation;
    public $Parent1;
    public $TravTime;
    public $YOJ;


    public function __construct($id, $age, $birth, $education, $gender, $homekids, $home_val, $income, $kidsdriv, $mstatus, $occupation, $parent1, $travtime, $yoj)
    {
        $this->DriverID = $id;
        $this->Age = $age;
        $this->Birth = $birth;
        $this->Education = $education;
        $this->Gender = $gender;
        $this->HomeKids = $homekids;
        $this->Home_Val = $home_val;
        $this->Income = $income;
        $this->KidsDriv = $kidsdriv;
        $this->MStatus = $mstatus;
        $this->Occupation = $occupation;
        $this->Parent1 = $parent1;
        $this->TravTime = $travtime;
        $this->YOJ = $yoj;
    }

    public function getID()
    {
        return $this->DriverID;
    }
    public function getAge()
    {
        return $this->Age;
    }
    public function getBirth()
    {
        return $this->Birth;
    }
    public function getEdu()
    {
        return $this->Education;
    }
    public function getGender()
    {
        return $this->Gender;
    }
    public function getHomeKids()
    {
        return $this->HomeKids;
    }
    public function getHome_Val()
    {
        return $this->Home_Val;
    }
    public function getIncome()
    {
        return $this->Income;
    }
    public function getKidsDriv()
    {
        return $this->KidsDriv;
    }
    public function getMstatus()
    {
        return $this->MStatus;
    }
    public function getOccupation()
    {
        return $this->Occupation;
    }
    public function getParent1()
    {
        return $this->Parent1;
    }
    public function getTravTime()
    {
        return $this->TravTime;
    }
    public function getYOJ()
    {
        return $this->YOJ;
    }
}
?>
