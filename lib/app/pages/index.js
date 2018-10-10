import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import { Properties } from '../components';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    const { relay } = props;

    this.state = {
      sortOrder: relay.variables.sortOrder,
      sortKey: relay.variables.sortKey,
    };
  }

  updateSortKey = () => {
    const { relay } = this.props;
    const { sortKey } = this.state;

    relay.setVariables(Object.assign({}, relay.variables, { sortKey }));
  }

  updateSortOrder = () => {
    const { relay } = this.props;
    const { sortOrder } = this.state;

    relay.setVariables(Object.assign({}, relay.variables, { sortOrder }));
  }

  handleSortKey = (event) => {
    this.setState({
      sortKey: event.target.value,
    }, this.updateSortKey,
    );
  };

  handleSortOrder = (event) => {
    this.setState({
      sortOrder: event.target.value,
    }, this.updateSortOrder,
    );
  };

  render() {
    const { relay, viewer } = this.props;

    return (
      <Properties
        sortKey={relay.variables.sortKey}
        updateSortKey={this.handleSortKey}
        sortOrder={relay.variables.sortOrder}
        updateSortOrder={this.handleSortOrder}
        viewer={viewer}
      />
    );
  }
}

export default Relay.createContainer(IndexPage, {
  initialVariables: {
    sortKey: 'address',
    sortOrder: 'asc',
  },
  fragments: {
    viewer: ({ sortKey, sortOrder }) => Relay.QL`
      fragment on Viewer {
        ${Properties.getFragment('viewer', { sortKey, sortOrder })}
      }
    `,
  },
});

IndexPage.propTypes = {
  relay: PropTypes.object.isRequired,
  viewer: PropTypes.object.isRequired,
};
