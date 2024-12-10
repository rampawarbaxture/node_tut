import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const App = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    host: "",
    port: "",
    connection_name: "",
    slot: "",
    type: "nodes7", // Default protocol type
    tagfile: "./testplctags.txt", // Default tag file path
  });
  const [socket, setSocket] = useState(null);
  const [tagValues, setTagValues] = useState({});

  // Connect to WebSocket on mount
  const socketInstance = useMemo(()=> io("http://localhost:8080"), []);
  useEffect(() => {
    setSocket(socketInstance);

    socketInstance.on("tag-values", (values) => {
      setTagValues(values); // Update tag values from server
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Handle input changes for new device
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new device to the backend
  const addDevice = async () => {
    try {
      const response = await axios.post("http://localhost:8080/add-plc", newDevice);
      alert(response.data);
      setDevices((prev) => [...prev, newDevice]); // Add to the list of devices
    } catch (error) {
      console.error("Error adding device:", error);
      alert("Failed to add device");
    }
  };

  // Subscribe to tags via WebSocket
  const subscribeToTags = () => {
    if (socket) {
      socket.emit("subscribe", {
        tags: ["MYTAG"], // Example tag
        interval: 500,
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Device Manager</h1>

      {/* Add New Device Form */}
      <div>
        <h2>Add New Device</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addDevice();
          }}
        >
          <input
            type="text"
            name="host"
            placeholder="Host"
            value={newDevice.host}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="port"
            placeholder="Port"
            value={newDevice.port}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="connection_name"
            placeholder="Connection Name"
            value={newDevice.connection_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="slot"
            placeholder="Slot"
            value={newDevice.slot}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type (e.g., nodes7)"
            value={newDevice.type}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="tagfile"
            placeholder="Tag File Path"
            value={newDevice.tagfile}
            onChange={handleInputChange}
          />
          <button type="submit">Add Device</button>
        </form>
      </div>

      {/* Display Connected Devices */}
      <div>
        <h2>Connected Devices</h2>
        <ul>
          {devices.map((device, index) => (
            <li key={index}>
              Connection Name -{device.connection_name} - HOST-{device.host} - PORT-{device.port}
            </li>
          ))}
        </ul>
      </div>

      {/* Tag Subscription */}
      <div>
        <h2>Subscribe to Tags</h2>
        <button onClick={subscribeToTags}>Subscribe to MYTAG</button>
        <h3>Tag Values:</h3>
        <pre>{JSON.stringify(tagValues, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
