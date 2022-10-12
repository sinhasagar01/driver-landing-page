import boltLogo from "./logo.svg";

import Button from 'react-bootstrap/Button';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import './nav.css';
import * as data from './links.json';
const linksString = JSON.stringify(data);
const links = JSON.parse(linksString).links;



type Link = {
    label: string;
    href: string;
};

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
    return (
      <>  
        {links.map((link: Link) => {
            return (
              <Nav key={link.label}>
                <Nav.Link  key={link.label} href={link.href}>{link.label}</Nav.Link>
              </Nav>
            )
        })}
      </>
    )
};

const NavBar: React.FC<{}> = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <Container>
        <Navbar.Brand href="#home">
          <img src={boltLogo} alt="bolt logo" />
        </Navbar.Brand>

        <Nav className="mob-burger-menu">
          <Nav.Link href="#login">
            <Button className="btn btn-primary" type="submit">Log in</Button>
          </Nav.Link>
        </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
            <Links links={links} />
        </Navbar.Collapse>

        <Nav className="desk-burger-menu">
          <Nav.Link href="#login">
            <Button className="btn btn-primary" type="submit">Log in</Button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>    
  )
}

export default NavBar;
