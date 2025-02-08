import { Container, Row, Col } from "react-bootstrap";
import PostForm from "../features/PostForm";

const EditPost = () => {
  
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="mb-4">Edit Post</h1>
          <PostForm />
        </Col>
      </Row>
    </Container>
  );
};

export default EditPost;
