BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "Nurses" (
	"ID"			TEXT NOT NULL UNIQUE,
	"Password"		TEXT NOT NULL,
	"FirstName"		TEXT NOT NULL,
	"LastName"		TEXT NOT NULL,
	"Timestamp"		DATETIME,
	PRIMARY KEY("ID")
);

CREATE TABLE IF NOT EXISTS "Examinations" (
	"ID"			INTEGER NOT NULL UNIQUE,
	"Name"			TEXT NOT NULL,
	"Description"	TEXT,
	"Timestamp"		DATETIME NOT NULL,
	"Patient"		TEXT NOT NULL,
	FOREIGN KEY("Patient") 	REFERENCES "Patients"("ID"),
	PRIMARY KEY("ID" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Tasks" (
	"ID"					INTEGER NOT NULL UNIQUE,
	"Title"					TEXT NOT NULL,
	"Description"			TEXT NOT NULL,
	"Timestamp"				DATETIME NOT NULL,
	"PatientCode"			TEXT NOT NULL,
	"NurseCode"				TEXT NOT NULL,
	"Status"				TEXT NOT NULL,
	FOREIGN KEY("PatientCode") 	REFERENCES "Patients"("ID"),
	FOREIGN KEY("NurseCode") 	REFERENCES "Nurses"("ID"),
	PRIMARY KEY("ID" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Patients" (
	"ID"					TEXT NOT NULL UNIQUE,
	"FirstName"				TEXT NOT NULL,
	"LastName"				TEXT NOT NULL,
	"Address"				TEXT NOT NULL,
	"Sex"					CHAR NOT NULL,
	"Nationality"			TEXT NOT NULL,
	"Telephone"				INTEGER,
	"TelephoneType"			TEXT,
	"Department"			TEXT NOT NULL,
	"HospitalizationDate"	DATE NOT NULL,
	"Bed"					TEXT NOT NULL,
	"Room"					INTEGER NOT NULL,
	"Birthdate"				DATE NOT NULL,
	"Generals"				TEXT NOT NULL,
	PRIMARY KEY("ID")
);

CREATE TABLE IF NOT EXISTS "Notes" (
	"ID"			INTEGER NOT NULL UNIQUE,
	"Title"			TEXT NOT NULL,
	"Body"			TEXT NOT NULL,
	"NurseCode"		TEXT NOT NULL,
	"PatientCode"	TEXT NOT NULL,
	"Timestamp"		DATE NOT NULL,
	FOREIGN KEY("NurseCode")	REFERENCES "Nurses"("ID"),
	FOREIGN KEY("PatientCode")	REFERENCES "Patients"("ID"),
	PRIMARY KEY("ID" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Workshifts" (
	"ID"			INTEGER NOT NULL UNIQUE,
	"NurseCode"		TEXT NOT NULL,
	"PatientCode"	TEXT NOT NULL,
	FOREIGN KEY("NurseCode")	REFERENCES "Nurses"("ID"),
	FOREIGN KEY("PatientCode")	REFERENCES "Patients"("ID"),
	PRIMARY KEY("ID" AUTOINCREMENT)
);

INSERT INTO "Nurses" VALUES ('N1', 'default', 'Roberto', 'Rossi');
INSERT INTO "Nurses" VALUES ('N2', 'admin', 'Luca', 'Genovese');
INSERT INTO "Nurses" VALUES ('N3', 'mario21', 'Mario', 'Albertazzi');

INSERT INTO "Patients" VALUES ('P1', 'Paolo','Germano', 'Via della Sanità, 19 - 10129 Torino', 'M', 'Italiana', '3472389011', 'Cellulare', 'Ortopedia', '2022-01-04', 'B1', '22', '1980-09-22', 'Grave contusione alla spalla sinistra.');
INSERT INTO "Patients" VALUES ('P2', 'Giovanna','Archi', 'Via Veronese, 192 - 10136 Torino', 'F', 'Italiana', '3890192837', 'Cellulare', 'Ginecologia', '2022-01-29', 'B19', '38', '1993-02-15', 'Parto gemellare naturale.');
INSERT INTO "Patients" VALUES ('P3', 'Youseff','Malijke', 'Barriera di Milano, 82 - 10134 Torino', 'M', 'Marocchina', '', '', 'Psichiatria', '2021-10-28', 'B281', '98', '1991-12-23', 'Disturbi psicologici vari e schizofrenia paranoide.');
INSERT INTO "Patients" VALUES ('P4', 'Lucas','Maehle', 'Via Carrabs, 71 - 10131 Torino', 'M', 'Tedesca', '', '', 'Terapia Intensiva Coronarica', '2022-01-04', 'B78', '53', '1961-11-12', 'Pericardite acuta.');
INSERT INTO "Patients" VALUES ('P5', 'Marzia','Stano', 'Via Vittorio Veneto, 431 - 10126 Torino', 'F', 'Italiana', '011928392', 'Telefono fisso', 'Ortopedia', '2022-01-21', 'B3', '22', '1977-11-10', 'Rottura del ginocchio in seguito a incidente in moto.');
INSERT INTO "Patients" VALUES ('P6', 'Maria','Marconi', 'Via Dante, 66 - 10127 Torino', 'F', 'Italiana', '3318293728', 'Cellulare', 'Ginecologia', '2022-01-30', 'B21', '38', '1990-11-29', 'Parto cesareo.');

INSERT INTO "Workshifts" VALUES (1, 'N1', 'P1');
INSERT INTO "Workshifts" VALUES (2, 'N3', 'P2');
INSERT INTO "Workshifts" VALUES (3, 'N2', 'P3');
INSERT INTO "Workshifts" VALUES (4, 'N3', 'P4');
INSERT INTO "Workshifts" VALUES (5, 'N1', 'P5');
INSERT INTO "Workshifts" VALUES (6, 'N2', 'P6');

INSERT INTO "Notes"	VALUES (1, 'Note generali', 'Il paziente si presenta in pronto soccorso in condizioni stabili seppur avvertendo un fortissimo dolore alla spalla sinistra.', 'N1', 'P1', '2022-01-04');
INSERT INTO "Notes"	VALUES (2, 'Visita di routine', 'Il paziente presenta un lieve miglioramento della spalla sinistra.', 'N2', 'P1', '2022-01-25');
INSERT INTO "Notes"	VALUES (3, 'Note generali', 'La paziente arriva in reparto per il parto naturale. Niente cesareo.', 'N2', 'P2', '2022-01-29');
INSERT INTO "Notes"	VALUES (4, 'Note post-parto', 'Il parto è andata a buon fine senza conseguenze per lei o per i bambini.', 'N3', 'P2', '2022-01-30');
INSERT INTO "Notes"	VALUES (5, 'Note generali', 'Il paziente viene condotto in ospedale per ricovero psichiatrico dalle forze di polizia.', 'N3', 'P3', '2021-10-28');
INSERT INTO "Notes"	VALUES (6, 'Note generali', 'Il paziente viene trasportato in PS con ambulanza a causa di un presunto infarto.', 'N2', 'P4', '2022-01-04');
INSERT INTO "Notes"	VALUES (7, 'Note generali', 'La paziente arriva in PS a seguito di incidente in motocicletta.', 'N2', 'P5', '2022-01-21');
INSERT INTO "Notes"	VALUES (8, 'Note generali', 'La paziente arriva in reparto come da programma per il parto cesareo.', 'N1', 'P6', '2022-01-30');

INSERT INTO "Examinations" VALUES (1, 'Prelievo','Esami del sangue + emocromo + urine','2022-01-27 09:10:11','P1');
INSERT INTO "Examinations" VALUES (2, 'Prelievo','Esami del sangue + emocromo + urine','2022-01-29 10:12:08','P1');
INSERT INTO "Examinations" VALUES (3, 'Visita di controllo','Visita ginecologica per il controllo inspessimento uretra','2022-01-29 17:33:15','P2');
INSERT INTO "Examinations" VALUES (4, 'Visita di controllo','Visita psichiatrica periodica di controllo','2021-10-29 11:05:00','P3');
INSERT INTO "Examinations" VALUES (5, 'Visita di controllo','Visita psichiatrica periodica di controllo','2021-11-29 12:00:00','P3');
INSERT INTO "Examinations" VALUES (6, 'Visita di controllo','Visita psichiatrica periodica di controllo','2021-12-29 09:15:19','P3');
INSERT INTO "Examinations" VALUES (7, 'Visita di controllo','Visita psichiatrica periodica di controllo','2022-01-29 10:10:32','P3');
INSERT INTO "Examinations" VALUES (8, 'Esame specialistico','ECG + Arteroscopia','2022-01-06 15:14:33','P4');
INSERT INTO "Examinations" VALUES (9, 'Radiografia','Radiografia con contrasto + Visita ortopedica','2022-01-22 08:15:00','P5');
INSERT INTO "Examinations" VALUES (10, 'Visita anestesia','Visita con infermiere per anestesia','2022-01-30 15:00:00','P6');

INSERT INTO "Tasks" VALUES (1, 'Cambia lenzuola','Cambio lenzuola letto asap','2022-01-31 09:00:00','P1','N1','PENDING');
INSERT INTO "Tasks" VALUES (2, 'Sostituzione fasciatura','Sostituire garze sterili spalle sx','2022-01-30 15:00:00','P1','N1','PENDING');
INSERT INTO "Tasks" VALUES (3, 'Sostituzione medicazione','Sostituire medicazione vaginale','2022-01-30 10:00:00','P2','N3','PENDING');
INSERT INTO "Tasks" VALUES (4, 'Controllo medicazione','Controllare medicazione vaginale','2022-01-29 18:00:00','P2','N3','COMPLETED');
INSERT INTO "Tasks" VALUES (5, 'Cura serale','Psicofarmaci e tranquillanti per la sera','2022-01-29 19:00:00','P3','N2','COMPLETED');
INSERT INTO "Tasks" VALUES (6, 'Cura mattutina','Psicofarmaci e tranquillanti per la mattina','2022-01-29 09:00:00','P3','N2','COMPLETED');
INSERT INTO "Tasks" VALUES (7, 'Cura','Aspirina endovena e calmanti per il dolore','2022-01-30 13:00:00','P4','N3','COMPLETED');
INSERT INTO "Tasks" VALUES (8, 'Raggi ginocchio','Radiografia con contrasto','2022-01-31 11:00:00','P5','N1','PENDING');
INSERT INTO "Tasks" VALUES (9, 'Dimissioni','Visita finale e lettera di dimissioni','2022-01-31 15:00:00','P6','N2','PENDING');

COMMIT;
