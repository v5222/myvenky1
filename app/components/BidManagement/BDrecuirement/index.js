import React from "react";
import styles from "./bdrecuirement.module.scss";

import SelectCombo from "./SelectCombo";
import RadioCombo from "./RadioCombo";
function BDrecuirement() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Project Details</div>
      <hr className={styles.hr} />
      <div className={styles.wrapper}>
        <SelectCombo title="Business type" data={["New", "Exisiting"]} />
        <SelectCombo title="Customer Name" data={["New", "Exisiting"]} />
        <SelectCombo title="Location" type="input" />
        <SelectCombo title="City" type="input" />
        <SelectCombo title="Reference" data={["Customer", "RFQ"]} />
        <SelectCombo title="Division" data={["AIE", "CPR", "TechLog"]} />
        <SelectCombo title="LOB" type="input" />

        <SelectCombo title="AEI" data={["IPWH", "AMWH", "T&IL", "MHS"]} />
        <SelectCombo title="CPR" data={["AMWH", "T&IL", "others"]} />
        <SelectCombo title="TechLog" data={["AMWH", "T&IL", "others"]} />

        <SelectCombo title="Contract Term (Months)" type="input" />
        <SelectCombo title="Rent Per Month" type="input" />
        <SelectCombo title="Rental Deposits" type="input" />
        <SelectCombo title="Finance Fees" type="input" />
        <SelectCombo title="Overheads" type="input" />
        <SelectCombo title="Management Fees" type="input" />
        <SelectCombo title="Payable Days" data={["30", "45", "60", "90"]} />
      </div>
      <div style={{ margin: "20px 0px" }} />
      <div className={styles.title}>Key Business Conditions</div>
      <hr className={styles.hr} />
      <div className={styles.wrapper}>
        <RadioCombo title="Rights to a rate adjustment if no termination for convenience" />
        <RadioCombo title=" Cost changes beyond TVS SCS control whether covered eg Min Wages" />
        <RadioCombo title="Contract charging mechanism" />
        <RadioCombo title="Cost plus charging mechanism" />
        <RadioCombo title="Customer payment terms" />
        <RadioCombo title="Binding implications of Tender response" />
        <RadioCombo title="Start-up cost recovery" />
        <RadioCombo title='Allocation of costs in a "Shared User" Operation' />
        <RadioCombo title="Credit risk assessment" />
        <RadioCombo title="Customer discounts" />
        <RadioCombo title="Volume protection:" />
        <RadioCombo title="Liability for consequential damages" />
        <RadioCombo title="Force Majeure Events" />
        <RadioCombo title=" Liability for loss or damage to Customer goods" />
        <RadioCombo title="Type and status of legal agreement (i.e. contract or letter of intent):" />
        <RadioCombo title="Customer contract term" />
        <RadioCombo title="Vendor contract term" />
        <RadioCombo title="Customer termination provisions due to a change in TVS SCS control" />
        <RadioCombo title="TVS SCS right to assign receivables" />
        <RadioCombo title="Guarantees and Parental Support" />
        <RadioCombo title="Retroactive contract term" />
        <RadioCombo title="Customer billing cycle and late payments" />
        <RadioCombo title="Liability for delays in Implementation" />
        <RadioCombo title="Liability for personal injury and property damage" />
        <RadioCombo title="Liability arising out of IT" />
        <RadioCombo title="Insurance" />
        <RadioCombo title="Contingent reimbursement if Customer terminates for convenience" />
        <RadioCombo title="TVS SCS termination for convenience" />
        <RadioCombo title="Subcontracting" />
        <RadioCombo title="Assets Buy Back" />
      </div>
    </div>
  );
}

export default BDrecuirement;
