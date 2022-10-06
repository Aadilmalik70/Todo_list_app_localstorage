import "./header.css";
import { useEffect, useState } from "react";
import axios from "axios";



const Header = ({ type }) => {
  const [url, setUrl] = useState("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data.drinks);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [url]);

  const changeHandler = (e) => {
    const letter = e.target.value;
    let updatedUrl =
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` + letter;
    if (letter === "") {
      setUrl("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a");
    }
    setUrl(updatedUrl)
  };

  return (
    <>
      <div className="header">
        <div className="headerContainer " >
          <div className="headerList">
            <div className="headerListItem active">
              <span  >Ordinary Drinks</span>
            </div>
            <div className="headerListItem ">
              <span >Shots</span>
            </div>
            <div className="headerListItem">
              <span  >Cocoa</span>
            </div>
            <div className="headerListItem">
              <span  >Shake</span>
            </div>
            <div className="headerListItem">
              <span >Beer</span>
            </div>
          </div>

          <>
            <h1 className="headerTitle">
              Le Cafe
            </h1>
            <h1 className="headerTitle">

              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your Drinks – unlock instant savings of 10% or
              more with a free  account
            </p>
            <button className="headerBtn">Sign in / Register</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <input
                  type="text"
                  placeholder="What you want to drink?"
                  className="headerSearchInput"
                  onChange={(e) => changeHandler(e)}
                  
                  style={{width:"400px"}}
                />
              </div>
            </div>
          </>
        </div>
      </div>
      <div style={{ margin: "50px 10px 20px 10px" }}>
        {data ?
          data.map((cocktail) => {
            return (
              <div className="main-card" style={{ gap: "10px", borderRadius: "5px" }} key={cocktail.idDrink}>
                <img
                  src={cocktail.strDrinkThumb}
                  alt="cocktails"
                  height="200"
                  width="200"
                />
                <br />
                <h2 className="main-title">{cocktail.strDrink}</h2>
                <h4 >{cocktail.strCategory}</h4>
                <p className="main-ing">
                  Ingredients:
                  {cocktail.strIngredient1},{cocktail.strIngredient2},
                  {cocktail.strIngredient3}
                </p>
              </div>
            )
          }) : <h1>No data found</h1>
        }
      </div>
    </>
  );
};

export default Header;
