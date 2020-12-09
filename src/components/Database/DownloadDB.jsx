import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import * as XLSX from 'xlsx';
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
  } from "react-bootstrap";

class DownloadDB extends Component {

    onDownloadFile() {
        var wb = XLSX.utils.book_new();

        wb.SheetNames.push("HST_DB");
        var ws = XLSX.utils.json_to_sheet(this.props.test);

        wb.Sheets["HST_DB"] = ws;
    
        XLSX.writeFile(wb, 'db.xlsx');
    }

    render() {
        return (
            <div className="content">
               <Button style ={{'width' : '35%'}} bsStyle="info" fill type="submit" onClick={this.onDownloadFile.bind(this)}>
                      Download DB
                </Button>

            </div>
        )
    }
};

export default DownloadDB;