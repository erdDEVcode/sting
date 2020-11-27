module.exports = {
  branches: ["master"],
  ci: false,
  debug: false,
  plugins: [
    ["@semantic-release/commit-analyzer", {
      "preset": "angular",
      "releaseRules": [
        { breaking: true, release: 'major' },
        { revert: true, release: 'patch' },
        { "type": "docs", "release": "patch" },
        { "type": "build", "release": "patch" },
        { "type": "chore", "release": "patch" },
        { "type": "style", "release": "minor" },
        { "type": "refactor", "release": "minor" },
      ],
      "parserOpts": {
        "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
      }
    }],
    ["@semantic-release/release-notes-generator", {
      "preset": "angular",
      "writerOpts": {
        "commitsSort": ["scope", "subject"]
      },
    }],
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md"
    }],
    ["@semantic-release/npm"],
    ["@semantic-release/git", {
      "message": "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}"
    }],
    ["@semantic-release/exec", {
      "successCmd": "git push"
    }],
  ]
}