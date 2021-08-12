import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card/Card";

function App() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=84145fe9236e4573824511f495ab8126"
        );
        setArticles(res.data.articles);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    fetch(
      "https://covid-19-data.p.rapidapi.com/report/country/name?name=Italy&date=2020-04-01",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_KEY,
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      {articles.map((article, index) => (
        <Card
          key={index}
          title={article.title}
          description={article.description}
        />
      ))}
    </div>
  );
}

export default App;
