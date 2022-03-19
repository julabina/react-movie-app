import Header from "./Layout/Header";
import './css/style.css';
import Home from "./Pages/Home";

function App() {
  console.log(process.env.REACT_APP_API_KEY)
  return (
    < >
      <Header />
      <Home />
    </>
  );
}

export default App;
