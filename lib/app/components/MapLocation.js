import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Relay from 'react-relay';
import { PropertyPage } from '../pages/Property';

export const MapLocation = withGoogleMap(({ viewer }) => {
  const { property } = viewer;
  const { location: {
    lat,
    lng,
  } } = property;

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
    >
      <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
    </GoogleMap>
  );
});

export default Relay.createContainer(MapLocation, {
  initialVariables: {
    propertyID: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        property(propertyID: $propertyID) {
          ${PropertyPage.getFragment('property')}
        }
      }`,
  },
});

MapLocation.propTypes = {
  viewer: PropTypes.object.isRequired,
};
