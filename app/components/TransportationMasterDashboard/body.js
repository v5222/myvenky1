const BILLINGBASIS = {
  body: {
    type: "BILLINGBASIS",
    ou:"2" 
  }
}
 const INVOICETYPE = {
  body: {
    type: "INVOICETYPE",
    ou:"2" 
  }
}
 const REFDOC = {
  body: {
    type: "REFDOC",
    ou:"2" 
  }
}

const ROUTECODE =  {
  body: {
    type: "ROUTECODE",
    costcenter:"ERCTPT3245",
    ou:"2"
    
  }
}

const CUSTOMERCODE = {
  body: {
      type: "BILLINGDDLCUSTOMER",
      email: "",
  }
}

const COSTCENTER =  {
  body: {
    type: "SALECONTRACTCUSTOMER",
    ou:"2",
    customercode:""
  }
} 

export {BILLINGBASIS, INVOICETYPE, REFDOC, ROUTECODE, CUSTOMERCODE, COSTCENTER};
