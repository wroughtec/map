import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';

export function PropertyPage({ relay, viewer }) {
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
        }
      }
    `,
  },
});

PropertyPage.propTypes = {
  relay: PropTypes.object.isRequired,
  viewer: PropTypes.object.isRequired,
};
