import logo from '../logo.png';
import API from '../API';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Form, FormControl, Button, Col } from 'react-bootstrap/';

function NavbarNursup(props) {
  let pats, pats1;
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [searchCode1, setSearchCode] = useState();

  function isretanArray(patients) {
    if (Array.isArray(patients)) {
      return patients;
    } else {
      return [patients];
    }
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const insertValueSearchCode = (ev) => {
    if (show === true) setShow(false);
    setSearchCode(ev.target.value);
  };

  const handleOnClickSearch = async () => {
    const searchCode = capitalizeFirstLetter(searchCode1);

    if (searchCode.match('P[0-9]+$')) {
      const pat = await API.getPatientsbyCode(searchCode);
      props.setPatients([pat]);
      props.setKey(searchCode);
      navigate('/search-result');
    } else if (/^([a-zA-Z]+)((\s)([a-zA-Z]+))*$/.test(searchCode)) {
      //if it's a text->only name or surname
      const howManySpaces = searchCode.split(' ').length;
      let names = new Array(howManySpaces);
      names = searchCode.split(' ');

      if (howManySpaces > 2) {
        const first_name = names[0] + ' ' + names[1];
        pats = await API.getPatientsbyFName(first_name); // if searchcode is fname
        pats = isretanArray(pats);
        pats1 = await API.getPatientsbyLName(first_name); // if searchcode is lname
        pats1 = isretanArray(pats1);
      } else {
        pats = await API.getPatientsbyFName(searchCode);
        pats = isretanArray(pats);
        pats1 = await API.getPatientsbyLName(searchCode);
        pats1 = isretanArray(pats1);
      }
      if (pats[0].error && pats1[0].error) {
        props.setPatients([{ error: 'not exists' }]);
        props.setKey(searchCode);
        props.changeUpdate();
        navigate('/search-result');
      } else if (pats[0].error) {
        props.setPatients(pats1);
        props.setKey(searchCode);
        navigate('/search-result');
      } else if (pats1[0].error) {
        props.setPatients(pats);
        props.setKey(searchCode);
        navigate('/search-result');
      } else {
        const pats2 = [...pats, ...pats1];
        props.setPatients(pats2);
        props.setKey(searchCode);
        navigate('/search-result');
      }
    } else if (
      searchCode.match('[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}')
    ) {
      pats = await API.getPatientsbyBirthdate(searchCode);
      pats = isretanArray(pats);
      props.setPatients(pats);
      props.setKey(searchCode);
      navigate('/search-result');
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container className="d-flex justify-content-between">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{ fontWeight: 700 }}>
              <img
                alt=""
                src={logo}
                width="120"
                height="70"
                className="d-inline-block "
              />{' '}
              NURSUP
            </Navbar.Brand>
          </Link>

          {props.logged ? (
            <>
              <Form className="d-flex">
                <FormControl
                  isInvalid={show}
                  required
                  type="search"
                  placeholder="Patient Lookup"
                  className="me-2"
                  aria-label="Search"
                  onChange={insertValueSearchCode}
                />

                <Button onClick={handleOnClickSearch}> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg> 
                  
                </Button>
                <Form.Control.Feedback className="m-2" type="invalid">
                  No Patient Found, try again
                </Form.Control.Feedback>
              </Form>
            </>
          ) : (
            <></>
          )}

          {props.logged ? (
            <Button onClick={props.logout} variant="danger"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg> 
              {'  '} Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}
export default NavbarNursup;
