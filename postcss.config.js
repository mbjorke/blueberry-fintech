import nesting from 'postcss-nesting';

export default {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting')(nesting),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
