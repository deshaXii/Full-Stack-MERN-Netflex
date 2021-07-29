import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
export default function Home({ type }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
      } catch (e) {
        console.log(e);
      }
    };
  });

  return (
    <div className="homepage">
      <Navbar />
      <Featured type={type} />
      <List />
      <List />
    </div>
  );
}
