import React from 'react';
import { Button } from 'react-bootstrap';

const NumberPad = ({ onNumberClick }) => {
  const numbers = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'clear', '0', 'enter'
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', backgroundColor: '#d9534f', padding: '10px', borderRadius: '10px' }}>
      {numbers.map((number, index) => (
        <Button
          key={index}
          onClick={() => onNumberClick(number)}
          style={{ width: '90px', height: '90px' }}
        >
          {number}
        </Button>
      ))}
    </div>
  );
};

export default NumberPad;
