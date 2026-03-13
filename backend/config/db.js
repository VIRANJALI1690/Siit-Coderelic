const mongoose = require('mongoose');

// This function establishes a connection to our MongoDB database
const connectDB = async () => {
    try {
        // We retrieve the connection string from our environment variables
        let uri = process.env.MONGO_URI;

        // PERMANENT FIX: Handle the common error where database name is appended incorrectly
        // Some users accidentally add the database name at the end of the query string.
        // e.g. ...?w=majority/siit_coderelic -> .../siit_coderelic?w=majority
        // This block detects that specific typo and automatically fixes it before connecting.
        if (uri && uri.includes('w=majority/')) {
            console.log("Detecting and fixing MONGO_URI formatting error...");
            const parts = uri.split('?');
            const base = parts[0];
            const query = parts[1];

            if (base && query) {
                const dbNameMatch = query.match(/majority\/(.+)$/);
                if (dbNameMatch) {
                    const dbName = dbNameMatch[1];
                    // Correct URI structure: [protocol]://[host]/[database]?[parameters]
                    const cleanQuery = query.replace(`majority/${dbName}`, 'majority');
                    uri = `${base.replace(/\/+$/, '')}/${dbName}?${cleanQuery}`;
                }
            }
        }

        // We use Mongoose to connect to our cleaned-up URI
        const conn = await mongoose.connect(uri);

        // This log confirms that we are connected and shows the host address
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If the connection fails, we log the error and stop the server
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
