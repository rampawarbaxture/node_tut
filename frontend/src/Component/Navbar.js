import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddDeviceForm from "./AddDeviceForm";  

function Navbar() {
  const [showModal, setShowModal] = useState(false);

 
  const handleForm = () => {
    console.log("Button clicked");
    setShowModal(true);  
  };
 
  const handleClose = () => setShowModal(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
            </ul>
            <span className="navbar-text">
              <Button className="btn btn-primary" onClick={handleForm}>
                Add device
              </Button>
            </span>
          </div>
        </div>
      </nav>

      {/* Device Modal with form */}
      <AddDeviceForm show={showModal} handleClose={handleClose} />
    </>
  );
}

export default Navbar;
