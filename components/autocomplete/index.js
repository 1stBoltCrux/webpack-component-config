import "./index.scss";
import autocomplete from "devbridge-autocomplete";

const counties = [
  "Baker",
  "Benton",
  "Clackamas",
  "Clatsop",
  "Columbia",
  "Coos",
  "Crook",
  "Curry",
  "Deschutes",
  "Douglas",
  "Gilliam",
];

$(".saif-autocomplete").autocomplete({
  lookup: counties,
  autoSelectFirst: true,
  maxHeight: 110,
  onSelect: function (suggestion) {
    console.log(suggestion);
  },
});
