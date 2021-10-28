import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Menu() {
    return (
        <Navbar expand="lg" id="menu" className="border border-dark border-2 m-3">
            <Container>
                <Navbar.Brand className="fw-bolder">Cat Steve's</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="fw-bold">Home</Nav.Link>
                        <Nav.Link as={Link} to="/shipping" className="fw-bold">Checkout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
