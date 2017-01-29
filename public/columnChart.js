var ColumnChart = function(containerToAdd, seriesToAdd) {

  var chart = new Highcharts.Chart({
    chart: {
      type: "column",
      renderTo: containerToAdd
    },
    title: {
      text: "Cairngorm Snow Data"
    },
    series: seriesToAdd,
    xAxis: {
      categories: ["Time"]
    },
    yAxis: {
      title: {
          text: "Snowfall in mm"
        }
    }
  });

}