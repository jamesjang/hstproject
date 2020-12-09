/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import ImportDB from "components/Database/ImportDB.jsx";
import DatabaseEdit from "components/Database/DatabaseEdit.jsx";
import DatabaseDisplay from "components/Database/DatabaseDisplay.jsx"

import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {

  constructor() {
    super();
    this.state = { 
        tabledata: []
      };
  }
  componentDidMount() {
    fetch(`http://hstapi.herokuapp.com/api/hscode/all`)
    .then(response => response.json())
    .then(data => { 
      this.setState({tabledata : data})
    });

  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={5}>
              <Card
                title="Upload "
                content={
                  <ImportDB 
                    test = {this.state.tabledata} /> 
                }
              />
              <Card
                title="Update DB"
                content={                        
                <DatabaseEdit test ={this.state.tabledata}/>      
                  
                }
              />
            </Col>
            <Col md={7}>
            <Card
                title="Display DB"
                content={                        
                <DatabaseDisplay test ={this.state.tabledata}/>                     
                }
              />
            </Col>
          </Row>



          
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
