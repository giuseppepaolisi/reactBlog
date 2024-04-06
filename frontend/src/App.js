import { BrowserRouter } from 'react-router-dom'
import ListArticles from './pages/ListArticles';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ListArticles />
      </BrowserRouter>
    </div>
  );
}

export default App;
