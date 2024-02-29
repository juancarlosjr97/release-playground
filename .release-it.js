module.exports = {
  plugins: {
    "@release-it/conventional-changelog": {
      gitRawCommitsOpts: {
        path: ".",
      },
      header: "# Changelog\n\nThis changelog is updated automatically using release-it.\n",
      infile: "CHANGELOG.md",
      path: ".",
      preset: {
        name: "conventionalcommits",
        types: [
          {
            section: "Features",
            type: "feat",
          },
          {
            section: "Bug Fixes",
            type: "fix",
          },
          {
            section: "Tests",
            type: "test",
          },
          {
            section: "Chores",
            type: "chore",
          },
          {
            section: "Documentation",
            type: "docs",
          },
          {
            section: "Performance Improvements",
            type: "perf",
          },
          {
            section: "Code Refactoring",
            type: "refactor",
          },
          {
            section: "Code Style Changes",
            type: "style",
          },
          {
            section: "Build Changes",
            type: "build",
          },
          {
            section: "Continuous Integration",
            type: "ci",
          },
          {
            section: "Reverts",
            type: "revert",
          },
        ],
      },
    },
    "@release-it/bumper": {
      out: {
        file: ["pyproject.toml", ".pre-commit-config.yaml"],
        path: ["project.version", "repos[0].rev"],
      },
    },
  },
  git: {
    commitMessage: "Released version ${version}",
    commitsPath: ".",
    push: true,
    requireCommits: true,
    requireCommitsFail: false,
    tagName: "${version}",
  },
  github: {
    release: true,
    releaseName: "${version}",
  },
};
