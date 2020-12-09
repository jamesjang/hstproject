import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import DownloadDB from "components/Database/DownloadDB.jsx";
import * as XLSX from 'xlsx';
import {
    Grid,
    Row,
    Col,
    Table
  } from "react-bootstrap";

  class DatabaseDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className ="content" style={{'height':'945px', overflowY: 'scroll' , overflowX: 'scroll'}}>

                <Table responsive>
                <thead>
                    <tr>
                    <th>분류코드</th>
                    <th>품목코드</th>
                    <th>품목명</th>
                    <th>제품설명</th>
                    <th>품목코드_정산용</th>
                    <th>HS_CODE</th>
                    <th>통관단가</th>
                    <th>공급단가</th>
                    <th>공급단가_1</th>
                    <th>공급단가_2</th>
                    <th>구매세율</th>
                    <th>내수세율</th>
                    <th>무게</th>
                    <th>유로단가</th>
                    <th>운송비</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.test.map(item=>
                    <tr>
                        <td>{item.분류코드}</td>
                        <td>{item.품목코드}</td>
                        <td>{item.품목명}</td>
                        <td>{item.제품설명}</td>
                        <td>{item.품목코드_정산용}</td>
                        <td>{item.HS_CODE}</td>
                        <td>{item.Netto}</td>
                        <td>{item.통관단가}</td>
                        <td>{item.공급단가}</td>
                        <td>{item.공급단가_1}</td>
                        <td>{item.공급단가_2}</td>
                        <td>{item.구매세율}</td>
                        <td>{item.내수세율}</td>
                        <td>{item.무게}</td>
                        <td>{item.유로단가}</td>
                        <td>{item.운송비}</td>

                    </tr>)

                }
                </tbody>
                </Table>
            </div>

        )
    }
};

export default DatabaseDisplay;