import { Button, Card, Container, Row } from "react-bootstrap";

export default function UserCard({ data }) {
  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>{data.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {data.email}
            </Card.Subtitle>
            <Card.Text>account create</Card.Text>
            <Button variant="danger">remove</Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
