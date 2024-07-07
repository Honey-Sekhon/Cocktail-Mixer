import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { drinks_options, image_paths } from './data'; // Adjust the import according to your project structure

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(1);
  const [slotDrinks, setSlotDrinks] = useState({
    1: "None",
    2: "None",
    3: "None",
    4: "None"
  });

  const handleSelectDrink = (slot, drink) => {
    setSlotDrinks((prev) => ({ ...prev, [slot]: drink }));
  };

  const handleSlotChange = () => {
    if (selectedSlot === 4) {
      navigate('/cocktails', { state: { selectedDrinks: Object.values(slotDrinks) } });
    } else {
      setSelectedSlot((prev) => prev + 1);
    }
  };

  const handleConfigure = () => {
    navigate('/cocktails', { state: { selectedDrinks: Object.values(slotDrinks) } });
  };

  const handleBack = () => {
    setSelectedSlot((prev) => (prev === 1 ? 4 : prev - 1));
  };

  return (
    <Container>
      <h1 className="text-center mt-3">MIXEASY</h1>
      <Row className="mt-4">
        <Col md={6} className="text-center">
          <Image 
            src={slotDrinks[selectedSlot] !== "None" ? image_paths[slotDrinks[selectedSlot]] : image_paths["default"]} 
            alt={slotDrinks[selectedSlot]} 
            fluid 
            style={{ maxWidth: '200px' }} 
          />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Button variant="link" onClick={handleBack} className="mb-3" style={{ textDecoration: 'none', fontSize: '18px', position: 'absolute', top: '10px', left: '10px' }}>
                &larr; Back
              </Button>
              <h3 className="text-center" style={{ fontWeight: 'bold' }}>{slotDrinks[selectedSlot]}</h3>
              <p className="text-center">Slot {selectedSlot}</p>
              <div style={{ maxHeight: '200px', overflowY: 'scroll', overflowX: 'hidden' }}>
                {drinks_options.map((drink, index) => (
                  <React.Fragment key={index}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ fontSize: '40px' }}>{drink}</span>
                      <Form.Check 
                        type="switch"
                        id={`drink-switch-${index}`}
                        checked={slotDrinks[selectedSlot] === drink}
                        onChange={() => handleSelectDrink(selectedSlot, drink)}
                        style={{ transform: 'scale(2)', padding: '10px' }} // Increase the size of the toggle switch
                      />
                    </div>
                    {index < drinks_options.length - 1 && <hr />} {/* Add a divider between items */}
                  </React.Fragment>
                ))}
              </div>
              <div className="d-flex justify-content-end mt-3">
                {selectedSlot === 4 ? (
                  <Button 
                    variant="success" 
                    className="rounded-corners" 
                    onClick={handleConfigure}
                    style={{ fontSize: '18px', padding: '5px 15px' }}
                  >
                    Configure
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    className="rounded-corners" 
                    onClick={handleSlotChange}
                    style={{ fontSize: '18px', padding: '5px 15px' }}
                  >
                    Slot {selectedSlot + 1} →
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
