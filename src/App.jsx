import { Toaster } from "react-hot-toast";
import Home from "./components/Home.jsx";
import { useSelector } from "react-redux";

function App() {
  const { darkMode } = useSelector((state) => state.dark);

  return (
    <>
      <div
        className={`min-h-[100dvh] w-full ${
          darkMode ? "bg-gray-950" : "bg-gray-100"
        } flex flex-col items-center px-4 py-8`}
      >
        <Toaster containerStyle={{ position: "top-center", top: "25px" }} />
        <Home />
      </div>
    </>
  );
}

export default App;
