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
    });
}

initialize();