import { Container, Row, Col } from 'react-bootstrap';
import nurseLogo from '../nurse.png';

function UserRecap(props) {
  var dayjs = require('dayjs');
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="4" className="d-flex align-items-center">
            <img
              src={nurseLogo}
              alt="..."
              className="img-thumbnail"
              style={{ borderRadius: '50px' }}
            ></img>
          </Col>
          <Col>
            <p>
              {' '}
              <b>Firstname:</b>  {'  ' + props.currentNurse.firstname}
            </p>
            <p>
              <b>Lastname:</b> {'  ' + props.currentNurse.lastname}
            </p>
            <p>
              <b>Nurse ID:</b>  {'  ' + props.currentNurse.id}
            </p>
            <p>
              <b>Workshift start:</b>  {'  ' + dayjs(props.currentNurse.timestampE).format('MM-DD HH:mm')}
            </p>
            <p>
              <b>Workshift end:</b>    {'  ' + dayjs(props.currentNurse.timestampU).format('MM-DD HH:mm')}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default UserRecap;
