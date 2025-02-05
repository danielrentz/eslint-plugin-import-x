/**
 * @fileOverview Report modules that could parse incorrectly as scripts.
 * @author Ben Mosher
 */

import { isUnambiguousModule } from '../utils/unambiguous'
import { docsUrl } from '../docs-url'

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Module systems',
      description:
        'Forbid potentially ambiguous parse goal (`script` vs. `module`).',
      url: docsUrl('unambiguous'),
    },
    schema: [],
  },

  create(context) {
    // ignore non-modules
    if (context.parserOptions.sourceType !== 'module') {
      return {}
    }

    return {
      Program(ast) {
        if (!isUnambiguousModule(ast)) {
          context.report({
            node: ast,
            message: 'This module could be parsed as a valid script.',
          })
        }
      },
    }
  },
}
