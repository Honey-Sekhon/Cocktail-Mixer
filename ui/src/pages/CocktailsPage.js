import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';  // Import axios for making HTTP requests
import { cocktails } from './data';

const CocktailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDrinks = location.state?.selectedDrinks || [];
  const slotDrinks = location.state?.slotDrinks || {};
  const initialCustomProportions = location.state?.customProportions || {};
  const [customProportions, setCustomProportions] = useState(initialCustomProportions);

  // Shows the selected drinks
  console.log('Rendering CocktailsPage with selectedDrinks:', selectedDrinks);
  // Shows the mapping of the selected drinks to slots
  console.log('Slot to Ingredient Mapping:', slotDrinks);

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
      [drink]: value ? parseFloat(value) : 0
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

    // Map ingredient names to slot names
    const slotsProportions = Object.keys(slotDrinks).reduce((acc, slot) => {
      const ingredient = slotDrinks[slot];
      const quantity = customProportions[ingredient] || 0; // Default to 0 if not selected
      acc[`slot${slot}`] = parseFloat(quantity); // Ensure quantity is a number
      return acc;
    }, {});

    console.log('Mapped proportions:', slotsProportions);

    // Navigate to the preparation page
    navigate('/preparation', { state: { customProportions, selectedDrinks, slotDrinks } });

    try {
      const response = await axios.post('http://192.168.1.98:5000/control_pumps', slotsProportions);
      console.log('Response from server:', response.data);
      // Optionally, you can update the state or trigger another action after the request
    } catch (error) {
      console.error('Error making drink:', error);
      // Optionally, you can handle the error (e.g., show an error message to the user)
    }
  };

  const isFormValid = Object.values(customProportions).some(value => value !== '');

  const handlePowerOff = async () => {
    try {
      await axios.post('http://192.168.1.98:5000/poweroff'); // Replace with your actual endpoint
      console.log('Power off command sent');
    } catch (error) {
      console.error('Error sending power off command:', error);
    }
  };

  useEffect(() => {
    console.log('Custom proportions updated:', customProportions);
  }, [customProportions]);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button variant="link" onClick={() => navigate(-1)} style={{ textDecoration: 'none', fontSize: '18px' }}>
          &larr; Back
        </Button>
        <h1 className="text-center mt-3">Cocktails Available</h1>
        <Button variant="danger" onClick={handlePowerOff}>
          <i className="bi bi-power"></i> Power Off
        </Button>
      </div>


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
                  {customProportions[drink] && <option value={customProportions[drink]}>{customProportions[drink]} ml</option>}
                </Form.Control>
              </Form.Group>
            )
          ))}
          {isFormValid && (
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
