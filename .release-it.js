module.exports = {
  plugins: {
    "@release-it/conventional-changelog": {
      gitRawCommitsOpts: {
        path: ".",
      },
      whatBump: (commits, options) => {
        let defaults = {
          build: "ignore",
          feat: "ignore",
          ci: "ignore",
          docs: "ignore",
          feat: "ignore",
          fix: "ignore",
          perf: "ignore",
          refactor: "ignore",
          test: "ignore",
          chore: "patch",
          choredev: "ignore",
        };

        let types = (options?.preset?.types || []).reduce((a, v) => {
          return { ...a, [v.type]: v.release };
        }, {});

        types = Object.assign({}, defaults, types);

        let breakings = 0;
        let features = 0;

        let levelSet = ["major", "minor", "patch", "ignore"];

        let level = Math.min.apply(
          Math,
          commits.map((commit) => {
            let level = levelSet.indexOf(types[commit.type]);

            level = level < 0 ? 3 : level;
            if (commit.notes.length > 0) {
              breakings += commit.notes.length;
            }

            if (commit.type === "feat") {
              features += 1;
            }
            return level;
          })
        );

        return {
          level: level,
          reason:
            breakings === 1
              ? `There is ${breakings} BREAKING CHANGE and ${features} features`
              : `There are ${breakings} BREAKING CHANGES and ${features} features`,
        };
      },
      header:
        "# Changelog\n\nThis changelog is updated automatically using release-it.\n",
      infile: "CHANGELOG.md",
      path: ".",
      preset: {
        name: "conventionalcommits",
        types: [
          {
            section: "Features",
            type: "feat",
            release: "minor",
          },
          {
            section: "Bug Fixes",
            type: "fix",
            release: "patch",
          },
          {
            section: "Tests",
            type: "test",
            release: "ignore",
          },
          {
            section: "Chores",
            type: "chore",
            release: "patch",
          },
          {
            section: "Documentation",
            type: "docs",
            release: "ignore",
          },
          {
            section: "Performance Improvements",
            type: "perf",
            release: "patch",
          },
          {
            section: "Code Refactoring",
            type: "refactor",
            release: "patch",
          },
          {
            section: "Code Style Changes",
            type: "style",
            release: "patch",
          },
          {
            section: "Build Changes",
            type: "build",
            release: "patch",
          },
          {
            section: "Continuous Integration",
            type: "ci",
            release: "patch",
          },
          {
            section: "Reverts",
            type: "revert",
            release: "patch",
          },
          {
            section: "Chore DevDependencies",
            type: "choredev",
            release: "ignore",
          },
        ],
      },
    },
    "@release-it/bumper": {
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
