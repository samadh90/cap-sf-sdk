# @cap-sf-sdk/core

> Complete SuccessFactors SDK for SAP Cloud Application Programming Model.

The meta-package that provides access to all CAP SuccessFactors SDK tools in one convenient install.

## 🚀 Quick Start

```bash
npm install @cap-sf-sdk/core
```

## 📦 What's Included

This package re-exports all SDK modules:

- **[@cap-sf-sdk/odata-transformer](../odata-transformer)** - Transform CAP CQN queries to OData v2 query strings
- **[@cap-sf-sdk/sf-normalizer](../sf-normalizer)** - Normalize SuccessFactors responses and serialize requests

## 🧩 Complete Usage Example

```typescript
import { cqnToOData, normalizeSFResponse, serializeSFRequest } from '@cap-sf-sdk/core'

// Example CAP service using the complete SDK
export class EmployeeService extends cds.ApplicationService {
  async init() {
    // READ operations
    this.on('READ', 'Employees', async (req) => {
      // 1. Transform CAP query to OData
      const odataQuery = cqnToOData(req.query)
      console.log('Generated OData query:', odataQuery)

      // 2. Fetch from SuccessFactors
      const response = await fetch(`${SF_BASE_URL}/PerPerson?${odataQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const rawData = await response.json()

      // 3. Normalize the response
      const employees = normalizeSFResponse(rawData)

      return employees
    })

    // CREATE/UPDATE operations
    this.on(['CREATE', 'UPDATE'], 'Employees', async (req) => {
      // 1. Serialize for SuccessFactors
      const sfPayload = serializeSFRequest(req.data)

      // 2. Send to SuccessFactors
      const response = await fetch(`${SF_BASE_URL}/PerPerson`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sfPayload),
      })

      const result = await response.json()

      // 3. Return normalized result
      return normalizeSFResponse(result)
    })

    await super.init()
  }
}
```

## 🎯 Why Use the Complete SDK?

### Single Installation

```bash
# Instead of installing each package separately:
npm install @cap-sf-sdk/odata-transformer
npm install @cap-sf-sdk/sf-normalizer

# Install everything at once:
npm install @cap-sf-sdk/core
```

### Unified Imports

```typescript
// Single import for all SDK functionality
import { cqnToOData, normalizeSFResponse, serializeSFRequest } from '@cap-sf-sdk/core'

// Instead of multiple imports:
import { cqnToOData } from '@cap-sf-sdk/odata-transformer'
import { normalizeSFResponse, serializeSFRequest } from '@cap-sf-sdk/sf-normalizer'
```

### Version Consistency

The meta-package ensures all SDK modules work together with compatible versions.

## 📋 Available Exports

### Query Transformation

```typescript
import { cqnToOData } from '@cap-sf-sdk/core'

// Transform CAP CQN to OData query string
const query = cqnToOData(req.query)
```

### Response Normalization

```typescript
import { normalizeSFResponse } from '@cap-sf-sdk/core'

// Clean up SuccessFactors responses
const cleaned = normalizeSFResponse(rawSFResponse)
```

### Request Serialization

```typescript
import { serializeSFRequest } from '@cap-sf-sdk/core'

// Prepare data for SuccessFactors APIs
const payload = serializeSFRequest(jsObject)
```

### Utility Functions

```typescript
import { utils } from '@cap-sf-sdk/core'

// Access utility functions from both packages
const date = utils.parseSapDate('/Date(123456)/')
const normalized = utils.normalizeObject(obj)
```

## 🏗️ Architecture

This package follows the meta-package pattern, re-exporting functionality from:

```
@cap-sf-sdk/core
├── @cap-sf-sdk/odata-transformer
│   ├── cqnToOData
│   └── builders & parsers
└── @cap-sf-sdk/sf-normalizer
    ├── normalizeSFResponse
    ├── serializeSFRequest
    └── utilities
```

## 🔗 Individual Packages

If you only need specific functionality, you can install packages individually:

- **[@cap-sf-sdk/odata-transformer](../odata-transformer)** - Only query transformation
- **[@cap-sf-sdk/sf-normalizer](../sf-normalizer)** - Only response/request processing

## 🧪 Testing

```bash
# Run all SDK tests
npm test

# Run specific package tests
npm run test:odata-transformer
npm run test:sf-normalizer
```

## 📚 Documentation

- [Complete SDK Documentation](../../README.md)
- [OData Transformer Guide](../odata-transformer/README.md)
- [SF Normalizer Guide](../sf-normalizer/README.md)

## 🤝 Contributing

See the [main repository](../../README.md#contributing) for contribution guidelines.

## 📄 License

MIT - see [LICENSE](../../LICENSE) for details.
