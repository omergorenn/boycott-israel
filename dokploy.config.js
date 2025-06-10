module.exports = {
  // Static site configuration
  type: 'static',
  
  // Build settings
  build: {
    command: 'npm run build',
    outputDir: 'dist',
  },
  
  // Environment
  node: {
    version: '18'
  },
  
  // Static file serving
  static: {
    spa: true,
    fallback: 'index.html'
  },
  
  // Custom headers for better caching
  headers: {
    '/**': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ],
    '/*.html': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=0, must-revalidate'
      }
    ],
    '/data/*.json': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600'
      }
    ]
  }
}; 