import { Container, Row, Col } from 'react-bootstrap';
import patientLogo from '../patient.png';

function PatientRecap(props) {
  return (
    <>
      <Container fluid>
        {props.patient.error ? (
          <></>
        ) : (
          <Row>
            <Col xs="8">
              <p>
                {' '}
                <b>Patient name:</b> {'  ' + props.patient.firstname}
              </p>
              <p>
                <b>Patient last name:</b> {'  ' + props.patient.lastname}
              </p>
              <p>
                <b>Patient ID:</b> {'  ' + props.patient.id}
              </p>
              <p>
                <b>Room:</b> {'  ' + props.patient.room}
              </p>
              <p>
                <b>Bed:</b> {'  ' + props.patient.bed}
              </p>
            </Col>
            <Col xs="4" className="d-flex align-items-center">
              <img
                src={patientLogo}
                alt="..."
                className="img-thumbnail"
                style={{ borderRadius: '50px' }}
              ></img>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
export default PatientRecap;
