import { Alert, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      <Row>
        <Alert key="info" variant="info">
          Full Stack Test Task
        </Alert>
      </Row>
      <div className="text-center">
        Already signin? <Link to="/app">open app</Link>
      </div>
    </Container>
  );
}
