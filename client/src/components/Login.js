import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2)),
              url('https://cdn.pixabay.com/photo/2021/09/13/21/06/floral-background-6622475_1280.png');
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; 
`;

const InputField = styled.input`
  width: 400px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  &::placeholder {
    color: #999;
  }
`;

const LoginButton = styled.button`
  width: 400px;
  padding: 1rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;  
  
  &:hover {
    background-color: #333;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

function Login() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() })
      });

      const data = await response.json();

      if (response.ok && data.exists) {
        localStorage.setItem('userName', name.trim());
        navigate('/home');
      } else {
        setError(data.message || 'User not found.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Error during login. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <Title>WELCOME TO KUDOSPOT</Title>
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <LoginButton type="submit">Login</LoginButton>
      </FormContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </LoginContainer>
  );
}


export default Login; 