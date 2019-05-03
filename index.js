var alasql = require('alasql')

// Given a resource descriptor with inlined data and spec, create
// a new resource descriptor with inlined filtered data:
function filterData(descriptor, spec) {
  let sqlStatement = `SELECT * FROM ?`
  spec.filters.forEach((filter, index) => {
    // Wrap values with single quotes for SQL statement:
    const filterValues = filter.values.map(value => "'" + value + "'")
    // Create where clauses:
    let whereClause = ''
    if (filter.operator === '=') {
      whereClause = `${filter.name} IN (${filterValues.join(', ')})`
    } else {
      // We assume it is date for now:
      whereClause = `${filter.name} ${filter.operator} ${filterValues.join(', ')}`
    }
    if (index === 0) {
      sqlStatement += ` WHERE ${whereClause}`
    } else {
      sqlStatement += ` AND ${whereClause}`
    }
  })
  // Filter it:
  const filteredData = alasql(sqlStatement, [descriptor.data])
  // Currently we don't modify schema as not needed right now:
  const newDescriptor = JSON.parse(JSON.stringify(descriptor))
  newDescriptor.data = filteredData
  return newDescriptor
}

module.exports = {
  filterData
}
