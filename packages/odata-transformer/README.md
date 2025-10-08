# @cap-sf-sdk/odata-transformer

> Transform SAP CAP CQN queries into OData v2 query strings for SuccessFactors integration.

Part of the [CAP SuccessFactors SDK](../../README.md) monorepo.

## 🚀 Installation

```bash
# Install this package individually
npm install @cap-sf-sdk/odata-transformer

# Or install the complete SDK
npm install @cap-sf-sdk/core
```

## 📖 Overview

The OData Transformer converts SAP CAP CQN (Common Query Notation) objects into OData v2 query strings, making it easy to integrate CAP services with SuccessFactors APIs.

### Supported OData Parameters

- `$select` (from CQN columns)
- `$filter` (from CQN where conditions)
- `$orderby` (from CQN orderBy)
- `$top` / `$skip` (from CQN limit)
- `$expand` (from CQN columns with expand)
- SuccessFactors date parameters: `fromDate`, `toDate`, `asOfDate`

## 🧩 Usage

### Basic Usage

```typescript
import { cqnToOData } from '@cap-sf-sdk/odata-transformer'

// In your CAP service handler
this.on('READ', 'Employees', async (req) => {
  const odataQuery = cqnToOData(req.query, {
    fromDate: '2024-01-01',
    toDate: '2024-12-31',
  })

  console.log(odataQuery)
  // Result: $format=json&$select=externalCode,startDate&$filter=status eq 'A'&fromDate=2024-01-01&toDate=2024-12-31

  // Use with SuccessFactors API
  const response = await fetch(`https://api.successfactors.com/odata/v2/PerPerson?${odataQuery}`)
})
```

### Advanced Examples

```typescript
// Complex query with joins and filters
const complexQuery = {
  columns: [
    { ref: ['externalCode'] },
    { ref: ['startDate'] },
    { ref: ['companyNav'], expand: ['code', 'name'] },
  ],
  where: [
    'and',
    [{ ref: ['status'] }, '=', { val: 'A' }],
    [{ ref: ['startDate'] }, '>=', { val: '2024-01-01' }],
  ],
  orderBy: [{ ref: ['startDate'], sort: 'desc' }],
  limit: { rows: { val: 100 }, offset: { val: 0 } },
}

const queryString = cqnToOData(complexQuery, { asOfDate: '2024-06-01' })
// Result: $format=json&$select=externalCode,startDate,companyNav($select=code,name)&$filter=status eq 'A' and startDate ge '2024-01-01'&$orderby=startDate desc&$top=100&$skip=0&asOfDate=2024-06-01
```

## 📅 SuccessFactors Date Parameters

The transformer supports SuccessFactors-specific date parameters with intelligent logic:

### Date Parameter Rules

- **`asOfDate` is exclusive**: If provided, `fromDate` and `toDate` are ignored
- **`fromDate` and `toDate`** can be used individually or together

```typescript
// asOfDate takes precedence
cqnToOData(
  { columns: [{ ref: ['id'] }] },
  {
    asOfDate: '2024-06-01',
    fromDate: '2024-01-01', // Ignored
    toDate: '2024-12-31', // Ignored
  }
)
// → ...&asOfDate=2024-06-01

// fromDate only
cqnToOData(query, { fromDate: '2024-02-01' })
// → ...&fromDate=2024-02-01

// toDate only
cqnToOData(query, { toDate: '2024-03-01' })
// → ...&toDate=2024-03-01

// Both fromDate and toDate
cqnToOData(query, { fromDate: '2024-01-01', toDate: '2024-12-31' })
// → ...&fromDate=2024-01-01&toDate=2024-12-31
```

## 🔧 API Reference

### `cqnToOData(cqn, options?)`

Converts a CAP CQN query to an OData v2 query string.

**Parameters:**

- `cqn: CqnSelect` - The CAP CQN query object
- `options?: ODataOptions` - Optional SuccessFactors parameters

**Returns:** `string` - The OData query string

**Types:**

```typescript
interface ODataOptions {
  fromDate?: string // YYYY-MM-DD format
  toDate?: string // YYYY-MM-DD format
  asOfDate?: string // YYYY-MM-DD format (exclusive)
}

interface CqnSelect {
  columns?: Column[]
  where?: Condition[]
  orderBy?: OrderBy[]
  limit?: { rows?: { val: number }; offset?: { val: number } }
}
```

## 🏗️ Project Structure

```
src/
├── index.ts              # Main entry point & cqnToOData function
├── types.ts              # TypeScript type definitions
├── builders/             # Query string builders
│   └── buildQueryString.ts
├── parsers/              # CQN to OData parsers
│   ├── select.ts         # $select parameter
│   ├── filter.ts         # $filter parameter
│   ├── orderby.ts        # $orderby parameter
│   ├── limit.ts          # $top/$skip parameters
│   └── expand.ts         # $expand parameter
└── utils/                # Utility functions
    └── encode.ts         # URL encoding helpers
```

## 🧪 Testing

```bash
# Run tests for this package
npm test

# Run tests from package directory
cd packages/odata-transformer
npm test

# Coverage report
npm run test:coverage
```

## 📚 Related Packages

- [`@cap-sf-sdk/sf-normalizer`](../sf-normalizer) - Normalize SuccessFactors responses
- [`@cap-sf-sdk/core`](../core) - Complete SDK with all packages

## 🤝 Contributing

See the [main repository](../../README.md#contributing) for contribution guidelines.

## 📄 License

MIT - see [LICENSE](../../LICENSE) for details.

Generated API reference is available locally after running the docs task. It uses TypeDoc to extract JSDoc from the TypeScript source.

Generate docs:

```powershell
npm run docs
```

This produces static HTML in the `docs/` directory. Open `docs/index.html` in a browser.
