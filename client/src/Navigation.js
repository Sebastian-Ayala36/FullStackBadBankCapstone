import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Bad Bank</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#createaccount">Create Account</Nav.Link>
          <Nav.Link href="#login">Login</Nav.Link>
          <Nav.Link href="#deposit">Deposit</Nav.Link>
          <Nav.Link href="#withdraw">Withdraw</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
