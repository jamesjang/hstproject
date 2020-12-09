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

class ViewDrive extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            driveData: []
          };
    }


    componentDidMount() {
        fetch('https://hstapi.herokuapp.com/api/drive/all')
        .then(response => response.json())
        .then(data =>
          this.setState({driveData : data})
        );

        console.log(this.state.driveData);

        //console.log('date ' + Date.parse('2020-12-09T13:10:49.977Z'));
        //console.log(Date.parseExact('2020-12-09T13:10:49.977Z'));
        console.log( 'date  ' +  new Date(Date.parse('2020-12-09T13:10:49.977Z')));
    }

    parseDate(d) {
        return new Date(Date.parse(d)).toString();
    }
    render () {
        return(
            <div className="content" style={{'height':'500px', overflowY: 'scroll'}}>
                {this.state.driveData.map(item =>
                <Row style ={{'marginBottom' : '10px'}}>
                    <a href ={item.webContentLink} className ='center-text flex'>{item.name} </a> <p style ={{ 'font-size': '10px'}}>{this.parseDate(item.createdTime)}</p>
                </Row>
                )
                 }
            </div>
        )
    }

};

export default ViewDrive;
