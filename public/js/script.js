// On Load - Keeps Local Storage, Shows Modal
$(window).on("load", function () {
  $("#modal").modal("show");
  bucketListRefresh();
});

//Filters and removes duplicate array
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

//Adds to local storage
const addBrewery = function (name) {
  let storedBrews = [];
  if (localStorage.storedBrews == undefined) {
    storedBrews.push(name);
  } else {
    storedBrews = JSON.parse(localStorage.storedBrews);
    storedBrews.push(name);
  }
  storedBrews = removeDuplicates(storedBrews);
  localStorage["storedBrews"] = JSON.stringify(storedBrews);

  bucketListRefresh();
};

//Gets data from LocalStorage and displays onto list
//Remove button (onclick) will remove from list & Local Storage
const bucketListRefresh = function () {
  let ul = document.getElementById("brew-list");
  ul.innerHTML = "";
  getBrews = JSON.parse(localStorage.storedBrews);

  for (let i = 0; i < getBrews.length; i++) {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    li.classList.add("listSpace");
    li.appendChild(document.createTextNode(getBrews[i]));
    btn.appendChild(document.createTextNode("X"));
    btn.classList.add("removeBtn");
    btn.addEventListener("click", function () {
      let brewInd = i;
      let brewsArray = getBrews;
      brewsArray.splice(brewInd, 1);
      localStorage.storedBrews = JSON.stringify(brewsArray);
      bucketListRefresh();
    });

    li.appendChild(btn);
    ul.appendChild(li);
  }
};

//Search Button (Brewme) sends data to Table
//Table will append AddButton
//Add Button => Local Storage
const searchBrewery = function () {
  document.getElementById("tableBrew").setAttribute("class", "table");
  document.getElementById("brew-table-body").innerHTML = null;
  let searchTerm = document.getElementById("usrSearch").value;
  let searchLocation = document.getElementById("usrLocation").value;
  let SDfetchRequest;

  if (searchLocation == "") {
    searchLocation = "San Diego";
  }

  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer d-Zk9Nv2t5lmfuhdEBns4h0UgeAFRUV3-eubcRfjSaPKo5aFhZSi_8qfL7xtTsYghIBiwSmEvaA-yZ0L83ac-wgfOQST-XQqCJ0D7QCKPosrrFnLQu0rL0iK9TVjY3Yx"
  );
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&categories=breweries&location=${searchLocation}&term=${searchTerm}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      SDfetchRequest = JSON.parse(result);

      for (i = 0; i < SDfetchRequest.businesses.length; i++) {
        let business = SDfetchRequest.businesses[i];
        let busName = business.name;
        let brewBody = document.getElementById("brew-table-body");
        let brewRow = document.createElement("tr");
        let brewName = document.createElement("td");

        brewName.appendChild(document.createTextNode(business.name));
        brewRow.appendChild(brewName);

        let brewRating = document.createElement("td");
        brewRating.appendChild(document.createTextNode(business.rating));
        brewRow.appendChild(brewRating);

        let brewPrice = document.createElement("td");
        brewPrice.appendChild(document.createTextNode(business.price));
        brewRow.appendChild(brewPrice);

        let brewPhone = document.createElement("td");
        brewPhone.appendChild(document.createTextNode(business.phone));
        brewRow.appendChild(brewPhone);

        let brewURL = document.createElement("td");
        let brewLink = document.createElement("a");
        brewLink.setAttribute("href", business.url);
        brewLink.setAttribute("target", "_blank");
        brewLink.appendChild(document.createTextNode("Link"));
        brewLink.classList.add("brewLinkStyle");
        brewURL.appendChild(brewLink);
        brewRow.appendChild(brewURL);

        let brewButton = document.createElement("td");
        let btn = document.createElement("button");
        btn.addEventListener("click", function () {
          addBrewery(busName);
        });

        btn.appendChild(document.createTextNode("Add"));
        brewButton.appendChild(btn);
        brewRow.appendChild(brewButton);
        brewBody.appendChild(brewRow);
      }
    })
    .catch((error) => console.log("error", error));
};
