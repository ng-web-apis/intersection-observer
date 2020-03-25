const fs = require('fs');

const DIST_LIB_PATH = 'dist/intersection-observer/';
const README_PATH = 'README.md';
const PATH_TO_README = DIST_LIB_PATH + README_PATH;

copyExtraFiles();

function copyExtraFiles() {
    if (!fs.existsSync(README_PATH)) {
        throw new Error('Requested files do not exit');
    } else {
        copyReadmeIntoDistFolder(README_PATH, PATH_TO_README);
    }
}

function copyReadmeIntoDistFolder(srcPath, toPath) {
    const fileBody = fs.readFileSync(srcPath).toString();
    const withoutLogos = fileBody
        .replace('![ng-web-apis logo](projects/demo/src/assets/logo.svg) ', '')
        .replace('<img src="projects/demo/src/assets/web-api.svg" align="top"> ', '');

    fs.writeFileSync(toPath, withoutLogos);
}
