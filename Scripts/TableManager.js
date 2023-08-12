function createCarTypeChart(data){
    strResult = '<canvas id="carTypeChart" style="width:100%;max-width:1000px;max-height:500px;"></canvas>'
    $("#chart").html(strResult);
    // Count the occurrences of each car type
    var carTypeCount = {};
    for (var i = 0; i < data.length; i++) {
        var carType = data[i].CarType;
        if (carTypeCount[carType]) {
        carTypeCount[carType]++;
        } else {
        carTypeCount[carType] = 1;
        }
    }

    // Prepare the data for the chart
    var carTypes = Object.keys(carTypeCount);
    var carTypeAmounts = Object.values(carTypeCount);

    // Create the chart using Chart.js
    var ctx = document.getElementById('carTypeChart');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: carTypes,
        datasets: [{
            label: 'Car Types',
            data: carTypeAmounts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
        },
        options: {
        plugins: {
            title: {
            display: true,
            text: 'Types of Car.',
            font: {
                size: 16,
                weight: 'bold'
            }
            }
        },
        scales: {
            y: {
            beginAtZero: true,
            precision: 0,
            stepSize: 1
            }
        }
        }
    });
}



function createClaimsChart(data) {
    strResult = '<canvas id="myChart3" style="width:100%;max-width:1000px;max-height:500px;"></canvas>'
    $("#chart").html(strResult);
    // Filter the data to include only claims that have not been revoked
    var nonRevokedClaims = data.filter(function (claim) {
        return claim.Revoked === 'No';
    });
    console.log(nonRevokedClaims);
    // Extract the claim values from the filtered data and parse currency strings
    var claimValues = nonRevokedClaims.map(function (claim) {
        var value = claim.Claim_Amount;
        if (value === null || typeof value === 'undefined') {
        value = 0;
        } else {
        value = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        }
        return value;
    });

    const ctx3 = document.getElementById('myChart3');
    var chart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
        labels: nonRevokedClaims.map(function (claim) {
            return claim.ClaimID;
        }),
        datasets: [
            {
            label: 'Claim Value',
            data: claimValues,
            backgroundColor: 'blue'
            }
        ]
        },
        options: {
            plugins: {
            title: {
            display: true,
            text: 'Non-Revoked Claims.',
            font: {
                size: 16,
                weight: 'bold'
            }
            }
        },
        responsive: true,
        scales: {
            y: {
            title: {
                display: true,
                text: 'Claim Value'
            },
            ticks: {
                callback: function (value, index, values) {
                return '$' + value.toLocaleString();
                }
            }
            }
        }
        }
    });
}


function createHouseChart(data) {
    // Reset the canvas so i can use it.
    strResult = '<canvas id="myChart1" style="width:100%;max-width:1000px;max-height:500px;"></canvas>'
    $("#chart").html(strResult);
    // Extract age and house values from the data
    var ages = data.map(function (driver) {

        return driver.Age;                  
    });
    
    var houseValues = data.map(function (driver) {
        console.log(driver.Home_Val);
        var value = driver.Home_Val;
        if (value === null || typeof value === 'undefined') {
            // Assign a default value for null values
            value = 0;
        } else {
            // Remove any non-digit characters from the string and parse it as a float
            value = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        }
        return value;


    });
    var incomes = data.map(function (driver) {
        var value = driver.Income;

        if (value === null || typeof value === 'undefined') {
            value = 0;
        } else {
            value = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        }
        return value;
        

    });
    // Sort data by age
    var sortedData = ages.map(function (age, index) {
        return {
        age: age,
        houseValue: houseValues[index],
        income: incomes[index]
        };
    }).sort(function (a, b) {
        return a.age - b.age;
    });

    // Update the arrays with sorted data
    ages = sortedData.map(function (driver) {
        return driver.age;
    });

    houseValues = sortedData.map(function (driver) {
        return driver.houseValue;
    });

    incomes = sortedData.map(function (driver) {
        return driver.income;
    });

    console.log(data);
    console.log(houseValues);
    const ctx1 = document.getElementById('myChart1');
    // Create the chart using Chart.js
    var chart1 = new Chart(ctx1, {
        type: 'line',
        data: {
        labels: ages,
        datasets: [{
            label: 'House Value',
            data: houseValues,
            borderColor: 'blue',
            fill: false
        },
        {
            label: 'Income',
            data: incomes,
            borderColor: 'green',
            fill: false
        }]
        },
        options: {
            plugins: {
                title: {
                display: true,
                text: 'Income and Home Value Compared to Age.',
                font: {
                    size: 16,
                    weight: 'bold'
                }
                }
            },
            responsive: true,
            scales: {
                x: {
                title: {
                    display: true,
                    text: 'Age'
                }
                },
                y: {
                title: {
                    display: true,
                    text: 'House Value'
                }
                }
            }
        }
    });

}
function createAmountChart(data){
    // Reset the canvas so i can use it.
    strResult = '<canvas id="myChart2" style="width:100%;max-width:1000px;max-height:500px;"></canvas>'
    $("#chart").html(strResult);
    // Count the number of "private" and "commercial" values
    var privateCount = 0;
    var commercialCount = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].CarUse === "Private") {
            privateCount++;
        } else if (data[i].CarUse === "Commercial") {
            commercialCount++;
        }
    }
    const ctx2 = document.getElementById('myChart2');
    var chart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Private', 'Commercial'],
            datasets: [{
                label: 'Car Amount',
                data: [privateCount, commercialCount],
                backgroundColor: ['blue', 'green']
            }]
        },
        options: {
            plugins: {
            title: {
                display: true,
                text: 'Private vs Commercial Vehicles.',
                font: {
                    size: 16,
                    weight: 'bold'
                }
                }
            },
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }
        }
    });

}