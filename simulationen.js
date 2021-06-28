var points = document.getElementsByClassName("bouncyPoint");
var physicDiv = document.getElementById("physicDiv");
var startHeight = (physicDiv.clientHeight - points[0].clientHeight) / 2;
const pointCount = 80;
var heights = new Array(pointCount).fill(0);
var speeds = new Array(pointCount).fill(0);
var updateCalculate = 1;


for (var index = 0; index < pointCount; ++index) {
    points[index].style.backgroundColor = "orange";
    points[index].style.marginTop = String(startHeight) + "px";
}

plotHeights();

setInterval(calculateHeights, updateCalculate);
var sinwave = setInterval(createSinWave, 10)

var iteration = 0;
function createSinWave() {
    heights[0] = Math.sin(iteration * Math.PI) * 60;
    iteration += 0.002;

    //only one sinwave, comment for continuous wave
    if(iteration >= 2) clearInterval(sinwave);
}



function plotHeights() {
    for (var index = 0; index < pointCount; ++index) {
        points[index].style.marginTop = String(startHeight - heights[index]) + "px";
    }
}
function calculateHeights() {
    var stringTension = 100;
    
    for (var index = 1; index < pointCount; ++index) {
        var a = 0;
        
        if (index != 0)
            a += ((heights[index - 1] - heights[index]) * stringTension);
        if (index != pointCount - 1)
            a += (heights[index + 1] - heights[index]) * stringTension;
        speeds[index] += a * updateCalculate / 1000;
        heights[index] += speeds[index] * updateCalculate / 1000;
    }
    plotHeights();
}



