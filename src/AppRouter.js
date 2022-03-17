import { Box } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Copyright from "./components/Copyright";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";

export default function AppRouter() {

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/" element={<App />} />
          </Routes>
        </div>
      </Router>
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );
}
