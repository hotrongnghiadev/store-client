import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "tippy.js/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <ToastContainer />
          <Routes />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
