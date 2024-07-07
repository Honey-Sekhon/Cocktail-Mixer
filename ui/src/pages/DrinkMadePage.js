import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function DrinkMadePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Your Drink is Ready!</h1>
      <p>Enjoy your drink!</p>
      <Button onClick={() => navigate('/')}>Back to Home</Button>
      <Button onClick={() => navigate('/cocktails')}>Choose Another Cocktail</Button>
    </Container>
  );
}

export default DrinkMadePage;
