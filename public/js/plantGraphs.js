var plantID = d3.select("#hidden").attr("value") // Get PlantID from hidden attribute

console.log(plantID);

if (plantID == ""){
    plantID = 1
}

d3.json('http://localhost:3000/api/plantName/'+plantID)
    .then(function(data) { 
        console.log(data[0].plantName);
        d3.select('.jumbo-text').text(data[0].plantName)
    });

var svgLight = d3.select("#light"),
    svgMoisture = d3.select("#moisture"),
    margin = 200,
    width = svgLight.attr("width") - margin,
    height = svgLight.attr("height") - margin,
    barW = width-margin

svgLight.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", width/4)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("Light Graph")

svgMoisture.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", width/4)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("Moisture Graph")

var gLight = svgLight.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

var gMoisture = svgMoisture.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.json('http://localhost:3000/api/plant/'+plantID)
    .then(function(data) {

        data = data.slice(-100)

        var strictIsoParse = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")

        var start = strictIsoParse(data[0].createdAt)
        var end = strictIsoParse(data[99].createdAt)

        var xScale = d3.scaleTime()
            .domain([start, end])
            .range([0, width-margin/2])

        var yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0])


        gLight.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", 50)
            .attr("x", width-margin/2 - 50)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Time of Day");

        gLight.append("g")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Light Level");

        gLight.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return xScale(strictIsoParse(d.createdAt)) }) //d is row object
            .attr("y", function(d) { return yScale(d.light); })
            .attr("width", barW/100)
            .attr("height", function(d) { return height - yScale(d.light); });

        gMoisture.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", 50)
            .attr("x", width-margin/2 - 50)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Time of Day");

        gMoisture.append("g")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Moisture Level");

        gMoisture.selectAll(".bar2")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar2")
            .attr("x", function(d) { return xScale(strictIsoParse(d.createdAt)) }) //d is row object
            .attr("y", function(d) { return yScale(d.moisture); })
            .attr("width", barW/100)
            .attr("height", function(d) { return height - yScale(d.moisture); });

    });