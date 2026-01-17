import HealthCheck from "./components/HealthCheck";
import TestApi from "./components/TestApi";
import AppRouters from "./Routers/AppRouters";

function App() {
  return (
    <>
      {/* <HealthCheck />
      <h1>Frontend is running</h1>
      <TestApi/> */}
      < AppRouters />
    </>
  );
}

export default App;
