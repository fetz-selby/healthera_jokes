import React, { Component } from 'react';
import {connect} from 'react-redux';
import './location.css';

class LocationContainer extends Component {

    onLocationMarkerClickedHandler=(id)=>{
        // this.props.markerSelected(id);
        // this.props.isLocationUpdate();
        // this.props.showRightSideBar();
    }

    render() {
        // const {locations, keys} = this.props;
        return <div className='map-container'>
                
            </div>
    }
}

const mapStateToProps = state =>{
    return {
        // isLoading: state.locations.sLoading,
        // locations: state.locations.locations,
        // keys: state.app.keys
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        // loadLocations : () => dispatch(locationActions.fetchLocations()),
        // searchLocation : (val) => dispatch(locationActions.searchLocation(val)),
        // markerSelected : (id)=>dispatch(locationActions.widgetSelectedLocation(id)),
        // showRightSideBar:() => dispatch(appActions.showRightSideBar()),
        // isLocationUpdate:()=>dispatch(appActions.isLocationUpdate())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer);
