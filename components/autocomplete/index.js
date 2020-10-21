import "./index.scss";
import { format } from "date-fns";
import autocomplete from "devbridge-autocomplete";

const formattedDate = format(new Date(), "MM/dd/yyyy");
const counties = [
  "Baker",
  "Benton",
  "Clkas",
  "Clatasadasdsp",
  "Colussssa",
  "Coos",
  "Crook",
  "Curry",
  "Deschutes",
  "Douglas",
  "Gilliam HOOOOOOOOOOOOOOFFFFFFFFFFFFFFFFFFsssF",
];

$("#testInput").autocomplete({
  lookup: counties,
  autoSelectFirst: true,
  maxHeight: 110,
  onSelect: function (suggestion) {
    console.log(suggestion);
  },
});

const dateEl = document.getElementById("date");
const textContent = document.createTextNode(formattedDate);
dateEl.appendChild(textContent);