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

    console.log('sredniyRaskhodTopliva', sredniyRaskhodTopliva);
    console.log('dist', diStance);
    console.log('coast', coastL);
    console.log('howmany', howManyPeople);
}
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
                  //  alert(96);
                    let minPriceGasStation = $(".minPriceGasStation");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.a96.gasStation + "  А96            " + "</span>");
                    minPriceGasStation.append("<span class='text-danger' style='display: block'>" + minPrice.a96.price + "</span>");
                }else if (checkboxesChecked[i] === "A95") {
                    let minPriceGasStation = $(".minPriceGasStation");
                    minPriceGasStation.append("<span class='text-danger'>" + minPrice.a95.gasStation + "</span><br>");
                    minPriceGasStation.append("<span class='text-danger'>" + minPrice.a95.price + "</span><br>");
                    //alert(95);
                }else if (checkboxesChecked[i] === "A92" ) {
                   // alert(92);
                }else if (checkboxesChecked[i] === "DT") {
                   // alert("DT");
                }else if (checkboxesChecked[i] === "LPG") {
                   // alert("LPG");
                }
            }
        }
    }console.log('checkboxesChecked', checkboxesChecked);
    return checkboxesChecked; // для использования в нужном месте

}
