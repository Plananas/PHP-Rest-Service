<?php
class Claim
{
    public $ClaimID;
    public $CarID;
    public $DriverID;
    public $ClaimFlag;
    public $Claim_Amount;
    public $OldClaim;
    public $Revoked;


    public function __construct($claimid, $carid, $driverid, $claimflag, $claimamount, $oldclaim, $revoked)
    {
        $this->ClaimID = $claimid;
        $this->CarID = $carid;
        $this->DriverID = $driverid;
        $this->ClaimFlag = $claimflag;
        $this->Claim_Amount = $claimamount;;
        $this->OldClaim = $oldclaim;
        $this->Revoked = $revoked;

    }
    public function getClaimID()
    {
        return $this->ClaimID;
    }
    public function getCarID()
    {
        return $this->CarID;
    }
    public function getDriverID()
    {
        return $this->DriverID;
    }
    
    public function getClaimFlag()
    {
        return $this->ClaimFlag;
    }
    
    public function getClaimAmount()
    {
        return $this->Claim_Amount;
    } 

    public function getOldClaim()
    {
        return $this->OldClaim;
    }
    
    public function getRevoked()
    {
        return $this->Revoked;
    }

}
?>
