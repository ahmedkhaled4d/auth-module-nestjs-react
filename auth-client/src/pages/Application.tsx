import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import UserCard from "../components/UserCard";
import { axiosApiInstance } from "../api/axios";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

export default function Application() {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [users, setUsers] = useState([]);
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
    return redirect("/signin");
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
        <UserCard key={index} data={item} />
      ))}
    </Container>
  );
}
