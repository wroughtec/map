const simpleSort = ({ properties, sortKey = 'address', sortOrder = 'asc' }) => properties.sort((a, b) => {
  let primary = a[sortKey];
  let secondary = b[sortKey];

  if (sortOrder === 'desc') {
    primary = b[sortKey];
    secondary = a[sortKey];
  }

  return primary.localeCompare(secondary, undefined, { numeric: true });
});

export default simpleSort;
