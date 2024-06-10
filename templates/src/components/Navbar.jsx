import React from 'react';
import {Container, Nav, Navbar, NavLink} from 'react-bootstrap';
import "../assets/css/Navbar.css";
import {Link} from "react-router-dom";

function NavBar() {
    
    return (
        <Navbar expand="lg" bg="light" variant="light">
            <Container style={{ display: "flex", justifyContent: "space-between", width: "100%", justifyItems: "center" }}>
                <Navbar.Brand as={Link} to={"/home"}>
                    <img
                        src="https://png.pngtree.com/png-vector/20200615/ourlarge/pngtree-hacker-wearing-hoodie-and-using-laptop-computer-freak-hacking-and-malware-png-image_2256760.jpg"
                        width="30px"
                        height="30px"
                        className="d-inline-block align-top"
                        alt="LeetCode logo"
                        style={{ marginRight: "10px" , display: "inline-block", borderRadius: "50%"}}
                    />{' '}
                    Horizon
                </Navbar.Brand>
                <Nav style={{ padding: "14px, 16px", justifyItems: "center", paddingTop: "14px" }}>
                    <NavLink as={Link} to={"/"}>
                        Home
                    </NavLink>
                    <NavLink as={Link} to={"/login-register"}>
                        Login/Register
                    </NavLink>
                    <NavLink as={Link} to={"/home"}>
	                    { null }
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;