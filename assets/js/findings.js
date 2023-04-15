d3.csv("https://2207-resources.s3.ap-southeast-1.amazonaws.com/student-mat.csv")
  .then(function(data) {
    if (!Array.isArray(data)) {
      throw new Error("Data is not an array.");
    }

    var xData = data.map(function(d) { return d.famrel; });
    var yData = data.map(function(d) { return d.G3; });
    var romanticData = data.map(function(d) { return d.romantic; });
    var x2Data = data.map(function(d) { return d.goout; });


// Function to calculate linear regression coefficients (slope and intercept)
function linearRegression(x, y) {
    console.log(x);
    console.log(y);

    const n = x.length;
    //console.log(n);
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    for (let i = 0; i < n; i++) {
      //console.log("in loop")
      sumX += parseFloat(x[i]);
    //  console.log(sumX);
      sumY += parseFloat(y[i]);
      //console.log(sumY);
      sumXY += x[i] * y[i];
      //console.log(sumXY);
      sumX2 += x[i] * x[i];
      //console.log(sumX2);
    }
    numerator = (n * sumXY) - (sumX * sumY);
    denominator = n * sumX2 - sumX * sumX
    console.log(numerator);
    console.log(denominator);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
  }
  // Perform linear regression
  //console.log(xData);
  //console.log(yData);
  const { slope, intercept } = linearRegression(xData, yData);
  // Print the slope
  console.log("Regression slope:", slope);



      // Create the regression line trace
      var regressionTrace = {
        x: xData,
        y: xData.map(function(d) { return slope * d + intercept; }),
        mode: 'lines',
        type: 'line',
        line: {
          color: 'coral',
          width: 3
        }
      };
    
      // Define the layout for the chart
      var layout = {
        title: 'Regression 1: Effect of Family Relationship on GPA',
        xaxis: { title: 'Quality of Family Relationship' },
        yaxis: { title: 'Final Grade',
                 range: [8, 13],}, // set the range of y-axis
      };
    
      // Create the plot using Plotly.newPlot
      Plotly.newPlot('regression', [regressionTrace], layout)



//Graph with moderation by romatic relationship

// Group data by romantic status
var groups = {};
for (var i = 0; i < romanticData.length; i++) {
    var groupName = romanticData[i];
    if (!groups[groupName]) {
        groups[groupName] = {
            x: [],
            y: [],
            name: groupName,
            type: 'scatter',
            mode: 'markers',
            marker: {
                size: 6
            }
        };
    }
    groups[groupName].x.push(xData[i]);
    groups[groupName].y.push(yData[i]);
}

// Perform linear regression for each group
var groupSlopes = {};
var groupIntercepts = {};
for (var groupName in groups) {
    var group = groups[groupName];
    const { slope, intercept } = linearRegression(group.x, group.y);
    groupSlopes[groupName] = slope;
    groupIntercepts[groupName] = intercept;
}

// Create the regression lines for each group
var regressionTraces = [];
for (var groupName in groups) {
    var regressionTrace = {
        x: [0, 5],
        y: [groupIntercepts[groupName], groupSlopes[groupName] * 5 + groupIntercepts[groupName]],
        mode: 'lines',
        type: 'line',
        line: {
            color: groupName === 'yes' ? 'indigo' : 'coral',
            width: 3
        },
        name: groupName
    };
    regressionTraces.push(regressionTrace);
}

// Create the data trace for the scatter plot with color based on romantic status
var dataTrace = {
    x: xData,
    y: yData,
    mode: 'markers',
    marker: {
        size: 8,
        color: data.map(function(d) {
            return d.romantic === 'yes' ? 'indigo' : 'coral'; // blue for 'yes', red for 'no'
        })
    },
    type: 'scatter',
    name: "Individual points"
};

// Create the layout for the chart
var layout = {
    title: 'Regression 2: Effect of Family Relationship on GPA Moderated by Romantic Relationships',
    xaxis: { title: 'Quality of Family Relationship' },
    yaxis: { title: 'Final Grade', range: [4, 16] }, // set the range of y-axis
    showlegend: true
};

// Combine the regression and data traces into a single array
var traces = regressionTraces.concat(dataTrace);

// Create the plot using Plotly.newPlot
Plotly.newPlot('moderation', traces, layout);




//Code for regression line for 2nd independent variable - going out

function linearRegression2(x, y) {
    console.log(x);
    console.log(y);

    const n = x.length;
    //console.log(n);
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    for (let i = 0; i < n; i++) {
      //console.log("in loop")
      sumX += parseFloat(x[i]);
    //  console.log(sumX);
      sumY += parseFloat(y[i]);
      //console.log(sumY);
      sumXY += x[i] * y[i];
      //console.log(sumXY);
      sumX2 += x[i] * x[i];
      //console.log(sumX2);
    }
    numerator = (n * sumXY) - (sumX * sumY);
    denominator = n * sumX2 - sumX * sumX
    console.log(numerator);
    console.log(denominator);

    const slope2 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept2 = (sumY - slope * sumX) / n;
    return { slope2, intercept2 };
  }

  // Perform linear regression
  //console.log(x2Data);
  //console.log(yData);
  const { slope2, intercept2 } = linearRegression2(x2Data, yData);
  // Print the slope
  console.log(" 2 Regression slope:", slope2);



      // Create the regression line trace
      var regressionTrace2 = {
        x: x2Data,
        y: x2Data.map(function(d) { return slope2 * d + intercept2; }),
        mode: 'lines',
        type: 'line',
        line: {
          color: 'indigo',
          width: 3
        }
      };
    
      // Define the layout for the chart
      var layout = {
        title: 'Regression 3: Effect of Going Out with Friends on GPA',
        xaxis: { title: 'Going out frequency' },
        yaxis: { title: 'Final Grade',
                 range: [5, 15],}  // set the range of y-axis
      };
    
      // Create the plot using Plotly.newPlot
      Plotly.newPlot('regression2', [regressionTrace2], layout)

  });