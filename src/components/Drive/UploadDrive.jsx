import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import DownloadDB from "components/Database/DownloadDB.jsx";
import * as XLSX from 'xlsx';
import BarLoader from 'react-spinners/BarLoader';
import Select from 'react-dropdown-select';
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
  } from "react-bootstrap";

var shopData = [
    {
      "value" : "Naver",
      "label" : "Naver"
    },
    {
      "value" : "Coupang",
      "label" : "Coupang"
    },
    {
      "value" : "11st",
      "label" : "11st"
    },
  
]

var pricePoint = [
    {
      "value" : "A",
      "label" : "공급단가_1"
    },
    {
      "value" : "B",
      "label" : "공급단가_2"
    },
    {
      "value" : "C",
      "label" : "공급단가_3"
    },
  
]

var optionData = [];
function mapDataToTransportInfo(data) {

    fetch("../LT_Template.xlsx").then(res => res.arrayBuffer()).then(ab => {
      const wb = XLSX.read(ab, { type: "array" });
      const wsname = wb.SheetNames[0];
      const ws1 = wb.Sheets[wsname];
      var today = new Date();
  
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const min = 1;
      const max = 1000;
      const rand = min + Math.random() * (max - min);

    
      var fileName = date +"_" +rand+ "_LT_File.xlsx"
  
      data.forEach(function(item){
        XLSX.utils.sheet_add_aoa(ws1, [item], {origin: -1});
      })
  
      var dataJson = XLSX.utils.sheet_to_json(ws1, {defval:""}, function(error){
        console.log('finito');
      });
      XLSX.writeFile(wb,fileName);

      return dataJson;
    }).then(function(dataJson) {
      console.log(dataJson);
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(dataJson)
      };
  
      return new Promise((resolve, reject) => {
          fetch('https://hstapi.herokuapp.com/api/drive/upload', requestOptions)
          .then(function(response) {
            console.log(response)
          }).then(() => {
            resolve()
            window.location.reload(false)
          })
        })
  
    })
  
}

class UploadDrive extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            file: null,
            loading: false,
            fileName: '',
            conversionRate: 1.21,
            availableCompanies: []
          };
      }

    componentDidMount() {
        var optionDatas = [];
        var options = [];
        const res = fetch('https://hstapi.herokuapp.com/api/company/all')
        .then(response => response.json())
        .then(function(response) {
          options = response.map(item => ({
            "value" : item.companyName,
            "label" : item.companyName
          }))
        }).then(function(response) {
          options.forEach(item =>
            optionDatas.push(item)
            )
        })

        this.setState({availableCompanies : optionDatas})

    }

    onSelectFile=event=>{
        this.setState({file: event.target.files[0]});       

        this.setState({fileName : event.target.files[0].name});
      
    }

    onConvertFile(event) {
        if (this.state.file === null)
        {
            alert("Select a file");
          console.log('no file')
          return;
        }

        //console.log('company value' + this.state.selectedCompany[0].value)



        if (typeof(this.state.selectedShop) === 'undefined')
        {
          alert("Select a Shop");
          console.log('no Shop')
          return;
        }

        if (typeof(this.state.pricePoint) == 'undefined')
        {          
          alert("Select 공급단가");
          console.log('no 공급단가')

        }

        console.log(this.state.selectedShop);



        if (typeof(this.state.SelectedCompany) === 'undefined')
        {
          alert('select a company');
          return;
        }
        else{
          console.log(this.state.SelectedCompany)
        }
        var that = this;
        console.log('aloha');
        var file = this.state.file;
        var reader = new FileReader();
        var exceljsonObj = [];
        var queryInfo = this.state.SelectedCompany[0].value;
        var requestedInfo = [];

        var pricePoint = this.state.pricePoint;
        var conversionRate = this.state.conversionRate;


        reader.onload = function(event) {
          return new Promise((resolve, reject) => {
            that.setState({loading: true});
            const btsr = event.target.result;
  
            const wb = XLSX.read(btsr, {type:'array'});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            //removes first row because it is presentational data
            var range = XLSX.utils.decode_range(ws['!ref']);
            range.s.r = 1;
            ws['!ref'] = XLSX.utils.encode_range(range);
    
            var rowObject = XLSX.utils.sheet_to_row_object_array(ws);
            
            exceljsonObj = rowObject;

            resolve();
  
          }).then(() => {
            return new Promise((resolve, reject) => {
              fetch('https://hstapi.herokuapp.com/api/company/getid/' + queryInfo).then(function(response) {
                return response.json();
              }).then(response => 
                requestedInfo = response
                
              ).then(function(response) {
                resolve();
              })
  
            })}).then(() => {
            fetch("../LT_Template.xlsx").then(res => res.arrayBuffer()).then(ab => {
              const wb = XLSX.read(ab, { type: "array" });
              const wsname = wb.SheetNames[0];
              const ws1 = wb.Sheets[wsname];
  
              var rowsCount = exceljsonObj.length;
  
              var arrData = [];
              var procssedIDs =[];
              var proccessed = 0;

              exceljsonObj.forEach( function(item) {
                fetch('https://hstapi.herokuapp.com/api/hscode/getid/' + item.옵션관리코드).then(function(response) {
                  return response.json();
                }).then(function(response) {
                console.log(response);
  
                  var hsCode = 0;
                  var itemName = '';
                  var addBoxCount = '';
                  var valuePrice = 0;

                  console.log('price Point = '+pricePoint);

                  if (response)
                  {
                  switch(pricePoint) {
                    case 'A':
                      if (response.공급단가 != null)
                      {
                        valuePrice = response.공급단가 * conversionRate;
                      }
                      break;
                    case 'B':
                      if (response.공급단가_1 != null)
                      {
                        valuePrice = response.공급단가_1 * conversionRate;
                      }
                      break;
                    case 'C':
                      if (response.공급단가_2 != null)
                      {
                        valuePrice = response.공급단가_2 * conversionRate;
                      }
                      break;
                  }
                }

                  console.log('value = '+ valuePrice);
  
                  if (!procssedIDs.includes(item.주문번호)) {
                    addBoxCount = 1;
                    procssedIDs.push(item.주문번호);
                  }
  
                  console.log('box count' + addBoxCount);
  
                  if (response)
                    hsCode = response.HS_CODE;
  
                  if (response)
                    itemName = response.분류코드

                  
  
                  proccessed++;
                  arrData.push(
                    [
                    ,
                    ,//1
                    , requestedInfo.companyName
                    , requestedInfo.companyNumber
                    , 'Luisenstr. 20, 63303, DREIEICH. GERMANY'
                    ,
                    ,
                    , item.주문번호
                    , addBoxCount
                    , item.수취인명
                    , item.수취인연락처1
                    , item.수취인연락처1
                    , item.개인통관고유부호
                    , item.우편번호
                    , item.배송지
                    ,
                    , item.배송메세지
                    , "https://www.smartstore.naver.com"
                    , 1
                    , 1
                    , 1
                    , hsCode
                    ,
                    , itemName
                    , "$" +valuePrice
                    , item.수량
                    , "$" +valuePrice
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    , 'Y'
                    ]
                    )
                  if (proccessed == exceljsonObj.length)
                    mapDataToTransportInfo(arrData);
                })
              })
  
            })
            
          })
        }
        reader.readAsArrayBuffer(file);


    }
          
    render() {
        return (
            <div className="content" >
               <Row> 
                <Col md={2}>
                    <input name="file-upload-field" type="file" name ="selectedFile" onChange={this.onSelectFile} style ={{'width':'90px', 'overflow':'hidden'}} value=""/>
                </Col>                
               </Row>
               <Row>
               <Col md ={10}>
                <label htmlFor="file">{this.state.fileName}</label>
                </Col>
               </Row>
               <Row>
               <Col md={2}>
               <BarLoader
                            size={150}
                            color={"#123abc"}
                            loading={this.state.loading}
                        />
                </Col>
               </Row>
               <Row>
                <Col md={5}>
                    <p>Select Shop</p>
                    <Select
                    options ={shopData}
                    defaultValue = {{ 'label' :shopData[0].label, 'value' : shopData[0].value}}
                    values={[]}
                    onChange={(value) =>this.setState({selectedShop:value})}
                    />
                </Col>
                <Col md={5}>
                    <p>Select 공급단가</p>
                    <Select
                    options ={pricePoint}
                    values={[]}
                    onChange={(value) =>this.setState({pricePoint:value[0].value})}
                    />
                </Col>
               </Row>
               <Row>
               <Col md={5}>
               <p style ={{ 'marginTop' : '30px'}} >Select Company</p>
               <Select 
                    options ={this.state.availableCompanies}
                    values ={[]}
                    onChange ={(value) => this.setState({SelectedCompany:value})}
                />
                </Col>
               <Col md={5}>
                    <p style ={{ 'marginTop' : '30px'}}>Input Conversion Rate</p>
                    <form>
                        <input className="form-control" type="number" defaultValue ={this.state.conversionRate} id="conversion" onChange={(value) =>this.setState({conversionRate:value})}/>
                    </form>
                </Col>
               </Row>
               <Row>
                   <Col md={5}>
                   <Button style ={{ 'marginTop' : '30px'}} bsStyle="info" fill type="submit" onClick={this.onConvertFile.bind(this)}>
                    Convert File
                </Button>
                   </Col>
               </Row>
            </div>

        )
    }
};

export default UploadDrive;