import React, { Component } from "react";
import axios from "axios";

export default class World extends Component {
  constructor() {
    super();
    this.state = {
      stats: false,
      worldStats: {},
      countryName: undefined,
      specificCountryStats: {}
    };
  }

  WorldsStats = () => {
    axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "a274e47037msh0c88d9251a3d8ccp18bab2jsn57b96f87795b"
      }
    })
      .then(response => {
        console.log(response);
        this.setState({ worldStats: response.data });
        this.setState({ stats: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  LatestDataByCountry = country => {
    axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "a274e47037msh0c88d9251a3d8ccp18bab2jsn57b96f87795b"
      },
      params: {
        country: `${country}`
      }
    })
      .then(response => {
        console.log(response.data.latest_stat_by_country[0]);
        this.setState({
          specificCountryStats: response.data.latest_stat_by_country[0]
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then(response => {
        let data = response.data;
        this.setState({
          countryName: data.country_name
        });
        this.LatestDataByCountry(this.state.countryName);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.WorldsStats();
    this.getGeoInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.specificCountryStats);
  }

  render() {
    if (!this.state.stats) {
      return <div> Loading</div>;
    } else {
      return (
        <div className="stats">
          <div className="stats__worldStatsTimeline">
            <div className="stats__worldStatsTimeline-label">Data Taken At</div>
            <div className="stats__worldStatsTimeline-time">
              {this.state.worldStats.statistic_taken_at} GMT
            </div>
          </div>
          <div className="stats__region">GLOBAL</div>
          <div className="stats__worldStats">
            <div className="stats__worldStats__totalcases stats__worldStats__data">
              <div className="stats__worldStats__totalcases-label">
                Total Cases
              </div>
              <div className="stats__worldStats__totalcases-data">
                {this.state.worldStats.total_cases}
              </div>
            </div>

            <div className="stats__worldStats__totaldeaths stats__worldStats__data">
              <div className="stats__worldStats__totaldeaths-label">
                Total Deaths
              </div>
              <div className="stats__worldStats__totaldeaths-data">
                {this.state.worldStats.total_deaths}
              </div>
            </div>

            <div className="stats__worldStats__totalRecoverd stats__worldStats__data">
              <div className="stats__worldStats__totalRecovered-label">
                Total Recovered
              </div>
              <div className="stats__worldStats__totalRecovered-data">
                {this.state.worldStats.total_recovered}
              </div>
            </div>

            <div className="stats__worldStats__newcases stats__worldStats__data">
              <div className="stats__worldStats__newcases-label">New Cases</div>
              <div className="stats__worldStats__newcases-data">
                {this.state.worldStats.new_cases}
              </div>
            </div>

            <div className="stats__worldStats__newdeaths stats__worldStats__data">
              <div className="stats__worldStats__newdeaths-label">
                New Deaths
              </div>
              <div className="stats__worldStats__newdeaths-data">
                {this.state.worldStats.new_deaths}
              </div>
            </div>
          </div>

          <div className="stats__region">{this.state.countryName}</div>

          <div className="stats__specificStats">
            <div className="stats__specificStats__totalcases stats__specificStats__data">
              <div className="stats__specificStats__totalcases-label">
                Total Cases
              </div>
              <div className="stats__specificStats__totalcases-data">
                {this.state.specificCountryStats.total_cases}
              </div>
            </div>

            <div className="stats__specificStats__totaldeaths stats__specificStats__data">
              <div className="stats__specificStats__totaldeaths-label">
                Total Deaths
              </div>
              <div className="stats__specificStats__totaldeaths-data">
                {this.state.specificCountryStats.total_deaths}
              </div>
            </div>

            <div className="stats__specificStats__totalRecoverd stats__specificStats__data">
              <div className="stats__specificStats__totalRecovered-label">
                Total Recovered
              </div>
              <div className="stats__specificStats__totalRecovered-data">
                {this.state.specificCountryStats.total_recovered}
              </div>
            </div>

            <div className="stats__specificStats__newcases stats__specificStats__data">
              <div className="stats__specificStats__newcases-label">
                New Cases
              </div>
              <div className="stats__specificStats__newcases-data">
                {this.state.specificCountryStats.new_cases}
              </div>
            </div>

            <div className="stats__specificStats__newdeaths stats__specificStats__data">
              <div className="stats__specificStats__newdeaths-label">
                New Deaths
              </div>
              <div className="stats__specificStats__newdeaths-data">
                {this.state.specificCountryStats.new_deaths}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
