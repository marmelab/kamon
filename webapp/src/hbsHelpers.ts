import { handlebars } from "hbs";
import * as helpers from "handlebars-helpers";

export const registerCustomHelpers = () => {
  handlebars.registerHelper("isDefined", function (value) {
    return value !== undefined;
  });

  handlebars.registerHelper("isUndefined", function (value) {
    return value == undefined;
  });

  helpers({
    handlebars,
  });
};
