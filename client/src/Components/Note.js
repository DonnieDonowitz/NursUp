import { Modal, Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import '../App.css';

function Note(props) {
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(props.note.body);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const toggleEdit = (e) => {
    setEditing(!editing);
  };

  const handleSave = (e) => {
    setEditing(false);

    const note = {
      id: props.note.id,
      nurse: props.note.nurse,
      body: body,
      title: props.note.title,
      patient: props.note.patient,
      assignts: props.note.assignts,
    };

    props.handleSaveNote(note);
  };

  const handleUndo = (e) => {
    setEditing(false);

    setBody(props.note.body);
  };

  const handleDelete = (e) => {
    props.handleDeleteNote(props.note.id);
    props.setShowModal(true);
  };

  return (
    <>
      <Card>
        <Card.Header
          className="body-muted"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <p style={{ fontSize: '8' }}>
            Created by:{' '}
            <b> {props.note.creatorFN + ' ' + props.note.creatorLN} </b>
          </p>
          <span>
            {editing ? (
              <Button
                style={{
                  margin: '20px',
                  marginTop: '0px',
                  marginBottom: '0px',
                }}
                onClick={(ev) => handleSave(ev)}
                variant="primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-check-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                </svg>{' '}
                Save
              </Button>
            ) : (
              <Button
                style={{
                  margin: '20px',
                  marginTop: '0px',
                  marginBottom: '0px',
                }}
                onClick={(ev) => toggleEdit(ev)}
                variant="primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>{' '}
                Edit
              </Button>
            )}
            {editing ? (
              <Button
                style={{
                  margin: '20px',
                  marginTop: '0px',
                  marginBottom: '0px',
                }}
                onClick={(ev) => handleUndo(ev)}
                variant="danger"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>{' '}
                Cancel
              </Button>
            ) : (
              <Button
                style={{
                  margin: '20px',
                  marginTop: '0px',
                  marginBottom: '0px',
                }}
                onClick={() => setShowModal(true)}
                variant="danger"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>{' '}
                Delete
              </Button>
            )}
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Title> {props.note.title} </Card.Title>
          {editing ? (
            <Form.Control
              onChange={(ev) => handleBody(ev)}
              defaultValue={body}
              as="textarea"
              rows={5}
            />
          ) : (
            <Card.Text> {body} </Card.Text>
          )}
        </Card.Body>
        <Card.Footer className="body-muted">
          {' '}
          {props.note.assignts}{' '}
        </Card.Footer>
      </Card>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Do you want to delete this note?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: '18px' }}>
            <i> Notes title: </i>{'  '}
            <b>
            {props.note.title}
            </b>
          </p>
          <p>
            <i> Notes body: </i>
            <br></br>
            {body}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(ev) => handleDelete(ev)}>
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

export default Note;
