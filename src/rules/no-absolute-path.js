import path from 'path'
import { moduleVisitor, makeOptionsSchema } from '../utils/module-visitor'
import { isAbsolute } from '../core/import-type'
import { docsUrl } from '../docs-url'

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Static analysis',
      description: 'Forbid import of modules using absolute paths.',
      url: docsUrl('no-absolute-path'),
    },
    fixable: 'code',
    schema: [makeOptionsSchema()],
  },

  create(context) {
    function reportIfAbsolute(source) {
      if (isAbsolute(source.value)) {
        context.report({
          node: source,
          message: 'Do not import modules using an absolute path',
          fix(fixer) {
            const resolvedContext = context.getPhysicalFilename
              ? context.getPhysicalFilename()
              : context.getFilename()
            // node.js and web imports work with posix style paths ("/")
            let relativePath = path.posix.relative(
              path.dirname(resolvedContext),
              source.value,
            )
            if (!relativePath.startsWith('.')) {
              relativePath = `./${relativePath}`
            }
            return fixer.replaceText(source, JSON.stringify(relativePath))
          },
        })
      }
    }

    const options = { esmodule: true, commonjs: true, ...context.options[0] }
    return moduleVisitor(reportIfAbsolute, options)
  },
}
