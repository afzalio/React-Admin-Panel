import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

function User() {
  const [pnr, setPnr] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const ButtonSubmitHandler = (e) => {
    e.preventDefault();
    if (pnr.length !== 10 || isNaN(pnr)) {
      setIsInvalid(true);
      console.log("Invalid PNR Number");
    } else {
      setIsInvalid(false);
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "3c11b430bemsh4985eaae981a12cp1f8981jsn460c074a6679",
          "x-rapidapi-host": "irctc-indian-railway-pnr-status.p.rapidapi.com",
        },
      };

      fetch(
        `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnr}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setResponseData(response.data);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleInputChange = (e) => {
    setPnr(e.target.value);
    if (e.target.value.length === 10 && !isNaN(e.target.value)) {
      setIsInvalid(false);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">PNR Status</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={ButtonSubmitHandler}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>PNR Status</label>
                        <Form.Control
                          placeholder="Enter PNR Number"
                          type="text"
                          id="pnr"
                          value={pnr}
                          onChange={handleInputChange}
                          style={{
                            borderColor: isInvalid ? "red" : "",
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="success"
                  >
                    Check Status
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {responseData && (
          <Row>
            <Col md="12">
              <Card>
                <Card.Body>
                  <div>
                    <h5 className="mb-3">PNR Details</h5>
                    <Table striped bordered hover size="sm">
                      <tbody>
                        {[
                          {
                            label: "PNR Number",
                            value: responseData.pnrNumber,
                          },
                          {
                            label: "Date of Journey",
                            value: responseData.dateOfJourney,
                          },
                          {
                            label: "Train Number",
                            value: responseData.trainNumber,
                          },
                          {
                            label: "Train Name",
                            value: responseData.trainName,
                          },
                          {
                            label: "Source Station",
                            value: responseData.sourceStation,
                          },
                          {
                            label: "Destination Station",
                            value: responseData.destinationStation,
                          },
                          {
                            label: "Reservation Upto",
                            value: responseData.reservationUpto,
                          },
                          {
                            label: "Boarding Point",
                            value: responseData.boardingPoint,
                          },
                          {
                            label: "Journey Class",
                            value: responseData.journeyClass,
                          },
                          {
                            label: "Number of Passengers",
                            value: responseData.numberOfpassenger,
                          },
                          {
                            label: "Chart Status",
                            value: responseData.chartStatus,
                          },
                        ].map((item, index) => (
                          <tr key={index}>
                            <td>
                              <strong>{item.label}</strong>
                            </td>
                            <td>{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    <h6 className="mt-3">Passenger List</h6>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Booking Status</th>
                          <th>Current Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {responseData.passengerList.map((passenger, index) => (
                          <tr key={index}>
                            <td>{passenger.passengerSerialNumber}</td>
                            <td>{passenger.bookingStatusDetails}</td>
                            <td>{passenger.currentStatusDetails}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default User;
