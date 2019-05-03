Given a resource descriptor with inlined data and filter spec, create a new resource descriptor with inlined filtered data.

## Usage

Install:

```
yarn add <git-repo>
```

Example:

```javascript
const { filterData } = require('data-resource-filter')

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
    },
    {
      name: 'product',
      values: ['aFRR_UpActivated'],
      operator: '='
    }
  ]
}

const filteredDescriptor = filterData(descriptor, spec)
console.log(filteredDescriptor.data)
// Output: [{timestamp: '2019-04-28T21:00:00+00:00', product: 'aFRR_UpActivated', price: '334.46'}]
```

## Tests

First, install dev dependancies:

```bash
yarn install
# or with npm
npm install
```

Run once:

```bash
npx ava
# or with npm script:
npm test
```

Watch mode:

```bash
npx ava --watch
```
