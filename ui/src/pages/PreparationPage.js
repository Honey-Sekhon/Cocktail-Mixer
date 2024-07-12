import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const PreparationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customProportions = location.state?.customProportions || {};

  const [preparationComplete, setPreparationComplete] = useState(false);

  useEffect(() => {
    // Simulate the preparation process
    const timer = setTimeout(() => {
      setPreparationComplete(true);
    }, 3000); // 3 seconds for the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="text-center mt-5">
      {!preparationComplete ? (
        <>
          <h2>Your drink is being prepared...</h2>
          <div className="spinner-border text-primary mt-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </>
      ) : (
        <>
          <h2>Your drink is ready!</h2>
          <Button variant="primary" className="mt-3" onClick={() => navigate('/')}>Make Another</Button>
          <Button variant="secondary" className="mt-3 ml-3" onClick={() => navigate('/cocktails')}>Return to Cocktails Page</Button>
        </>
      )}
    </Container>
  );
};

export default PreparationPage;
