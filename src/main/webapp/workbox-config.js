module.exports = {
  globDirectory: '../resources/META-INF/resources/',
  globPatterns: ['**/*.{woff,woff2,js,css,png,jpg,svg,html}'],
  /* pass array of globs to exclude from caching */
  globIgnores: [],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: '../resources/META-INF/resources/service-worker.js',
};
