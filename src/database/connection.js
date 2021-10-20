import sql from 'mssql';
import config from '../config'

//Settings for Connection
const dbSettings = {
    user: config.dbUsername,
    password: config.dbPassword,
    server: config.dbServer,
    /* server: 'DESKTOP-I7R1CAN', */
    database: config.dbDatabase,
    port: 1433,
    options: {
        encrypt: true, //for Azure
        trustServerCertificate: true, // true if local dev / for self-signed cert issue
    }
}

//DB Connection
export async function getConnection(){
    try {
        const conn = await sql.connect(dbSettings);
        const pool = await conn.request();

        return pool; 

    } catch (error) {
        console.error(error);
    }
} 

export { sql };
