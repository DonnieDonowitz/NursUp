import { useState, useEffect } from 'react';
import { Container, Form, Col, Row, ListGroup, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
function PageResult(props) {
  const [validArray, setValidArray] = useState(true);

  useEffect(() => {
    const checkValidArray = () => {
      if (
        props.patients === undefined ||
        props.patients[0] === undefined ||
        props.patients === '' ||
        props.patients[0] === '' ||
        props.patients[0].error ||
        props.patients.error ||
        props.patients[0].id === undefined
      )
        setValidArray(false);
      else setValidArray(true);
    };

    checkValidArray();
  }, [props.patients]);

  let navigate = useNavigate();

  const patientresultsmap = props.patients.map((patient, idx) => {
    if (patient.error || patient.id === undefined)
      return (
        <>

          <br></br>
          <h4 style={{ fontStyle: 'italic', textAlign: 'center' }}>
            There are no results for {props.keySearch}
          </h4>
        </>
      );
    else {
      return (
        <ListGroup.Item as="li" key={idx}>
          <Row
            className="mt-2 mb-2"
            onClick={() => {
              props.setPatient(patient);
              navigate('/medical-record');
            }}
          >
            <Col>
              <span style={{ fontWeight: 700 }}>#{idx + 1}</span>
            </Col>
            <Col xs="2">
              {' '}
              <span style={{ fontWeight: 700 }}>Firstname: </span>
              <span>{patient.firstname}</span>
            </Col>
            <Col xs="2">
              <span style={{ fontWeight: 700 }}>Lastname:</span>{' '}
              <span>{patient.lastname}</span>
            </Col>
            <Col xs="2">
              <span style={{ fontWeight: 700 }}>Birthdate:</span>{' '}
              <span>{patient.birthdate}</span>
            </Col>
            <Col xs="2">
              {' '}
              <span style={{ fontWeight: 700 }}>Department:</span>{' '}
              <span>{patient.dept}</span>
            </Col>
            <Col>
              {' '}
              <span style={{ fontWeight: 700 }}>Room:</span>{' '}
              <span>{patient.room}</span>
            </Col>
            <Col xs="2">
              <Button>Medical Report</Button>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    }
  });
  return (
    <>
      <Container className="container-xxl mt-4 container-nursup">
        {props.isAll ? (
          <>
            <Link to="/">
              <Button variant="secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                </svg>
                {'   '} Go back
              </Button>
            </Link> <br></br>
            <h1 style={{ textAlign: 'center' }}>All Patients</h1>
            <Row className="mt-4 ">
              <ListGroup as="ol">{patientresultsmap}</ListGroup>
            </Row>
          </>
        ) : (
          <>
            <Link to="/">
              <Button variant="secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                </svg>
                {'   '} Go back
              </Button>
            </Link> <br></br>
            <h1 style={{ textAlign: 'center' }}>Page Result: {'  ' + props.keySearch} </h1>
            {validArray ? (
              <>
                <h4 style={{ fontStyle: 'italic', textAlign: 'center' }}>
                  Select one row of the following ones
                </h4>
                <Row className="mt-4">
                  <ListGroup as="ol">{patientresultsmap}</ListGroup>
                </Row>
              </>
            ) : (
              <>
                <h4 style={{ fontStyle: 'italic', textAlign: 'center' }}>
                  There are no results
                </h4>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
export default PageResult;
