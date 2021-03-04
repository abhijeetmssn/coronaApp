class CovidData {
    
    constructor() {
        this.id;
        this.previous_day_doses_administered;
        this.report_date;
        this.total_doses_administered;
        this.total_doses_in_fully_vaccinated_individuals;
        this.total_individuals_fully_vaccinated;
    }

    loadCovidData = () => {
            $.ajax({
                type: 'GET',
                url: '../vaccine_doses.json',
                data: { get_param: 'value' },
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, element) {
                        data.forEach((element, index) => {
                            let objToStore = {
                                ...element,
                                id: index + 1
                            }
                            localStorage.setItem(element.report_date, JSON.stringify(objToStore));
                        });
                    });
                }
            });
    }

    displayUnorderedList = () => {
        for (var i = 0; i < localStorage.length; i++) {
            $('ul').append(`<li><span onClick="displayIndividualRecord(${i})">${localStorage.key(i)}</span></li><br>`);
        }
        if (localStorage.length != 0)
        {
        $("#displayButton").prop('disabled', true); 
        }
    }

}

let cData = new CovidData();
$(() => {$('#loadButton').click(function () {
cData.loadCovidData();
})
})

$(() => {
    $('#displayButton').click(function () {
        cData.displayUnorderedList();
    });
});

const displayIndividualRecord = (index) => {
    const fetchData = JSON.parse(localStorage.getItem(localStorage.key(index)));
    document.getElementById("previous_day_doses_administered").innerHTML =" Previous day Doses Administered: " + fetchData.previous_day_doses_administered;
    document.getElementById("total_doses_administered").innerHTML =  "Total Doses Administered: " + fetchData.total_doses_administered;
    document.getElementById("total_doses_in_fully_vaccinated_individuals").innerHTML ="Total Doses in Fully Vaccinated Individuals: " + fetchData.total_doses_in_fully_vaccinated_individuals;
    document.getElementById("total_individuals_fully_vaccinated").innerHTML = "Total Individuals Fullu Vaccinated: " + fetchData.total_individuals_fully_vaccinated;
}

