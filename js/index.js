let minPrice = {
    "a96": {"gasStation": "", "price": null},
    "a95": {"gasStation": "", "price": null},
    "a92": {"gasStation": "", "price": null},
    "dt": {"gasStation": "", "price": null},
    "lpg": {"gasStation": "", "price": null},
};

function setMinPrice(key, el) {
    if(el[key] !== null) {
        if(minPrice[key]["price"] === null) {
            minPrice[key]["gasStation"] = el['gasStation'];
            minPrice[key]["price"] = el[key];
        } else if(el['a96'] < minPrice[key]["price"]) {
            minPrice[key]["gasStation"] = el['gasStation'];
            minPrice[key]["price"] = el[key];
        }
    }
}

function btnGet() {
    let sredniyRaskhodTopliva = $('#sredniy_raskhod_topliva').val(),
        diStance = $('#distance').val(),
        coastL = $('#coast_L').val(),
        howManyPeople = $('#how_many_people').val(),
        a,
        b,
        c;


    a = sredniyRaskhodTopliva * diStance / 100;
    $('.a').html(a);
    b = coastL * a;
    $('.b').html(b);
    c = b / howManyPeople;
    $('.c').html(c);

    // language=JQuery-CSS
   // $('.answer_miscalculation_response').css('display', 'block');
    $(".answer_miscalculation_response").show(1000);
} //Кнопка "РАССЧИТАТЬ" ("Стоимость путешествия")
function clearCalc(){
    $('input').val("");
    $('.answer_miscalculation_response').css("display",'none');
} //Кнопка "ОЧИСТИТЬ" ("Стоимость путешествия")
//-----------------------------------------------------------------------------------------
function btnGetTo() {
    let fuel = $("#fuel").val(),
        length = $("#how_distance").val(),
        priceL = $("#price_l").val(),
        resultOne,
        resultTwo;
    resultOne = fuel / length *100;
    resultTwo = resultOne * priceL;
    console.log("result", resultOne);
    console.log("result", resultTwo);

    $('.answer_miscalculation_response').css('display', 'block');


} //Кнопка "РАССЧИТАТЬ" ("Стоимость путешествия")
function clearCalcTo(){
    $('input').val("");
    $('.answer_miscalculation_response').css("display",'none');
} //Кнопка "ОЧИСТИТЬ" ("Стоимость путешествия")

$.get( "https://ironpeak.ua/petrol-price/", function( data ) {
    if(data) {
        data['data'].forEach(element => {

            setMinPrice("a96", element);
            setMinPrice("a95", element);
            setMinPrice("a92", element);
            setMinPrice("dt", element);
            setMinPrice("lpg", element);

            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var tda96 = document.createElement("td");
            var tda95 = document.createElement("td");
            var tda92 = document.createElement("td");
            var tdDT = document.createElement("td");
            var tdLPG = document.createElement("td");


            $(td).text(element['gasStation']);
            $(tda96).text(element['a96']);
            $(tda95).text(element['a95']);
            $(tda92).text(element['a92']);
            $(tdDT).text(element['dt']);
            $(tdLPG).text(element['lpg']);

            $(tr).append(td);
            $(tr).append(tda96);
            $(tr).append(tda95);
            $(tr).append(tda92);
            $(tr).append(tdDT);
            $(tr).append(tdLPG);

            $(".result table").append(tr)
        });
    }
});

function logIn() {
    let checkboxes = $('.checkbox');
    let checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать
    for (var index = 0; index < checkboxes.length; index++) {
        if (checkboxes[index].checked) {
            checkboxesChecked.push(checkboxes[index].value); // положим в массив выбранный
            for (var i = 0; i < checkboxesChecked.length; i++){
                if (checkboxesChecked[i] === "A96"){
                    let minPriceGasStation = $(".minPriceGasStation");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.a96.price + "</span>");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + "<span class='text-danger'>А96</span>" + minPrice.a96.gasStation + "</span>");
                }else if (checkboxesChecked[i] === "A95") {
                    let minPriceGasStation = $(".minPriceGasStation");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.a95.price + "</span>");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.a95.gasStation + "<span class='text-danger'>А95</span>" + "</span>");
                }else if (checkboxesChecked[i] === "A92" ) {
                    let minPriceGasStation = $(".minPriceGasStation");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.a92.price + "</span>");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.a92.gasStation + "<span class='text-danger'>А92</span>" + "</span>");
                }else if (checkboxesChecked[i] === "DT") {
                    let minPriceGasStation = $(".minPriceGasStation");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.dt.price + "</span>");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.dt.gasStation + "<span class='text-danger'>DT</span>" + "</span>");
                }else if (checkboxesChecked[i] === "LPG") {
                    let minPriceGasStation = $(".minPriceGasStation");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.lpg.price + "</span>");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.lpg.gasStation + "<span class='text-danger'>LPG</span>" + "</span>");


                }
            }
        }
    }console.log('checkboxesChecked', checkboxesChecked);
    return checkboxesChecked; // для использования в нужном месте

}
//____________________________________________________________________________________________________________________________________
$(function() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        // more then one submenu open?
        this.multiple = multiple || false;

        var dropdownlink = this.el.find('.dropdownlink');
        dropdownlink.on('click',
            { el: this.el, multiple: this.multiple },
            this.dropdown);
    };

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el,
            $this = $(this),
            //this is the ul.submenuItems
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if(!e.data.multiple) {
            //show only one menu at the same time
            $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
        }
    }

    var accordion = new Accordion($('.accordion-menu'), false);
})