import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';

const Client: React.FC = () => {

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target[0].value)
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Client Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name" />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default Client;
