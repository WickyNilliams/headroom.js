import license from "rollup-plugin-license";
import { uglify } from "rollup-plugin-uglify";
import filesize from "rollup-plugin-filesize";
import { eslint } from "rollup-plugin-eslint";

const createBuild = options => {
  const licensePlugin = license({
    banner: {
      commentStyle: "ignored",
      content: `<%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>
                Copyright (c) <%= moment().format('YYYY') %> <%= pkg.author %> - <%= pkg.homepage %>
                License: <%= pkg.license %>`
    }
  });

  const unminified = {
    input: options.input,
    output: {
      format: "umd",
      file: options.output,
      name: options.name
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
    input: options.input,
    output: {
      format: "umd",
      compact: true,
      file: options.outputMinified,
      name: options.name
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

  return [unminified, minified];
};

export default [
  ...createBuild({
    name: "Headroom",
    input: "src/Headroom.js",
    output: "dist/headroom.js",
    outputMinified: "dist/headroom.min.js"
  }),
  ...createBuild({
    name: "registerJQueryHeadroom",
    input: "src/jQuery.headroom.js",
    output: "dist/jQuery.headroom.js",
    outputMinified: "dist/jQuery.headroom.min.js"
  })
];
