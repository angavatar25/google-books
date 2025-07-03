import { BrowserRouter as Router, useLocation, useRoutes } from "react-router-dom";

import './App.css'
import Favourites from './pages/Favourites';
import Home from './pages/Home';

const AppRouter = () => {
  const location = useLocation();

  const path = [
    { path: '/', element: <Home/> },
    { path: '/favourites', element: <Favourites/> },
  ];

  const routes = useRoutes(path, location);

  return (
    <div key={location.pathname}>{routes}</div>
  )
}

function App() {
  return (
    <div className='min-h-screen relative bg-white mx-auto max-w-[450px]'>
      <Router>
        <AppRouter/>
      </Router>
    </div>
  )
}

export default App
