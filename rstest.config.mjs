import { 
  defineConfig,
  defineInlineProject 
} from '@rstest/core';
import { pluginReact } from '@rsbuild/plugin-react';

const _crIncludeDir = (
 token
) => `<rootDir>/src/${token}/__tests__/*.test.js`
, _crInclude = (...tokens) => tokens.map(_crIncludeDir);

const sharedProjectConfig = {
  globals: true,
  resolve: {
    alias: {
      '@testHelpers': './src/__tests__/setupHelpers.test.js'
    }
  }    
};

export default defineConfig({  
  projects: [
    defineInlineProject({
      name: 'dom',
      ...sharedProjectConfig,
      plugins: [pluginReact()],      
      testEnvironment: 'jsdom',
      setupFiles: ['./src/__tests__/rstest-dom-setup.test.js'],
      include: _crInclude(
        'components',
        'components/hooks',                  
        'components/dialogs/rows',
        'components/dialogs/hooks',
        'components/watch-browser/hooks',
        'components/zhn',           
        'components/zhn-m',
        'components/zhn-menu',
        'components/zhn-tab',
        'components/zhn-table',
        'flux/stores'      
       )  
    }),
    defineInlineProject({
      name: 'node',
      ...sharedProjectConfig,
      include: _crInclude(
        'components/dialogs/fns',
        'components/dialogs',
        'components/zhn-sparklines/dataProcessing',          
        'charts/plugin',
        'utils',
        'math',
        'adapters',
        'adapters/eurostat',
        'adapters/stat-json',
        'flux',
        'flux/logic'       
      )
    })
  ]  
});