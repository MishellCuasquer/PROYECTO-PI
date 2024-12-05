import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'proyecto_api_bd'
});
// agregar 
db.connect((error) => {
    if (error) {
        console.error("Error al conectar a la base de datos:", error.message);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get("/", (_, res) => {
    res.send("Bienvenidos a mi API. Mi nombre es Mishell Cuasquer y esta es la materia de programación integrativa de componentes");
});

app.post('/asignaturas', (req, res) => {
    const { nombre, horas } = req.body;
    const query = 'INSERT INTO asignaturas (nombre, horas) VALUES (?, ?)';
    db.query(query, [nombre, horas], (error) => {
        if (error) {
            res.status(500).send('Error al crear la asignatura');
            return;
        }
        res.status(201).json('Asignatura creada exitosamente');
    });
});

// Listar asignaturas
app.get('/asignaturas', (_, res) => {
    const query = "SELECT * FROM asignaturas";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener las asignaturas');
            return;
        }
        res.status(200).json(results);
    });
});
// eliminar asignaturas

app.delete('/asignaturas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM asignaturas WHERE id_asignatura =?';
    db.query(query, [id], (error) => {
        if (error) {
            res.status(500).send('Error al eliminar la asignatura');
            return;
        }
        res.status(200).json('Asignatura eliminada exitosamente');
    });
});

// Actualizar asignatura
app.put('/asignaturas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, horas } = req.body;
    const query = 'UPDATE asignaturas SET nombre = ?, horas = ? WHERE id_asignatura = ?';
    db.query(query, [nombre, horas, id], (error) => {
        if (error) {
            res.status(500).send('Error al actualizar la asignatura');
            return;
        }
        res.status(200).json('Asignatura actualizada exitosamente');
    });
});

app.put('/profesores/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, especialidad } = req.body;
    const query = 'UPDATE profesores SET nombre = ?, especialidad = ? WHERE id_profesor = ?';
    db.query(query, [nombre, especialidad, id], (error) => {
        if (error) {
            res.status(500).send('Error al actualizar el profesor');
            return;
        }
        res.status(200).json('Profesor actualizado exitosamente');
    });
});

// Listar profesores

app.get('/profesores', (_, res) => {
    const query = "SELECT * FROM profesores";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener los profesores');
            return;
        }
        res.status(200).json(results);
    });
});

// Eliminar los profesores

app.delete('/profesores/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM profesores WHERE id_profesor =?';
    db.query(query, [id], (error) => {
        if (error) {
            res.status(500).send('Error al eliminar el profesor');
            return;
        }
        res.status(200).json('Profesor eliminado exitosamente');
    });
});

// Listar profesores y asignaturas
app.get('/profesoresasignaturas', (_, res) => {
    const query = 'SELECT * FROM profesoresasignaturas';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener los datos');
            return;
        }
        res.status(200).json(results);
    });
});

// Crear asociación profesor-asignatura
app.post('/profesoresasignaturas', (req, res) => {
    const { id_profesor, id_asignatura } = req.body;
    const query = 'INSERT INTO profesoresasignaturas (id_profesor, id_asignatura) VALUES (?, ?)';
    db.query(query, [id_profesor, id_asignatura], (error) => {
        if (error) {
            res.status(500).send('Error al asociar profesor con asignatura');
            return;
        }
        res.status(201).json('Asociación creada exitosamente');
    });
});
