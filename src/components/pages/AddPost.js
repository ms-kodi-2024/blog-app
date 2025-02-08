import { Container, Row, Col } from "react-bootstrap";
import PostForm from "../features/PostForm";

const AddPost = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="mb-4">Add Post</h1>
          <PostForm />
        </Col>
      </Row>
    </Container>
  )
};

export default AddPost;
