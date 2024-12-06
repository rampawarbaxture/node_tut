import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddDeviceForm({ show, handleClose }) {
  const [deviceName, setDeviceName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with device name:", deviceName);
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Device form inside modal */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="deviceName">
            <Form.Label>Device Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter device name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <Form.Label>Host</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Ip Address "
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <Form.Label>Port</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Port"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Type"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </Form.Group>
          <br />
          <div className="text-center">
          <Button variant="primary" type="submit">
            Add Device
          </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddDeviceForm;
