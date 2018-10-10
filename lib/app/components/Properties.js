import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import { Property } from './';

export class PropertiesList extends Component {
  renderSortKey() {
    const { sortKey, updateSortKey } = this.props;

    return (
      <div className="sort-key">
        <label htmlFor="sortId" className="sort-label">Sort by Id:
          <input
            type="radio"
            id="sortId"
            name="sortKey"
            value="id"
            checked={sortKey === 'id'}
            className="sort-input"
            onChange={updateSortKey}
          />
        </label>

        <label htmlFor="sortAddress" className="sort-label">Sort by address:
          <input
            type="radio"
            id="sortAddress"
            name="sortKey"
            value="address"
            checked={sortKey === 'address'}
            className="sort-input"
            onChange={updateSortKey}
          />
        </label>
      </div>
    );
  }

  renderSortOrder() {
    const { sortOrder, updateSortOrder } = this.props;

    return (
      <div className="sort-order">
        <label htmlFor="sortOrder" className="sort-label">Sort Order:
          <select id="sortOrder" className="sort-input" onChange={updateSortOrder} value={sortOrder}>
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
        </label>
      </div>
    );
  }

  render() {
    const { viewer } = this.props;
    return (
      <div className="properties">
        {this.renderSortKey()}
        {this.renderSortOrder()}
        <ul className="properties-list">
          {viewer.properties.map((p) => {
            const { __dataID__: id } = p;
            return <Property key={id} property={p} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(PropertiesList, {
  initialVariables: {
    sortKey: null,
    sortOrder: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        properties(sortKey: $sortKey, sortOrder: $sortOrder) {
          ${Property.getFragment('property')}
        }
      }
    `,
  },
});

PropertiesList.propTypes = {
  sortKey: PropTypes.oneOf(['address', 'id']).isRequired,
  sortOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
  updateSortKey: PropTypes.func.isRequired,
  updateSortOrder: PropTypes.func.isRequired,
  viewer: PropTypes.object.isRequired,
};
