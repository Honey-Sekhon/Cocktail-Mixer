// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { cocktails } from './data';

// const CocktailsPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const selectedDrinks = location.state?.selectedDrinks || [];
//   const [customProportions, setCustomProportions] = useState({});

//   console.log('Rendering CocktailsPage with selectedDrinks:', selectedDrinks);

//   const getPossibleCocktails = () => {
//     return Object.entries(cocktails).filter(([_, ingredients]) =>
//       Object.keys(ingredients).every(ingredient => selectedDrinks.includes(ingredient))
//     );
//   };

//   const possibleCocktails = getPossibleCocktails();
//   console.log('Possible cocktails:', possibleCocktails);

//   const handleProportionChange = (drink, value) => {
//     console.log(`Changed ${drink} to ${value}`);
//     setCustomProportions(prevState => ({
//       ...prevState,
//       [drink]: value
//     }));
//   };

//   const handleSelectCocktail = (ingredients) => {
//     console.log('Selected cocktail with ingredients:', ingredients);
//     const updatedProportions = {};
//     Object.entries(ingredients).forEach(([ingredient, quantity]) => {
//       updatedProportions[ingredient] = quantity;
//     });
//     setCustomProportions(updatedProportions);
//     console.log('Updated proportions:', updatedProportions);
//   };

//   const handleMakeDrink = () => {
//     navigate('/preparation', { state: { customProportions } });
//   };

//   useEffect(() => {
//     console.log('Custom proportions updated:', customProportions);
//   }, [customProportions]);

//   return (
//     <Container>
//       <h1 className="text-center mt-3">Cocktails Available</h1>
//       <Button variant="link" onClick={() => navigate(-1)} className="mb-3" style={{ textDecoration: 'none', fontSize: '18px' }}>
//         &larr; Back
//       </Button>
//       <Row>
//         <Col md={6}>
//           <h3>Select Proportions</h3>
//           {selectedDrinks.map((drink, index) => (
//             drink !== "None" && (
//               <Form.Group key={index} className="mb-3">
//                 <Form.Label>{drink}</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={customProportions[drink] || ''}
//                   onChange={(e) => handleProportionChange(drink, e.target.value)}
//                 >
//                   <option value="">Select amount</option>
//                   <option value="25">25 ml</option>
//                   <option value="50">50 ml</option>
//                   <option value={customProportions[drink] || ''}>{customProportions[drink] || ''} ml</option>
//                 </Form.Control>
//               </Form.Group>
//             )
//           ))}
//           <Button variant="success" className="mt-3" 
//            onClick={() => {
//             console.log('Button clicked for making :');
//             handleMakeDrink();
//           }}>Make Drink</Button>
//         </Col>
//         <Col md={6} style={{ maxHeight: '600px', overflowY: 'scroll', overflowX: 'hidden' }}>
//           {possibleCocktails.length > 0 ? (
//             possibleCocktails.map(([cocktail, ingredients], index) => (
//               <Card key={index} className="mb-4">
//                 <Card.Body>
//                   <Card.Title>{cocktail}</Card.Title>
//                   <Card.Text>
//                     {Object.entries(ingredients).map(([ingredient, quantity]) => (
//                       <div key={ingredient}>{ingredient}: {quantity}ml</div>
//                     ))}
//                   </Card.Text>
//                   <Button
//                     variant="primary"
//                     onClick={() => {
//                       console.log('Button clicked for cocktail:', cocktail);
//                       handleSelectCocktail(ingredients);
//                     }}
//                   >
//                     Select
//                   </Button>
//                 </Card.Body>
//               </Card>
//             ))
//           ) : (
//             <Card>
//               <Card.Body>
//                 <Card.Title>No Cocktails Found</Card.Title>
//                 <Card.Text>
//                   No possible cocktails can be made with the selected drinks.
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CocktailsPage;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';  // Import axios for making HTTP requests
import { cocktails } from './data';

const CocktailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDrinks = location.state?.selectedDrinks || [];
  const [customProportions, setCustomProportions] = useState({});

  console.log('Rendering CocktailsPage with selectedDrinks:', selectedDrinks);

  const getPossibleCocktails = () => {
    return Object.entries(cocktails).filter(([_, ingredients]) =>
      Object.keys(ingredients).every(ingredient => selectedDrinks.includes(ingredient))
    );
  };

  const possibleCocktails = getPossibleCocktails();
  console.log('Possible cocktails:', possibleCocktails);

  const handleProportionChange = (drink, value) => {
    console.log(`Changed ${drink} to ${value}`);
    setCustomProportions(prevState => ({
      ...prevState,
      [drink]: value
    }));
  };

  const handleSelectCocktail = (ingredients) => {
    console.log('Selected cocktail with ingredients:', ingredients);
    const updatedProportions = {};
    Object.entries(ingredients).forEach(([ingredient, quantity]) => {
      updatedProportions[ingredient] = quantity;
    });
    setCustomProportions(updatedProportions);
    console.log('Updated proportions:', updatedProportions);
  };

  const handleMakeDrink = async () => {
    console.log('Button clicked for making drink with proportions:', customProportions);
    try {
      await axios.post('http://<Raspberry Pi IP Address>:5000/control_pumps', customProportions);
      navigate('/preparation', { state: { customProportions } });
    } catch (error) {
      console.error('Error making drink:', error);
    }
  };

  useEffect(() => {
    console.log('Custom proportions updated:', customProportions);
  }, [customProportions]);

  return (
    <Container>
      <h1 className="text-center mt-3">Cocktails Available</h1>
      <Button variant="link" onClick={() => navigate(-1)} className="mb-3" style={{ textDecoration: 'none', fontSize: '18px' }}>
        &larr; Back
      </Button>
      <Row>
        <Col md={6}>
          <h3>Select Proportions</h3>
          {selectedDrinks.map((drink, index) => (
            drink !== "None" && (
              <Form.Group key={index} className="mb-3">
                <Form.Label>{drink}</Form.Label>
                <Form.Control
                  as="select"
                  value={customProportions[drink] || ''}
                  onChange={(e) => handleProportionChange(drink, e.target.value)}
                >
                  <option value="">Select amount</option>
                  <option value="25">25 ml</option>
                  <option value="50">50 ml</option>
                  <option value={customProportions[drink] || ''}>{customProportions[drink] || ''} ml</option>
                </Form.Control>
              </Form.Group>
            )
          ))}
          {possibleCocktails.length > 0 && (
            <Button variant="success" className="mt-3" 
             onClick={() => {
              console.log('Button clicked for making drink');
              handleMakeDrink();
            }}>Make Drink</Button>
          )}
        </Col>
        <Col md={6} style={{ maxHeight: '600px', overflowY: 'scroll', overflowX: 'hidden' }}>
          {possibleCocktails.length > 0 ? (
            possibleCocktails.map(([cocktail, ingredients], index) => (
              <Card key={index} className="mb-4">
                <Card.Body>
                  <Card.Title>{cocktail}</Card.Title>
                  <Card.Text>
                    {Object.entries(ingredients).map(([ingredient, quantity]) => (
                      <div key={ingredient}>{ingredient}: {quantity}ml</div>
                    ))}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      console.log('Button clicked for cocktail:', cocktail);
                      handleSelectCocktail(ingredients);
                    }}
                  >
                    Select
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card>
              <Card.Body>
                <Card.Title>No Cocktails Found</Card.Title>
                <Card.Text>
                  No possible cocktails can be made with the selected drinks.
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CocktailsPage;
