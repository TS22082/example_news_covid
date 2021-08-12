import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card/Card";

function App() {
  const [articles, setArticles] = useState([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("a render happened");
  }, [count]);

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_KEY}`
      )
      .then((res) => setArticles(res.data.articles))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://covid-19-data.p.rapidapi.com/report/country/name?name=Italy&date=2020-04-01",
      {
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_COVID_KEY,
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
      <h1>Count: {count} </h1>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
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
