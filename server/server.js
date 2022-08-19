'use strict';

const express = require('express');
const dbi = require('./dbi.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = new express();
const port = 3001;

app.use(morgan('common'));
app.use(bodyParser.json());

var loggedIn = true;

app.post('/api/login', async (req, res) => {
  try {
    const nurse = await dbi.login(req.body);

    loggedIn = true;

    res.status(200).json(nurse);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: 'Wrong nurse code or password.' });
  }
});

app.get('/api/patients/firstname/:firstname', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.getPatientsByFirstName(req.params.firstname);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while retrieving the patients.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.get('/api/patients/lastname/:lastname', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.getPatientsByLastName(req.params.lastname);

      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while retrieving the patients.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.get('/api/patients/code/:code', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.getPatientsByCode(req.params.code);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while retrieving the patients.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.get('/api/patients/birthdate/:birthdate', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.getPatientsByBirthdate(req.params.birthdate);

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: 'Database error while retrieving the patients.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.get('/api/examinations/:code', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.getExaminations(req.params.code);

      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while retrieving the examinations.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.get('/api/patients/tasks/:code', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.getTasksByPatientCode(req.params.code);

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: 'Database error while retrieving the tasks.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.get('/api/nurses/tasks/:code', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.getTasksByNurseCode(req.params.code);

      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while retrieving the tasks.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.get('/api/notes/:patient', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.getNotesByPatientCode(req.params.patient);

      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while retrieving the notes.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.get('/api/workshifts/:nurse', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.getWorkshift(req.params.nurse);

      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while retrieving the workshift.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.get('/api/patients/all', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.getAllPatients();

      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while retrieving the patients.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

/* Requires json body following this format:
 *   {
 *     name:        "value",
 *     description:  "value",
 *     timestamp:    "value",
 *     patient:      "value"
 *   }
 */
app.post('/api/examinations', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.createExamination(req.body);

      res
        .status(200)
        .json({ message: 'Examination inserted successfully!', id: result });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while inserting the examination.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

/* Requires json body following this format:
 *   {
 *     title:        "value",
 *     assignts:     "value",
 *     description:  "value",
 *     status:       "value",
 *     nurse:        "value",
 *     patient:      "value"
 *   }
 */
app.post('/api/tasks', async (req, res) => {
  if (loggedIn) {
    try {
      console.log(req.body);
      const result = await dbi.createTask(req.body);

      res
        .status(200)
        .json({ message: 'Task inserted successfully!', id: result });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while inserting the task.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

/* Requires json body following this format:
 *   {
 *     title:        "value",
 *     body:         "value",
 *     nurse:        "value",
 *     patient:      "value",
 *     timestamp:    "value"
 *   }
 */
app.post('/api/notes', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.createNote(req.body);

      res.status(200).json({ message: 'Note correctly created!', id: result });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while creating the note.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

/* Requires json body following this format:
 *   {
 *     id:        "value",
 *     status:    "value"
 *   }
 */
app.put('/api/tasks', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.updateTaskStatus(req.body);

      res.status(200).json({ message: 'Task updated successfully!' });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while updating the task.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

/* Requires json body following this format:
 *   {
 *     id:        "value",
 *     timestamp: "value"
 *   }
 */
app.put('/api/nurses/start', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.setStartWorkshift(req.body);

      res
        .status(200)
        .json({ message: 'Correctly set the start of workshift timestamp!' });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while setting the timestamp.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

/* Requires json body following this format:
 *   {
 *     title:      "value",
 *     body:       "value",
 *     timestamp:  "value",
 *     id:         "value"
 *   }
 */
app.put('/api/notes', async (req, res) => {
  if (loggedIn) {
    try {
      console.log(req.body)
      const result = await dbi.modifyNote(req.body);

      res.status(200).json({ message: 'Note correctly modified!' });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while modifying the note.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.delete('/api/notes/:id', async (req, res) => {
  if (loggedIn) {
    try {
      const result = await dbi.deleteNote(req.params.id);

      res.status(200).json({ message: 'Correctly deleted the note!' });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Database error while deleting the note.' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.delete('/api/logout', async (req, res) => {
  if (loggedIn) {
    loggedIn = false;

    res.status(200).json({ message: 'Successfully logged out!' });
  } else {
    res.status(403).json({ error: 'Access forbidden without logging in!' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
