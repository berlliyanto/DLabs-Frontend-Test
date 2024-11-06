import { Fragment } from "react";
import Dashboard from "./components/layouts/DashboardLayout";
import NavBar from "./components/fragments/NavBar";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Dashboard />
    </Fragment>
  );
}

export default App;
