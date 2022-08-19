import { Container, Row, Col } from 'react-bootstrap';
import API from '../API';
import UserRecap from './UserRecap';
import SearchPatient from './SearchPatient';
import WorkshiftTable from './WorkshiftTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Home(props) {
  let navigate = useNavigate();
  const [Allpatients, setAllPatients] = useState([{}]);
  const [workshifts, setWorkshifts] = useState([]);
  useEffect(() => {
    const getAllPatientsC = async () => {
      await API.getAllPatients()
        .then((res) => {
          setAllPatients(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllPatientsC();
  }, []);
  useEffect(() => {
    const getAllPatientsbyN = async () => {
      await API.getAllPatientByNurse(props.nurse.id)
        .then((res) => {
          setWorkshifts(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (props.nurse.id !== undefined) getAllPatientsbyN();
  }, [props.nurse.id]);
  useEffect(() => {
    const areyouLogged = () => {
      if (!props.logged) navigate('/login');
    };
    areyouLogged();
  }, [props.logged]);

  return (
    <>
      <Container className="container-xxl mt-4 container-nursup">
        <Row>
          <Col xs="5">
            <UserRecap currentNurse={props.nurse} />
          </Col>
          <Col xs="1">
            <h1 style={{ textAlign: 'center' }}>HOME</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <SearchPatient
              isAll={props.isAll}
              setIsAll={props.setIsAll}
              Allpatients={Allpatients}
              patients={props.patients}
              capitalize={props.capitalize}
              setKey={props.setKey}
              setPatient={props.setPatient}
              setPatients={props.setPatients}
            />
          </Col>
          <Col xs="6">
            <WorkshiftTable
              workshifts={workshifts}
              setPatientWorkshift={props.setPatientWorkshift}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Home;
