import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import DownloadDB from "components/Database/DownloadDB.jsx";
import * as XLSX from 'xlsx';
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
  } from "react-bootstrap";
import Select from 'react-dropdown-select';
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { BASE_API_URL } from "constants.js";

class CompanyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companyData : []
        };
    }

    componentDidMount() {

        if (localStorage.getItem('coco') === null)
        {
          fetch(BASE_API_URL + "company/all")
          .then(response => response.json())
          .then(data => { 
            this.setState({companyData : data})
            localStorage.setItem('coco', JSON.stringify(data));
    
            console.log(localStorage.getItem('coco'));
          });
        }
        else{
          console.log('has local saved');
          this.setState({companyData : JSON.parse(localStorage.getItem('coco'))});
        }

       
    }

    getCompanyData() {

    }
    
    changeFormValue(item) {
        if(typeof item[0] === 'undefined') {
            console.log('err');
        }
        else
        {
            var dataObj = this.state.companyData.filter(data => data.companyName == item[0].value);
            if(typeof dataObj[0] === 'undefined') {
            }
            else {
                var inputData = dataObj[0];

                console.log(item);

                document.getElementById("companyName").value = inputData.companyName;

                document.getElementById("companyNumber").value = inputData.companyNumber;
            }
        }
    }

    OnUpdateCompany() {
        var that = this;

        var companyName = document.getElementById("companyName").value;
        var companyNumber = document.getElementById("companyNumber").value;
        const requestOptions = {
            method: 'Put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                companyName: companyName,
                companyNumber: companyNumber,
              })
        };
        fetch(BASE_API_URL + "company/update/" + companyName, requestOptions)
        .then(response => response.json())
        .then(function(data) {
            return new Promise((resolve, reject) => {
                if (data) {
                    resolve();
                    //window.location.reload(false);
                }
            }
            ).then(() => {
                fetch(BASE_API_URL + "company/all")
                .then(response => response.json())
                .then(data => {
                 return new Promise((resolve, reject) => {
                   that.setState({companyData : data})
                   localStorage.setItem('coco', JSON.stringify(data));
                   resolve();
                   console.log('force updating');
                 })
                 that.forceUpdate();
                }).then(function() {
                    document.getElementById("companyName").value = "";
                    document.getElementById("companyNumber").value="";
                    alert('on updated company');
                })
            })
        
        })

    }

    OnDeleteCompany() {
        var that = this;
        var companyName = document.getElementById("companyName").value;
        const requestOptions = {
            method: 'Delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                companyName: companyName
              })
        };
        fetch(BASE_API_URL + "company/remove", requestOptions)
        .then(response => response.json())
        .then(function(data) {
            return new Promise((resolve, reject) => {
                if (data) {
                    resolve();

                }
            }).then(() => {
                fetch(BASE_API_URL +"company/all")
                .then(response => response.json())
                .then(data => {
                 return new Promise((resolve, reject) => {
                   that.setState({companyData : data})
                   localStorage.setItem('coco', JSON.stringify(data));
                   resolve();
                   console.log('force updating');
                 })
                 that.forceUpdate();
                }).then(function() {
                    document.getElementById("companyName").value = "";
                    document.getElementById("companyNumber").value="";
                    alert('deleted company');
                })
            })
        })
    }

    OnSubmitNewCompany() {
        var that = this;
        var companyName = document.getElementById("companyName").value;
        var companyNumber = document.getElementById("companyNumber").value;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                companyName: companyName,
                companyNumber: companyNumber,
                reserved: ''
            })
        };
        fetch(BASE_API_URL + "company/new", requestOptions)
        .then(response => response.json())
        .then(function(data) {
            return new Promise((resolve, reject) => {
                if (data) {
                    resolve();
                }
            }).then(() => {
                fetch(BASE_API_URL + "company/all")
                .then(response => response.json())
                .then(data => {
                 return new Promise((resolve, reject) => {
                   that.setState({companyData : data})
                   localStorage.setItem('coco', JSON.stringify(data));
                   resolve();
                   console.log('force updating');
                 })
                 that.forceUpdate();
                }).then(function() {
                    document.getElementById("companyName").value = "";
                    document.getElementById("companyNumber").value="";
                    alert('added new company');
                })
            })
        })
        }
        
    

    render() {
        return (
            <div className ="content">
            <Row>
                <Select     
                    style ={{'marginBottom' : '30px'}}
                    options={this.state.companyData.map(item => ({
                        "value" : item.companyName,
                        "label" : item.companyName
                    }))}
                    value = {[]}
                    onChange ={this.changeFormValue.bind(this)}

                />
            </Row>
            <Row>
                <label htmlFor="companyName" className="form-control-label">Company Name</label>
                <input className="form-control" type="text" defaultValue ="" id="companyName" />

            </Row>
            <Row>
                <label htmlFor="companyNumber" className="form-control-label">Company Number</label>
                <input style ={{'marginBottom' : '30px'} }className="form-control" type="text" defaultValue ="" id="companyNumber" />
            </Row>

            <Row>
                <Col md={5}>
                <Button style ={{ 'marginTop' : '10px', 'marginRight' : '15px', 'width' : "100%"}} bsStyle="info" fill type="submit" onClick={this.OnUpdateCompany.bind(this)}>
                    Update Company
                </Button>
                </Col>

                <Col md={5}>
                <Button style ={{ 'color': 'Red','marginTop' : '10px', 'width' : "100%"}} bsStyle="info" fill type="submit" onClick={this.OnDeleteCompany.bind(this)}>
                Delete Company
                </Button>
                </Col>
            </Row>
            <Row>
            <Col md={10}>
                <Button style ={{ 'marginTop' : '10px', 'width' : "100%"}} bsStyle="info" fill type="submit" onClick={this.OnSubmitNewCompany.bind(this)}>
                    New Company
                </Button>
            </Col>
            </Row>
            </div>
        )
    }

};

export default CompanyForm;