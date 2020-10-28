import "bootstrap";
import "./index.scss";

console.log("ok");

$("#tooltip").on({
    focus: function(){
        $(this).tooltip('toggle');
    },
    mouseover: function(){
        $(this).tooltip('toggle');
    }
})
