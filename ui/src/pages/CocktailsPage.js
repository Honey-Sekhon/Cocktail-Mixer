import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { cocktails } from './data';
import NumberPad from '../components/NumberPad'; // Adjust the import according to your project structure

const CocktailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDrinks = location.state?.selectedDrinks || [];
  const [customProportions, setCustomProportions] = useState({});
  const [showNumberPad, setShowNumberPad] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const getPossibleCocktails = () => {
    return Object.entries(cocktails).filter(([_, ingredients]) =>
      Object.keys(ingredients).every(ingredient => selectedDrinks.includes(ingredient))
    );
  };

  const possibleCocktails = getPossibleCocktails();

  const handleInputChange = (name, value) => {
    setCustomProportions(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNumberPadClick = (drink) => {
    setFocusedInput(drink);
    setShowNumberPad(true);
  };

  const handleNumberClick = (num) => {
    if (num === 'enter') {
      setShowNumberPad(false);
    } else if (num === 'clear') {
      setCustomProportions((prev) => ({
        ...prev,
        [focusedInput]: ''
      }));
    } else {
      setCustomProportions((prev) => {
        const newValue = (prev[focusedInput] || '') + num;
        const numericValue = parseInt(newValue, 10);

        if (numericValue >= 0 && numericValue <= 50) {
          return {
            ...prev,
            [focusedInput]: newValue
          };
        } else {
          return prev;
        }
      });
    }
  };

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
                <div style={{ display: 'flex', alignItems: 'left' }}>
                  <Form.Control
                    type="text"
                    name={drink}
                    value={customProportions[drink] || ''}
                    onFocus={() => handleNumberPadClick(drink)}
                    readOnly
                    placeholder="ml"
                    style={{ marginRight: '10px' }}
                  />
                  <span>ml</span>
                </div>
              </Form.Group>
            )
          ))}
          <Button variant="success" className="mt-3">Make Drink</Button>
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
                  <Button variant="primary">Select</Button>
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
      {showNumberPad && (
        <div style={{ position: 'fixed', top: '20%', right: '5%' }}>
          <NumberPad onNumberClick={handleNumberClick} />
        </div>
      )}
    </Container>
  );
};

export default CocktailsPage;
