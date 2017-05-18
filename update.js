#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const nodemonVersion = '1.11.0';
const nodeVersions = ['6.10.3', '7.10.0'];

const template = fs.readFileSync('Dockerfile.template', 'UTF-8');

nodeVersions.forEach(version => {
    const targetPath = version.split('.')[0];
    const dockerfile = template
        .replace(/__VERSION__/g, nodemonVersion)
        .replace(/__NODE_VERSION__/g, version);

    try { fs.mkdirSync(targetPath); } catch(e) {}
    fs.writeFileSync(path.join('./', targetPath, 'Dockerfile'), dockerfile, { encoding: 'UTF-8' });
});
