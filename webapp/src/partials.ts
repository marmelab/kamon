import * as fs from "fs";
import * as hbs from "hbs";
import * as path from "path";

// Register Partials
const partialsDir = path.join(__dirname, "..", "views", "partials");
const filenames = fs.readdirSync(partialsDir);

export const registerPartials = () => {
  filenames.forEach((filename) => {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    const name = matches[1];
    const template = fs.readFileSync(partialsDir + "/" + filename, "utf8");
    hbs.registerPartial(name, template);
  });
};
