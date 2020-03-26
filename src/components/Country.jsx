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
      selectedCurCases: {},
      // trigger to show different content on chart
      showTotalCases: true,
      showTotalDeaths: true,
      showTotalRecovered: true,
      showNewDeaths: true,
      showNewCases: true,
      showSeriousCritical: true,
      showActiveCases: true,
      tagToggled: false
    };
  }

  resetTags = () => {
    this.setState({
      showTotalCases: true,
      showTotalDeaths: true,
      showTotalRecovered: true,
      showNewDeaths: true,
      showNewCases: true,
      showSeriousCritical: true,
      showActiveCases: true
    });
  };

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
        new_cases.push(
          this.stringToNumber(
            element.new_cases === "" ? "0" : element.new_cases
          )
        );
        total_recovered.push(this.stringToNumber(element.total_recovered));
        serious_critical.push(this.stringToNumber(element.serious_critical));
      });

      // control which data should be shown on chart
      var DataTotalCase = {
        label: "Total Cases",
        fill: true,
        pointBackgroundColor: this.color.red.line,
        borderColor: this.color.red.line,
        pointHighlightStroke: this.color.red.line,
        borderCapStyle: "butt",
        pointRadius: 1,
        pointHoverRadius: 1,
        data: total_cases
      };

      var DataTotalDeaths = {
        label: "Total Deaths",
        fill: true,
        pointBackgroundColor: this.color.yellow.line,
        borderColor: this.color.yellow.line,
        pointHighlightStroke: this.color.yellow.line,
        borderCapStyle: "butt",
        pointRadius: 1,
        pointHoverRadius: 1,
        data: total_deaths
      };

      var DataTotalRecovered = {
        label: "Total Recovered",
        fill: true,
        pointBackgroundColor: this.color.black.line,
        borderColor: this.color.black.line,
        pointHighlightStroke: this.color.black.line,
        borderCapStyle: "butt",
        pointRadius: 1,
        pointHoverRadius: 1,
        data: total_recovered
      };

      var DataNewCases = {
        label: "New Cases",
        fill: true,
        pointBackgroundColor: this.color.blue.line,
        borderColor: this.color.blue.line,
        pointHighlightStroke: this.color.blue.line,
        borderCapStyle: "butt",
        pointRadius: 1,
        pointHoverRadius: 1,
        data: new_cases
      };

      var DataNewDeaths = {
        label: "New Deaths",
        fill: true,
        pointBackgroundColor: this.color.purple.line,
        borderColor: this.color.purple.line,
        pointHighlightStroke: this.color.purple.line,
        borderCapStyle: "butt",
        pointRadius: 1,
        pointHoverRadius: 1,
        data: new_deaths
      };

      var DataSeriousCritical = {
        label: "Serious Critical",
        fill: true,
        pointBackgroundColor: this.color.pink.line,
        borderColor: this.color.pink.line,
        pointHighlightStroke: this.color.pink.line,
        borderCapStyle: "butt",
        pointRadius: 1,
        pointHoverRadius: 1,
        data: serious_critical
      };

      var DataActiveCases = {
        label: "Active Cases",
        fill: true,
        pointBackgroundColor: this.color.green.line,
        borderColor: this.color.green.line,
        pointHighlightStroke: this.color.green.line,
        borderCapStyle: "butt",
        pointRadius: 1,
        pointHoverRadius: 1,
        data: active_cases
      };

      var insertedDataSet = [];

      // filter through trigger to determine which data to show

      this.state.showTotalCases
        ? insertedDataSet.push(DataTotalCase)
        : console.log("Don't show total cases");

      this.state.showTotalDeaths
        ? insertedDataSet.push(DataTotalDeaths)
        : console.log("Don't show total deaths");

      this.state.showTotalRecovered
        ? insertedDataSet.push(DataTotalRecovered)
        : console.log("Don't show total recovered");

      this.state.showNewCases
        ? insertedDataSet.push(DataNewCases)
        : console.log("Don't show new cases");

      this.state.showNewDeaths
        ? insertedDataSet.push(DataNewDeaths)
        : console.log("Don't show new deaths");

      this.state.showSeriousCritical
        ? insertedDataSet.push(DataSeriousCritical)
        : console.log("Don't show serious critical");

      this.state.showActiveCases
        ? insertedDataSet.push(DataActiveCases)
        : console.log("Don't show active cases");

      var data = {
        labels: labels,
        datasets: insertedDataSet
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
    console.log(
      "The value of showTotalCases is : " + this.state.showTotalCases
    );
    console.log(
      "The value of showTotalDeaths is : " + this.state.showTotalDeaths
    );
    console.log(
      "The value of showTotalRecovered is : " + this.state.showTotalRecovered
    );
    console.log("The value of showNewCases is : " + this.state.showNewCases);
    console.log("The value of showNewDeath is : " + this.state.showNewDeaths);
    console.log(
      "The value of showSeriousCritical is : " + this.state.showSeriousCritical
    );
    console.log(
      "The value of showActiveCases is : " + this.state.showActiveCases
    );

    if (this.state.tagToggled) {
      this.generateChart();
      this.setState({ tagToggled: false });
    }

    if (this.state.prevSelectedCountry !== this.state.selectedCountry) {
      chartData = {};
      this.HistoryCaseByCountry(this.state.selectedCountry);
      console.log(selectedFlag);
      if (selectedFlag) {
        this.curCasesByCountry(this.state.selectedCountry);
        this.resetTags();
      }

      this.generateChart();
    }
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
          {/**********************  total cases block *************************/}
          <div className="country__curCases--totalCases country__curCases--block">
            <div className="country__curCases--totalCases--container country__curCases--block--container">
              <div className="country__curCases--totalCases--container-label country__curCases--block--container-label">
                Total Cases :
              </div>
              <div className="country__curCases--totalCases--container-data country__curCases--block--container-data">
                {this.state.selectedCurCases.total_cases}
              </div>
            </div>
            <div className="country__curCases--block--icon">
              <button
                className="country__curCases--block--icon--close"
                id="totalcases__close"
                onClick={() => {
                  console.log("Total Cases close button clicked");
                  // click on X button should hide itself and show +
                  document.getElementById("totalcases__plus").style.display =
                    "inline-block";
                  document.getElementById("totalcases__close").style.display =
                    "none";

                  document.getElementsByClassName(
                    "country__curCases--totalCases"
                  )[0].style.opacity = "0.4";
                  this.setState({ showTotalCases: false, tagToggled: true });
                }}
              >
                &#10006;
              </button>
              <button
                className="country__curCases--block--icon--plus"
                id="totalcases__plus"
                onClick={() => {
                  console.log("Total Cases Add button clicked");
                  // click on + should hide itself and show X
                  document.getElementById("totalcases__close").style.display =
                    "inline-block";
                  document.getElementById("totalcases__plus").style.display =
                    "none";

                  document.getElementsByClassName(
                    "country__curCases--totalCases"
                  )[0].style.opacity = "1";

                  this.setState({ showTotalCases: true, tagToggled: true });
                }}
              >
                &#43;
              </button>
            </div>
          </div>
          {/**********************  total deaths block *************************/}
          <div className="country__curCases--totalDeaths country__curCases--block">
            <div className="country__curCases--totalDeaths--container country__curCases--block--container">
              <div className="country__curCases--totalDeaths-label country__curCases--block--container-label">
                Total Deaths :
              </div>
              <div className="country__curCases--totalDeaths-data country__curCases--block--container-data">
                {this.state.selectedCurCases.total_deaths}
              </div>
            </div>
            <div className="country__curCases--block--icon">
              <button
                className="country__curCases--block--icon--close"
                id="totaldeaths__close"
                onClick={() => {
                  console.log("Total deaths close button clicked");

                  document.getElementById("totaldeaths__plus").style.display =
                    "inline-block";
                  document.getElementById("totaldeaths__close").style.display =
                    "none";

                  document.getElementsByClassName(
                    "country__curCases--totalDeaths"
                  )[0].style.opacity = "0.4";

                  this.setState({ showTotalDeaths: false, tagToggled: true });
                }}
              >
                &#10006;
              </button>

              <button
                className="country__curCases--block--icon--plus"
                id="totaldeaths__plus"
                onClick={() => {
                  console.log("Total deaths Add button clicked");
                  // click on + should hide itself and show X
                  document.getElementById("totaldeaths__close").style.display =
                    "inline-block";
                  document.getElementById("totaldeaths__plus").style.display =
                    "none";

                  document.getElementsByClassName(
                    "country__curCases--totalDeaths"
                  )[0].style.opacity = "1";

                  this.setState({ showTotalDeaths: true, tagToggled: true });
                }}
              >
                &#43;
              </button>
            </div>
          </div>
          {/**********************  total recovered block *************************/}
          <div className="country__curCases--totalRecovered country__curCases--block">
            <div className="country__curCases--totalRecovered--container country__curCases--block--container">
              <div className="country__curCases--totalRecovered-label country__curCases--block--container-label">
                Total Recovered :
              </div>
              <div className="country__curCases--totalRecovered-data country__curCases--block--container-data">
                {this.state.selectedCurCases.total_recovered}
              </div>
            </div>
            <div className="country__curCases--block--icon">
              <button
                className="country__curCases--block--icon--close"
                id="totalrecovered__close"
                onClick={() => {
                  console.log("Total Recovered close button clicked");

                  document.getElementById(
                    "totalrecovered__plus"
                  ).style.display = "inline-block";
                  document.getElementById(
                    "totalrecovered__close"
                  ).style.display = "none";

                  document.getElementsByClassName(
                    "country__curCases--totalRecovered"
                  )[0].style.opacity = "0.4";

                  this.setState({
                    showTotalRecovered: false,
                    tagToggled: true
                  });
                }}
              >
                &#10006;
              </button>

              <button
                className="country__curCases--block--icon--plus"
                id="totalrecovered__plus"
                onClick={() => {
                  console.log("Total recovered Add button clicked");
                  // click on + should hide itself and show X
                  document.getElementById(
                    "totalrecovered__close"
                  ).style.display = "inline-block";
                  document.getElementById(
                    "totalrecovered__plus"
                  ).style.display = "none";

                  document.getElementsByClassName(
                    "country__curCases--totalRecovered"
                  )[0].style.opacity = "1";

                  this.setState({
                    showTotalRecovered: true,
                    tagToggled: true
                  });
                }}
              >
                &#43;
              </button>
            </div>
          </div>
          {/**********************  new deaths block *************************/}
          <div className="country__curCases--newDeaths country__curCases--block">
            <div className="country__curCases--newDeaths--container country__curCases--block--container">
              <div className="country__curCases--newDeaths-label country__curCases--block--container-label">
                New Deaths :
              </div>
              <div className="country__curCases--newDeaths-data country__curCases--block--container-data">
                {this.state.selectedCurCases.new_deaths}
              </div>
            </div>
            <div className="country__curCases--block--icon">
              <button
                className="country__curCases--block--icon--close"
                id="newDeaths__close"
                onClick={() => {
                  console.log("New Deaths close button clicked");

                  document.getElementById("newDeaths__plus").style.display =
                    "inline-block";
                  document.getElementById("newDeaths__close").style.display =
                    "none";

                  document.getElementsByClassName(
                    "country__curCases--newDeaths"
                  )[0].style.opacity = "0.4";

                  this.setState({ showNewDeaths: false, tagToggled: true });
                }}
              >
                &#10006;
              </button>

              <button
                className="country__curCases--block--icon--plus"
                id="newDeaths__plus"
                onClick={() => {
                  console.log("New Deaths Add button clicked");
                  // click on + should hide itself and show X
                  document.getElementById("newDeaths__close").style.display =
                    "inline-block";
                  document.getElementById("newDeaths__plus").style.display =
                    "none";

                  document.getElementsByClassName(
                    "country__curCases--newDeaths"
                  )[0].style.opacity = "1";

                  this.setState({ showNewDeaths: true, tagToggled: true });
                }}
              >
                &#43;
              </button>
            </div>
          </div>
          {/**********************  new cases block *************************/}
          <div className="country__curCases--newCases country__curCases--block">
            <div className="country__curCases--newCases--container country__curCases--block--container">
              <div className="country__curCases--newCases-label country__curCases--block--container-label">
                New Cases :
              </div>
              <div className="country__curCases--newCases-data country__curCases--block--container-data">
                {this.state.selectedCurCases.new_cases}
              </div>
            </div>
            <div className="country__curCases--block--icon">
              <button
                className="country__curCases--block--icon--close"
                id="newCases__close"
                onClick={() => {
                  console.log("New Cases close button clicked");

                  document.getElementById("newCases__plus").style.display =
                    "inline-block";
                  document.getElementById("newCases__close").style.display =
                    "none";

                  document.getElementsByClassName(
                    "country__curCases--newCases"
                  )[0].style.opacity = "0.4";

                  this.setState({ showNewCases: false, tagToggled: true });
                }}
              >
                &#10006;
              </button>

              <button
                className="country__curCases--block--icon--plus"
                id="newCases__plus"
                onClick={() => {
                  console.log("New Cases Add button clicked");
                  // click on + should hide itself and show X
                  document.getElementById("newCases__close").style.display =
                    "inline-block";
                  document.getElementById("newCases__plus").style.display =
                    "none";

                  document.getElementsByClassName(
                    "country__curCases--newCases"
                  )[0].style.opacity = "1";

                  this.setState({ showNewCases: true, tagToggled: true });
                }}
              >
                &#43;
              </button>
            </div>
          </div>
          {/**********************  serious critical block *************************/}
          <div className="country__curCases--seriousCritical country__curCases--block">
            <div className="country__curCases--seriousCritical--container country__curCases--block--container">
              <div className="country__curCases--seriousCritical-label country__curCases--block--container-label">
                Serious Critical :
              </div>
              <div className="country__curCases--seriousCritical-data country__curCases--block--container-data">
                {this.state.selectedCurCases.serious_critical}
              </div>
            </div>
            <div className="country__curCases--block--icon">
              <button
                className="country__curCases--block--icon--close"
                id="seriousCritical__close"
                onClick={() => {
                  console.log("Serious Critical close button clicked");

                  document.getElementById(
                    "seriousCritical__plus"
                  ).style.display = "inline-block";
                  document.getElementById(
                    "seriousCritical__close"
                  ).style.display = "none";

                  document.getElementsByClassName(
                    "country__curCases--seriousCritical"
                  )[0].style.opacity = "0.4";

                  this.setState({
                    showSeriousCritical: false,
                    tagToggled: true
                  });
                }}
              >
                &#10006;
              </button>

              <button
                className="country__curCases--block--icon--plus"
                id="seriousCritical__plus"
                onClick={() => {
                  console.log("Serious Critical Add button clicked");
                  // click on + should hide itself and show X
                  document.getElementById(
                    "seriousCritical__close"
                  ).style.display = "inline-block";
                  document.getElementById(
                    "seriousCritical__plus"
                  ).style.display = "none";

                  document.getElementsByClassName(
                    "country__curCases--seriousCritical"
                  )[0].style.opacity = "1";

                  this.setState({
                    showSeriousCritical: true,
                    tagToggled: true
                  });
                }}
              >
                &#43;
              </button>
            </div>
          </div>
          {/**********************  active cases block *************************/}
          <div className="country__curCases--activeCases country__curCases--block">
            <div className="country__curCases--activeCases--container country__curCases--block--container">
              <div className="country__curCases--activeCases-label country__curCases--block--container-label">
                Active Cases :
              </div>
              <div className="country__curCases--activeCases-data country__curCases--block--container-data">
                {this.state.selectedCurCases.active_cases}
              </div>
            </div>
            <div className="country__curCases--block--icon">
              <button
                className="country__curCases--block--icon--close"
                id="activeCases__close"
                onClick={() => {
                  console.log("Active Cases close button clicked");
                  document.getElementById("activeCases__plus").style.display =
                    "inline-block";
                  document.getElementById("activeCases__close").style.display =
                    "none";

                  document.getElementsByClassName(
                    "country__curCases--activeCases"
                  )[0].style.opacity = "0.4";

                  this.setState({ showActiveCases: false, tagToggled: true });
                }}
              >
                &#10006;
              </button>

              <button
                className="country__curCases--block--icon--plus"
                id="activeCases__plus"
                onClick={() => {
                  console.log("Active Cases Add button clicked");
                  // click on + should hide itself and show X
                  document.getElementById("activeCases__close").style.display =
                    "inline-block";
                  document.getElementById("activeCases__plus").style.display =
                    "none";

                  document.getElementsByClassName(
                    "country__curCases--activeCases"
                  )[0].style.opacity = "1";

                  this.setState({ showActiveCases: true, tagToggled: true });
                }}
              >
                &#43;
              </button>
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
