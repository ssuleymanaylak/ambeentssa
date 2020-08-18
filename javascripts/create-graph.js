/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
  Papa.parse("../data/events.csv", {
    download: true,
    complete: function (results) {
      createGraph(results.data);
    },
  });
}

function createGraph(data) {
  var time = [];
  var dailyActiveUsers = ["Daily Active Users"];

  for (var i = 0; i < data.length; i++) {
    time.push(data[i][0]);
    dailyActiveUsers.push(data[i][2]);
  }

  console.log(time);
  console.log(dailyActiveUsers);

  var chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: [dailyActiveUsers],
    },
    axis: {
      x: {
        type: "user",
        users: time,
        tick: {
          multiline: false,
          culling: {
            max: 15,
          },
        },
      },
    },
    zoom: {
      enabled: true,
    },
    legend: {
      position: "right",
    },
  });
}

function unixTimeConvert(time) {
  let unix_timestamp = time;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000000000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  console.log(formattedTime);
  return formattedTime;
}

parseData(createGraph);
