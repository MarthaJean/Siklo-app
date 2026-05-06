const fs = require('fs');

let css = fs.readFileSync('src/pages/LandingPage.vue', 'utf8');

css = css.replace(
  '<style>\n/* Global Reset Overrides */\nhtml, body, #app {\n  background-color: #FAF7F0 !important;\n  margin: 0;\n  padding: 0;\n}\n</style>',
  '<style>\n/* Global Reset Overrides */\nhtml, body, #app, .v-application, .v-application__wrap {\n  background-color: #FAF7F0 !important;\n  margin: 0;\n  padding: 0;\n}\n</style>'
);

fs.writeFileSync('src/pages/LandingPage.vue', css);
