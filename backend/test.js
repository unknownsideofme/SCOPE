import Database from './src/models/dbClass/dbClass.js'
import Client from './src/models/clientClass/clientClass.js';

const db = Database.getInstance();

await db.connect();

// --- Example usage ---
const user3 = new Client();

try {
    const result = await user3.createNew(
        "xyz@gmail.com",
        "user5",
        "abc"
    );
    console.log("Client created successfully:", result);

} catch (err) {
    // Log unique violation errors in plain English
    if (err.message && err.message.includes("clients_client_email_key")) {
        console.log("Client already exists. Fetching info:");
        const info = await user3.getInfo("cde@gmail.com");
        console.log(info);
    } else {
        throw err;
    }
}

await db.disconnect();
