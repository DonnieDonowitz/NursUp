import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import PageResult from './Components/PageResult';
import NavbarNursup from './Components/NavbarNursup';
import FooterNursup from './Components/FooterNursup';
import LoginForm from './Components/LoginForm';
import Home from './Components/Home';
import { Routes, Route, Navigate } from 'react-router-dom';

import MyWorkshift from './Components/MyWorkshift';
import MedicalRecord from './Components/MedicalRecord';
import API from './API';
function App() {
  const [currentNurse, setCurrentNurse] = useState({});
  const [isAll, setIsAll] = useState(false);
  const [logged, setLogged] = useState(false);
  const [researchKey, setResearchKey] = useState();
  const [singlePatient, setSinglePatient] = useState();
  const [message, setMessage] = useState('');
  const [arrayPatients, setArrayPatients] = useState([{}]);
  const [update, setUpdate] = useState(false);
  const [workshiftPatient, setWorkshiftPatient] = useState({ error: 'init' });
  const [timestampU, setTimestampU] = useState('');
  const [timestampE, setTimestampE] = useState('');

  var dayjs = require('dayjs');

  function changeUpdate() {
    setUpdate(!update);
  }
  function setSinglePatientfunction(pat) {
    setSinglePatient(pat);
  }
  function setWorkshiftsPs(pat) {
    setWorkshiftPatient(pat);
  }
  function setArrayPatientfunction(pat) {
    setArrayPatients(pat);
  }
  function setResearchKeyfunction(key) {
    setResearchKey(key);
  }
  function setIsAllfunction(state) {
    setIsAll(state);
  }
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };
  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);

      if(user.error){
        setMessage(user.error);
      } else {
        var now = dayjs();
        var exit = now.add(8, 'hour');

        setCurrentNurse({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          timestampE: now,
          timestampU: exit,
        });
        
        setLogged(true);
      }
    } catch (err) {
      console.log(err);
      setMessage('Oops! Could not perform login. Please try again later.');
    }
  };
  const doLogOut = () => {
    setLogged(false);
    setCurrentNurse('');
    setTimestampE('');
    setTimestampU('');
    return <Navigate to="/login" />;
  };

  return (
    <>
      <NavbarNursup
        logout={doLogOut}
        logged={logged}
        patients={arrayPatients}
        setKey={setResearchKeyfunction}
        setPatient={setSinglePatient}
        setPatients={setArrayPatients}
        changeUpdate={changeUpdate}
      />
      <Routes>
        <Route
          path="/workshift"
          element={
            <MyWorkshift
              logged={logged}
              nurse={currentNurse}
              patient={workshiftPatient}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <LoginForm
              message={message}
              setMessage={setMessage}
              logged={logged}
              login={doLogIn}
            />
          }
        ></Route>
        <Route
          path="/"
          element={
            <Home
              logged={logged}
              nurse={currentNurse}
              isAll={isAll}
              setIsAll={setIsAllfunction}
              patients={arrayPatients}
              setKey={setResearchKeyfunction}
              setPatient={setSinglePatientfunction}
              setPatients={setArrayPatientfunction}
              setPatientWorkshift={setWorkshiftsPs}
            />
          }
        ></Route>
        <Route
          path="/search-result"
          element={
            <PageResult
              isAll={isAll}
              setIsAll={setIsAllfunction}
              keySearch={researchKey}
              patients={arrayPatients}
              setPatient={setSinglePatientfunction}
              changeUpdate={changeUpdate}
            />
          }
        ></Route>
        <Route
          path="/medical-record"
          element={
            <MedicalRecord
              nurse={currentNurse}
              patient={singlePatient}
              logged={logged}
            />
          }
        ></Route>
      </Routes>
      <FooterNursup className="mt-3" />
    </>
  );
}

export default App;
