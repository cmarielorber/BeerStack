const newBeerHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const name = document.querySelector('#beer-input-add').value.trim();
  console.log('######', name);
  if (content) {
      const response = await fetch('/api/beer', {
          method: 'POST',
          body: JSON.stringify({ name }),
          headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
          console.log('$$$$$$$$$$$$$$$$$$$$$$',response.ok)
          // document.location.replace("/beerpost");
      } else {
          alert('Error');
      }
  }
};

// $(function () {
//     // Get the text for the Handlebars template from the script element.
// let templateText = $("#tableTemplate").html();

//     // Compile the Handlebars template.
//     let tableTemplate = Handlebars.compile(templateText);

//       // Define an array of people.
//     let people = [
//       { "Id": 1, "First Name": "Anthony", "Last Name": "Nelson", "Age": 25 },
//       { "Id": 2, "First Name": "Helen", "Last Name": "Garcia", "Age": 32 },
//       { "Id": 3, "First Name": "John", "Last Name": "Williams", "Age": 48 }
//     ];

//     // Evaluate the template with an array of people and set the HTML
//     // for the people table.
//     $("#people").html(tableTemplate({ array: people }));

//   });
// Deine an array of smart phones.
document
  .querySelector('#newBeer-form')
  .addEventListener('submit', newBeerHandler);
