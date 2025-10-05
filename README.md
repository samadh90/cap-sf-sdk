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
