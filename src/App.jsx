import { Main } from "./components/Main";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";

const App = () => {
  const tokenChecker = () => {
    try {
      const token = localStorage.getItem("token");
      const parsedToken = JSON.parse(token).token;
      return parsedToken;
    } catch (error) {
      localStorage.setItem("token", JSON.stringify({ token: "" }));
      const token = localStorage.getItem("token");
      const parsedToken = JSON.parse(token).token;
      return parsedToken;
    }
  };

  console.log("server uruchomiony");
  return (
    <Routes>
      <Route path="/dop/" element={<Layout token={tokenChecker()} />}>
        <Route path="/dop/" element={<Main token={tokenChecker()} />} />
        <Route path="/dop/about" element={<About token={tokenChecker()} />} />
        <Route
          path="/dop/gallery"
          element={<Gallery token={tokenChecker()} />}
        />
        <Route
          path="/dop/contact"
          element={<Contact token={tokenChecker()} />}
        />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
};
export default App;
