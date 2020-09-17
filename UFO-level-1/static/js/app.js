// Set variables to call data from data.js & the table body from the html.
var tableData = data;
var tbody = d3.select("tbody");

// Create a function that will handle the creation of the html table.
function createTable (data) {
  // Clear the table before new table is built.
  tbody.html("");
  // Utilize for loop to iterate through each object in the data.
  data.forEach((UFOreport) => {
      // Set a variable for row & use d3 to append one table row for each UFO report object.
      var row = tbody.append("tr");
      // Use `Object.entries` & for loop to iterate through each object to find the key & value.
      Object.entries(UFOreport).forEach(([key, value]) => {
          // Set a variable for cell & use d3 again to append a cell to the row for each value.
          var cell = row.append("td");
          // Update each cell's text with the UFO report values.
          cell.text(value);
      });
  });
};

// Create an event handler function for the form inputs.
function runEnter() {
  // Prevent the page from refreshing.
  d3.event.preventDefault();  
  // Set a variable for each of the form inputs and select the input element.
  var inputDate = d3.select("#datetime");
  var inputCity = d3.select("#city");
  var inputState = d3.select("#state");
  var inputShape = d3.select("#shape");
  // Set a variable for the input value of each input element & get the value property.
  var dateValue = inputDate.property("value");
  var cityValue = inputCity.property("value");
  var stateValue = inputState.property("value");
  var shapeValue = inputShape.property("value");
  // Set the data to a variable so can continue to filter down.
  var filteredData = tableData;
  //  Create an exception for each input value to gather each input if present and store in filteredData otherwise do nothing.
  if (dateValue) {
    filteredData = filteredData.filter(sighting => sighting.datetime === dateValue);
  };
  if (cityValue) {
    filteredData = filteredData.filter(sighting => sighting.city === cityValue);
  };
  if (stateValue) {
    filteredData = filteredData.filter(sighting => sighting.state === stateValue);
  };
  if (shapeValue) {
    filteredData = filteredData.filter(sighting => sighting.shape === shapeValue);
  };
  // Create the new table based upon the stored filteredData.
  createTable(filteredData);
  // Display in the console the results of the filter.
  console.log(filteredData);
};

// Set variable to call the button from the html & select the button id.
var button = d3.select("#filter-btn");

// Create an event handler for when the filter button is engaged.
button.on("click", runEnter);

// Create the initial table based upon the intial data set before being filtered.
createTable(tableData);