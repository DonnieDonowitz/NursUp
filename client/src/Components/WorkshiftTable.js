import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function WorkshiftTable(props) {
  let navigate = useNavigate();
  const mapEachWorkshiftinTableRow = props.workshifts.map((workshift, idx) => {
    return (
      <>
        <tr>
          <td>{workshift.id}</td>
          <td>{workshift.firstname}</td>
          <td>{workshift.lastname}</td>
          <td>{workshift.room}</td>
          <td>{workshift.bed}</td>
          <td style={{ textAlign: 'center' }}>
            <Button
              onClick={() => {
                props.setPatientWorkshift(workshift);
                navigate('/workshift');
              }}
            >
              Tasks
            </Button>
          </td>
        </tr>
      </>
    );
  });
  return (
    <>
      <Container>
        <h2 className="mt-5" style={{ textAlign: 'center' }}>
          Workshift
        </h2>
        <h6 className="mt-3" style={{ textAlign: 'center' }}>
          This table contains the list of patients you have to take care of
          today
        </h6>
        <Row className="mt-3">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Room</th>
                  <th>Bed</th>
                  <th>Tasks Page</th>
                </tr>
              </thead>
              <tbody>{mapEachWorkshiftinTableRow}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default WorkshiftTable;
