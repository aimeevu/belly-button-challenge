function demoInfo(sample)
{
    console.log(sample)

    d3.json("samples.json").then((data) => {
        let metaData = data.metaData;
        console.log(metaData);

        let result = metaData.filter(sampleResult => sampleResult.id == sample);
    })
}

function initialize()
{
    // Load data from json file
    //let data = d3.json("samples.json");
    //console.log(data);

    // Accesses the dropdown selector from index.html
    var select = d3.select("#selDataset");
    
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;
        console.log(sampleNames);

        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });

        let sample1 = sampleNames[0];

        demoInfo(sample1)
    });

}

function optionChanged(item)
{
    console.log(item)
}

initialize();