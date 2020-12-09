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

class CompanyForm extends Component {
    constructor(props) {
        super(props);
    }
    
    changeFormValue(item) {
        if(typeof item[0] === 'undefined') {
            console.log('err');
        }
        else
        {
            var dataObj = this.props.companyData.filter(data => data.companyName == item[0].value);
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
        fetch('http://hstapi.herokuapp.com/api/company/update/' + companyName, requestOptions)
        .then(response => response.json())
        .then(function(data) {
            return new Promise((resolve, reject) => {
                if (data) {
                    resolve();
                    window.location.reload(false);
                }
            })})
    }

    OnDeleteCompany() {
        var companyName = document.getElementById("companyName").value;
        const requestOptions = {
            method: 'Delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                companyName: companyName
              })
        };
        fetch('http://hstapi.herokuapp.com/api/company/remove', requestOptions)
        .then(response => response.json())
        .then(function(data) {
            return new Promise((resolve, reject) => {
                if (data) {
                    resolve();
                    window.location.reload(false);
                }
            })})
    }

    OnSubmitNewCompany() {
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
        fetch('http://hstapi.herokuapp.com/api/company/new', requestOptions)
        .then(response => response.json())
        .then(function(data) {
            return new Promise((resolve, reject) => {
                if (data) {
                    resolve();
                    window.location.reload(false);
                }
            })})
        }
        
    

    render() {
        return (
            <div className ="content">
            <Row>
                <Select     
                    style ={{'marginBottom' : '30px'}}
                    options={this.props.companyData.map(item => ({
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