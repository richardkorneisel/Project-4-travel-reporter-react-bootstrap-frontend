import React, { Component } from 'react';
import './EditTrip.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import TripDetails from '../TripDetail/TripDetail';
import TripGallery from '../TripGallery/TripGallery';

export default class EditTrip extends Component {



    render() {
        console.log(this.props)
        let details = this.props.travels
        let tripId = this.props.match.params.id

        console.log(details)
        let trip = details.find(trip => tripId == trip.id)

        if (this.props.editMade){
            this.props.resetEditMade()
             return <Redirect to = "/TripGallery"/>
      
           }

        return (
            <div>
                <h1>Edit Trip</h1>

                <form onSubmit={(e)=>this.props.editTrip(e, trip.id)} >
                    Trip Title: <input type="text" name="title" defaultValue={trip.title} /> <br />
                    Image URL: <input type="text" name="image_url" defaultValue={trip.image_url} /><br />
                    Map URL :<input type="text" name="map_url" defaultValue={trip.map_url} /><br />
                    Trip Report:<input type="text" name="trip_report" defaultValue={trip.trip_report} /><br />
                    <input type="submit" value="Save Changes" /><br />

                </form>

                <ul>{this.props.travels.travels}</ul>



            </div>

        );

    }
}