import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function PreparationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/drink-made');
    }, 5000); // Simulate 5 seconds of preparation time

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <h1>Preparing Your Drink</h1>
      <video width="400" controls autoPlay>
        <source src="path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      <p>Please wait while we prepare your drink...</p>
    </Container>
  );
}

export default PreparationPage;
