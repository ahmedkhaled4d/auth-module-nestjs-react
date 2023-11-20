import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import UserCard from "../components/UserCard";
import { axiosApiInstance } from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Application() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [users, setUsers] = useState([]);
  const handleRemoveItem = (id) => {
    setUsers(users.filter((item) => item._id !== id));
  };

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axiosApiInstance.get("/users");
      setUsers(data);
    };
    getUsers();
  }, []);

  const logout = async () => {
    await axiosApiInstance.get("/auth/logout");
    localStorage.clear();
    // Redirect to the home page after logout
    nav("/");
  };
  return (
    <Container>
      <Row>
        <Alert key="info" variant="info">
          Full Stack Test Task
        </Alert>
        <Col>
          {" "}
          <h2>Welcome {user.email} to the application.</h2>
        </Col>
        <Col>
          {" "}
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>
      {users.map((item, index) => (
        <UserCard key={index} data={item} done={handleRemoveItem} />
      ))}
    </Container>
  );
}
