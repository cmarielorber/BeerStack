//carousel input
const carouselimg1 = document.querySelector('#carouselimg1');
const carouselimg2 = document.querySelector('#carouselimg2');
const carouselimg3 = document.querySelector('#carouselimg3');
const carimg1caption = document.querySelector ('#carimg1caption');
const carimg2caption = document.querySelector ('#carimg2caption');
const carimg3caption = document.querySelector ('#carimg3caption');
const car1address = document.querySelector ('#car1address');
const car2address = document.querySelector ('#car2address');
const car3address = document.querySelector ('#car3address');


//get access to yelp fusion using bearer token to print to carousel
function getdata() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer d-Zk9Nv2t5lmfuhdEBns4h0UgeAFRUV3-eubcRfjSaPKo5aFhZSi_8qfL7xtTsYghIBiwSmEvaA-yZ0L83ac-wgfOQST-XQqCJ0D7QCKPosrrFnLQu0rL0iK9TVjY3Yx");

    let requestOptions = {
        method: 'GET', //get data string
        headers: myHeaders, //above info in api
        redirect: 'follow' //follow the response of http status
    };
    // fetch data return breweries and print to console 
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=breweries&location=San Diego`, requestOptions)
        .then(response => response.json()) //parse the brewery info as json
        .then(result => {
            getRandombrew(result.businesses); //get random businesses for carousel
        })
        // if promise to return the string of breweries is rejected
        .catch(error => console.log('error', error));
}

function getRandombrew(businesses){
    //for loop through breweriers randomly for images, names and urls
    const ranbusinesses= [];
    for (let i=0; i < 3; i++) {
        const ranIndex= Math.floor(Math.random()*businesses.length);
        const ranbusiness = businesses [ranIndex];
        ranbusinesses.push(ranbusiness);
    };
    displaycar(ranbusinesses); //display on carousel
}

function displaycar(randbusinesses){
    carouselimg1.setAttribute('src',randbusinesses[0].image_url); //display images
    carouselimg2.setAttribute('src',randbusinesses[1].image_url); //display images
    carouselimg3.setAttribute('src',randbusinesses[2].image_url); //display images
    carouselimg1.parentElement.setAttribute('href', randbusinesses[0].url); //clickable image to take user to yelp page
    carouselimg2.parentElement.setAttribute('href', randbusinesses[1].url); //clickable image to take user to yelp page
    carouselimg3.parentElement.setAttribute('href', randbusinesses[2].url); //clickable image to take user to yelp page
    carimg1caption.textContent = randbusinesses[0].name; //display corresponding name
    carimg2caption.textContent = randbusinesses[1].name; //display corresponding name
    carimg3caption.textContent = randbusinesses[2].name; //display corresponding name
    car1address.textContent = randbusinesses [0].location.display_address.join(", "); //display corresponding address
    car2address.textContent = randbusinesses [1].location.display_address.join(", "); //display corresponding address
    car3address.textContent = randbusinesses [2].location.display_address.join(", "); //display corresponding address

}

getdata() //carousel function
