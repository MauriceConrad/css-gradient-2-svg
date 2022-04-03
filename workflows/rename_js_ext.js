import commandLineArgs from 'command-line-args'
import fs from 'fs/promises'
import path from 'path'

const args = Object.assign({
  ['regex-import-statement']: `^\\s*(import|export)\\s{1,}(.*)\\s{1,}from\\s{1,}("|')(\\.{1,2}\\/.*)("|');?\\s*$`,
  ['regex-filename']: `\\.js$`
}, commandLineArgs([
  {
    type: String,
    name: 'target',
    alias: 't',
    defaultOption: true
  },
  {
    type: String,
    name: 'regex-import-statement',
    alias: 'r'
  },
  {
    type: String,
    name: 'regex-filename',
    alias: 'f'
  }
]));

const target = args.target;



const regexImportStatement = new RegExp(args['regex-import-statement']);
const regexFilename = new RegExp(args['regex-filename']);

async function lookup(dir, handler, maxLevel = Infinity, level = 0) {
  const entries = await fs.readdir(dir);
  for (const item of entries.filter(fileName => regexFilename.test(fileName))) {
    const itemPath = path.resolve(dir, item);
    const stat = await fs.stat(itemPath);
    if (stat.isFile()) {
      handler(itemPath);
    }
    if (stat.isDirectory() && level < maxLevel) {
      lookup(itemPath, handler, maxLevel, level + 1);
    }
  }
}

lookup(target, async (item) => {
  const contents = await fs.readFile(item, 'utf8');
  const lines = await Promise.all(contents.split('\n').map(async line => {
    if (regexImportStatement.test(line)) {
      const [ , , , , destination ] = line.match(regexImportStatement);
      const destinationFile = path.resolve(item, '..', destination);
      const destinationFolder = path.resolve(destinationFile, '..');
      const folderFiles = await fs.readdir(destinationFolder);
      const targetFile = folderFiles.find(itemName => {
        const parts = itemName.split('.');
        return parts.slice(0, -1).join('.') === path.basename(destinationFile) || path.basename(destinationFile) === itemName;
      });
      if (targetFile) {
        const target = path.relative(path.resolve(item, '..'), path.resolve(destinationFolder, targetFile));
        return line.replace(destination, /\.\//.test(target) ? target : `./${ target }`);
      }
    }
    return line;
  }));
  await fs.writeFile(item, lines.join('\n'));
});