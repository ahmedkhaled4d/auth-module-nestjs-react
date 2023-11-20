import { Button, Card, Container, Row } from "react-bootstrap";

export default function UserCard() {
  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>ahmed</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              ahmedkhaled4d@gmail.com
            </Card.Subtitle>
            <Card.Text>account create</Card.Text>
            <Button variant="danger">remove</Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
