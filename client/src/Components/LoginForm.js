import { Form, Alert, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import '../index.css';
function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setMessage('');

    const credentials = { username, password };

    let valid = true;
    if (username.trim() === '' || password.trim() === '') valid = false;

    if (valid) {
      props.login(credentials);
    } else {
      props.setMessage('Insert a valid Email and Password and try again');
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
    props.setMessage('');
  };

  if (props.logged) {
    navigate('/');
  }

  return (
    <Container fluid="lg">
      <Row className="justify-content-md-center">
        <Col lg={3} />
        <Col lg={6} className="mb-5">
          <span className="d-block text-center mt-5 mb-2 display-2">
            Nursup Login
          </span>
          <h5 className="d-block mx-auto mb-5 text-center text-muted">
            Enter your credentials below
          </h5>
          {props.message !== '' && (
            <Alert
              variant="danger"
              className="text-center"
              onClose={() => props.setMessage('')}
              dismissible
            >
              {props.message}
            </Alert>
          )}

          <Form className="mx-auto d-block text-start">
            <Form.Group controlId="username">
              <Form.Label style={{ fontSize: 25 }}>Nurse ID</Form.Label>
              <Form.Control
                size="lg"
                type="email"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="password">
              <Form.Label style={{ fontSize: 25 }}>Password</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </Form.Group>
            <br />
            <div className="d-block text-center">
              <Button variant="primary" className="me-3" onClick={handleSubmit}>
                Login
              </Button>
              <Button variant="danger" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </Form>
        </Col>
        <Col lg={3} />
      </Row>
    </Container>
  );
}

export default LoginForm;
