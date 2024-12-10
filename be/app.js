import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import honcho from 'honcho';

const port = 8080;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: 'http://localhost:3001', // Allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies or Authorization headers
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers sent in requests
}));
app.use(express.json()); // For parsing JSON bodies

let honchoConfig = {
    defaultController: null,
    tagFileDir: '.',
    controllers: [],
    tagsets: [],
    tags: {}
};

// Configure Honcho with initial setup
honcho.configure(honchoConfig, () => {
    console.log("Honcho configured with initial setup.");
});

// POST API to add a new PLC connection
app.post('/add-plc', (req, res) => {
    const { host, port, connection_name, slot, type, tagfile } = req.body;

    if (!host || !port || !connection_name || !slot || !type || !tagfile) {
        return res.status(400).send("Missing required fields.");
    }

    const newController = {
        host,
        connection_name,
        port,
        slot,
        type,
        tagfile
    };

    // Add the new controller to Honcho's configuration
    honchoConfig.controllers.push(newController);
    honcho.configure(honchoConfig, () => {
        console.log(`Controller ${connection_name} added successfully.`);
        res.status(200).send(`Controller ${connection_name} added.`);
    });
});

// WebSocket communication
io.on('connection', (socket) => {
    console.log("User connected", socket.id);

    socket.on('subscribe', (data) => {
        const { tags, interval } = data;

        if (!tags || !Array.isArray(tags) || !interval) {
            return socket.emit('error', "Invalid subscription data.");
        }

        honcho.createSubscription(tags, (err, values) => {
            if (err) {
                console.error("Error reading tags:", err);
                return;
            }

            // Emit the tag values to the client
            socket.emit('tag-values', values);
        }, interval);
    });

    socket.on('write-tag', (data) => {
        const { tag, value } = data;

        if (!tag || value === undefined) {
            return socket.emit('error', "Invalid write data.");
        }

        honcho.write(tag, value, (err) => {
            if (err) {
                console.error("Error writing tag:", err);
                socket.emit('error', `Error writing tag ${tag}.`);
                return;
            }

            socket.emit('write-success', `Tag ${tag} updated successfully.`);
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

// Simple GET API for testing
app.get('/get', (req, res) => {
    res.send("Server is running.");
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
