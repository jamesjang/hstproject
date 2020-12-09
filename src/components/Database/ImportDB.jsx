import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import DownloadDB from "components/Database/DownloadDB.jsx";
import * as XLSX from 'xlsx';
import BarLoader from 'react-spinners/BarLoader';
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
  } from "react-bootstrap";
  

class ImportDB extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            file: null,
            count: 0,
            loading: false,
            fileName: ''
          };
      }

    componentDidMount() {
        console.log(this.props.test);
    }

    onSelectFile=event=>{
        this.setState({file: event.target.files[0]});       

        this.setState({fileName : event.target.files[0].name});
    }

    onUploadFile() {
        if (this.state.file == null)
            return;

        var file = this.state.file;
        var name = file.name;
        var exceljsonObj = [];
        var that = this;
        var reader = new FileReader();
        reader.onload = function(event) {
            that.setState({loading: true});
            console.log('loading');
            return new Promise((resolve, reject) => {
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                };
                fetch('https://hstapi.herokuapp.com/api/hscode/reset/all', requestOptions).
                then(function(response) {
                    return response.json();
                }).then(function() {
                    const btsr = event.target.result;
                    console.log('loading 2');
                    const wb = XLSX.read(btsr, {type:'array'});
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];

                    var rowObject = XLSX.utils.sheet_to_row_object_array(ws, {defval: " "});

                    console.log(rowObject);
                    
                    exceljsonObj = rowObject;

                    resolve();
                }); 
            }).then(() => {
                return new Promise((resolve, reject) => {
                    var itemProcessed = 0;
                    var incrementAmount = 100/exceljsonObj.length;
                    that.state.loading = true;
                    exceljsonObj.forEach(function(item) {
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                분류코드: item.분류코드,
                                품목코드: item.품목코드,
                                품목명: item.품목명,
                                제품설명: item.제품설명,
                                품목코드_정산용: item.품목코드_정산용,
                                HS_CODE: item.HS_CODE,
                                Netto: item.Netto,
                                통관단가: item.통관단가,
                                공급단가: item.공급단가,
                                공급단가_1: item['공급단가 1'],
                                공급단가_2: item['공급단가 2'],
                                구매세율: item.구매세율,
                                내수세율: item.내수세율,
                                무게: item.무게,
                                유로단가: item.유로단가,
                                운송비: item.운송비
                              })
                            };
                            fetch('https://hstapi.herokuapp.com/api/hscode/new', requestOptions)
                            .then(response => response.json())
                            .then(function(response) {

                                itemProcessed++;
                                var total = that.state.count + incrementAmount;
                                that.setState({count: total});
                                console.log(that.state.count);
    
                                if (itemProcessed == exceljsonObj.length)
                                {
                                    that.setState({loading: false});
    
                                    resolve();
                                    that.state.loading = false;
                                    window.location.reload(false);
                                }
                            })     
                         
                    });
                })
  
            })

      }

      reader.readAsArrayBuffer(file);
    }

    render() {
        return (
          <div className="content">
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
               <Col md={10}>
                <BarLoader
                            size={150}
                            color={"#123abc"}
                            loading={this.state.loading}
                        />
                </Col>
               </Row>
               <Button style ={{ 'marginTop' : '10px' , 'width' : '35%'}} bsStyle="info" fill type="submit" onClick={this.onUploadFile.bind(this)}>
                Upload DB File!
                </Button>
               <Row>
                   <DownloadDB test = {this.props.test}/>
              </Row>
          </div>
        );
      }
}

export default ImportDB;