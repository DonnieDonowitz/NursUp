async function getNotesByPatient(patient) {
  const response = await fetch(`/api/notes/${patient}`);
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function getAllPatients() {
  const response = await fetch('/api/patients/all');
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function logIn(credentials) {
  let responseLogIn = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (responseLogIn.ok) {
    const user = await responseLogIn.json();
    return user;
  } else {
    let err = {
      status: responseLogIn.status,
      errObj: await responseLogIn.json(),
    };
    throw err; // An object with the error coming from the server
  }
}
async function logOut() {}

async function deleteNote(note) {
  const requestOptions = {
    method: 'DELETE',
  };
  const response = await fetch(`/api/notes/${note}`, requestOptions);
  if (response.ok) {
    return response;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function createTask(workshift) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workshift),
  };

  const response = await fetch(`/api/tasks`, requestOptions);
  if (response.ok) {
    return response;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function createExam(exam) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exam),
  };
  const response = await fetch(`/api/examinations`, requestOptions);
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function createNote(note) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  };
  const response = await fetch(`/api/notes`, requestOptions);
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function editNote(note) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: note.id, title: note.title, body: note.body }),
  };
  const response = await fetch(`/api/notes`, requestOptions);
  if (response.ok) {
    return response;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function editStatusTasks(task) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: task.id, status: task.status }),
  };
  const response = await fetch(`/api/tasks`, requestOptions);
  if (response.ok) {
    return response;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}

async function getPatientsbyBirthdate(bd) {
  const response = await fetch(`/api/patients/birthdate/${bd}`);
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function getPatientsbyFName(fname) {
  const response = await fetch(`/api/patients/firstname/${fname}`);
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function getPatientsbyLName(lname) {
  const response = await fetch(`/api/patients/lastname/${lname}`);
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function getAllPatientByNurse(ncode) {
  const response = await fetch(`/api/workshifts/${ncode}`);
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function getAllTasksByPcode(pcode) {
  const response = await fetch(`/api/patients/tasks/${pcode}`);
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
async function getPatientsbyCode(pcode) {
  const response = await fetch(`/api/patients/code/${pcode}`);
  if (response.ok) {
    const responseBody = await response.json();
    console.log(responseBody);
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}

async function getExaminations(pcode) {
  const response = await fetch(`/api/examinations/${pcode}`);
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  } else {
    let err = { status: response.status, errObj: await response.json() };
    throw err; // An object with the error coming from the server
  }
}
const API = {
  getPatientsbyBirthdate,
  getPatientsbyCode,
  getPatientsbyFName,
  getPatientsbyLName,
  getNotesByPatient,
  editNote,
  createNote,
  getAllPatientByNurse,
  getAllTasksByPcode,
  deleteNote,
  getExaminations,
  createExam,
  editStatusTasks,
  getAllPatients,
  createTask,
  logIn,
};
export default API;
