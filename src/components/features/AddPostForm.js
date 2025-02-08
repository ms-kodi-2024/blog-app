import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../redux/postRedux";
import { Form, Button } from "react-bootstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from '../../utils/dateToStr';

const AddPostForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      shortDescription,
      content,
      publishedDate: formatDate(startDate),
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
        <Form.Label htmlFor="published">Published Date</Form.Label><br />
        <DatePicker id="published" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd-MM-yyyy" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="shortDescription">Short Description</Form.Label>
        <Form.Control id="shortDescription" type="text" placeholder="Leave a comment here" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="mainContent">Content</Form.Label>
        <ReactQuill id="mainContent" theme="snow" value={content} onChange={setContent} required />
      </Form.Group>

      <Button variant="primary" type="submit">Add Post</Button>
    </Form>
  );
};

export default AddPostForm;
