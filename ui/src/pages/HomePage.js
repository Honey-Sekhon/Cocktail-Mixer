import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Image, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { drinks_options, image_paths } from './data'; // Adjust the import according to your project structure
import axios from 'axios';  // Import axios for making HTTP requests

const HomePage = () => {
  const navigate = useNavigate();
  const [slotDrinks, setSlotDrinks] = useState({
    1: "None",
    2: "None",
    3: "None",
    4: "None"
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectDrink = (slot, drink) => {
    setSlotDrinks((prev) => ({ ...prev, [slot]: drink }));
  };

  const handleNext = () => {
    if (Object.values(slotDrinks).some(drink => drink !== 'None')) {
      navigate('/cocktails', { state: { selectedDrinks: Object.values(slotDrinks), slotDrinks } });
    } else {
      setErrorMessage('Please configure at least 1 Bottle');
      setShowErrorModal(true);
    }
  };

  const handlePowerOff = async () => {
    try {
      await axios.post('http://192.168.1.98:5000/poweroff'); // Replace with your actual endpoint
      // 207.23.194.44
      console.log('Power off command sent');
    } catch (error) {
      console.error('Error sending power off command:', error);
    }
  };

  return (
    <Container style={{ maxHeight: '600px' }}>

      <div className="d-flex justify-content-between align-items-center mt-3">
       
      <Button variant="danger" onClick={handlePowerOff}>
          <i className="bi bi-power"></i> Power Off
        </Button>

        <h1 className="text-center mt-3">MIXEASY</h1>


        <Button className="mb-3" onClick={handleNext} style={{ textDecoration: 'none', fontSize: '18px' }}>
         Next <i class= "bi bi-arrow-right"></i>
        </Button>
      </div>
      <Row className="mt-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {[1, 2].map((slot) => (
          <Col key={slot} md={6} className="text-center mb-4">
            <Image
              src={slotDrinks[slot] !== "None" ? image_paths[slotDrinks[slot]] : image_paths["default"]}
              alt={slotDrinks[slot]}
              fluid
              style={{ maxWidth: '100px', maxHeight: '100px', marginBottom: '10px' }}
            />
            <Card>
              <Card.Body>
                <h5 className="text-center">Slot {slot}</h5>
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={slotDrinks[slot]}
                    onChange={(e) => handleSelectDrink(slot, e.target.value)}
                  >
                    <option value="None">None</option>
                    {drinks_options.map((drink, index) => (
                      <option key={index} value={drink}>{drink}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {[3, 4].map((slot) => (
          <Col key={slot} md={6} className="text-center mb-4">
            <Image
              src={slotDrinks[slot] !== "None" ? image_paths[slotDrinks[slot]] : image_paths["default"]}
              alt={slotDrinks[slot]}
              fluid
              style={{ maxWidth: '100px', maxHeight: '100px', marginBottom: '20px' }}
            />
            <Card>
              <Card.Body>
                <h5 className="text-center">Slot {slot}</h5>
                <Form.Group>
                  <Form.Label>Select a Drink</Form.Label>
                  <Form.Control
                    as="select"
                    value={slotDrinks[slot]}
                    onChange={(e) => handleSelectDrink(slot, e.target.value)}
                  >
                    <option value="None">None</option>
                    {drinks_options.map((drink, index) => (
                      <option key={index} value={drink}>{drink}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowErrorModal(false)}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HomePage;
