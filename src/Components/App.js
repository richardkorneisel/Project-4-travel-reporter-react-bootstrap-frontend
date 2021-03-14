import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header/Header';
import Homepage from './Homepage/Homepage';
import CreateTrip from './CreateTrip/CreateTrip';
import TripGallery from './TripGallery/TripGallery';
import Instructions from './Instructions/Instructions';
import TripDetail from './TripDetail/TripDetail';
const apiUrl = 'http://localhost:3000/api/travels'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      travels: [],
      trip: []
    }
  }

  componentDidMount = () => {
    axios.get(apiUrl, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        this.setState({
          travels: response.data.travels
        })
      })
  }

  createTrip = (e) => {
    e.preventDefault();
    let tempArray = []
    axios.post(`${apiUrl}`, {
      title: e.target.title.value,
      image_url: e.target.image_url.value,
      map_url: e.target.map_url.value,
      trip_report: e.target.trip_report.value,

    })

      .then((response) => {
              console.log(response);
              let tempArray = this.state.travels;
              tempArray.push(response.data.travels);
              this.setState({
                travels: tempArray,
               });
            });
            console.log(this.state.data)
        };
    
  

    render() {
      console.log(this.state)
      return (
        <body>
          <div>
            <header>
              <Header />
            </header>

            <Switch>
              <Route exact path='/' render={(routerProps) =>
                <Homepage {...this.state} {...routerProps} />
              }>
              </Route>
              <Route path="/CreateTrip" component={() => (
                <CreateTrip
                  travels={this.state.travels}
                  createTrip={this.createTrip}
                />
              )} ></Route>

              <Route path='/TripGallery' render={(routerProps) => <TripGallery {...this.state}{...routerProps} />
              }>
              </Route>

              <Route path="/Instructions" component={Instructions} ></Route>

              <Route path="/TripDetail/:id" render={(routerProps) => <TripDetail {...this.state}{...routerProps} />
              }></Route>

            </Switch>
          </div>
        </body>
      );
    }
  }

  export default App;
