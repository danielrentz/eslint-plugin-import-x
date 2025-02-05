import { docsUrl } from '../docs-url'

const first = require('./first')

const newMeta = {
  ...first.meta,
  deprecated: true,
  docs: {
    category: 'Style guide',
    description: 'Replaced by `import-x/first`.',
    url: docsUrl('imports-first', '7b25c1cb95ee18acc1531002fd343e1e6031f9ed'),
  },
}

module.exports = { ...first, meta: newMeta }
