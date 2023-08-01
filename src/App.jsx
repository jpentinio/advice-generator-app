import { useEffect, useState } from "react";
import "./App.css";
import divider from "../src/assets/pattern-divider-desktop.svg";
import dice from "../src/assets/icon-dice.svg";

function App() {
  const [values, setValues] = useState("");
  const [loading, setLoading] = useState(false);

  //fetch data from api
  async function fetchAdvice() {
    setLoading(true);
    setTimeout(() => {
      fetch("https://api.adviceslip.com/advice")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setValues(data);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }, 500);
  }

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="title">ADVICE #{values.slip?.id}</div>
        <h2>{loading ? "Loading..." : `"${values.slip?.advice}"`}</h2>
        <img src={divider} alt="divider" width="100%" height={16} />
        <div className="buttonDiv">
          <div className="button" onClick={fetchAdvice}>
            <img src={dice} alt="dice" className="dice" />
          </div>
        </div>
      </div>

      <div className="footer">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io/home"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://www.frontendmentor.io/profile/jpentinio"
          target="_blank"
          className="link"
        >
          Joshua M. Pentinio
        </a>
      </div>
    </div>
  );
}

export default App;
