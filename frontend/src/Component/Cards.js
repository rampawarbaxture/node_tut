import React, { useState } from "react";
import { Col, Dropdown } from "react-bootstrap";
import { ThreeDotsVertical } from 'react-bootstrap-icons';

function Cards() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => setShowMenu((prev) => !prev);

  const handleEdit = () => {
    console.log("Edit clicked");
    setShowMenu(false); // Close the menu after selecting an option
  };

  const handleDelete = () => {
    console.log("Delete clicked");
    setShowMenu(false); // Close the menu after selecting an option
  };

  return (
    <>
      <Col xs={12} md={3} className="mb-4">
        <div className="card" style={{ width: "20rem" }}>
          <div className="position-absolute top-0 end-0 p-2">
            <Dropdown show={showMenu} onToggle={handleMenuToggle}>
              <Dropdown.Toggle variant="link" id="dropdown-custom-components">
                <ThreeDotsVertical size={20} onClick={handleMenuToggle} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={handleEdit}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item as="button" onClick={handleDelete}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="card-body text-start" >
            <h6 className="card-title">Host: 192.168.1.2</h6>
            <h6 className="card-title">Device Name: Refrigerator</h6>
            <h6 className="card-title">Port: 8089</h6>
            <h6 className="card-title">Type: Node-7</h6>
            <p className="card-text"></p>
            {/* <a href="#" className="btn btn-primary">
              Port 1234
            </a> */}
          </div>
        </div>
      </Col>
    </>
  );
}

export default Cards;

