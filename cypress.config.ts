import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '6ybhio',

  e2e: {
    // 'baseUrl': 'http://localhost:4200'
    'baseUrl': 'http://localhost:8100'
  },


  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})
