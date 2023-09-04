const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./uimodule/**/*.xml', './uimodule/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'red-capgemini': '#FFFF'
      }
    },
  },
  variants: {
    extend: {
      borderColor: ['important'],
      borderRadius: ['important'],
      borderWidth: ['important', 'last'],
      cursor: ['important']
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
    })
  ],
};
