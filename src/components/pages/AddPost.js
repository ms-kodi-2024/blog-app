import AddPostForm from "../features/AddPostForm";
import { Container, Row, Col } from "react-bootstrap";

const AddPost = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="mb-4">Add Post</h1>
          <AddPostForm />
        </Col>
      </Row>
    </Container>
  )
};

export default AddPost;
