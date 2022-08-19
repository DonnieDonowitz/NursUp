import {
  Container,
  Row,
  Col,
  Table,
  Dropdown,
  Modal,
  Button,
  Form,
  DropdownButton,
} from 'react-bootstrap';
import UserRecap from './UserRecap';
import PatientRecap from './PatientRecap';
import API from '../API';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MyWorkshift(props) {
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [indx, setIndx] = useState();
  const [status, setStatus] = useState();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [statusNew, setStatusNew] = useState('TO START');
  const [timestampNew, setTimestampNew] = useState('');

  const handleCloseCreation = () => setShowCreateNote(false);
  const handleShowCreation = () => setShowCreateNote(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getAllTaskPCode = async () => {
      await API.getAllTasksByPcode(props.patient.id)
        .then((res) => {
          setTasks(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (props.patient.id !== undefined) getAllTaskPCode();
  }, [props.patient, update]);
  function updateValue() {
    setUpdate(!update);
  }

  const taskAssignedtoaPatient = tasks.map((task, idx) => {
    return (
      <>
        <tr key={idx}>
          <td>{task.id}</td>
          <td>{task.title}</td>
          <td>
            {task.creatorFN + ' '}
            {task.creatorLN}
          </td>
          <td>{task.timestamp}</td>
          <td>{task.description}</td>
          <td>
            <Dropdown style={{ textAlign: 'center' }}>
              <Dropdown.Toggle id="dropdown-basic">
                {task.status}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setIndx(idx);
                    setStatus('TO START');
                    handleShow();
                  }}
                >
                  TO START
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setIndx(idx);
                    setStatus('PENDING');
                    handleShow();
                  }}
                >
                  PENDING
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setIndx(idx);
                    setStatus('COMPLETED');
                    handleShow();
                  }}
                >
                  COMPLETED
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Do you want to change the status of task?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {tasks[indx] ? (
              <>
                <h5 style={{}}>{'Title: ' + tasks[indx].title}</h5>
                <span>
                  Old: <b>{tasks[indx].status}</b> -{`>`} New:
                  <b>{' ' + status}</b>
                </span>
              </>
            ) : (
              <></>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                debugger;
                if (tasks[indx]) {
                  await API.editStatusTasks({
                    id: tasks[indx].id,
                    status: status
                  });
                  updateValue();
                  handleClose();
                }
              }}
            >
              Yes!
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  });
  return (
    <>
      <Container className="container-nursup">
        <Link to="/">
          <Button variant="secondary" style={{ marginTop: '30px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
            </svg>
            {'   '} Go back
          </Button>
        </Link> <br></br>
        <Row className="d-flex justify-content-between mt-3 ">
          <Col xs="5">
            {' '}
            <UserRecap currentNurse={props.nurse} />
          </Col>
          <Col xs="5">
            <PatientRecap patient={props.patient} />
          </Col>
        </Row>
        <Row>
          <h2 className="mt-3" style={{ textAlign: 'center' }}>
            My Workshift
          </h2>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Created by</th>
                <th>Assigned date </th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{taskAssignedtoaPatient}</tbody>
          </Table>
          <Col
            className="justify-content-center"
            style={{ textAlign: 'center' }}
          >
            <Button
              className="mt-3"
              onClick={() => {
                setShowCreateNote(true);
              }}
            >
              Create new task
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal
        show={showCreateNote}
        onHide={handleCloseCreation}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Do you want to create a new task?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mt-3">
              <Col xs="6">
                <Form.Label style={{ fontWeight: 700 }}>Task Title</Form.Label>
                <Form.Control
                  onChange={(ev) => {
                    setTitle(ev.target.value);
                  }}
                />
              </Col>
              <Col xs="6" style={{ textAlign: 'center' }}>
                <Form.Label style={{ fontWeight: 700 }}>Status</Form.Label>
                <Dropdown id="dropdown-basic-button">
                  <Dropdown.Toggle id="dropdown-basic">
                    {statusNew}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setStatusNew('TO START');
                      }}
                      selected
                    >
                      TO START
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setStatusNew('PENDING');
                      }}
                    >
                      PENDING
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setStatusNew('COMPLETE');
                      }}
                    >
                      COMPLETED
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Label style={{ fontWeight: 700 }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  onChange={(ev) => {
                    setDescription(ev.target.value);
                  }}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={async () => {
              const timestamp2 =
                new Date().toISOString().split('T')[0] + ' ' + 
                new Date().toISOString().split('T')[1].substring(0, 7);
              setTimestampNew(timestamp2);

              await API.createTask({
                title: title,
                assignts: timestampNew,
                nurse: props.nurse.id,
                patient: props.patient.id,
                status: statusNew,
                description: description,
              });

              updateValue();
              handleCloseCreation();
            }}
          >
            Yes
          </Button>
          <Button variant="danger" onClick={handleCloseCreation}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MyWorkshift;
