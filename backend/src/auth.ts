import mysql, { RowDataPacket } from "mysql2";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import pool from './pool';

dotenv.config();

// --- OTP Authentication ---
async function requestOTP(email: string) {
    const otp = genOTP();
    await storeOTP(email, otp);
    await sendOTP(email, otp);
}

// Gen 6-digit OTP
function genOTP(): string {
    return Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
}

async function storeOTP(email: string, otp: string) {
  const exp = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 min
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query(
      `
      INSERT INTO OTP_CODES (Email, Otp, Exp) 
      VALUES (?, ?, ?)
      `,
      [email, otp, exp]
    );

    console.log(`OTP stored for ${email}, expires at ${exp}`);
  } catch (error) {
    console.error("Error storing OTP:", error);
  } finally {
    if (conn) conn.release();
  }
}

// Send OTP via email
async function sendOTP(email: string, otp: string): Promise<string> {
  // Config email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_HOST,
      pass: process.env.EMAIL_PWD,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to: email,
    subject: "Your OTP Code for Folia",
    text: 
    `
    Your OTP code is: ${otp}. 
    It will expire in 10 minutes.
    `
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    return otp; // Can store this in DB for verification
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP");
  }
}

// ---------------------------

// OTP Verification
async function verifyOTP(email: string, otp: string): Promise<boolean> {
    let conn;
  
    try {
      conn = await pool.getConnection();
      const [rows, fields]: [RowDataPacket[], any] = await conn.query(
        `
        SELECT * FROM OTP_CODES 
        WHERE Email = ? AND Otp = ? AND Exp > NOW() 
        LIMIT 1
        `,
        [email, otp]
      );
  
      if (rows.length > 0) {
        await conn.query(
        `
        DELETE FROM OTP_CODES 
        WHERE Email = ?
        `, [email]);

        console.log(`OTP verified for ${email}`);
        return true;
      }

    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      if (conn) conn.release();
    }
  
    console.log(`OTP verification failed for ${email}`);
    return false;
}
// ---------------------------

// --- JWT Authentication ---
async function authOTP(email: string, otp: string): Promise<string | null> {
    if (await verifyOTP(email, otp)) {
      // Gen JWT after OTP verification
      const tk = jwt.sign({ email }, "your_secret_key", { expiresIn: "1h" });
      return tk;
    }
  
    return null;
}


