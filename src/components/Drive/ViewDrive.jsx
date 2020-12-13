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
import moment from 'moment';
import { BASE_API_URL } from "constants.js";

class ViewDrive extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            driveData: []
          };
    }


    componentDidMount() {
        this.setdriveData();

        console.log(this.state.driveData);

        console.log( 'date  ' +  new Date(Date.parse('2020-12-09T13:10:49.977Z')));
    }

    parseDate(d) {
        return new Date(Date.parse(d)).toString();
    }
    onDeleteFile(id) {

        console.log('deleting file' + id);
        this.setState({driveData: this.state.driveData.filter(data => data.id != id)});

        var that = this;
        
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(BASE_API_URL + "drive/remove/" + id, requestOptions)
            .then(response => response)
            .then(function(response) {
                return new Promise((resolve, reject) => {
                    if (response)
                    {
                        resolve();
                    }
                })
            }).then(function(response) {
                //that.setdriveData();
            })

    }

    setdriveData(){
        fetch(BASE_API_URL + "drive/all")
        .then(response => response.json())
        .then(data =>
          this.setState({driveData : data})
        );

    }

    render () {
        return(
            <div className="content" style={{'height':'500px', overflowY: 'scroll'}}>
                {this.state.driveData.map(item =>
                <Row style ={{'marginBottom' : '10px'}}>
                    <Col md ={7}>
                    <a href ={item.webViewLink} className ='center-text flex'>{item.name} </a> <p style ={{ 'fontSize': '10px'}}>{this.parseDate(item.createdTime)}</p>
                   
                        </Col>
                        <Col md ={2}>
                        <Button style ={{ 'marginTop' : '10px' , 'width' : '10px', 'height': '10px'}} bsStyle="danger" fill type="submit" onClick={()=> this.onDeleteFile(item.id)}/>
                        </Col>
                </Row>
                )
                 }
            </div>
        )
    }

};

export default ViewDrive;
