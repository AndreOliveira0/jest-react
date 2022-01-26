import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from '../routes';

export const AppRouter = () => (
  <Router>
    <Routes>
      {routes.map(route => <Route {...route} key={route.path} />)}
    </Routes>
  </Router>
);