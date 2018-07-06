import { sortBy } from 'lodash';

const simpleSort = ({ properties, sortKey = 'address', sortOrder = 'asc' }) => {
  console.log(sortOrder);
  return sortBy(properties, p => p[sortKey]);
};

export default simpleSort;
