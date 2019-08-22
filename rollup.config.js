import license from "rollup-plugin-license";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/Headroom.js",
  output: {
    file: "dist/headroom.js",
    format: "umd",
    name: "Headroom",
    compact: true
  },
  plugins: [
    uglify(),
    license({
      banner: {
        commentStyle: "ignored",
        content: `<%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>
                  Copyright (c) <%= moment().format('YYYY') %> <%= pkg.author %> - <%= pkg.homepage %>
                  License: <%= pkg.license %>`
      }
    })
  ]
};
