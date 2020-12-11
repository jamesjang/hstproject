
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
import CompanyForm from "components/Company/CompanyForm.jsx";


class Company extends Component {
    constructor() {
        super();
        this.state = { 
          companyData :[]
        };
  
      }

      componentDidMount() {
        /*
        fetch(`https://hstapi.herokuapp.com/api/company/all`)
        .then(response => response.json())
        .then(data =>
          this.setState({
            companyData: data,
          })
        )*/
      }

    render() {
        return (
          <div className="content">
            <Grid fluid>
              <Row>
              <Col md={6}>
                    <Card 
                        title="Manage Companies"
                        content ={
                            <CompanyForm companyData = {this.state.companyData}/>
                        }
                    />
                </Col>
              </Row>
    
    
    
              
            </Grid>
          </div>
        );
      }
    }
    
    export default Company;