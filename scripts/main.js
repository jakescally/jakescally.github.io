// Change image stuff
const myImage = document.querySelector("img");
myImage.onclick = () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/orange-moon.png") {
        myImage.setAttribute("src", "images/orion-nebula.png");
    } else {
        myImage.setAttribute("src", "images/orange-moon.png");
    }
};

// Button stuff
let myButton = document.querySelector("button");
let myHeader = document.querySelector("h1");


function setUserName() {
    const myName = prompt("Please enter your name.");
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeader.textContent = "Here are photos, " + myName;
    }
}

if (localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    myHeader.textContent = "Here's some photos, " + storedName;
}

myButton.onclick = () => {
    setUserName();
}