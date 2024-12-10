 

// const express = require('express');
// const bodyParser = require('body-parser');
// const WebSocket = require('ws');
// const fs = require('fs');
// const path = require('path');
// const honcho = require('honcho');

// const app = express();
// const wss = new WebSocket.Server({ port: 8081 }); // WebSocket Server on port 8081

// const controllersDir = path.join(__dirname, 'controllers');
// const tagFilesDir = path.join(__dirname, 'tagfiles');

// let config = {
//     defaultController: null,
//     tagFileDir: tagFilesDir,
//     controllers: [],
//     tagsets: [],
//     tags: {}
// };

// // Middleware
// app.use(bodyParser.json());

// // Load tag files dynamically
// if (!fs.existsSync(tagFilesDir)) fs.mkdirSync(tagFilesDir);
// if (!fs.existsSync(controllersDir)) fs.mkdirSync(controllersDir);

// // Honcho Configuration Setup
// const configureHoncho = () => {
//     honcho.configure(config, () => {
//         console.log('Honcho reconfigured with new controllers!');
//     });
// };

// // API to add a new controller
// app.post('/add-controller', (req, res) => {
//     const { host, connectionName, port, slot, type, tags, tagFileContent } = req.body;

//     if (!host || !connectionName || !port || !slot || !type || (!tags && !tagFileContent)) {
//         return res.status(400).send('Missing required fields.');
//     }

//     // Generate tag file path
//     const tagFileName = `${connectionName}.txt`;
//     const tagFilePath = path.join(tagFilesDir, tagFileName);

//     // Write the tag file to disk
//     if (tagFileContent) {
//         // Use provided tagFileContent
//         fs.writeFileSync(tagFilePath, tagFileContent);
//     } else {
//         // Generate tag file content from `tags` object
//         const tagLines = Object.keys(tags).map(tag => `${tag}=${tags[tag]}`);
//         fs.writeFileSync(tagFilePath, tagLines.join('\n'));
//     }

//     // Add new controller to config
//     config.controllers.push({
//         host,
//         connection_name: connectionName,
//         port,
//         slot,
//         type,
//         tagfile: tagFilePath
//     });

//     // Add tags to config
//     if (tags) {
//         Object.keys(tags).forEach(tag => {
//             config.tags[`${connectionName}/${tag}`] = { tagsets: ['status'] };
//         });
//     }

//     configureHoncho();
//     res.send('Controller and tag file added successfully!');
// });


// // WebSocket for real-time data streaming
// wss.on('connection', (ws) => {
//     console.log('WebSocket client connected');

//     ws.on('message', (message) => {
//         const { action, tags, interval } = JSON.parse(message);

//         if (action === 'subscribe') {
//             honcho.createSubscription(tags, (err, values) => {
//                 if (err) {
//                     ws.send(JSON.stringify({ error: err.message }));
//                 } else {
//                     ws.send(JSON.stringify({ data: values }));
//                 }
//             }, interval || 1000);
//         }

//         if (action === 'unsubscribe') {
//             honcho.removeSubscription(tags);
//         }
//     });

//     ws.on('close', () => console.log('WebSocket client disconnected'));
// });

// // Start the Express server
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
