$(document).ready(
    function() {
        if (sessionStorage.getItem('logged_in') !== 'true') {
            alert('You must log in first.');
            goHome();
        }
        
        $('#confirmIncome').val(sessionStorage.getItem('income'));
        $('#confirmIncome').attr('value', sessionStorage.getItem('income'));
        
        $('#textResult').hide();
        $('#textTable').hide();
        
    }
);

// Highcharts
function createBudget() {
    var confirmedIncome = parseFloat($('#confirmIncome').val());
    if (confirmedIncome >= 800) {
        var food_budget = (-1350) * Math.pow(1.0003, 800 - confirmedIncome) + 1800;
        var living_budget = (-2200) * Math.pow(1.0001, 800 - confirmedIncome) + 2400;
        var entertainment_budget = (-2950) * Math.pow(1.00008, 800 - confirmedIncome) + 3000;
        food_budget = food_budget.toFixed(2);
        living_budget = living_budget.toFixed(2);
        entertainment_budget = entertainment_budget.toFixed(2);
        
        var saving = confirmedIncome - food_budget - living_budget - entertainment_budget;
        saving = saving.toFixed(2);
        
        Highcharts.chart('budget', {
            chart: {
                backgroundColor: 'transparent',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: null
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        color: 'darkred',
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                            fontSize: '1.2em'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Food',
                    y: parseFloat(food_budget)
                }, {
                    name: 'Living',
                    y: parseFloat(living_budget)
                }, {
                    name: 'Entertainment',
                    y: parseFloat(entertainment_budget)
                }, {
                    name: 'Saving',
                    y: parseFloat(saving),
                    sliced: true,
                    selected: true
                }]
            }]
        });
        
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();
        
        var targetMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        var targetYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        
        var textMonth;
        switch(targetMonth) {
            case 0:
                textMonth = 'Jan';
                break;
            case 1:
                textMonth = 'Feb';
                break;
            case 2:
                textMonth = 'Mar';
                break;
            case 3:
                textMonth = 'Apr';
                break;
            case 4:
                textMonth = 'May';
                break;
            case 5:
                textMonth = 'Jun';
                break;
            case 6:
                textMonth = 'Jul';
                break;
            case 7:
                textMonth = 'Aug';
                break;
            case 8:
                textMonth = 'Sep';
                break;
            case 9:
                textMonth = 'Oct';
                break;
            case 10:
                textMonth = 'Nov';
                break;
            case 11:
                textMonth = 'Dec';
                break;
        }
        
        var textDate = textMonth + ', ' + targetYear;
        
        $('#budgetPeriod').text(textDate);
        $('#foodBudget').text('$' + food_budget);
        $('#livingBudget').text('$' + living_budget);
        $('#entertainmentBudget').text('$' + entertainment_budget);
        $('#monthlySaving').text('$' + saving);
        
        $('#textResult').show();
        $('#textTable').show();
        
        sessionStorage.setItem('Food', food_budget);
        sessionStorage.setItem('Living', living_budget);
        sessionStorage.setItem('Entertainment', entertainment_budget);
        sessionStorage.setItem('Saving', saving);
    }
}
