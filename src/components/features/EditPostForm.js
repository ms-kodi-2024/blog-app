import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editPost } from "../../redux/postRedux";
import { Form, Button } from "react-bootstrap";
import { selectPostById } from "../../redux/postRedux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from '../../utils/dateToStr';

const EditPostForm = () => {
  const { id } = useParams();
  const post = useSelector((state) => selectPostById(state, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setShortDescription(post.shortDescription);
      setContent(post.content);
      setStartDate(post.publishedDate);
      setAuthor(post.author);
    }
	}, [post]);
	
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { id, title, shortDescription, content, publishedDate: formatDate(startDate), author};
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
        <Form.Label htmlFor="publishedDate">Published Date</Form.Label><br />
        <DatePicker id="publishedDate" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd-MM-yyyy" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="shortDescription">Short Description</Form.Label>
        <Form.Control id="shortDescription" type="text" placeholder="Leave a comment here" value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="content">Content</Form.Label>
        <ReactQuill id="mainContent" theme="snow" value={content} onChange={setContent} />
      </Form.Group>

      <Button variant="primary" type="submit">Update Post</Button>
    </Form>
  );
};

export default EditPostForm;
