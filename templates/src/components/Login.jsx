import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from './Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login({ onSwitch }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { login } = useAuth();
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await login(username, password);
			if (response.status === 200) {
				navigate('/home');
			}
		} catch (error) {
			setError(error.message);
			onSwitch();
		}
	};
	
	return (
		<Form className="auth-form" onSubmit={handleSubmit}>
			<h3 className="text-center mb-4">Login</h3>
			{error && <p className="text-danger">{error}</p>}
			<Form.Group>
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
			</Form.Group>
			<Button type="submit" className="w-100 mt-4">Log In</Button>
			<Button onClick={onSwitch} className="w-100 mt-3">Go to Register</Button>
		</Form>
	);
}

export default Login;
