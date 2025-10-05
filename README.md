## Date parameter rules

The transformer supports SuccessFactors date parameters with the following logic:

- asOfDate is exclusive. If provided, fromDate and toDate are ignored.
- fromDate and toDate are optional and can be provided individually or together.
  - fromDate only → adds `fromDate`
  - toDate only → adds `toDate`
  - both → adds `fromDate` and `toDate`

Examples:

```ts
// asOfDate wins
cqnToOData(
  { columns: [{ ref: ['id'] }] },
  { asOfDate: '2024-06-01', fromDate: '2024-01-01', toDate: '2024-12-31' }
)
// → ...&asOfDate=2024-06-01

// fromDate only
cqnToOData({} as any, { fromDate: '2024-02-01' })
// → ...&fromDate=2024-02-01

// toDate only
cqnToOData({} as any, { toDate: '2024-03-01' })
// → ...&toDate=2024-03-01
```

# cap-odata-transformer

> Convert CAP CQN queries into OData query strings — useful for SuccessFactors or SAP API integrations.

### 🧩 Example

```ts
import { cqnToOData } from 'cap-odata-transformer'

this.on('READ', 'Employees', async (req) => {
  const qs = cqnToOData(req.query, {
    fromDate: req._.req.query.fromDate,
    toDate: req._.req.query.toDate,
  })

  console.log(qs)
  // 👉 $format=json&$select=externalCode,startDate&$filter=status eq 'A'&fromDate=2024-01-01&toDate=2024-12-31
})
```

## Documentation

Generated API reference is available locally after running the docs task. It uses TypeDoc to extract JSDoc from the TypeScript source.

Generate docs:

```powershell
npm run docs
```

This produces static HTML in the `docs/` directory. Open `docs/index.html` in a browser.
