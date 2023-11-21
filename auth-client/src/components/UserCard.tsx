import { Button, Card, Container, Row } from "react-bootstrap";
import { axiosApiInstance } from "../api/axios";

export default function UserCard({ data, removeFromList }) {
  const remove = async (id: string) => {
    await axiosApiInstance.delete(`/users/${id}`);
    removeFromList(id);
  };
  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>{data.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {data.email}
            </Card.Subtitle>
            <Button variant="danger" onClick={() => remove(data._id)}>
              remove
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
