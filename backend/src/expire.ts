import cron from 'node-cron';
import pool from './pool';
// Schedule delExp func to run every hr
cron.schedule('0 * * * *', () => {
  console.log('Running delExp task');
  delExp();
});


// --- Delete expired session ---
async function delExp() {
    let conn;

    try {
      conn = await pool.getConnection();
      const [result]: any = await conn.query(
        `
        DELETE FROM OTP_CODES 
        WHERE Exp < NOW()
        `
      );

      console.log(`Deleted ${result.affectedRows} expired OTP(s)`);
    } catch (error) {
      console.error("Error deleting expired OTPs:", error);
    } finally {
      if (conn) conn.release();
    }
}