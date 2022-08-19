import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  CardGroup,
  Form,
  Table,
  Col,
  Button,
  Tabs,
  Tab,
  Modal
} from 'react-bootstrap';
import AnagraficaPaziente from './AnagraficaPaziente';
import Note from './Note';
import API from '../API';
import { Link } from 'react-router-dom';

function MedicalRecord(props) {
  const [notes, setNotes] = useState([{ error: 'error' }]);
  const [exams, setExams] = useState([{ error: 'error' }]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [examDesc, setExamDesc] = useState('');
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [filterNotes, setFilterNotes] = useState([{ error: 'error' }]);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showRemoveFilter, setShowRemoveFilter] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const getNotes = async () => {
      await API.getNotesByPatient(props.patient.id)
        .then((res) => {
          setNotes(res);
          setFilterNotes(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (props.patient.id !== undefined) {
      getNotes();
    }
  }, [props.patient]);

  useEffect(() => {
    const getExams = async () => {
      await API.getExaminations(props.patient.id)
        .then((res) => {
          setExams(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (props.patient.id !== undefined) {
      getExams();
    }
  }, [props.patient]);

  const handleExamDescription = (e) => {
    setExamDesc(e.target.value);
  };

  const handleExamDate = (e) => {
    setExamDate(e.target.value);
  };

  const handleExamName = (e) => {
    setExamName(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handleCreateExam = async (e) => {
    e.stopPropagation();

    const exam = {
      name: examName,
      description: examDesc,
      time: examDate,
      patient: props.patient.id,
    };

    await API.createExam(exam)
      .then((res) => (exam.id = res.id))
      .catch((err) => {
        console.log(err);
      });
    exams.push(exam);
    setExams(exams);

    setExamDate('');
    setExamDesc('');
    setExamName('');
    setShowModal(false);
  };

  const handleCreateNote = async (e) => {
    e.stopPropagation();

    const note = {
      nurse: props.nurse.id,
      assignts: new Date().toISOString().split('T')[0],
      body: body,
      title: title,
      patient: props.patient.id
    };

    await API.createNote(note)
      .then((res) => (note.id = res.id))
      .catch((err) => {
        console.log(err);
      });

    note.creatorFN = props.nurse.firstname;
    note.creatorLN = props.nurse.lastname;
    notes.push(note);
    setFilterNotes(notes);
    setNotes(notes);

    setTitle('');
    setBody('');
  };

  const handleRemoveFilter = (e) => {
    setFilter('');

    setFilterNotes([...notes]);
    setShowRemoveFilter(false);
  }

  const handleFilterNote = (e) => {
    if (filter === ' ' || filter === undefined || filter === '') {
      setFilterNotes([...filterNotes]);
    } else {
      setFilterNotes(
        filterNotes.filter(
          (n) =>
            n.body.match(filter) ||
            n.title.match(filter) ||
            n.creatorFN.match(filter) ||
            n.creatorLN.match(filter)
        )
      );
    }

    setShowRemoveFilter(true);
  };

  const handleSaveNote = async (note) => {
    await API.editNote(note)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    const idx = notes.findIndex((n) => n.id === note.id);
    notes[idx] = note;

    const idx2 = filterNotes.findIndex((n) => n.id === note.id);
    filterNotes[idx2] = note;

    setFilterNotes(filterNotes);
    setNotes(notes);
  };

  const handleDeleteNote = async (id) => {
    await API.deleteNote(id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    setFilterNotes(
      filterNotes.filter((n) => n.id !== id)
    );
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <>
      <Container className="container-xxl container-nursup">
        <Link to="/">
          <Button variant="secondary" style={{ marginTop: '30px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
            </svg>
            {'   '} Go back
          </Button>
        </Link> <br></br>
        <Row className="mt-3 mb-3">
          <Col>
            <h2 align="center"> Medical Record</h2>
          </Col>
        </Row>

        <Tabs
          defaultActiveKey="generals"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="generals" title="Generals">
            <Container>
              <AnagraficaPaziente patient={props.patient} />
            </Container>
          </Tab>

          <Tab eventKey="notes" title="Notes">
            <Container style={{ margin: 'auto', width: '100%' }}>
              <h4 align="center"> Create a new note </h4>
              <br></br>
              <Row style={{ width: '100%', margin: 'auto' }}>
                <Col className="mt-3" xs lg="4">
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        {' '}
                        <b> Title </b>{' '}
                      </Form.Label>
                      <Form.Control
                        onChange={(ev) => handleTitle(ev)}
                        value={title}
                        type="textarea"
                        placeholder="Insert the title of the note"
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col className="mt-3" xs lg="8">
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.Controlbodyarea1"
                    >
                      <Form.Label>
                        {' '}
                        <b> Text </b>{' '}
                      </Form.Label>
                      <Form.Control
                        onChange={(ev) => handleBody(ev)}
                        value={body}
                        as="textarea"
                        placeholder="Insert the text of the note"
                        rows={5}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row
                className="mb-5"
                style={{ width: '80%', margin: 'auto', textAlign: 'center' }}
              >
                <Col className="mt-3">
                  <Button
                    onClick={(ev) => handleCreateNote(ev)}
                    variant="primary"
                  >
                    Create note
                  </Button>
                </Col>
              </Row>
              <br></br>
              <h4 align="center"> Notes </h4>
              <br></br>
              <Row className="mb-5" style={{ width: '55%', margin: 'auto' }}>
                <Col xs lg="8">
                  <Form>
                    <Form.Label>
                      {' '}
                      <b> Filter notes </b>{' '}
                    </Form.Label>
                    <Form.Control
                      onChange={(ev) => setFilter(ev.target.value)}
                      value={filter}
                      type="textarea"
                      placeholder="Filter by title, author or content"
                    />
                  </Form>
                </Col>
                <Col xs lg="4">
                  {!showRemoveFilter ? 
                    (<Button variant="secondary" onClick={(ev) => handleFilterNote(ev)} style={{ marginTop: '30px' }}>
                      Filter
                    </Button>) : 
                    (<Button show={showRemoveFilter} variant="secondary" onClick={(ev) => handleRemoveFilter(ev)} style={{ marginTop: '30px' }}>
                      Remove filter
                    </Button>) 
                  }


                </Col>
              </Row>
            </Container>
            <CardGroup style={{ marginLeft: '10px', marginRight: '10px' }}>
              <Container>
                {filterNotes.map((note, idx) => {
                  if (note.error) return <></>;
                  return (
                    <Row style={{ margin: '20px', width: '100%' }}>
                      <Col>
                        <Note
                          key={idx}
                          note={note}
                          handleDeleteNote={handleDeleteNote}
                          handleSaveNote={handleSaveNote}
                        ></Note>
                      </Col>
                    </Row>
                  );
                })}
              </Container>
            </CardGroup>
          </Tab>
          <Tab eventKey="exams" title="Exams">
            <h4 align="Center"> Create a new exam </h4>
            <br></br>
            <Container>
              <Row style={{ margin: 'auto', width: '100%' }}>
                <Col xs lg="4">
                  <div className="mt-3">
                    <p>
                      <b> Exam name: </b>
                    </p>
                    <Form.Control
                      value={examName}
                      onChange={(ev) => handleExamName(ev)}
                      type="text"
                      aria-label="Disabled input example"
                      placeholder="Insert the name"
                    />
                  </div>
                </Col>
                <Col xs lg="4">
                  <div className="mt-3">
                    <p>
                      <b> Exam description: </b>
                    </p>
                    <Form.Control
                      value={examDesc}
                      onChange={(ev) => handleExamDescription(ev)}
                      type="text"
                      aria-label="Disabled input example"
                      placeholder="Insert the description"
                    />
                  </div>
                </Col>
                <Col xs lg="4">
                  <div className="mt-3">
                    <p>
                      <b> Exam timestamp: </b>
                    </p>
                    <Form.Control
                      value={examDate}
                      onChange={(ev) => handleExamDate(ev)}
                      type="text"
                      aria-label="Disabled input example"
                      placeholder="Insert the date (YYYY-MM-DD HH:MM:SS)"
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mb-5" style={{ margin: 'auto', width: '100%' }}>
                <div className="mt-3" align="center">
                  <Button
                    onClick={() => setShowModal(true)}
                    variant="primary"
                  >
                    {' '}
                    Create exam{' '}
                  </Button>
                </div>
              </Row>
            </Container>
            <h4 align="center" className="mt-3"> List of exams </h4>
            <br></br>
            <Table
              style={{ margin: 'auto', width: '100%' }}
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th>
                    {' '}
                    <b> ID </b>{' '}
                  </th>
                  <th>
                    {' '}
                    <b> Name </b>{' '}
                  </th>
                  <th>
                    {' '}
                    <b> Description </b>{' '}
                  </th>
                  <th>
                    {' '}
                    <b> Timestamp </b>{' '}
                  </th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, idx) => {
                  if (exam.error) return <></>;
                  return (
                    <tr>
                      <td> {exam.id} </td>
                      <td> {exam.name} </td>
                      <td> {exam.description} </td>
                      <td> {exam.time} </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Container>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Do you want to create the exam with the following fields?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <i> Exam name: </i>{'  '}
            {examName}
          </p>
          <p>
            <i> Exam description: </i>
            <br></br>
            {examDesc}
          </p>
          <p>
            <i> Exam timestamp: </i> {'  '}
            {examDate}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(ev) => handleCreateExam(ev)}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleCloseModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MedicalRecord;
