

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
        console.log(' howmany', howManyPeople);





}

$.get( "https://ironpeak.ua/petrol-price/", function( data ) {
    if(data) {
        data['data'].forEach(element => {
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