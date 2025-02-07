import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import About from './components/pages/About';
import Post from './components/pages/Post';
import AddPost from './components/pages/AddPost';
import EditPost from './components/pages/EditPost';
import NotFound from './components/pages/NotFound';
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Container className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/add" element={<AddPost />} />
        <Route path="/post/edit/:id" element={<EditPost />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
