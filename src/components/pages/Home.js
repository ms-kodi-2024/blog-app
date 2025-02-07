import { getAllPosts } from "../../redux/postRedux";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Stack } from "react-bootstrap";

const Home = () => {

  const posts = useSelector(state => getAllPosts(state));

  return (
    <>
      <Stack direction="horizontal" className="mb-4">
        <h1 className="me-auto">All posts</h1>
        <Link to="/post/add" className="btn btn-outline-primary">Add post</Link>
      </Stack>
      <Container>
        <Row>
          {posts.map(post => (
            <Col md="4" key={post.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <p className="mb-2">
                    <strong>Author: </strong>{post.author}
                    <br/>
                    <strong>Published: </strong>{post.publishedDate}
                  </p>
                  <Card.Text>{post.shortDescription}</Card.Text>
                  <Link to={`/post/${post.id}`} className="btn btn-primary">Read more</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
