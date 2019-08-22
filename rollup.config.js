import license from "rollup-plugin-license";

export default {
  input: "src/Headroom.js",
  output: {
    file: "dist/headroom.js",
    format: "umd",
    name: "Headroom",
    compact: true
  },
  plugins: [
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
