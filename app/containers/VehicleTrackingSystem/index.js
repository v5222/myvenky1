import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";
import Menu from "antd/lib/menu";
import {  Breadcrumb, Tabs, Select, Input, Button } from "antd";
import { SearchOutlined, ArrowDownOutlined, DownOutlined, EnvironmentOutlined } from '@ant-design/icons';
import ErrorBoundary from "components/ErrorBoundary";
import history from "utils/history";
import  axios from "axios";
import ReactPaginate from "react-paginate";
const { TabPane } = Tabs;
const { Option } = Select;
 
function VehicleTrackingSystem({ logout, user }) {
  const [current, setCurrent] = useState("dashboard");
  const [customerName, setCustomerName] = useState([]);
  const [custFullDetails, setCustFullDetails] = useState([]);
  const [ searchValue, setSearchValue ] = useState([]);
  const [dummyArray, setDummyArray] = useState(["1","2","3","4"]);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [currPage, setCurrPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [tabData, setTabData] = useState([]);
  const [orgTabData, setOrgTabData] = useState([]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  function callback(key) {
    console.log(key);
  }

  function handleapidata(apidata){
    setCustomerName(apidata)
  }

  function handleCustDetailsdata(apidata){
    console.log("@@",apidata)
    const slice = apidata.slice(offset, offset + perPage)
    setPageCount(Math.ceil(custFullDetails.length / perPage))
    setOrgTabData(apidata)
    setTabData(slice)
  }

//  function handlePageClick(){
   // const selectedPage = e.selected;
  //  const offset = selectedPage * perPage;

  // setCurrPage(selectedPage)
  // setOffset(offset)
     // loadMoreData()
 // }

//  function loadMoreData() {
// 		const data = orgTabData;
		
//     const slice = tabData.slice(offset, offset + perPage)
//     setPageCount(Math.ceil(data.length / perPage))
//     setTabData(slice)

//   }

const reqOpt = {
  "body":{
    "type": "DDLCUSTOMER",
    "email": "muneesh" ,
    "customer":"ALL"
  }
};

const custDetilsReqObj = {
    "body": {
      "type": "GRIDLOAD",
      "email": "muneesh",
      "customer":"ALL"
  }
}



  useEffect(() => {
   
    axios.post("https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts",  reqOpt)
    .then(res => {
      // console.log("Response",res.data.body);
      if(res.data.body.statuscode == 200){
        handleapidata(res.data.body.bodymsg)
      }
    })

    axios.post("https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts", custDetilsReqObj)
    .then(res => {
      // console.log("custDetilsReqObj",res.data.body);
      if(res.data.body.statuscode == 200){
        handleCustDetailsdata(res.data.body.bodymsg)
      }
    })
  },[])

  useEffect(() => {

    console.log("searchValue",searchValue)
    
    let custVehicleSearchData = {
      "body": {
        "type": "VEHICLENOSEARCH",
        "email": "muneesh",
        "customer":"Ford india private limited",
        "vehicleno":searchValue.toString(),
      }
    }
    axios.post("https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts", custVehicleSearchData)
    .then(res => {
      console.log("8888777777",res.data.body);
      if(res.data.body.statuscode == 200){
        handleCustDetailsdata(res.data.body.bodymsg)
      }
    })
  },[searchValue])

  function handleSelectChange(value) {
    let v = value;
    let handleSelectedDatas= {
      "body": {
        "type": "GRIDLOAD",
        "email": "muneesh",
        "customer":v
    }
    }

    axios.post("https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts", handleSelectedDatas)
    .then(res => {
      console.log("handleSelectedDatas",res.data.body);
      if(res.data.body.statuscode == 200){
        handleCustDetailsdata(res.data.body.bodymsg)
      }
    })
  }

  
  return (
    <ErrorBoundary logout={logout} user={user}>
      <MainLayout logout={logout} user={user}>
        <main className="tvsit-dwm-container" >
        <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Customer - Vehicle Tracking System</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="dwm_title">Customer - Vehicle Tracking System</h1>
            <Menu
                onClick={handleClick}
                selectedKeys={[current]}
                mode="horizontal"
                className="dashboard_header"
            ></Menu>
              <div className="tvsit-vts-bgcontainer" >
              <div style={{ marginLeft:"30%", marginTop:"0.5%"}}>
                  <Select 
                  id= "custNameDet"
                  defaultValue="ALL"
                    style={{
                        width:200,
                        background: "#FFFFFF",
                        border: "1px solid #D9D9D9",
                      }}
                      placeholder="Select"
                      optionFilterProp="children"
                      onChange={handleSelectChange}
                      > 
                      {customerName.length > 0 && customerName.map((val, index) => {
                        console.log("#",val)
                        return (
                          <>
                            <Option value={val} key={index}>
                              {val}
                            </Option>
                          </>
                        )
                      })}
                  </Select>
                  <Input 
                  style={{
                    marginLeft:"15px",
                    background: "#FFFFFF",
                    width:200,
                    border: "1px solid #D9D9D9",
                  }}
                  onChange={ e => setSearchValue(e.target.value)}
                  placeholder="Enter Vehicle Number">
                  </Input>
                  <Button 
                  style={{marginLeft:"15px"}}
                  type="primary" icon={<SearchOutlined />}
                  >
                    Search
                  </Button>
                  <span total={10} defaultCurrent={5}
                  style={{marginLeft:"50px"}}
                  >Last Refresh Date</span> : 04/11/2020
                  </div>


                  
                  <Tabs style={{marginLeft:"25px"}} defaultActiveKey="1" onChange={callback}>

                  
                    <TabPane tab="Active" key="1">
                        {tabData.length > 0 && tabData.map((arr, ind) => {
                          return(
                        <div>
                          <div className="blueactivecontainer" >
                            <div className="tvsit-vts-container">
                             
                            <div className='d-flex'>
                                <div style={{marginRight:'30px',fontSize:'11px',color:'grey',lineHeight:"18px"}}>
                                  <p style={{fontWeight:'700'}}>TDO <span style={{color:'#008DC5'}}>E15TDO0000035</span></p>
                                  <p style={{fontWeight:'700'}}>ID <span style={{color:'#008DC5'}}>{arr.tripno ? arr.tripno : "--"}</span></p>
                                </div>
                                <div style={{marginRight:'10px',fontSize:'11px',color:'#123F74',lineHeight:"15px"}}>
                                  <p>TS7GHSJI45678</p>
                                  <button style={{backgroundColor:"green", fontWeight:"600", lineHeight:"10px"}}>In Transit</button>
                                </div>
                                <div style={{ alignItems:"center", textAlign:"center", marginRight:'15px', marginLeft:"15px",fontSize:'11px',color:'#123F74',lineHeight:"18px"}}>
                                  <p>Tracking <br/> active</p>
                                </div>
                              </div>


                            <div className="vl"></div>
                            <div className='d-flex'>
                            <div style={{marginRight:'30px',fontSize:'11px',lineHeight:"18px",fontWeight:'600'}}>
                          <p style={{color:"#123F74"}}><EnvironmentOutlined style={{color: '#2FCB16'}}/>{arr.originlocation ? arr.originlocation : "--"}</p>
                          <p style={{color:'#123F74'}}><EnvironmentOutlined style={{color: "#FF0000"}}/>{arr.destinationlocation ? arr.destinationlocation : "--"}</p>
                            </div>
                            <div style={{marginRight:'30px',fontSize:'11px',lineHeight:"18px",fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}> Started Date</p>
                          <p style={{color:'#123F74'}}>{arr.tripstarttimestamp ? arr.tripstarttimestamp : "--"}</p>
                            </div>
                            </div>
                            <div className="vl"></div>
                            <div className="'d-flex'">
                            <div style={{marginRight:'30px',fontSize:'11px',fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Remaining Distance</p>
                          <p style={{color:'#123F74'}}>{arr.remainingkm ? arr.remainingkm : "--"}</p>
                          </div>
                            
                            <div style={{marginRight:'30px',fontSize:'11px',fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Total Distance</p>
                          <p style={{color:'#123F74'}}>{arr.plannedkm ? arr.plannedkm : "--" }</p>
                              <p style={{color:"red"}}>More Details <DownOutlined/></p>
                            </div>
                            </div>
                            <div className="vl"></div>
                            <div style={{marginLeft:"50px", marginTop:"15px"}}>
                              <img width="45px" height="45px" 
                                src={require('../../images/map-location.png')} 
                                onClick={()=> history.push({
                                  pathname:"/vehicletrackingsystemdetails",
                                  state: { message: ind},
                                  })}></img></div>
                            </div>
                        </div>
                        </div>
                          )
                        })}
                    </TabPane>






                    <TabPane tab="Completed" key="2">
                        {dummyArray.length > 0 && dummyArray.map((arr, ind) => {
                          return(
                            <div className="bluecompletedcontainer">
                      <div className="tvsit-vts-container">
                            <div className='d-flex'>
                            <div style={{marginRight:'30px',fontSize:'11px',color:'grey',lineHeight:"18px"}}>
                            <p style={{fontWeight:'700'}}>TDO <span style={{color:'#008DC5'}}>E15TDO0000035</span></p>
                            <p style={{fontWeight:'700'}}>ID <span style={{color:'#008DC5'}}>TDO0000035</span></p>
                            </div>
                            <div style={{marginRight:'10px',fontSize:'11px',color:'#123F74',lineHeight:"15px"}}>
                            <p>TS7GHSJI45678</p>
                            <button style={{backgroundColor:"red", fontWeight:"600", lineHeight:"10px"}}>Completed</button>
                            </div>
                            <div style={{ alignItems:"center", textAlign:"center", marginRight:'15px', marginLeft:"15px",fontSize:'11px',color:'#123F74',lineHeight:"18px"}}>
                            <p>Tracking <br/> active</p>
                            </div>
                            </div>
                            <div class="vl"></div>
                            <div className='d-flex'>
                            <div style={{marginRight:'30px',fontSize:'11px',lineHeight:"18px",fontWeight:'600'}}>
                            <p style={{color:"#123F74"}}>Mathura Road Faridabad, Faridabad</p>
                            <p style={{color:'#123F74'}}>Kollur, Medak</p>
                            </div>
                            <div style={{marginRight:'30px',fontSize:'11px',lineHeight:"18px",fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}> Started Date</p>
                            <p style={{color:'#123F74'}}>Oct 24 2020 11.27PM</p>
                            </div>
                            </div>
                            <div class="vl"></div>
                            <div style={{marginRight:'30px',fontSize:'11px',fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Remaining Distance</p>
                            <p style={{color:'#123F74'}}>52.0km</p>
                            </div>
                            <div style={{marginRight:'30px',fontSize:'11px',fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Total Distance</p>
                            <p style={{color:'#123F74'}}>48.00</p>
                            </div>
                            <div class="vl"></div>
                            <div style={{marginLeft:"50px", marginTop:"15px"}}><img width="45px" height="45px" src={require('../../images/map-location.png')} onClick={()=> history.push("/vehicletrackingsystemdetails")}></img></div>
                            </div>
                      </div>
                          )
                        })}
                    </TabPane>
                  </Tabs>
                  <ReactPaginate
                  previousLabel={'prev'}
                  nextLabel={'next'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCount}
                  marginPagesDisplayed={5}
                  pageRangeDisplayed={5}
                  // onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  ></ReactPaginate>
              </div>
        </main>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default VehicleTrackingSystem;

