/**
 * @cap-sf-sdk — Core SDK entry point
 *
 * Exposes global SDK utilities (version, diagnostics, helpers),
 * while functional modules (transformer, normalizer) are imported separately:
 *
 *   import { cqnToOData } from '@cap-sf-sdk/odata-transformer'
 *   import { normalizeSFResponse } from '@cap-sf-sdk/sf-normalizer'
 */

const pkg = require('../package.json')

/** SDK version — automatically synced with package.json */
export const version = pkg.version

/** Returns SDK metadata — useful for logs or tests */
export function sdkInfo() {
  return {
    name: '@cap-sf-sdk',
    version,
    modules: ['@cap-sf-sdk/odata-transformer', '@cap-sf-sdk/sf-normalizer'],
  }
}
