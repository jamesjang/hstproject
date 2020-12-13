
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
  
      }

      componentDidMount() {

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
                            <CompanyForm companyData />
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