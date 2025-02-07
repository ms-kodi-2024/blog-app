import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostById } from '../../redux/postRedux';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { deletePost } from '../../redux/postRedux';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const Post = () => {

  const { id } = useParams();
  const post = useSelector(state => selectPostById(state, id));
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    dispatch(deletePost(id));
  };

  if(!post) return <Navigate to="/" />
  else return (
    <Container>
      <Row>
        <Col md={{ span: 3, offset: 2 }} >
          <h1>{post.title}</h1>
          <p className="mb-2">
            <strong>Author: </strong>{post.author}
            <br/>
            <strong>Published: </strong>{post.publishedDate}
          </p>
          {post.content}
        </Col>
        <Col md={{ span: 3, offset: 3 }}>
          <Link to={`/post/edit/${post.id}`} className="btn btn-outline-primary me-3">Edit</Link>
          <Button variant="outline-danger" onClick={() => setShowModal(true)}>Delete</Button>
        </Col>
      </Row>

      {/* modal to delete post */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This operation will completely remove this post from the app.<br />
          Are you sure you want to do that?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Remove</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
};

export default Post;
