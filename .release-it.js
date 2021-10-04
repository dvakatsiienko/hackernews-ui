module.exports = {
    git: {
        commitMessage: 'v${version}',
        requireBranch: 'dev',
    },
    npm: {
        publish: false,
    },
    github: {
        release: true,
        releaseName: 'v${version}',
        // "releaseNotes": null,
    },
    hooks: {
        'after:bump': 'npx auto-changelog',
    },
};
