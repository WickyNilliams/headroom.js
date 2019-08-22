import license from "rollup-plugin-license";
import { uglify } from "rollup-plugin-uglify";

const input = "src/Headroom.js";

const output = {
  format: "umd",
  name: "Headroom"
};

const plugins = [
  license({
    banner: {
      commentStyle: "ignored",
      content: `<%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>
                Copyright (c) <%= moment().format('YYYY') %> <%= pkg.author %> - <%= pkg.homepage %>
                License: <%= pkg.license %>`
    }
  })
];

const unminified = {
  input,
  output: {
    ...output,
    file: "dist/headroom.js"
  },
  plugins
};

const minified = {
  input,
  output: {
    ...output,
    file: "dist/headroom.min.js",
    compact: true
  },
  plugins: [uglify(), ...plugins]
};

export default [unminified, minified];
