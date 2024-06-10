import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const encryptedAuth = Cookies.get('auth');
        const authKey = sessionStorage.getItem('authKey');
        if (encryptedAuth && authKey) {
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedAuth, authKey);
                const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                return JSON.parse(decryptedData);
            } catch (error) {
                console.error('Failed to decrypt cookie', error);
                return null;
            }
        }
        return null;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const encryptedAuth = Cookies.get('auth');
            const authKey = sessionStorage.getItem('authKey');
            if (encryptedAuth && authKey) {
                try {
                    const bytes = CryptoJS.AES.decrypt(encryptedAuth, authKey);
                    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                    setUser(JSON.parse(decryptedData));
                } catch (error) {
                    console.error('Failed to decrypt cookie', error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', { username, password });
            if (response.status === 200) {
                const userData = { username };
                const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), password).toString();
                Cookies.set('auth', encryptedData, { expires: 7 });
                sessionStorage.setItem('authKey', password);
                setUser(userData);
                return { status: 200, message: response.data.message };
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('Invalid credentials');
            }
            throw new Error('An error occurred while logging in');
        }
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('auth');
        sessionStorage.removeItem('authKey');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
