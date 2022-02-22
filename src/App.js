import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        cost: values.cost,
        category: values.category,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].idgames,
            name: values.name,
            cost: values.cost,
            category: values.category,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("https://trainingweekdev21.myvtex.com/api/dataentities/CS/search", {'headers': { 'VtexIdclientAutCookie': "eyJhbGciOiJFUzI1NiIsImtpZCI6IkZCM0EzMjIwRkE4RTRCMzNEQzJGRkRDRjlDNTZCOURBMkMwNDQ3NTgiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJyYWlzc2FtYWNlZG83QGdtYWlsLmNvbSIsImFjY291bnQiOiJ0cmFpbmluZ3dlZWtkZXYyMSIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiZDNhYzM2ZGYtN2Q0OS00Zjg2LWIxNGYtNGU5OTdjMjQ0MzUyIiwiZXhwIjoxNjQ1NTcyNTk1LCJ1c2VySWQiOiI0ZDdhNzk4NC1kNTBkLTQxZmEtYjZjMi1lYzA3MjUxMzMxMTAiLCJpYXQiOjE2NDU0ODYxOTUsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiJkZGI0ZTYyNC1mMzA3LTRiNDAtOTJhNC01MmJmMDhkOTYwNzAifQ.gffyEQDoEk6mDRdtbxHGnzGbu-bRXYiVsg4Arojr5mmh6rAIdA_u6MbiXeRu-AgC-jPzqBSb1lUhHDG9vPEwrQ", 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" } }).then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Scrim Shop</h1>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Preço"
          name="cost"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Categoria"
          name="category"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterGame} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          name={val.name}
          cost={val.cost}
          category={val.category}
        />
      ))}
    </div>
  );
}