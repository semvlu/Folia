import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) // Default port for MariaDB
});
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});
app.post('/submit', (req, res) => {
    console.log(req.body);
    const { name, title, email, phone, socialMedia, address, city, country } = req.body;
    const query = `
    INSERT INTO user (Name, Title, Email, Phone, Linkedin, Github, X, Address, City, Country)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    Name = VALUES(Name),
    Title = VALUES(Title),
    Phone = VALUES(Phone),
    Linkedin = VALUES(Linkedin),
    Github = VALUES(Github),
    X = VALUES(X),
    Address = VALUES(Address),
    City = VALUES(City),
    Country = VALUES(Country)
  `;
    const values = [name, title, email, phone,
        socialMedia.linkedin, socialMedia.github, socialMedia.x,
        address, city, country];
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error inserting/updating data');
            return;
        }
        res.send('Data inserted/updated successfully');
    });
});
app.get('getData', (req, res) => {
    const userId = req.query.id;
    const query = `
        SELECT * FROM users WHERE id = ?
    `;
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        res.json(results[0]);
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
