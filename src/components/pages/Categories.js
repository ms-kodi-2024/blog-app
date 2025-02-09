import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../redux/categoriesRedux";
import { ListGroup, Container, Row, Col } from "react-bootstrap";

const Categories = () => {
  const categories = useSelector(getAllCategories);

  return (
    <div>
      <h2>Categories</h2>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <ListGroup as="ul">
              {categories.map(category => (
                <ListGroup.Item as="li" key={category}>
                  <Link to={`/category/${category}`}>{category}</Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Categories;
