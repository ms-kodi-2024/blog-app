import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editPost } from "../../redux/postRedux";
import { Form, Button } from "react-bootstrap";
import { selectPostById } from "../../redux/postRedux";

const EditPostForm = () => {
  const { id } = useParams();
  const post = useSelector((state) => selectPostById(state, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setShortDescription(post.shortDescription);
      setContent(post.content);
      setPublishedDate(post.publishedDate);
      setAuthor(post.author);
    }
	}, [post]);
	
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { id, title, shortDescription, content, publishedDate, author};
    dispatch(editPost(updatedPost));
    navigate("/");
  };

  if (!post) return <div>Loading...</div>;
  else return (
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
        <Form.Label htmlFor="publishedDate">Published Date</Form.Label>
        <Form.Control id="publishedDate" type="text" placeholder="Enter published" value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="shortDescription">Short Description</Form.Label>
        <Form.Control id="shortDescription" type="text" placeholder="Leave a comment here" value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="content">Content</Form.Label>
        <Form.Control id="content" as="textarea" rows={4} value={content} placeholder="Leave a comment here" onChange={(e) => setContent(e.target.value)} required />
      </Form.Group>

      <Button variant="primary" type="submit">Update Post</Button>
    </Form>
  );
};

export default EditPostForm;
