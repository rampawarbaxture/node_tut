import { Row } from "react-bootstrap";
import "./App.css";
import Cards from "./Component/Cards";
import Navbar from "./Component/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <h1>PLC Connections</h1>
      </div>
      <div className="p-4">
        <Row className="mb-3 d-flex">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </Row>
      </div>
    </div>
  );
}

export default App;
