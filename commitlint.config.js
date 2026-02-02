module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'build',    // Changes that affect the build system or external dependencies
      'chore',    // Regular maintenance tasks
      'ci',       // Changes to CI configuration files and scripts
      'docs',     // Documentation-only changes
      'feat',     // A new feature
      'fix',      // A bug fix
      'perf',     // Performance improvements
      'refactor', // Code refactoring without changing functionality
      'revert',   // Reverting previous commits
      'style',    // Code style changes (formatting, missing semicolons, etc.)
      'test'      // Adding or modifying tests
    ]],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 100]
  }
};
