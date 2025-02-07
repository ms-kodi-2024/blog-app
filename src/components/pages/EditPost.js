import { Container, Row, Col } from "react-bootstrap";
import EditPostForm from "../features/EditPostForm";

const EditPost = () => {
  
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="mb-4">Edit Post</h1>
          <EditPostForm />
        </Col>
      </Row>
    </Container>
  );
};

export default EditPost;
