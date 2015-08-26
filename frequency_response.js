
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.log()
    .domain([1, 1000])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([-40, 0])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(3, function(d) { return tickFormat(d) + 'Hz'; })
    .tickSize(-height);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-width);

var tickFormat = d3.format("s");


//Define the Line
var valueLine = d3.svg.line()
    .x(function(d) { return x(d.frequency); })
    .y(function(d) { return y(d.gain) });
  

//Add svg canvas
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Get fake data
d3.csv("fakeData.csv", function(error, data) {

    data.forEach(function(d){ console.log(d.frequency + "|" + d.gain) });
    svg.append("rect")
        .attr("width", width)
        .attr("height", height);
     
     // Append Path
     svg.append("path")
        .attr("class", "line")
        .attr("d", valueLine(data));


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);


    })
     
    
 // end of d3 json


function cutoffFreq(resistor, capacitor) {
  return 1 / (2 * resistor * capacitor * Math.PI);
};

function outputVoltage(resistor, capacitor, frequency) {
  // xC is capacitive reactance in ohms
  var xC = 1 / (2 * Math.PI * frequency * capacitor)
  console.log("Capacitive reactance = " + xC);
  return resistor / (Math.sqrt( Math.pow(resistor, 2) + Math.pow(xC,2)));
};

function dbGain(outputVoltage) {
  return 20 * Math.log(outputVoltage/1);
};

function printValue(elem) {
  elem.preventDefault();
  var capacitorValue = document.getElementById('capacitor').value;
  var toneValue = document.getElementById('tone').value;
  var freq = cutoffFreq(toneValue, capacitorValue);
  var outputVolts = outputVoltage(toneValue, capacitorValue, freq);

  console.log("Cutoff Freq is: " + freq + 'Hz');


  for (var freq = 0; freq < 20000; freq += 1000) {
    var outputVolts = outputVoltage(toneValue, capacitorValue, freq);
    var gain = dbGain(outputVolts);
    console.log("The output voltage for 1 volt at " + freq + "Hz = " + outputVolts +'volts');
    console.log("The output gain is " + gain + "dB");
  }
  console.log('');

}



var form = document.getElementById('guitar-pickup-form');
form.addEventListener('submit', function(event) {
  printValue(event)
}, false);

