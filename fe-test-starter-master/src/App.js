import React, { Component } from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import farm from "./data/farm2.json";
import crops from "./data/crops.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      farm: {},
      crops: {},
      currentCrop: {},
      currentField: {},
      yieldPotential: "",
      isFetchingCrops: true,
      isFetchingFarm: true,
      error: false
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchFarm = () =>
    fetch(`https://private-bf7f31-hummingbirdsimple.apiary-mock.com/farm`);

  fetchCrops = () =>
    fetch(`https://private-bf7f31-hummingbirdsimple.apiary-mock.com/crops`);

  fetchData = () => {
    this.fetchFarm()
      .then(data => data.json())
      .then(data => {
        this.setState({ farm: data, isFetchingFarm: false });
      })
      .catch(error => {
        console.log(error);
      });

    this.fetchCrops()
      .then(data => data.json())
      .then(data => {
        this.setState({ crops: data, isFetchingCrops: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCropClick = crop => {
    this.setState({
      currentCrop: crop
    });
    console.log(this.state);
  };

  handleFieldClick = field => {
    if (!this.state.currentCrop.hasOwnProperty("name")) {
      this.setState({ error: true });
      return;
    }

    this.setState({ currentField: field });

    const potentialYield = this.calculateYieldPotential(field);
    this.setState({ yieldPotential: potentialYield, error: false });
  };

  handleRemoveCrop = () => this.setState({ currentCrop: {} });

  calculateYieldPotential = field => {
    const potentialYield =
      this.state.currentCrop.expected_yield *
      field.hectares /
      (this.state.currentCrop.disease_risk_factor *
        field.disease_susceptibility) *
      this.state.currentCrop.price_per_tonne;

    return potentialYield;
  };

  render() {
    return (
      <section className="dashboard">
        <header className="heading_dashboard">
          <h1>Farm Manager Dashboard</h1>

          {!this.state.isFetchingCrops && !this.state.isFetchingFarm ? (
            <p>
              Welcome to the farm manager dashboard. Select a crop below to add
              to field.
            </p>
          ) : (
            <p>Loading Data. Please Wait</p>
          )}
        </header>
        {this.state.error ? (
          <p className="error">Please select a crop first.</p>
        ) : null}

        {/* {!this.state.isFetchingCrops && !this.state.isFetchingFarm ? ( */}
        <section>
          <Map className="map" center={farm.centre.coordinates} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {farm.fields.map(field => (
              <GeoJSON
                color={
                  this.state.currentField.name === field.name ? "green" : "blue"
                }
                key={field.name}
                data={field.boundary}
                onClick={() => this.handleFieldClick(field)}
              />
            ))}
          </Map>
          <section className="content">
            <header className="heading_yield">
              {this.state.currentCrop.name ? (
                <button onClick={this.handleRemoveCrop}>
                  Remove: {this.state.currentCrop.name}
                </button>
              ) : null}
            </header>
            <section className="nav">
              <ul className="list_crops">
                <h2>Crops</h2>
                {crops.map(crop => (
                  <li className="list-item_crops" key={crop.name}>
                    <a onClick={() => this.handleCropClick(crop)}>
                      {crop.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="yield-details">
              <div>
                <div>
                  <strong>Yield Potential: </strong>
                  <p>{this.state.yieldPotential}</p>
                </div>
                <h3>Yield Configuration</h3>
                <p>
                  <strong>Crop Yield Average: </strong>
                  {this.state.currentCrop.expected_yield}
                </p>
                <p>
                  <strong>Hectares of field: </strong>
                  {this.state.currentField.hectares}
                </p>
                <p>
                  <strong>Crop Risk Factor: </strong>
                  {this.state.currentCrop.disease_risk_factor}
                </p>
                <p>
                  <strong>Field Disease Susceptibility: </strong>
                  {this.state.currentField.disease_susceptibility}
                </p>
                <p>
                  <strong>Price per tonne: </strong>
                  {this.state.currentCrop.price_per_tonne}
                </p>
              </div>
            </section>
          </section>
        </section>
        {/* ) : null} */}
      </section>
    );
  }
}

export default App;
