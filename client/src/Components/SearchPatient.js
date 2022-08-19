import { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

import API from '../API';

function SearchPatient(props) {
  let navigate = useNavigate();
  const [validationPC, setValidationPC] = useState(false);
  const [validationBD, setValidationBD] = useState(false);
  const [validationFN, setValidationFN] = useState(false);
  const [validationLN, setValidationLN] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [patientCode, setPatientCode] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const delayforValidationPcode = setTimeout(() => {
      if (!patientCode.match('P[0-9]+$') && patientCode !== '')
        setValidationPC(true);
    }, 1000);
    return () => {
      if (validationPC) setValidationPC(false);
      clearTimeout(delayforValidationPcode);
    };
  }, [patientCode]);

  useEffect(() => {
    const delayforValidationBirthdate = setTimeout(() => {
      if (
        birthdate !== undefined &&
        !birthdate.match('[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}') &&
        birthdate !== ''
      )
        setValidationBD(true);
    }, 1000);
    return () => {
      if (birthdate) setValidationBD(false);
      clearTimeout(delayforValidationBirthdate);
    };
  }, [birthdate]);

  useEffect(() => {
    const delayforValidationlastName = setTimeout(() => {
      if (
        lastName !== undefined &&
        !/^([a-zA-Z]+)((\s)([a-zA-Z]+))*$/.test(lastName) &&
        lastName !== ''
      )
        setValidationLN(true);
    }, 1000);
    return () => {
      if (lastName) setValidationLN(false);
      clearTimeout(delayforValidationlastName);
    };
  }, [lastName]);

  useEffect(() => {
    const delayforValidationfirstName = setTimeout(() => {
      if (
        firstName !== undefined &&
        !/^([a-zA-Z]+)((\s)([a-zA-Z]+))*$/.test(firstName) &&
        firstName !== ''
      )
        setValidationFN(true);
    }, 1000);
    return () => {
      if (firstName) setValidationFN(false);
      clearTimeout(delayforValidationfirstName);
    };
  }, [firstName]);

  useEffect(() => {
    const disabledButtonCheck = () => {
      if (!validationPC && !validationBD && !validationFN && !validationLN)
        setDisabledButton(false);
      else setDisabledButton(true);
    };
    disabledButtonCheck();
  }, [validationPC, validationBD, validationFN, validationLN]);

  function isretanArray(patients) {
    if (Array.isArray(patients)) {
      return patients;
    } else {
      return [patients];
    }
  }

  //Handle submit button for the research
  const handleSubmit = async () => {
    props.setPatients([{ error: 'erasing' }]);
    if (patientCode && !validationPC) {
      const patientCode1 = capitalizeFirstLetter(patientCode);
      const pat = await API.getPatientsbyCode(patientCode1);
      props.setPatients(pat);
      props.setKey(patientCode);
      navigate('/search-result');
    } else if (firstName && !validationFN) {
      const firstName1 = capitalizeFirstLetter(firstName);
      let pats = await API.getPatientsbyFName(firstName1);
      if (lastName || birthdate) {
        console.log(lastName);
        pats = pats.filter(
          (p) => p.lastname === lastName || p.birthdate === birthdate
        );
      }
      pats = isretanArray(pats);
      props.setPatients(pats);
      props.setKey(firstName);
      navigate('/search-result');
    } else if (lastName && !validationLN) {
      const lastName1 = capitalizeFirstLetter(lastName);
      let pats = await API.getPatientsbyLName(lastName1);
      if (birthdate) {
        pats = pats.filter((p) => p.birthdate === birthdate);
      }
      pats = isretanArray(pats);
      props.setPatients(pats);
      props.setKey(lastName);

      navigate('/search-result');
    } else if (birthdate && !validationBD) {
      let pats = await API.getPatientsbyBirthdate(birthdate);
      pats = isretanArray(pats);
      props.setKey(birthdate);
      props.setPatients(pats);
      navigate('/search-result');
    }
  };

  return (
    <>
      <Container>
        <h2 className="mt-5" style={{ textAlign: 'center' }}>
          Search patient by:
        </h2>
        <h6 className="mt-3" style={{ textAlign: 'center' }}>
          You must type something in one or more of the following fields to search for a
          patient
        </h6>
        <Form>
          <Row className="mt-3">
            <Col xs="6">
              <Form.Label style={{ fontWeight: 700 }}>Patient ID</Form.Label>
              <Form.Control
                isInvalid={validationPC}
                placeholder="Pxxxxx"
                onChange={(ev) => {
                  setPatientCode(ev.target.value);
                }}
              />
              <Form.Control.Feedback className="m-2" type="invalid">
                Patient code is wrong
              </Form.Control.Feedback>
            </Col>
            <Col xs="6">
              <Form.Label style={{ fontWeight: 700 }}>Birthdate</Form.Label>
              <Form.Control
                isInvalid={validationBD}
                placeholder="YYYY-MM-DD"
                onChange={(ev) => {
                  setBirthdate(ev.target.value);
                }}
              />
              <Form.Control.Feedback className="m-2" type="invalid">
                Birthday format wrong
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs="6">
              <Form.Label style={{ fontWeight: 700 }}>First Name</Form.Label>
              <Form.Control
                isInvalid={validationFN}
                onChange={(ev) => {
                  setFirstName(ev.target.value);
                }}
              />
              <Form.Control.Feedback className="m-2" type="invalid">
                First Name invalid
              </Form.Control.Feedback>
            </Col>
            <Col xs="6">
              <Form.Label style={{ fontWeight: 700 }}>Last Name</Form.Label>
              <Form.Control
                isInvalid={validationLN}
                onChange={(ev) => {
                  setLastname(ev.target.value);
                }}
              />
              <Form.Control.Feedback className="m-2" type="invalid">
                Last Name invalid
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col className="text-center mt-3">
            <Button size="lg" disabled={disabledButton} onClick={handleSubmit}>
              Search
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <p style={{ fontSize: '18px', textAlign: 'Center' }}>
            <b>
              Or, you can see{' '}
              <Link
                onClick={() => {
                  props.setPatients(props.Allpatients);
                  props.setIsAll(true);
                }}
                to="/search-result"
              >
                all the patients here
              </Link>
            </b>
          </p>
        </Row>
      </Container>
    </>
  );
}
export default SearchPatient;
