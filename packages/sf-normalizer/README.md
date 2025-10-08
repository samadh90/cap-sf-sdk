# @cap-sf-sdk/sf-normalizer

> Normalize SuccessFactors OData v2 JSON responses into clean JavaScript objects.

Part of the [CAP SuccessFactors SDK](../../README.md) monorepo.

## 🚀 Installation

```bash
# Install this package individually
npm install @cap-sf-sdk/sf-normalizer

# Or install the complete SDK
npm install @cap-sf-sdk/core
```

## 📖 Overview

The SF Normalizer handles the complexities of SuccessFactors OData v2 responses, converting them into clean, usable JavaScript objects. It automatically handles:

- **Response unwrapping**: Removes OData `d` and `d.results` wrappers
- **Date parsing**: Converts `/Date(timestamp)/` strings to JavaScript Date objects
- **Metadata cleanup**: Removes `__metadata` properties
- **Nested processing**: Recursively processes nested objects and arrays
- **Request serialization**: Prepares JavaScript objects for SuccessFactors APIs

## 🧩 Usage

### Response Normalization

```typescript
import { normalizeSFResponse } from '@cap-sf-sdk/sf-normalizer'

// SuccessFactors single entity response
const sfSingleResponse = {
  d: {
    externalCode: 'EMP001',
    startDate: '/Date(1704067200000)/',
    endDate: '/Date(1735689600000)/',
    status: 'A',
    __metadata: {
      uri: "https://api.successfactors.com/odata/v2/PerPerson('EMP001')",
      type: 'SFOData.PerPerson',
    },
  },
}

const normalized = normalizeSFResponse(sfSingleResponse)
console.log(normalized)
// Result: {
//   externalCode: 'EMP001',
//   startDate: Date('2024-01-01T00:00:00.000Z'),
//   endDate: Date('2024-12-31T00:00:00.000Z'),
//   status: 'A'
// }

// SuccessFactors collection response
const sfCollectionResponse = {
  d: {
    results: [
      {
        externalCode: 'EMP001',
        startDate: '/Date(1704067200000)/',
        __metadata: {
          /* ... */
        },
      },
      {
        externalCode: 'EMP002',
        startDate: '/Date(1706745600000)/',
        __metadata: {
          /* ... */
        },
      },
    ],
  },
}

const normalizedCollection = normalizeSFResponse(sfCollectionResponse)
console.log(normalizedCollection)
// Result: [
//   { externalCode: 'EMP001', startDate: Date('2024-01-01') },
//   { externalCode: 'EMP002', startDate: Date('2024-02-01') }
// ]
```

### Request Serialization

```typescript
import { serializeSFRequest } from '@cap-sf-sdk/sf-normalizer'

// JavaScript object with Date objects
const payload = {
  externalCode: 'EMP001',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31'),
  personalInfo: {
    birthDate: new Date('1990-05-15'),
  },
}

const serialized = serializeSFRequest(payload)
console.log(serialized)
// Result: {
//   externalCode: 'EMP001',
//   startDate: '/Date(1704067200000)/',
//   endDate: '/Date(1735689600000)/',
//   personalInfo: {
//     birthDate: '/Date(642902400000)/'
//   }
// }
```

### Complete CAP Integration Example

```typescript
import { normalizeSFResponse, serializeSFRequest } from '@cap-sf-sdk/sf-normalizer'
import { cqnToOData } from '@cap-sf-sdk/odata-transformer'

// In your CAP service
this.on('READ', 'Employees', async (req) => {
  // Transform CAP query to OData
  const odataQuery = cqnToOData(req.query)

  // Fetch from SuccessFactors
  const response = await fetch(`https://api.successfactors.com/odata/v2/PerPerson?${odataQuery}`)
  const rawData = await response.json()

  // Normalize the response
  const employees = normalizeSFResponse(rawData)

  return employees
})

this.on(['CREATE', 'UPDATE'], 'Employees', async (req) => {
  // Serialize for SuccessFactors
  const sfPayload = serializeSFRequest(req.data)

  // Send to SuccessFactors
  const response = await fetch('https://api.successfactors.com/odata/v2/PerPerson', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sfPayload),
  })

  const result = await response.json()
  return normalizeSFResponse(result)
})
```

## 🔧 API Reference

### `normalizeSFResponse(response)`

Normalizes a SuccessFactors OData v2 response into clean JavaScript objects.

**Parameters:**

- `response: any` - Raw SuccessFactors response with `d` or `d.results` wrapper

**Returns:** `any` - Normalized JavaScript object or array

**Features:**

- Unwraps `d` and `d.results` containers
- Converts SAP date strings (`/Date(timestamp)/`) to Date objects
- Removes `__metadata` properties
- Recursively processes nested objects and arrays

### `serializeSFRequest(data)`

Serializes JavaScript objects for SuccessFactors OData v2 API requests.

**Parameters:**

- `data: any` - JavaScript object or array to serialize

**Returns:** `any` - SuccessFactors-compatible payload

**Features:**

- Converts Date objects to SAP date format (`/Date(timestamp)/`)
- Preserves all other data types and structures
- Recursively processes nested objects and arrays

## 🛠️ Utility Functions

For advanced use cases, you can access individual utility functions:

```typescript
import { utils } from '@cap-sf-sdk/sf-normalizer'

// Date utilities
const date = utils.parseSapDate('/Date(1704067200000)/') // Returns Date object
const sapDate = utils.toSapDate(new Date('2024-01-01')) // Returns '/Date(1704067200000)/'
const isSapDate = utils.isSapDateString('/Date(123456)/') // Returns true

// Object utilities
const normalized = utils.normalizeObject(rawObject)
const serialized = utils.serializeObject(jsObject)
const data = utils.extractSFData(sfResponse)
```

## 🏗️ Project Structure

```
src/
├── index.ts              # Main entry point
├── types.ts              # TypeScript type definitions
├── normalizers/          # Response normalization
│   └── normalizeSFResponse.ts
├── serializers/          # Request serialization
│   └── serializeSFRequest.ts
└── utils/                # Utility functions
    ├── index.ts         # Utils entry point
    ├── dateUtils.ts     # SAP date handling
    └── objectUtils.ts   # Object processing
```

## 🧪 Testing

```bash
# Run tests for this package
npm test

# Run tests from package directory
cd packages/sf-normalizer
npm test

# Coverage report
npm run test:coverage
```

## 📚 Related Packages

- [`@cap-sf-sdk/odata-transformer`](../odata-transformer) - Transform CAP queries to OData
- [`@cap-sf-sdk/core`](../core) - Complete SDK with all packages

## 🤝 Contributing

See the [main repository](../../README.md#contributing) for contribution guidelines.

## 📄 License

MIT - see [LICENSE](../../LICENSE) for details.
