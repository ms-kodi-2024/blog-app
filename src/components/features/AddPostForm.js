import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../redux/postRedux";
import { Form, Button } from "react-bootstrap";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      shortDescription,
      content,
      publishedDate,
      author
    };
    dispatch(addPost(newPost));
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control id="title" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="author">Author</Form.Label>
        <Form.Control id="author" type="text" placeholder="Enter author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="published">Published Date</Form.Label>
        <Form.Control id="published" type="text" placeholder="Enter published" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="shortDescription">Short Description</Form.Label>
        <Form.Control id="shortDescription" type="text" placeholder="Leave a comment here" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="mainContent">Content</Form.Label>
        <Form.Control as="textarea" id="mainContent" rows={4} value={content} placeholder="Leave a comment here" onChange={(e) => setContent(e.target.value)} required />
      </Form.Group>

      <Button variant="primary" type="submit">Add Post</Button>
    </Form>
  );
};

export default AddPostForm;
