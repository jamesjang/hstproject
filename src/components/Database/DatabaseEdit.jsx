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

class DatabaseEdit extends Component {
    constructor(props) {
        super(props);
    }
    
    changeFormValue(item) {
        if(typeof item[0] === 'undefined') {
            console.log('err');
        }
        else {
            var dataObj = this.props.test.filter(data => data.품목코드 == item[0].value);
            if(typeof dataObj[0] === 'undefined') {
            }
            else {
                var inputData = dataObj[0];
              {  
                document.getElementById("분류코드").value = inputData.분류코드;
  
                document.getElementById("품목코드").value = inputData.품목코드;

                document.getElementById("품목명").value = inputData.품목명;
                          
                document.getElementById("제품설명").value = inputData.제품설명;
    
                document.getElementById("품목코드_정산용").value = inputData.품목코드_정산용;
    
                document.getElementById("HS_CODE").value = inputData.HS_CODE;
    
                document.getElementById("Netto").value = inputData.Netto;
    
                document.getElementById("통관단가").value = inputData.통관단가;
    
                document.getElementById("공급단가").value = inputData.공급단가;

                document.getElementById("공급단가_1").value = inputData.공급단가_1;
    
                document.getElementById("공급단가_2").value = inputData.공급단가_2;
    
                document.getElementById("구매세율").value = inputData.구매세율;
    
                document.getElementById("내수세율").value = inputData.내수세율;
    
                document.getElementById("무게").value = inputData.무게;
    
                document.getElementById("유로단가").value = inputData.유로단가;
    
                document.getElementById("운송비").value = inputData.운송비;
    
                }
            }
        }
    }

    onUpdateDBValue(event) {

        event.preventDefault();
        var id = document.getElementById("품목코드").value;

        console.log(id);
        const requestOptions = {
            method: 'Put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                분류코드: document.getElementById("분류코드").value,
                품목코드: document.getElementById("품목코드").value,
                품목명: document.getElementById("품목명").value,
                제품설명: document.getElementById("제품설명").value,
                품목코드_정산용: document.getElementById("품목코드_정산용").value,
                HS_CODE: document.getElementById("HS_CODE").value,
                Netto: document.getElementById("Netto").value,
                통관단가: document.getElementById("통관단가").value,
                공급단가: document.getElementById("공급단가").value,
                공급단가_1: document.getElementById("공급단가_1").value,
                공급단가_2: document.getElementById("공급단가_2").value,
                구매세율: document.getElementById("구매세율").value,
                내수세율: document.getElementById("내수세율").value,
                무게: document.getElementById("무게").value,
                유로단가: document.getElementById("유로단가").value,
                운송비: document.getElementById("운송비").value
              })
        };
        console.log(requestOptions);
        fetch('https://hstapi.herokuapp.com/api/hscode/update/' + id, requestOptions)
            .then(response => response.json())
            .then(function(data) {
                document.getElementById("분류코드").value = "";
                document.getElementById("품목코드").value = "";
                document.getElementById("품목명").value = "";                
                document.getElementById("제품설명").value ="";
                document.getElementById("품목코드_정산용").value = "";
                document.getElementById("HS_CODE").value = "";
                document.getElementById("Netto").value = "";
                document.getElementById("통관단가").value = "";
                document.getElementById("공급단가").value = "";
                document.getElementById("공급단가_1").value = "";
                document.getElementById("공급단가_2").value = "";
                document.getElementById("구매세율").value = "";
                document.getElementById("내수세율").value = "";
                document.getElementById("무게").value = "";
                document.getElementById("유로단가").value = "";
                document.getElementById("운송비").value = "";
            });

    }

    onDeleteDBValue(value) {

    }



    render() {
        return (
            <div className ="content">
                <Select
                style ={{'marginBottom' : '20px'}}
                    options={this.props.test.map(item => ({
                        "value" : item.품목코드,
                        "label" : item.품목코드
                    }))}
                    value = {[]}
                    onChange ={this.changeFormValue.bind(this)}
                />
                <Row>
                    <Col md={5}>
                            <label htmlFor="분류코드" className="form-control-label">분류코드</label>
                            <input className="form-control" type="text" defaultValue ="" id="분류코드" />
                    </Col>
                    <Col md={5}>
                            <label htmlFor="품목코드" className="form-control-label">품목코드</label>
                            <input className="form-control" type="text" defaultValue ="" id="품목코드" />
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                            <label htmlFor="품목명" className="form-control-label">품목명</label>
                            <input className="form-control" type="text" defaultValue =""  id="품목명" />
                    </Col>
                    <Col md={5}>
                            <label htmlFor="제품설명" className="form-control-label">제품설명</label>
                            <input className="form-control" type="text" defaultValue ="" id="제품설명" />
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                            <label htmlFor="품목코드_정산용" className="form-control-label">품목코드_정산용</label>
                            <input className="form-control" type="text" defaultValue ="" id="품목코드_정산용" />
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                            <label htmlFor="HS_CODE" className="form-control-label">HS_CODE</label>
                            <input className="form-control" type="text" defaultValue ="" id="HS_CODE" />
                    </Col>
                    <Col md={5}>
                            <label htmlFor="Netto" className="form-control-label">Netto</label>
                            <input className="form-control" type="text" defaultValue ="" id="Netto" />
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                            <label htmlFor="통관단가" className="form-control-label">통관단가</label>
                            <input className="form-control" type="text" defaultValue ="" id="통관단가" />
                    </Col>
                    <Col md={5}>
                            <label htmlFor="공급단가" className="form-control-label">공급단가</label>
                            <input className="form-control" type="text" defaultValue ="" id="공급단가" />
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                            <label htmlFor="공급단가_1" className="form-control-label">공급단가_1</label>
                            <input className="form-control" type="text" defaultValue ="" id="공급단가_1" />
                    </Col>
                    <Col md={5}>
                            <label htmlFor="공급단가_2" className="form-control-label">공급단가_2</label>
                            <input className="form-control" type="text" defaultValue ="" id="공급단가_2" />
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                            <label htmlFor="구매세율" className="form-control-label">구매세율</label>
                            <input className="form-control" type="text" defaultValue ="" id="구매세율" />
                    </Col>
                    <Col md={5}>
                            <label htmlFor="내수세율" className="form-control-label">내수세율</label>
                            <input className="form-control" type="text" defaultValue ="" id="내수세율" />
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                            <label htmlFor="무게" className="form-control-label">무게</label>
                            <input className="form-control" type="text" defaultValue ="" id="무게" />
                    </Col>
                    <Col md={3}>
                            <label htmlFor="유로단가" className="form-control-label">유로단가</label>
                            <input className="form-control" type="text" defaultValue ="" id="유로단가" />
                    </Col>
                    <Col md={3}>
                            <label htmlFor="운송비" className="form-control-label">운송비</label>
                            <input className="form-control" type="text" defaultValue ="" id="운송비" />
                    </Col>
                </Row>
 
                <Row>
                <Button style ={{ 'marginTop' : '10px', 'marginRight' : '15px', 'width' : "40%"}} bsStyle="info" fill type="submit" onClick={this.onUpdateDBValue.bind(this)}>
                    Update
                </Button>

                <Button style ={{ 'marginTop' : '10px', 'width' : "40%"}} bsStyle="info" fill type="submit" onClick={this.onUpdateDBValue.bind(this)}>
                    New Item
                </Button>
                </Row>

            </div>
        )
    }

};

export default DatabaseEdit;