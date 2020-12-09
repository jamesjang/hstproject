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
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import UploadDrive from "components/Drive/UploadDrive.jsx";
import ViewDrive from "components/Drive/ViewDrive.jsx";

class Dashboard extends Component {

  render() {
    return (
      <div className="content">
        <Grid fluid>
        <Row>
          <Col md={5}>
          <Card
            title="Upload To Drive"
            content ={ 
              <UploadDrive />
            }
          />
          </Col>
          <Col md={5}>
          <Card
              title="Upload To Drive"
              content ={ 
                <ViewDrive />
              }
            />
          </Col>
        </Row>

        </Grid>
      </div>
    );
  }
}

export default Dashboard;
