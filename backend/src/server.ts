import express from 'express';
import bodyParser from 'body-parser';
import mysql, { QueryError, RowDataPacket } from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import Redis from 'ioredis';
import crypto from 'crypto';

dotenv.config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Cross-origin resource sharing: rcv msg from different ports

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD
});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) // Default port for MariaDB
});

db.connect((err: mysql.QueryError | null) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});



function asyncHandler(fn: express.RequestHandler) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.post('/send-otp', asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).send("Email is required");
  }

  const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit
  await redis.set(`otp:${email}`, otp, 'EX', 300); // exp. 5 mins

  console.log(`OTP for ${email}: ${otp}`); // In real apps, send via email/SMS
  res.send("OTP sent");
}));

app.post('/verify-otp', asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const storedOtp = await redis.get(`otp:${email}`);

  if (!storedOtp) {
    res.status(400).send("OTP expired or not found");
  }

  if (storedOtp !== otp) {
    res.status(401).send("Invalid OTP");
  }

  await redis.del(`otp:${email}`); // Invalidate after use

  res.send("OTP verified successfully");
}));





app.post('/submit', (req, res) => {

  console.log(req.body);
  const { name, title, email, phone, socialMedia, address, city, country } = req.body;

  const query = `
    INSERT INTO USERS (Name, Title, Email, Phone, Linkedin, Github, X, Address, City, Country)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      Name = IF(VALUES(Name) = 'd', '', IF(VALUES(Name) = '', Name, VALUES(Name))),
      Title = IF(VALUES(Title) = 'd', '', IF(VALUES(Title) = '', Title, VALUES(Title))),
      Phone = IF(VALUES(Phone) = 'd', '', IF(VALUES(Phone) = '', Phone, VALUES(Phone))),
      Linkedin = IF(VALUES(Linkedin) = 'd', '', IF(VALUES(Linkedin) = '', Linkedin, VALUES(Linkedin))),
      Github = IF(VALUES(Github) = 'd', '', IF(VALUES(Github) = '', Github, VALUES(Github))),
      X = IF(VALUES(X) = 'd', '', IF(VALUES(X) = '', X, VALUES(X))),
      Address = IF(VALUES(Address) = 'd', '', IF(VALUES(Address) = '', Address, VALUES(Address))),
      City = IF(VALUES(City) = 'd', '', IF(VALUES(City) = '', City, VALUES(City))),
      Country = IF(VALUES(Country) = 'd', '', IF(VALUES(Country) = '', Country, VALUES(Country)))
  `;

  const values = [name, title, email, phone, 
    socialMedia.linkedin, socialMedia.github, socialMedia.x,
    address, city, country];

  db.query(query, values, (err: QueryError | null, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error inserting/updating data');
      return;
    }
    res.send('Data inserted/updated successfully');
  });
});


app.get('/user/:email', (req, res) => {
  const { email } = req.params;

  const query = `
    SELECT Name, Title, Email, Phone, Linkedin, Github, X, Address, City, Country 
    FROM USERS 
    WHERE Email = ?
  `;
  
  db.query(query, [email], (err, results: RowDataPacket[]) => {
      if (err) {
          console.error("Error fetching user:", err);
          return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: "User not found" });
      }
      res.json(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});