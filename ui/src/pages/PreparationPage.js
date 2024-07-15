import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';  // Import axios for making HTTP requests

const PreparationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customProportions = location.state?.customProportions || {};
  const selectedDrinks = location.state?.selectedDrinks || [];
  const slotDrinks = location.state?.slotDrinks || {};


  const [preparationComplete, setPreparationComplete] = useState(false);
  const flowRate = 1.15; // ml per second

  console.log("The proportions for the respective selected slot drinks are:", customProportions);

  // Function to calculate the total drink time based on customProportions and flowRate
  const calculateDrinkTime = () => {
    const totalProportion = Object.values(customProportions).reduce((acc, proportion) => acc + parseFloat(proportion), 0);
    console.log(totalProportion);
    const drinkTime = totalProportion * flowRate; // in seconds
    console.log(drinkTime);
    return drinkTime;
  };

  const drinkTime = calculateDrinkTime();
  const drinkTimeInMinutes = (drinkTime / 60).toFixed(2); // converting seconds to minutes

  useEffect(() => {
    // Simulate the preparation process based on calculated drink time
    const timer = setTimeout(() => {
      setPreparationComplete(true);
    }, drinkTime * 1000); // converting seconds to milliseconds

    return () => clearTimeout(timer);
  }, [drinkTime]);

  const handleMakeAnother = () => {
    setPreparationComplete(false);
        // try {
    //   const response = await axios.post('http://192.168.1.98:5000/control_pumps', slotsProportions);
    //   console.log('Response from server:', response.data);
    //   // Optionally, you can update the state or trigger another action after the request
    // } catch (error) {
    //   console.error('Error making drink:', error);
    //   // Optionally, you can handle the error (e.g., show an error message to the user)
    // }
    const timer = setTimeout(() => {
      setPreparationComplete(true);
    }, drinkTime * 1000); // converting seconds to milliseconds

    return () => clearTimeout(timer);
  };


  return (
    <div>
      <h1 className="text-center mt-3">Requested Drink will take {drinkTimeInMinutes} minutes to be prepared.</h1>
      <div className="text-center mt-5">
        {preparationComplete ? (
          <>
            <h2>Your drink is ready!</h2>
            <div className="mt-3">
              <Button variant="primary" className="me-2" onClick={() => navigate('/')}>Back to Home</Button>
              <Button
                variant="primary"
                className="me-2"
                onClick={() => navigate('/cocktails', {
                  state: {
                    selectedDrinks: location.state.selectedDrinks,
                    slotDrinks: location.state.slotDrinks,
                    customProportions
                  }
                })}
              >
                Cocktail Page
              </Button>
              <Button variant="success" onClick={handleMakeAnother}>Make Another</Button>
            </div>
          </>
        ) : (
          <h2>Preparing your drink...</h2>
        )}
      </div>
    </div>
  );
};
export default PreparationPage;
