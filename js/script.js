class CovidDataLog {
    
    constructor() {
        this.id;
        this.previous_day_doses_administered;
        this.report_date;
        this.total_doses_administered;
        this.total_doses_in_fully_vaccinated_individuals;
        this.total_individuals_fully_vaccinated;

        this.loadCovidInformationToLocalStorage();
    }

    loadCovidInformationToLocalStorage = () => {
            $.ajax({
                type: 'GET',
                url: '../vaccine_doses.json',
                data: { get_param: 'value' },
                dataType: 'json',
                success: function (data) {
                    $.each(data, () =>  {
                        data.forEach((covidDataObj, index) => {
                            let dataRetrieved = {
                                ...covidDataObj,
                                id: index + 1
                            }
                            localStorage.setItem(covidDataObj.report_date, JSON.stringify(dataRetrieved));
                        });
                    });
                }
            });
    }
}

$(() => {
    $('#loadButton').click(function () {
        let coronaData = new CovidDataLog();
    })
})

$(() => {
    $('#displayButton').click(function () {
        for (var i = 0; i < localStorage.length; i++) {
            $('ul').append(`<li><span onClick="displayIndividualRecord(${i})">${localStorage.key(i)}</span></li><br>`);
        }
        if (localStorage.length != 0)
        {
        $("#displayButton").prop('disabled', true); 
        }else{
            window.alert("Data is not loaded in local storage");
        }
    });
});

const displayIndividualRecord = (id) => {
    const fetchedCovidData = JSON.parse(localStorage.getItem(localStorage.key(id)));
    let previousDoses = document.getElementById("previous_day_doses_administered");
    previousDoses.innerHTML = " Previous day Doses Administered: " + fetchedCovidData.previous_day_doses_administered;
    

    let totalDoses = document.getElementById("total_doses_administered");
    totalDoses.innerHTML = " Total Doses Administered: " + fetchedCovidData.previous_day_doses_administered;

    

    let vaccinatedDoses = document.getElementById("total_doses_in_fully_vaccinated_individuals");
    vaccinatedDoses.innerHTML = "Total Doses in Fully Vaccinated Individuals: " + fetchedCovidData.previous_day_doses_administered;
   

   let fullyDoses = document.getElementById("total_individuals_fully_vaccinated");
   fullyDoses.innerHTML = "Total Individuals Fully Vaccinated: " + fetchedCovidData.previous_day_doses_administered;
    
}





