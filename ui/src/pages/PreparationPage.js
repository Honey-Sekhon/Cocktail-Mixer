// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Button, ProgressBar } from 'react-bootstrap';
// import axios from 'axios';  // Import axios for making HTTP requests

// const PreparationPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const customProportions = location.state?.customProportions || {};
//   const selectedDrinks = location.state?.selectedDrinks || [];
//   const slotDrinks = location.state?.slotDrinks || {};

//   const [progress, setProgress] = useState(0);
//   const [preparationComplete, setPreparationComplete] = useState(false);
//   const flowRate = 1.15; // ml per second

//   console.log("The proportions for the respective selected slot drinks are:", customProportions);

//   // Function to calculate the total drink time based on customProportions and flowRate
//   const calculateDrinkTime = () => {
//     const highestProportion = Math.max(...Object.values(customProportions).map(proportion => parseFloat(proportion)));
//     console.log(highestProportion);
//     const drinkTime = highestProportion * flowRate + 5; // in seconds
//     console.log(drinkTime);
//     return drinkTime;
//   };

//   const drinkTime = calculateDrinkTime();
//   const drinkTimeInMinutes = (drinkTime / 60).toFixed(2); // converting seconds to minutes

//   // Map ingredient names to slot names with default value 0 if not selected
//   const slotsProportions = Object.keys(slotDrinks).reduce((acc, slot) => {
//     const ingredient = slotDrinks[slot];
//     const quantity = customProportions[ingredient] || 0; // Default to 0 if not selected
//     acc[`slot${slot}`] = parseFloat(quantity); // Ensure quantity is a number
//     return acc;
//   }, {});

//   useEffect(() => {
//     const interval = 100; // update every 100ms
//     const increment = (interval / (drinkTime * 1000)) * 100; // calculate percentage increment

//     const timer = setInterval(() => {
//       setProgress(prev => {
//         const nextProgress = prev + increment;
//         if (nextProgress >= 100) {
//           clearInterval(timer);
//           setPreparationComplete(true);
//           return 100;
//         }
//         return nextProgress;
//       });
//     }, interval);

//     return () => clearInterval(timer);
//   }, [drinkTime]);


//   const handleMakeAnother = async () => {
//     setPreparationComplete(false);
//     setProgress(0);
//     try {
//       const response = await axios.post('http://192.168.1.98:5000/control_pumps', slotsProportions);
//       console.log('Response from server:', response.data);
//       // Optionally, you can update the state or trigger another action after the request
//     } catch (error) {
//       console.error('Error making drink:', error);
//       // Optionally, you can handle the error (e.g., show an error message to the user)
//     }
//     const timer = setTimeout(() => {
//       setPreparationComplete(true);
//     }, drinkTime * 1000); // converting seconds to milliseconds

//     return () => clearTimeout(timer);
//   };

//   return (
//     <div>
//       <h1 className="text-center mt-3">Requested Drink will take {drinkTimeInMinutes} minutes to be prepared.</h1>
//       <div className="text-center mt-5">
//         {preparationComplete ? (
//           <>
//             <h2>Your drink is ready!</h2>
//             <div className="mt-3">
//               <Button variant="primary" className="me-2" onClick={() => navigate('/')}><i className="bi bi-house-fill"></i> Home</Button>
//               <Button
//                 variant="primary"
//                 className="me-2"
//                 onClick={() => navigate('/cocktails', {
//                   state: {
//                     selectedDrinks: location.state.selectedDrinks,
//                     slotDrinks: location.state.slotDrinks,
//                     customProportions
//                   }
//                 })}
//               ><i className="bi bi-list"></i>
//                  Cocktail Page
//               </Button>
//               <Button variant="success" onClick={handleMakeAnother}><i className="bi bi-arrow-repeat"></i> Make Another</Button>
//             </div>
//           </>
//         ) : (
//           <>
//             <h2>Preparing your drink...</h2>
//             <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="m-3" />
//           </>)}
//       </div>
//     </div>
//   );
// };

// export default PreparationPage;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, ProgressBar } from 'react-bootstrap';
import axios from 'axios';  // Import axios for making HTTP requests

const PreparationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customProportions = location.state?.customProportions || {};
  const selectedDrinks = location.state?.selectedDrinks || [];
  const slotDrinks = location.state?.slotDrinks || {};

  const [progress, setProgress] = useState(0);
  const [preparationComplete, setPreparationComplete] = useState(false);
  const flowRate = 1.15; // ml per second

  console.log("The proportions for the respective selected slot drinks are:", customProportions);

  // Function to calculate the total drink time based on customProportions and flowRate
  const calculateDrinkTime = () => {
    const highestProportion = Math.max(...Object.values(customProportions).map(proportion => parseFloat(proportion)));
    console.log(highestProportion);
    const drinkTime = highestProportion * flowRate + 5; // in seconds
    console.log(drinkTime);
    return drinkTime;
  };

  const drinkTime = calculateDrinkTime();
  const drinkTimeInMinutes = (drinkTime / 60).toFixed(2); // converting seconds to minutes

  // Map ingredient names to slot names with default value 0 if not selected
  const slotsProportions = Object.keys(slotDrinks).reduce((acc, slot) => {
    const ingredient = slotDrinks[slot];
    const quantity = customProportions[ingredient] || 0; // Default to 0 if not selected
    acc[`slot${slot}`] = parseFloat(quantity); // Ensure quantity is a number
    return acc;
  }, {});

  const startProgress = () => {
    setPreparationComplete(false);
    setProgress(0); // Reset progress

    const interval = 100; // update every 100ms
    const increment = (interval / (drinkTime * 1000)) * 100; // calculate percentage increment

    const timer = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + increment;
        if (nextProgress >= 100) {
          clearInterval(timer);
          setPreparationComplete(true);
          return 100;
        }
        return nextProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  };

  useEffect(() => {
    startProgress();
  }, [drinkTime]);

  const handleMakeAnother = async () => {
    startProgress(); // Restart the progress bar

    try {
      const response = await axios.post('http://192.168.1.98:5000/control_pumps', slotsProportions);

      // const response = await axios.post('http://207.23.194.44:5000/control_pumps', slotsProportions);
      console.log('Response from server:', response.data);
      // Optionally, you can update the state or trigger another action after the request
    } catch (error) {
      console.error('Error making drink:', error);
      // Optionally, you can handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <div className="text-center mt-5">
        {preparationComplete ? (
          <>
            <h1>Your drink is ready!</h1>
            <div className="mt-3">
              <Button variant="primary" className="me-2" onClick={() => navigate('/')}><i className="bi bi-house-fill"></i> Home</Button>
              <Button
                variant="warning"
                className="me-2"
                onClick={() => navigate('/cocktails', {
                  state: {
                    selectedDrinks: location.state.selectedDrinks,
                    slotDrinks: location.state.slotDrinks,
                    customProportions
                  }
                })}
              ><i className="bi bi-list"></i>
                 Cocktail Page
              </Button>
              <Button variant="success" onClick={handleMakeAnother}><i className="bi bi-arrow-repeat"></i> Make Another</Button>
            </div>
          </>
        ) : (
          <>
          <h1 className="text-center m-3">Requested Drink will take around {drinkTimeInMinutes} minutes to be prepared.</h1>
            <h2 className="mt-3">Preparing your drink...</h2>
            <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="m-3" />
          </>)}
      </div>
    </div>
  );
};

export default PreparationPage;
