
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
import { BASE_API_URL } from "constants.js";

class Database extends Component {

  constructor() {
    super();
    this.state = { 
        tabledata: []
      };
  }

  getDatabseInfo() {
    console.log('olah');
    fetch(BASE_API_URL +"hscode/all")
    .then(response => response.json())
    .then(data => { 
      console.log('force updating');
      return new Promise((resolve, reject) => {
        this.setState({tabledata : data})
        localStorage.setItem('hsCodeDB', JSON.stringify(data));
        resolve();
        console.log('force updating');
      })
      console.log('force updating 11');
      this.forceUpdate();
    });


  }
  componentDidMount() {
    //this.getDatabaseInfo();
    if (localStorage.getItem('hsCodeDB') === null)
    {
      fetch(BASE_API_URL + "hscode/all")
      .then(response => response.json())
      .then(data => { 
        this.setState({tabledata : data})
        localStorage.setItem('hsCodeDB', JSON.stringify(data));

        console.log(localStorage.getItem('hsCodeDB'));
      });
    }
    else{
      console.log('has local saved');
      this.setState({tabledata : JSON.parse(localStorage.getItem('hsCodeDB'))});
    }


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
                testContent ={
                  <Row>
                  <Col md={1}>

                  <Button style ={{ 'marginTop' : '10px' }} bsStyle="info" fill type="submit" 
                  onClick={this.getDatabseInfo.bind(this)}>
                    GET DB
                  </Button>
                  </Col>
                  </Row>
                }
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

export default Database;
