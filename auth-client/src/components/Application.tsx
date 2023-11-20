import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import UserCard from "./UserCard";

export default function Application() {
  return (
    <Container>
      <Row>
        <Alert key="info" variant="info">
          Full Stack Test Task
        </Alert>
        <Col>
          {" "}
          <h2>Welcome to the application.</h2>
        </Col>
        <Col>
          {" "}
          <Button variant="danger">Logout</Button>
        </Col>
      </Row>
      <UserCard />
    </Container>
  );
}
