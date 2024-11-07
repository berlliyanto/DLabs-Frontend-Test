import { Fragment } from "react";
import Dashboard from "./components/layouts/DashboardLayout";
import NavBar from "./components/fragments/NavBar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Dashboard />
      <Toaster />
    </Fragment>
  );
}

export default App;
