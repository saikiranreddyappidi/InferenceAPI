import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';

function Home() {
    return (
        <Container>
            <Navbar />
            <div className="background" style={{height: "auto"}}>
                <h1 style={{display: "flex", justifyContent: 'center', width: "auto", alignContent: "center"}}>
                    Welcome to Horizon!
                </h1>
            </div>
        </Container>
    );
}

export default Home;
