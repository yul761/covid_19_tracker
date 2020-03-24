import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { Chart, Line } from "react-chartjs-2";
import "hammerjs";
import * as zoom from "chartjs-plugin-zoom";

var chartData = {};
var chartOptions = {};
var labels = [];
var selectedFlag = false;
export default class Country extends Component {
  constructor() {
    super();
    this.state = {
      affectedCountries: [],
      affected: false,
      selectedCountry: undefined,
      prevSelectedCountry: undefined,
      history: [],
      casesbyCountry: [],
      selectedCurCases: {}
    };
  }

  color = {
    red: {
      line: "#c72b26",
      fill: "#f7605c"
    },
    blue: {
      line: "#2c5fb8",
      fill: "#719ff0"
    },
    green: {
      line: "#3f994c",
      fill: "#81e38f"
    },
    yellow: {
      line: "#aba441",
      fill: "#e8e176"
    },
    purple: {
      line: "#6f34a3",
      fill: "#b47fe3"
    },
    black: {
      line: "black",
      fill: "#7e7982"
    },
    pink: {
      line: "#a11a9c",
      fill: "#e861e3"
    }
  };

  affectedCountries = () => {
    axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "a274e47037msh0c88d9251a3d8ccp18bab2jsn57b96f87795b"
      }
    })
      .then(response => {
        this.setState({ affectedCountries: response.data.affected_countries });
        this.setState({ affected: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  HistoryCaseByCountry = country => {
    axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php",
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
        console.log(response);
        selectedFlag = true;
        this.formatHistory(response.data.stat_by_country);
        this.setState({ prevSelectedCountry: this.state.selectedCountry });
      })
      .catch(error => {
        console.log(error);
      });
  };

  formatHistory = array => {
    var tempArray = [];
    array.map(element => {
      var tempObject = {
        country: element.country_name,
        total_cases: element.total_cases,
        new_cases: element.new_cases,
        active_cases: element.active_cases,
        total_deaths: element.total_deaths,
        new_deaths: element.new_deaths,
        total_recovered: element.total_recovered,
        serious_critical: element.serious_critical,
        time: element.record_date
      };
      tempArray.push(tempObject);
    });

    this.setState({ history: tempArray });
  };

  generateChart = () => {
    chartData = {};
    if (this.state.history !== null) {
      labels = [];
      var total_cases = [];
      var new_cases = [];
      var active_cases = [];
      var total_deaths = [];
      var new_deaths = [];
      var total_recovered = [];
      var serious_critical = [];
      this.state.history.map(element => {
        labels.push(element.time);
        total_cases.push(this.stringToNumber(element.total_cases));
        active_cases.push(this.stringToNumber(element.active_cases));
        total_deaths.push(this.stringToNumber(element.total_deaths));
        new_deaths.push(this.stringToNumber(element.new_deaths));
        new_cases.push(this.stringToNumber(element.new_cases));
        total_recovered.push(this.stringToNumber(element.total_recovered));
        serious_critical.push(this.stringToNumber(element.serious_critical));
      });
      var data = {
        labels: labels,
        datasets: [
          {
            label: "Total Cases",
            fill: true,
            //   backgroundColor: this.color.red.fill,
            pointBackgroundColor: this.color.red.line,
            borderColor: this.color.red.line,
            pointHighlightStroke: this.color.red.line,
            borderCapStyle: "butt",
            pointRadius: 1,
            pointHoverRadius: 1,
            data: total_cases
          },
          {
            label: "New Cases",
            fill: true,
            //   backgroundColor: this.color.blue.fill,
            pointBackgroundColor: this.color.blue.line,
            borderColor: this.color.blue.line,
            pointHighlightStroke: this.color.blue.line,
            borderCapStyle: "butt",
            pointRadius: 1,
            pointHoverRadius: 1,
            data: new_cases
          },
          {
            label: "Active Cases",
            fill: true,
            //   backgroundColor: this.color.green.fill,
            pointBackgroundColor: this.color.green.line,
            borderColor: this.color.green.line,
            pointHighlightStroke: this.color.green.line,
            borderCapStyle: "butt",
            pointRadius: 1,
            pointHoverRadius: 1,
            data: active_cases
          },
          {
            label: "Total Deaths",
            fill: true,
            //   backgroundColor: this.color.yellow.fill,
            pointBackgroundColor: this.color.yellow.line,
            borderColor: this.color.yellow.line,
            pointHighlightStroke: this.color.yellow.line,
            borderCapStyle: "butt",
            pointRadius: 1,
            pointHoverRadius: 1,
            data: total_deaths
          },
          {
            label: "New Deaths",
            fill: true,
            //   backgroundColor: this.color.purple.fill,
            pointBackgroundColor: this.color.purple.line,
            borderColor: this.color.purple.line,
            pointHighlightStroke: this.color.purple.line,
            borderCapStyle: "butt",
            pointRadius: 1,
            pointHoverRadius: 1,
            data: new_deaths
          },
          {
            label: "Total Recovered",
            fill: true,
            //   backgroundColor: this.color.black.fill,
            pointBackgroundColor: this.color.black.line,
            borderColor: this.color.black.line,
            pointHighlightStroke: this.color.black.line,
            borderCapStyle: "butt",
            pointRadius: 1,
            pointHoverRadius: 1,
            data: total_recovered
          },
          {
            label: "Serious Critical",
            fill: true,
            //   backgroundColor: this.color.pink.fill,
            pointBackgroundColor: this.color.pink.line,
            borderColor: this.color.pink.line,
            pointHighlightStroke: this.color.pink.line,
            borderCapStyle: "butt",
            pointRadius: 1,
            pointHoverRadius: 1,
            data: serious_critical
          }
        ]
      };
      chartData = data;
    }
  };

  stringToNumber = string => {
    var stringWithoutComma = string.replace(",", "");
    return parseInt(stringWithoutComma);
  };

  casesByCountry = () => {
    axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "a274e47037msh0c88d9251a3d8ccp18bab2jsn57b96f87795b"
      }
    })
      .then(response => {
        console.log(response.data);
        var tempcases = [];
        response.data.countries_stat.map(element => {
          let data = {
            country: element.country_name,
            total_cases: element.cases,
            total_deaths: element.deaths,
            total_recovered: element.total_recovered,
            new_deaths: element.new_deaths,
            new_cases: element.new_cases,
            serious_critical: element.serious_critical,
            active_cases: element.active_cases
          };
          tempcases.push(data);
        });
        this.setState({ casesbyCountry: tempcases });
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
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  generateCountryLists = () => {
    var options = [];
    var countryList = this.state.affectedCountries;
    if (this.state.affected) {
      for (let i = 0; i < countryList.length; i++) {
        let tempObject = { label: countryList[i], value: i + 1 };
        options.push(tempObject);
      }
    }

    return options;
  };

  componentDidMount() {
    chartData = {};
    this.affectedCountries();
    this.casesByCountry();
    this.LatestDataByCountry("USA");
    chartOptions = {
      responsive: true,
      scales: {
        // xAxes: [{ ticks: { maxTicksLimit: 10 } }],
        yAxes: [{ ticks: { beginAtZero: true } }]
      },
      pan: {
        enabled: true,
        mode: "xy"
      },
      zoom: {
        enabled: true,
        mode: "xy"
      }
    };
  }
  //   componentWillMount() {
  //     Chart.plugins.register(zoom);
  //   }

  curCasesByCountry = country => {
    console.log(this.state.casesbyCountry);
    var selected = this.state.casesbyCountry.filter(
      el => el.country === country
    );

    this.setState({ selectedCurCases: selected[0] });
    selectedFlag = false;
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("the selected country is : " + this.state.selectedCountry);

    if (this.state.prevSelectedCountry !== this.state.selectedCountry) {
      chartData = {};
      this.HistoryCaseByCountry(this.state.selectedCountry);
      console.log(selectedFlag);
      if (selectedFlag) {
        this.curCasesByCountry(this.state.selectedCountry);
      }
      this.generateChart();
    }

    console.log(this.state.selectedCurCases);
    console.log(this.state.selectedCurCases.total_cases);
  }
  render() {
    return (
      <div className="country">
        <div className="country__selectBar">
          <Select
            options={this.generateCountryLists()}
            onChange={selected => {
              console.log(selected.label, selected.value);
              this.setState({
                prevSelectedCountry: this.state.selectedCountry
              });
              this.setState({ selectedCountry: selected.label });
            }}
          />
        </div>

        <div className="country__curCases">
          <div className="country__curCases--totalCases country__curCases--block">
            <div className="country__curCases--totalCases-label country__curCases--block-label">
              Total Cases :
            </div>
            <div className="country__curCases--totalCases-data country__curCases--block-data">
              {this.state.selectedCurCases.total_cases}
            </div>
          </div>
          <div className="country__curCases--totalDeaths country__curCases--block">
            <div className="country__curCases--totalDeaths-label country__curCases--block-label">
              Total Deaths :
            </div>
            <div className="country__curCases--totalDeaths-data country__curCases--block-data">
              {this.state.selectedCurCases.total_deaths}
            </div>
          </div>
          <div className="country__curCases--totalRecovered country__curCases--block">
            <div className="country__curCases--totalRecovered-label country__curCases--block-label">
              Total Recovered :
            </div>
            <div className="country__curCases--totalRecovered-data country__curCases--block-data">
              {this.state.selectedCurCases.total_recovered}
            </div>
          </div>
          <div className="country__curCases--newDeaths country__curCases--block">
            <div className="country__curCases--newDeaths-label country__curCases--block-label">
              New Deaths :
            </div>
            <div className="country__curCases--newDeaths-data country__curCases--block-data">
              {this.state.selectedCurCases.new_deaths}
            </div>
          </div>
          <div className="country__curCases--newCases country__curCases--block">
            <div className="country__curCases--newCases-label country__curCases--block-label">
              New Cases :
            </div>
            <div className="country__curCases--newCases-data country__curCases--block-data">
              {this.state.selectedCurCases.new_cases}
            </div>
          </div>
          <div className="country__curCases--seriousCritical country__curCases--block">
            <div className="country__curCases--seriousCritical-label country__curCases--block-label">
              Serious Critical :
            </div>
            <div className="country__curCases--seriousCritical-data country__curCases--block-data">
              {this.state.selectedCurCases.serious_critical}
            </div>
          </div>
          <div className="country__curCases--activeCases country__curCases--block">
            <div className="country__curCases--activeCases-label country__curCases--block-label">
              Active Cases :
            </div>
            <div className="country__curCases--activeCases-data country__curCases--block-data">
              {this.state.selectedCurCases.active_cases}
            </div>
          </div>
        </div>

        <div className="country__chart">
          <Line
            className="country__chart--line"
            data={chartData}
            options={chartOptions}
          />
        </div>
      </div>
    );
  }
}
