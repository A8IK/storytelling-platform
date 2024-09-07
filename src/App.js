import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Author from './components/Author';
import CreateStory from './components/CreateStory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/author" element={<Author />} />
        <Route path="/create-story" element={<CreateStory />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

