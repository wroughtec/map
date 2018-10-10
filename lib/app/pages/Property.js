import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import { MapLocation } from '../components/MapLocation';

export function PropertyPage({ relay, viewer }) {
  const API_KEY = 'AIzaSyAGzTh4hqOcVxQLwM6ngg9j7bpskfk0QY8';
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
  if (!viewer.property) {
    return (
      <div>
        <h3>this property ({relay.variables.propertyID}) was not found</h3>
      </div>
    );
  }

  return (
    <div>
      <h3>property: {viewer.property.address}</h3>
      <MapLocation
        googleMapURL={googleMapURL}
        containerElement={<div className="map-container" />}
        mapElement={<div className="map-element" />}
        viewer={viewer}
      />
    </div>
  );
}

export default Relay.createContainer(PropertyPage, {
  initialVariables: {
    propertyID: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        property(propertyID: $propertyID) {
          address
          location {
            lat
            lng
          }
        }
      }
    `,
  },
});

PropertyPage.propTypes = {
  relay: PropTypes.object.isRequired,
  viewer: PropTypes.object.isRequired,
};
