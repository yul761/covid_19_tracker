import React from "react";
import axios from "axios";

function App() {
  const Alldata = () => {
    axios({
      method: "GET",
      url: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "a274e47037msh0c88d9251a3d8ccp18bab2jsn57b96f87795b"
      }
      // params: {
      //   country: "Canada"
      // }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const filterByCountry = country => {
    axios({
      method: "GET",
      url: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "a274e47037msh0c88d9251a3d8ccp18bab2jsn57b96f87795b"
      },
      params: {
        country: `$ {country}`
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <div className="country">
        <div className="country__name">
          Country :
          <input
            className="country__name-input"
            type="text"
            placeholder="Please Enter the country you want to search"
            name="country"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default App;
