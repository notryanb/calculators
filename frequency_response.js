

var width = 500;
var height = 500;
// var svgAxisPadding = 20;

var margin = {top: 210, right: 20, bottom: 220, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.log()
    .domain([10, 10000])
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(1, 20000)
    .tickSize(6, 0);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.right + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);

 // var bars = canvas.selectAll('rect')
 //                 .data(dataArray)
 //                 .enter()
 //                     .append('rect')
 //                     .attr('width', function(dataElem) { 
 //                                       return widthScale(dataElem); 
 //                                     })
 //                     .attr('height', 50)
 //                     .attr('fill', function(dataElem) {
 //                                       return colorScale(dataElem);
 //                                   })
 //                     .attr('y', function(dataElem, index) {
 //                                   return index * 100;
 //                                 });
 // canvas.append('g').attr('transform', "translate(0, 100)")
 //       .call(axis);

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