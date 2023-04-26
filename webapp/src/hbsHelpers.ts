import { handlebars } from "hbs";
import * as helpers from "handlebars-helpers";

export const registerCustomHelpers = () => {
  handlebars.registerHelper("isdefined", function (value) {
    return value !== undefined;
  });

  handlebars.registerHelper("isundefined", function (value) {
    return value == undefined;
  });

  helpers({
    handlebars,
  });
};
