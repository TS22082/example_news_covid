import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card/Card";

function App() {
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [joke, setJoke] = useState("");

  useEffect(() => {
    console.log("a render happened");
  }, [count]);

  useEffect(() => {
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => setJoke(res.data.joke))
      .catch((err) => console.log(err));

    //if you want to use async / await
    // (async () => {
    //   try {
    //     const res = await axios.get("https://icanhazdadjoke.com/", {
    //       headers: {
    //         Accept: "application/json",
    //       },
    //     });

    //     setJoke(res.data.joke);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_KEY}`
      )
      .then((res) => setArticles(res.data.articles))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // var options = {
    //   method: "GET",
    //   url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
    //   params: { ingr: "chocolate" },
    //   headers: {
    //     "x-rapidapi-key": "b7436eb940msh7eda97d567495aap1562ccjsndf86c1bddee6",
    //     "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
    //   },
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });

    // same thing dif way
    axios
      .get(
        "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=chocolate",
        {
          headers: {
            "x-rapidapi-key":
              "b7436eb940msh7eda97d567495aap1562ccjsndf86c1bddee6",
            "x-rapidapi-host":
              "edamam-food-and-grocery-database.p.rapidapi.com",
          },
        }
      )
      .then((res) => console.log(res.data.parsed[0].food))
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
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <h3>{joke}</h3>
      <h4>Count: {count} </h4>
      <button className="btn" onClick={() => setCount(count + 1)}>
        Click Me
      </button>

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
