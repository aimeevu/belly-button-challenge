
// Function will populate metadata
function demoInfo(sample){
    //console.log(sample)

    // D3 to get data
    d3.json("static/js/samples.json").then((data) => {
        // Grab all metadata
        let metaData = data.metadata;
        console.log(metaData);

        // Filter for value of sample (should return one result in an array)
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        // Access array of sample
        let resultData = result[0];
        //console.log(resultData);

        d3.select("#sample-metadata").html("");

        // Get key value pairs
        Object.entries(resultData).forEach(([key, value]) => {
            // Add to the sample data / demographics section
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
    });
}

function buildBarChart(sample){
    //console.log(sample);
    //let data = d3.json("samples.json");
    //console.log(data);

    d3.json("static/js/samples.json").then((data) => {
        let sampleData = data.samples;
        //console.log(sampleData);

        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        let resultData = result[0];
        //console.log(resultData);

        // Pull and store data from otu_ids, otu_labels, and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);

        // Build bar chart
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        //console.log(yticks);
        let xValues = sample_values.slice(0, 10);
        //console.log(xValues);
        let textLabels = otu_labels.slice(0, 10);
        //console.log(textLabels);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);
    });
}

// Function to build bubble chart
function buildBubbleChart(sample){
    //console.log(sample);
    //let data = d3.json("samples.json");
    //console.log(data);

    d3.json("static/js/samples.json").then((data) => {
        let sampleData = data.samples;
        //console.log(sampleData);

        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        let resultData = result[0];
        //console.log(resultData);

        // Pull and store data from otu_ids, otu_labels, and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);

        // Build bubble chart

        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                sizes: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let layout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);
    });
}

// Function that will run on start up
function initialize(){
    // Load data from json file
    let data = d3.json("static/js/samples.json");
    console.log(data);

    // Accesses the dropdown selector from index.html
    var select = d3.select("#selDataset");
    
    d3.json("static/js/samples.json").then((data) => {
        let sampleNames = data.names;
        //console.log(sampleNames);

        // Finds one sample to load charts and demographic info
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });

        let sample1 = sampleNames[0];

        // Calls function to build metadata
        demoInfo(sample1);

        // Calls function to build barchart
        buildBarChart(sample1);

        // Calls function to build bubble chart
        buildBubbleChart(sample1);
    });

}

// Function to update drop down when selection changes
function optionChanged(item){
    // Calls function to update metadata
    demoInfo(item);
    //console.log(item)

    // Calls function to build the bar chart
    buildBarChart(item);

    // Call function to build bubble chart
    buildBubbleChart(item);
}

// Calls to initialize function
initialize();