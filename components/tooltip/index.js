import "./index.scss";

    $(".saif-tooltip").on({
        focus: function(){
            $(this).tooltip('toggle');
        },
        mouseover: function(){
            $(this).tooltip('toggle');
        }
    })

    const thing = () => {
        console.log('woof')
    }


