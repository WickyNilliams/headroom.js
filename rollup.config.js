import license from "rollup-plugin-license";
import { uglify } from "rollup-plugin-uglify";
import filesize from "rollup-plugin-filesize";
import { eslint } from "rollup-plugin-eslint";

const input = "src/Headroom.js";

const output = {
  format: "umd",
  name: "Headroom"
};

const licensePlugin = license({
  banner: {
    commentStyle: "ignored",
    content: `<%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>
              Copyright (c) <%= moment().format('YYYY') %> <%= pkg.author %> - <%= pkg.homepage %>
              License: <%= pkg.license %>`
  }
});

const unminified = {
  input,
  output: {
    ...output,
    file: "dist/headroom.js"
  },
  plugins: [
    eslint(),
    licensePlugin,
    filesize({
      showMinifiedSize: false,
      showGzippedSize: false
    })
  ]
};

const minified = {
  input,
  output: {
    ...output,
    file: "dist/headroom.min.js",
    compact: true
  },
  plugins: [
    uglify(),
    licensePlugin,
    filesize({
      showMinifiedSize: false,
      showBrotliSize: true
    })
  ]
};

export default [unminified, minified];
