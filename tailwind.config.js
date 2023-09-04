const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: ['./uimodule/webapp/**/*.xml', './uimodule/webapp/**/*.js'],
  theme: {
    extend: {
      colors: {
        'red-ducati': '#FFFF'
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
