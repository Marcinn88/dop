import { Main } from './Main';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'layouts/layout';
import { About } from './About';
import { Gallery } from './Gallery';
import { Contact } from './Contact';
export const App = () => {
  const tokenChecker = () => {
    try {
      const token = localStorage.getItem('token');
      const parsedToken = JSON.parse(token).token;
      return parsedToken;
    } catch (error) {
      localStorage.setItem('token', JSON.stringify({ token: '' }));
      const token = localStorage.getItem('token');
      const parsedToken = JSON.parse(token).token;
      return parsedToken;
    }
  };

  return (
    <Routes>
      <Route path="/dop-bike/" element={<Layout token={tokenChecker()} />}>
        <Route path="/dop-bike/" element={<Main token={tokenChecker()} />} />
        <Route
          path="/dop-bike/about"
          element={<About token={tokenChecker()} />}
        />
        <Route
          path="/dop-bike/gallery"
          element={<Gallery token={tokenChecker()} />}
        />
        <Route
          path="/dop-bike/contact"
          element={<Contact token={tokenChecker()} />}
        />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
};
