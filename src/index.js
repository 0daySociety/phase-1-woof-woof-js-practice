document.addEventListener("DOMContentLoaded", intialize);

function intialize() {
  fetchdata();
}

function fetchdata() {
  fetch("http://localhost:3000/pups")
    .then((response) => response.json())
    .then((array) =>
      array.forEach((element) => {
        renderDogs(element);
      })
    );
}

function renderDogs(dogData) {
  let dog_bar = document.querySelector("#dog-bar");
  let dogbutton = document.createElement("button");
  dogbutton.id = "dogButton";
  dogbutton.innerText = dogData.name;
  dog_bar.appendChild(dogbutton);

  dogbutton.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/pups/${dogData.id}`)
      .then((response) => response.json())
      .then((data) => displayDog(data));
  });
}

function displayDog(doggy) {
  let dog_info = document.querySelector("#dog-info");

  let html = `<img src=${doggy.image} alt="">
 <h1>${doggy.name} </h1>
 <button id="mood"></button>
`;
  dog_info.innerHTML = html;

  let mood = document.querySelector("#mood");
  if (doggy.isGoodDog === true) {
    mood.innerText = "dog Good";
  } else if (doggy.isGoodDog === false) {
    mood.innerText = "Bad Good";
  }

  mood.addEventListener("click", (e) => {
    e.preventDefault();

    updateCount(doggy);
  });
}

function updateCount(data){

    let myCounter=data.counter;
    myCounter+=1
    
    let newValue={increment:myCounter}
    console.log()
    
    fetch(`http://localhost:3000/pups/${data.id}`,
    {
      method:"PATCH",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(newValue)  
    })
    .then(response=>response.json())
    .then(data=>console.log(data))
    
    
    


}