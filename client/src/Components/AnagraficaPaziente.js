import { Container, Row, Col, Form } from 'react-bootstrap';
import FormField from './FormField';

function AnagraficaPaziente(props) {
  return (
    <>
      <Container>
        <h4 style={{ textAlign: 'center' }} className="mt-3 mb-3">
          Patient basic informations
        </h4>
        <Row style={{ width: "100%", margin: "auto" }}>
          <Col xs lg="6">
            <FormField
              disabled="true"
              label="Name"
              value={props.patient.firstname}
            />
          </Col>
          <Col xs lg="6">
            <FormField
              disabled="true"
              label="Surname"
              value={props.patient.lastname}
            />
          </Col>
        </Row>
        <Row style={{ width: "100%", margin: "auto" }}>
          <Col xs lg="12">
            <FormField
              disabled="true"
              label="Address"
              value={props.patient.address}
            />
          </Col>
        </Row>
        <Row style={{ width: "100%", margin: "auto" }}>
          <Col xs lg="6">
            <FormField disabled="true" label="Sex" value={props.patient.sex} />
          </Col>
          <Col xs lg="6">
            <FormField
              disabled="true"
              label="Nation"
              value={props.patient.nation}
            />
          </Col>
        </Row>
        <Row style={{ width: "100%", margin: "auto" }}>
          <Col xs lg="6">
            <FormField
              disabled="true"
              label="Telephone type"
              value={props.patient.telephonetype}
            />
          </Col>
          <Col xs lg="6">
            <FormField
              disabled="true"
              label="Number"
              value={props.patient.telephone}
            />
          </Col>
        </Row>
      </Container>
      <Container className="mt-4">
        <br></br>
        <h4 style={{ textAlign: 'center' }} className="mt-3 mb-3">
          Hospitalization informations
        </h4>
        <br></br>
        <Row style={{ width: "100%", margin: "auto" }}>
          <Col xs lg="6">
            <FormField
              disabled="true"
              label="Patient code"
              value={props.patient.id}
            />
          </Col>
          <Col xs lg="6">
            <FormField
              disabled="true"
              label="Hospitalization date"
              value={props.patient.date}
            />
          </Col>
        </Row>
        <Row style={{ width: "100%", margin: "auto" }}>
          <Col xs lg="6">
            <FormField
              disabled="true"
              label="Department"
              value={props.patient.dept}
            />
          </Col>
          <Col xs lg="6">
            <FormField
              disabled="true"
              label="Room"
              value={props.patient.room}
            />
          </Col>
        </Row>
        <Row style={{ width: "100%", margin: "auto" }}>
          <Col xs lg="12">
            <FormField
              disabled="true"
              label="General informations"
              value={props.patient.generals}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default AnagraficaPaziente;
