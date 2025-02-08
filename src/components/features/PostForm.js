import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addPost, editPost } from "../../redux/postRedux";
import { Form, Button } from "react-bootstrap";
import { selectPostById } from "../../redux/postRedux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from '../../utils/dateToStr';
import { useForm } from "react-hook-form";

const PostForm = () => {
  const { id } = useParams();
  const post = useSelector((state) => selectPostById(state, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

	const [contentError, setContentError] = useState(false);
  const [dateError, setDateError] = useState(false);

	const { register, handleSubmit: validate, setValue, watch, formState: { errors } } = useForm({
		defaultValues: {
			publishedDate: new Date(),
		}
	});

  useEffect(() => {
    if (post) {
			setValue("title", post.title);
      setValue("shortDescription", post.shortDescription);
      setValue("content", post.content);
      setValue("author", post.author);
      setValue("publishedDate", new Date(post.publishedDate));
    }
  }, [post, setValue]);

	const handleSubmit = (data) => {

		setContentError(!data.content);
    setDateError(!data.publishedDate);

    if (!data.content || !data.publishedDate) return;

    const postData = {
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      publishedDate: data.publishedDate ? formatDate(data.publishedDate) : null,
      author: data.author
    };

    if (id) {
      const updatedPost = { id, ...postData };
      dispatch(editPost(updatedPost));
    } else {
      dispatch(addPost(postData));
    }

    navigate("/");
	};
	

  return (
		<Form onSubmit={validate(handleSubmit)}>

			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label htmlFor="title">Title</Form.Label>
				<Form.Control
					{...register("title", {
						required: "Title is required", 
    				minLength: { value: 3, message: "Title must be at least 3 characters long" }
					})}
					id="title"
					type="text"
					placeholder="Enter title"
				/>
				{errors.title && <small className="d-block form-text text-danger mt-2">{errors.title.message}</small>}
			</Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="author">Author</Form.Label>
				<Form.Control
					{...register("author", {
						required: "Author is required", 
    				minLength: { value: 3, message: "Author must be at least 3 characters long" }
					})}
					id="author"
					type="text"
					placeholder="Enter author"
				/>
				{errors.author && <small className="d-block form-text text-danger mt-2">{errors.author.message}</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="publishedDate">Published Date</Form.Label><br />
				<DatePicker
					id="publishedDate"
					selected={watch("publishedDate")} 
					onChange={(date) => setValue("publishedDate", date)} 
					placeholderText="Select a date"
					dateFormat="dd-MM-yyyy"
				/>
				{dateError && <small className="d-block form-text text-danger mt-2">Published date is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="shortDescription">Short Description</Form.Label>
				<Form.Control
					{...register("shortDescription", {
						required: "Short description is required", 
    				minLength: { value: 20, message: "Short description must be at least 20 characters long" }
					})}
					id="shortDescription"
					onChange={e => setValue(e.target.value)}
					type="text"
					placeholder="Enter short description"
				/>
				{errors.shortDescription && <small className="d-block form-text text-danger mt-2">{errors.shortDescription.message}</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="content">Content</Form.Label>
				<ReactQuill
					id="mainContent"
					theme="snow"
					value={watch("content")} 
					onChange={(value) => setValue("content", value, { shouldValidate: true })} 
				/>
        {contentError && <small className="d-block form-text text-danger mt-2">Content is required</small>}
      </Form.Group>

      <Button variant="primary" type="submit">
        {id ? "Update post" : "Add post"}
      </Button>
    </Form>
  );
};

export default PostForm;
