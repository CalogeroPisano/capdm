const fs = require('fs');
const postcss = require('postcss');

const compiledCSSFilePath = 'uimodule/webapp/css/compiled.css';
const destinationCSSFilePath = 'uimodule/webapp/css/app.css';

const plugins = [
  require('tailwindcss'),
  require('autoprefixer'),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('postcss-csso'));
}

postcss([
  ...plugins,
]).process(
  fs.readFileSync(compiledCSSFilePath),
  {
    from: compiledCSSFilePath,
    to: destinationCSSFilePath
  }
).then(({ css, map }) => {
  fs.writeFile(destinationCSSFilePath, css, () => true);

  if (map) {
    fs.writeFile(`${destinationCSSFilePath}.map`, map, () => true);
  }

  fs.unlink(compiledCSSFilePath, () => true);
  fs.unlink(`${compiledCSSFilePath}.map`, () => true);
});
