import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Login from "./Login";
import Register from "./Register";
import NavBar from "./Navbar";

function LoginRegister() {
	const [showLogin, setShowLogin] = useState(true);
	
	return (
		<Container>
			<NavBar />
			<div className="background" style={{height: "auto"}}>
				<div style={{display: "flex", justifyContent: 'center', width: "auto", alignContent: "center"}}>
					{showLogin ? <Login onSwitch={() => setShowLogin(false)} /> : <Register onSwitch={() => setShowLogin(true)} />}
				</div>
			</div>
		</Container>
	);
}

export default LoginRegister;