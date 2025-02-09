import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostsByCategory } from "../../redux/postRedux";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

const CategoryPosts = () => {
  const { categoryName } = useParams();
  const posts = useSelector(state => getPostsByCategory(state, categoryName));

  return (
    <div>
      <h2>Category: {categoryName}</h2>
      <Container>
        <Row>
        {posts.length > 0 ? (
            posts.map(post => (
              <Col md="4" key={post.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <p className="mb-2">
                      <strong>Author: </strong>{post.author}
                      <br/>
                      <strong>Published: </strong>{post.publishedDate}
                      <br/>
                      <strong>Category: </strong>{post.category}
                    </p>
                    <Card.Text>{post.shortDescription}</Card.Text>
                    <Link to={`/post/${post.id}`} className="btn btn-primary">Read more</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No posts in this category...</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CategoryPosts;
