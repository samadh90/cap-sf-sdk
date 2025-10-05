# CAP SuccessFactors SDK

> Lightweight SDK / toolkit for SAP CAP ↔ SuccessFactors OData v2 integration.

A comprehensive TypeScript monorepo providing utilities for seamless integration between SAP Cloud Application Programming Model (CAP) and SuccessFactors OData v2 APIs.

## 📦 Packages

This monorepo contains three specialized packages:

| Package                                                         | Description                                                      | Version                                                            |
| --------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| [`@cap-sf-sdk/odata-transformer`](./packages/odata-transformer) | Transform CAP CQN queries into OData v2 query strings            | ![npm](https://img.shields.io/npm/v/@cap-sf-sdk/odata-transformer) |
| [`@cap-sf-sdk/sf-normalizer`](./packages/sf-normalizer)         | Normalize SuccessFactors responses into clean JavaScript objects | ![npm](https://img.shields.io/npm/v/@cap-sf-sdk/sf-normalizer)     |
| [`@cap-sf-sdk/core`](./packages/sdk)                            | Meta-package that exports all SDK modules                        | ![npm](https://img.shields.io/npm/v/@cap-sf-sdk/core)              |

## 🚀 Quick Start

### Install the complete SDK

```bash
npm install @cap-sf-sdk/core
```

### Or install individual packages

```bash
npm install @cap-sf-sdk/odata-transformer @cap-sf-sdk/sf-normalizer
```

## 🧩 Usage Examples

### Basic Usage with Complete SDK

```typescript
import { cqnToOData, normalizeSFResponse, serializeSFRequest } from '@cap-sf-sdk/core'

// In your CAP service
this.on('READ', 'Employees', async (req) => {
  // 1. Transform CAP query to OData
  const odataQuery = cqnToOData(req.query, {
    fromDate: '2024-01-01',
    toDate: '2024-12-31',
  })

  // 2. Make request to SuccessFactors
  const sfResponse = await fetch(`https://api.successfactors.com/odata/v2/PerPerson?${odataQuery}`)
  const rawData = await sfResponse.json()

  // 3. Normalize the response
  const normalizedData = normalizeSFResponse(rawData)

  return normalizedData
})

// For POST/PATCH requests
this.on(['CREATE', 'UPDATE'], 'Employees', async (req) => {
  // Serialize payload for SuccessFactors
  const sfPayload = serializeSFRequest(req.data)

  // Send to SuccessFactors API
  // ...
})
```

### Individual Package Usage

```typescript
// OData Transformer only
import { cqnToOData } from '@cap-sf-sdk/odata-transformer'

const queryString = cqnToOData(
  {
    columns: [{ ref: ['externalCode'] }, { ref: ['startDate'] }],
    where: [{ ref: ['status'] }, '=', { val: 'A' }]
  },
  { fromDate: '2024-01-01' }
)
// Result: $format=json&$select=externalCode,startDate&$filter=status eq 'A'&fromDate=2024-01-01

// SF Normalizer only
import { normalizeSFResponse } from '@cap-sf-sdk/sf-normalizer'

const normalized = normalizeSFResponse({
  d: {
    results: [
      { id: '123', startDate: '/Date(1704067200000)/', __metadata: { ... } }
    ]
  }
})
// Result: [{ id: '123', startDate: Date(2024-01-01) }]
```

## 🏗️ Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/samadh90/cap-sf-sdk.git
cd cap-sf-sdk

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Generate documentation
npm run docs
```

### Monorepo Scripts

| Script                  | Description                    |
| ----------------------- | ------------------------------ |
| `npm run build`         | Build all packages             |
| `npm run test`          | Run all tests                  |
| `npm run test:watch`    | Run tests in watch mode        |
| `npm run test:coverage` | Generate test coverage         |
| `npm run clean`         | Clean all build outputs        |
| `npm run docs`          | Generate TypeDoc documentation |
| `npm run format`        | Format code with Prettier      |
| `npm run check:format`  | Check code formatting          |

### Package-Specific Scripts

Each package supports these commands:

```bash
cd packages/<package-name>
npm run build    # Build this package
npm run test     # Test this package
npm run clean    # Clean this package
npm run docs     # Generate docs (for all packages)
```

## 🧪 Testing

The project uses Jest with comprehensive test coverage:

```bash
# Run all tests
npm test

# Test specific packages
npm run test:odata-transformer
npm run test:sf-normalizer
npm run test:sdk

# Coverage report
npm run test:coverage
```

## 📚 Documentation

- **API Documentation**: Generated automatically with TypeDoc
- **Package READMEs**: Each package has detailed usage examples
- **Type Definitions**: Full TypeScript support with exported types

Generate and view documentation:

```bash
npm run docs
# Open ./docs/index.html
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Format your code: `npm run format`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Samad & Soultan Hatsijev**

## 🏷️ Keywords

`sap`, `cap`, `successfactors`, `odata`, `typescript`, `monorepo`, `sdk`, `transform`, `normalize`
