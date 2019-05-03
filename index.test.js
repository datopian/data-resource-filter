import test from 'ava'
const { filterData } = require('./index.js')

const descriptor = {
  name: 'my-resource',
  schema: {
    fields: [
      {
        name: 'timestamp',
        type: 'date'
      },
      {
        name: 'product',
        type: 'string'
      },
      {
        name: 'price',
        type: 'number'
      }
    ]
  },
  data: [
    {timestamp: '2019-04-26T21:00:00+00:00', product: 'Elspot', price: '279.97'},
    {timestamp: '2019-04-27T21:00:00+00:00', product: 'aFRR_DownActivated', price: '123.18'},
    {timestamp: '2019-04-28T21:00:00+00:00', product: 'aFRR_UpActivated', price: '334.46'},
    {timestamp: '2019-04-29T21:00:00+00:00', product: 'Elspot', price: '313.34'},
    {timestamp: '2019-04-30T21:00:00+00:00', product: 'aFRR_DownActivated', price: '176.93'}
  ]
}

test('it filters the data', t => {
  const spec = {
    filters: [
      {
        name: 'product',
        values: ['Elspot', 'aFRR_UpActivated'],
        operator: '='
      }
    ]
  }
	const filteredDescriptor = filterData(descriptor, spec)
	t.is(filteredDescriptor.data.length, 3)
})

test('it filters by date range', t => {
  const spec = {
    filters: [
      {
        name: 'timestamp',
        values: ['2019-04-28T21:00:00+00:00'],
        operator: '>='
      },
      {
        name: 'timestamp',
        values: ['2019-04-29T21:00:00+00:00'],
        operator: '<='
      }
    ]
  }
	const filteredDescriptor = filterData(descriptor, spec)
	t.is(filteredDescriptor.data.length, 2)
})
