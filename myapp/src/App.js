import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
       <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">IDify</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Organisations</Nav.Link>
            <Nav.Link href="#pricing">Notifications</Nav.Link>
            <Nav.Link href="#pricing">My Data</Nav.Link>
          </Nav>
          <Nav>          
            <Nav.Link href="#deets">Meta Mask</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              0x7676...777
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default App;
