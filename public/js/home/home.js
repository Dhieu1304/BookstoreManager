



let statisticsMonthss;

async function initData(){
    statisticsMonthss = await getAllStatisticMonthByYear(new Date().getFullYear());

    console.log("statisticsMonthss: ", statisticsMonthss);
    // if(statisticsMonths){

    // }
}

function initUI(){
    const labels = statisticsMonthss.map(function(x){
        return x.month + 1;
    });

    // console.log("xxx: ", xxx);

    const importTotalMoneyData= statisticsMonthss.map(function(x){return x.importTotalMoney;});
    const saleTotalMoneyData= statisticsMonthss.map(function(x){return x.saleTotalMoney;});
    const billTotalMoneyData= statisticsMonthss.map(function(x){return x.billTotalMoney;});


    const statisticsByMonthBarEle = document.getElementById("statisticsByMonthBar");
    const statisticsByMonthBar = new Chart(statisticsByMonthBarEle, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: 
        [
            {
                label: "Import",
                backgroundColor: "#3DE124",
                borderColor: "rgba(2,117,216,1)",
                data: importTotalMoneyData,
            },
            {
                label: "Sale",
                backgroundColor: "rgba(2,117,216,1)",
                borderColor: "rgba(2,117,216,1)",
                data: saleTotalMoneyData,
            },
            {
                label: "Bill",
                backgroundColor: "#E41D4B",
                borderColor: "rgba(2,117,216,1)",
                data: billTotalMoneyData,
            },  
        ]
    },
    options: {
        scales: {
        xAxes: [{
            time: {
            unit: 'month'
            },
            gridLines: {
            display: false
            },
            ticks: {
            maxTicksLimit: 6
            }
        }],
        yAxes: [{
            ticks: {
            min: 0,
            max: 1337440240,
            maxTicksLimit: 5
            },
            gridLines: {
            display: true
            }
        }],
        },
        legend: {
        display: false
        }
    }
    });


    var statisticsByMonthLineEle = document.getElementById("statisticsByMonthLine");
    var statisticsByMonthLine = new Chart(statisticsByMonthLineEle, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Import",
          lineTension: 0.3,
          backgroundColor: "color: rgba(61, 225, 36,0.2);",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: importTotalMoneyData
        },
        {
            label: "Sale",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: saleTotalMoneyData
          },
          {
            label: "Bill",
            lineTension: 0.3,
            backgroundColor: "rgba(222, 25, 25, 0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: billTotalMoneyData
          }
        ],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 1337440240,
              maxTicksLimit: 5
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
    
}


$(document).ready(async function() {

    await initData();

    initUI();


})



/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Ajax function--------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------- */


async function getAllStatisticMonthByYear (year){

    let statisticsMonths = null;
    await $.ajax({
        url: `/api/statistics/month/${year}`,
        method: 'GET',
        success(data){
            statisticsMonths = data.statisticsMonths;
            console.log(`statisticsMonths của ${year} là:`, statisticsMonths);
        }
    });       

    return statisticsMonths;
}