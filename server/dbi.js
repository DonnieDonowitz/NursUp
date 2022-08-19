'use strict';

const { raw } = require('express');

const sqlite = require('sqlite3');

const db = new sqlite.Database('NursUpDatabase.db', (err) => {
  if (err) throw err;
});

exports.login = (obj) => {
  return new Promise((res, rej) => {
    const sql = 'SELECT * FROM Nurses WHERE ID=? AND Password=?;';

    db.get(sql, [obj.username, obj.password], (err, row) => {
      if (err) {
        rej(err);
        return;
      }

      if (row == undefined) {
        res({ error: 'Wrong nurse id or password.' });
      } else {
        const nurse = {
          id: row.ID,
          firstname: row.FirstName,
          lastname: row.LastName,
        };

        res(nurse);
      }
    });
  });
};

exports.getPatientsByFirstName = (fname) => {
  return new Promise((res, rej) => {
    const sql = 'SELECT * FROM Patients WHERE FirstName=?;';

    db.all(sql, [fname], (err, rows) => {
      if (err) {
        rej(err);
        return;
      }

      if (rows.length > 1) {
        const patients = rows.map((p) => {
          return {
            id: p.ID,
            firstname: p.FirstName,
            lastname: p.LastName,
            address: p.Address,
            sex: p.Sex,
            nation: p.Nationality,
            telephonetype: p.TelephoneType,
            telephone: p.Telephone,
            dept: p.Department,
            date: p.HospitalizationDate,
            bed: p.Bed,
            room: p.Room,
            birthdate: p.Birthdate,
            generals: p.Generals,
          };
        });

        res(patients);
      } else {
        if (rows === undefined || rows === [] || rows.length === 0) {
          res({ error: 'No patients matching this firstname.', patients: [] });
        } else {
          const patient = [
            {
              id: rows[0].ID,
              firstname: rows[0].FirstName,
              lastname: rows[0].LastName,
              address: rows[0].Address,
              sex: rows[0].Sex,
              nation: rows[0].Nationality,
              telephonetype: rows[0].TelephoneType,
              telephone: rows[0].Telephone,
              dept: rows[0].Department,
              date: rows[0].HospitalizationDate,
              bed: rows[0].Bed,
              room: rows[0].Room,
              birthdate: rows[0].Birthdate,
              generals: rows[0].Generals,
            },
          ];

          res(patient);
        }
      }
    });
  });
};

exports.getPatientsByLastName = (lastname) => {
  return new Promise((res, rej) => {
    const sql = 'SELECT * FROM Patients WHERE LastName=?;';

    db.all(sql, [lastname], (err, rows) => {
      if (err) {
        rej(err);
        return;
      }

      if (rows.length > 1) {
        const patients = rows.map((p) => {
          return {
            id: p.ID,
            firstname: p.FirstName,
            lastname: p.LastName,
            address: p.Address,
            sex: p.Sex,
            nation: p.Nationality,
            telephonetype: p.TelephoneType,
            telephone: p.Telephone,
            dept: p.Department,
            date: p.HospitalizationDate,
            bed: p.Bed,
            room: p.Room,
            birthdate: p.Birthdate,
            generals: p.Generals,
          };
        });

        res(patients);
      } else {
        if (rows === undefined || rows === [] || rows.length === 0) {
          res({ error: 'No patients matching this lastname.', patients: [] });
        } else {
          const patient = [
            {
              id: rows[0].ID,
              firstname: rows[0].FirstName,
              lastname: rows[0].LastName,
              address: rows[0].Address,
              sex: rows[0].Sex,
              nation: rows[0].Nationality,
              telephonetype: rows[0].TelephoneType,
              telephone: rows[0].Telephone,
              dept: rows[0].Department,
              date: rows[0].HospitalizationDate,
              bed: rows[0].Bed,
              room: rows[0].Room,
              birthdate: rows[0].Birthdate,
              generals: rows[0].Generals,
            },
          ];

          res(patient);
        }
      }
    });
  });
};

exports.getPatientsByCode = (patient) => {
  return new Promise((res, rej) => {
    const sql = 'SELECT * FROM Patients WHERE ID=?;';

    db.all(sql, [patient], (err, rows) => {
      if (err) {
        rej(err);
        return;
      }

      if (rows.length > 1) {
        const patients = rows.map((p) => {
          return {
            id: p.ID,
            firstname: p.FirstName,
            lastname: p.LastName,
            address: p.Address,
            sex: p.Sex,
            nation: p.Nationality,
            telephonetype: p.TelephoneType,
            telephone: p.Telephone,
            dept: p.Department,
            date: p.HospitalizationDate,
            bed: p.Bed,
            room: p.Room,
            birthdate: p.Birthdate,
            generals: p.Generals,
          };
        });

        res(patients);
      } else {
        if (rows === undefined || rows === [] || rows.length === 0) {
          res({ error: 'No patients matching this code.', patients: [] });
        } else {
          const patient = [
            {
              id: rows[0].ID,
              firstname: rows[0].FirstName,
              lastname: rows[0].LastName,
              address: rows[0].Address,
              sex: rows[0].Sex,
              nation: rows[0].Nationality,
              telephonetype: rows[0].TelephoneType,
              telephone: rows[0].Telephone,
              dept: rows[0].Department,
              date: rows[0].HospitalizationDate,
              bed: rows[0].Bed,
              room: rows[0].Room,
              birthdate: rows[0].Birthdate,
              generals: rows[0].Generals,
            },
          ];

          res(patient);
        }
      }
    });
  });
};

exports.getPatientsByBirthdate = (birth) => {
  return new Promise((res, rej) => {
    const sql = 'SELECT * FROM Patients WHERE DATE(Birthdate)=DATE(?);';

    db.all(sql, [birth], (err, rows) => {
      if (err) {
        rej(err);
        return;
      }

      if (rows.length > 1) {
        const patients = rows.map((p) => {
          return {
            id: p.ID,
            firstname: p.FirstName,
            lastname: p.LastName,
            address: p.Address,
            sex: p.Sex,
            nation: p.Nationality,
            telephonetype: p.TelephoneType,
            telephone: p.Telephone,
            dept: p.Department,
            date: p.HospitalizationDate,
            bed: p.Bed,
            room: p.Room,
            birthdate: p.Birthdate,
            generals: p.Generals,
          };
        });

        res(patients);
      } else {
        if (rows === undefined || rows === [] || rows.length === 0) {
          res({ error: 'No patients matching this birthdate.', patients: [] });
        } else {
          const patient = [
            {
              id: rows[0].ID,
              firstname: rows[0].FirstName,
              lastname: rows[0].LastName,
              address: rows[0].Address,
              sex: rows[0].Sex,
              nation: rows[0].Nationality,
              telephonetype: rows[0].TelephoneType,
              telephone: rows[0].Telephone,
              dept: rows[0].Department,
              date: rows[0].HospitalizationDate,
              bed: rows[0].Bed,
              room: rows[0].Room,
              birthdate: rows[0].Birthdate,
              generals: rows[0].Generals,
            },
          ];

          res(patient);
        }
      }
    });
  });
};

exports.getExaminations = (patient) => {
  return new Promise((res, rej) => {
    const sql = 'SELECT * FROM Examinations WHERE Patient=?;';

    db.all(sql, [patient], (err, rows) => {
      if (err) {
        rej(err);
        return;
      }

      if (rows.length > 1) {
        const exams = rows.map((e) => {
          return {
            id: e.ID,
            name: e.Name,
            description: e.Description,
            time: e.Timestamp,
          };
        });

        res(exams);
      } else {
        if (rows === undefined || rows === [] || rows.length === 0) {
          return;
        } else {
          const exam = [
            {
              id: rows[0].ID,
              name: rows[0].Name,
              description: rows[0].Description,
              time: rows[0].Timestamp,
            },
          ];

          res(exam);
        }
      }
    });
  });
};

exports.getTasksByNurseCode = (nurse) => {
  return new Promise((res, rej) => {
    const sql = 'SELECT * FROM Tasks WHERE NurseCode=?;';

    db.all(sql, [nurse], (err, rows) => {
      if (err) {
        rej(err);
        return;
      }

      if (rows.length > 1) {
        const tasks = rows.map((t) => {
          return {
            id: t.ID,
            title: t.Title,
            assignts: t.Timestamp,
            description: t.Description,
            status: t.Status,
            patient: t.PatientCode,
          };
        });

        res(tasks);
      } else {
        if (rows === undefined || rows === [] || rows.length === 0) {
          return;
        } else {
          const task = [
            {
              id: rows[0].ID,
              title: rows[0].Title,
              assignts: rows[0].Timestamp,
              description: rows[0].Description,
              status: rows[0].Status,
              patient: rows[0].PatientCode,
            },
          ];

          res(task);
        }
      }
    });
  });
};

exports.getTasksByPatientCode = (patient) => {
  return new Promise((res, rej) => {
    const sql =
      'SELECT Tasks.ID,Tasks.Description,Tasks.Timestamp,Tasks.Title,Tasks.Status,Nurses.FirstName,Nurses.LastName FROM Tasks,Nurses WHERE PatientCode=? AND Tasks.NurseCode=Nurses.ID;';

    db.all(sql, [patient], (err, rows) => {
      if (err) {
        rej(err);
        return;
      }

      if (rows.length > 1) {
        const tasks = rows.map((t) => {
          return {
            id: t.ID,
            title: t.Title,
            assignts: t.Timestamp,
            description: t.Description,
            status: t.Status,
            creatorFN: t.FirstName,
            creatorLN: t.LastName,
            timestamp: t.Timestamp,
          };
        });

        res(tasks);
      } else {
        if (rows === undefined || rows === [] || rows.length === 0) {
          return;
        } else {
          const task = [
            {
              id: rows[0].ID,
              title: rows[0].Title,
              assignts: rows[0].Timestamp,
              description: rows[0].Description,
              status: rows[0].Status,
              creatorFN: rows[0].FirstName,
              creatorLN: rows[0].LastName,
              timestamp: rows[0].Timestamp,
            },
          ];

          res(task);
        }
      }
    });
  });
};

exports.getNotesByPatientCode = (patient) => {
  return new Promise((res, rej) => {
    const sql =
      'SELECT Notes.ID, Notes.Title, Notes.PatientCode, Nurses.FirstName, Nurses.LastName, Notes.Timestamp, Notes.PatientCode, Notes.Body FROM Notes, Nurses WHERE PatientCode=? AND Notes.NurseCode=Nurses.ID;';

    db.all(sql, [patient], (err, rows) => {
      if (err) {
        rej(err);
        return;
      }

      if (rows.length > 1) {
        const notes = rows.map((n) => {
          return {
            id: n.ID,
            title: n.Title,
            body: n.Body,
            patient: n.PatientCode,
            creatorFN: n.FirstName,
            creatorLN: n.LastName,
            assignts: n.Timestamp,
          };
        });

        res(notes);
      } else {
        if (rows === undefined || rows === [] || rows.length === 0) {
          return;
        } else {
          const note = [{
            id: rows[0].ID,
            title: rows[0].Title,
            body: rows[0].Body,
            patient: rows[0].PatientCode,
            creatorFN: rows[0].FirstName,
            creatorLN: rows[0].LastName,
            assignts: rows[0].Timestamp,
          }];

          res(note);
        }
      }
    });
  });
};

exports.getWorkshift = (nurse) => {
  return new Promise((res, rej) => {
    const sql =
      'SELECT * FROM Workshifts, Patients WHERE NurseCode=? AND Patients.ID=Workshifts.PatientCode;';

    db.all(sql, [nurse], (err, rows) => {
      if (err) {
        rej(err);
        return;
      }

      if (rows.length > 1) {
        const work = rows.map((w) => {
          return {
            id: w.ID,
            patient: w.PatientCode,
            firstname: w.FirstName,
            lastname: w.LastName,
            dept: w.Department,
            room: w.Room,
            bed: w.Bed,
            timestamp: w.Timestamp,
          };
        });

        res(work);
      } else {
        if (rows === undefined || rows === [] || rows.length === 0) {
          return;
        } else {
          const work = {
            id: rows[0].ID,
            patient: rows[0].PatientCode,
            firstname: rows[0].FirstName,
            lastname: rows[0].LastName,
            dept: rows[0].Department,
            room: rows[0].Room,
            bed: rows[0].Bed,
            timestamp: rows[0].Timestamp,
          };

          res(work);
        }
      }
    });
  });
};

exports.getAllPatients = () => {
  return new Promise((res, rej) => {
    const sql = 'SELECT * FROM Patients;';

    db.all(sql, [], (err, rows) => {
      if (err) {
        rej(err);
        return;
      }

      if (rows.length > 1) {
        const patients = rows.map((p) => {
          return {
            id: p.ID,
            firstname: p.FirstName,
            lastname: p.LastName,
            address: p.Address,
            sex: p.Sex,
            nation: p.Nationality,
            telephonetype: p.TelephoneType,
            telephone: p.Telephone,
            dept: p.Department,
            date: p.HospitalizationDate,
            bed: p.Bed,
            room: p.Room,
            birthdate: p.Birthdate,
            generals: p.Generals,
          };
        });

        res(patients);
      } else {
        if (rows === undefined || rows === [] || rows.length === 0) {
          res({
            message: 'There are no patients in the database.',
            patients: [],
          });
        } else {
          const patient = [
            {
              id: rows[0].ID,
              firstname: rows[0].FirstName,
              lastname: rows[0].LastName,
              address: rows[0].Address,
              sex: rows[0].Sex,
              nation: rows[0].Nationality,
              telephonetype: rows[0].TelephoneType,
              telephone: rows[0].Telephone,
              dept: rows[0].Department,
              date: rows[0].HospitalizationDate,
              bed: rows[0].Bed,
              room: rows[0].Room,
              birthdate: rows[0].Birthdate,
              generals: rows[0].Generals,
            },
          ];

          res(patient);
        }
      }
    });
  });
};

exports.createTask = (task) => {
  return new Promise((res, rej) => {
    const sql =
      'INSERT INTO Tasks(Title, Timestamp, Description, Status, NurseCode, PatientCode) VALUES(?,?,?,?,?,?);';

    db.run(
      sql,
      [
        task.title,
        task.assignts,
        task.description,
        task.status,
        task.nurse,
        task.patient,
      ],
      function (err) {
        if (err) {
          rej(err);
          return;
        }

        res(this.lastID);
      }
    );
  });
};

exports.createExamination = (exam) => {
  return new Promise((res, rej) => {
    const sql =
      'INSERT INTO Examinations(Name, Description, Timestamp, Patient) VALUES(?,?,?,?);';

    db.run(
      sql,
      [exam.name, exam.description, exam.time, exam.patient],
      function (err) {
        if (err) {
          rej(err);
          return;
        }

        res(this.lastID);
      }
    );
  });
};

exports.createNote = (note) => {
  return new Promise((res, rej) => {
    const sql =
      'INSERT INTO Notes(Title, Body, NurseCode, PatientCode, Timestamp) VALUES(?,?,?,?,?);';

    db.run(
      sql,
      [note.title, note.body, note.nurse, note.patient, note.assignts],
      function (err) {
        if (err) {
          rej(err);
          return;
        }

        res(this.lastID);
      }
    );
  });
};

exports.updateTaskStatus = (task) => {
  return new Promise((res, rej) => {
    const sql = 'UPDATE Tasks SET Status=? WHERE ID=?;';

    db.run(sql, [task.status, task.id], function (err) {
      if (err) {
        console.log(err);
        rej(err);
        return;
      }

      res(this.lastID);
    });
  });
};

exports.setStartWorkshift = (nurse) => {
  return new Promise((res, rej) => {
    const sql = 'UPDATE Nurses SET Timestamp=? WHERE ID=?;';

    db.run(sql, [nurse.timestamp, nurse.id], function (err) {
      if (err) {
        rej(err);
        return;
      }

      res(this.lastID);
    });
  });
};

exports.modifyNote = (note) => {
  console.log(note);
  return new Promise((res, rej) => {
    const sql = 'UPDATE Notes SET Body=? WHERE ID=?;';

    db.run(sql, [note.body, note.id], function (err) {
      if (err) {
        rej(err);
        return;
      }

      res(this.lastID);
    });
  });
};

exports.deleteNote = (note) => {
  return new Promise((res, rej) => {
    const sql = 'DELETE FROM Notes WHERE ID=?;';

    db.run(sql, [note], function (err) {
      if (err) {
        rej(err);
        return;
      }

      res(this.lastID);
    });
  });
};
