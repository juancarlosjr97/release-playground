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
    "@release-it/bumper": [
      {
        in: {
          file: "pyproject.toml",
          type: "text/toml",
        },
        out: {
          file: "pyproject.toml",
          path: "project.version",
          type: "text/toml",
        },
      },
      {
        in: {
          file: ".pre-commit-config.yaml",
          type: "text/yaml",
        },
        out: {
          file: ".pre-commit-config.yaml",
          path: "repos[0].rev",
          type: "text/yaml",
        },
      },
    ],
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
