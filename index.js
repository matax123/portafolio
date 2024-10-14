new WOW().init()

window.onload = async function () {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let myImage = document.getElementById("myImage");
    myImage.style.height = "0px";
    handleResize();
    window.addEventListener('resize', function () {
        handleResize();
    });
    myImage.classList.remove("d-none");

    document.getElementById("loading").close();
    document.querySelector('.preload').classList.remove('preload');
}


function handleResize() {
    let windowWidth = window.innerWidth;
    let myImage = document.getElementById("myImage");
    let img = myImage.querySelector("img");
    let header = document.getElementById("header");
    let firstSection = document.getElementById("firstSection");
    let secondSection = document.getElementById("secondSection");
    let children = Array.from(secondSection.querySelectorAll("div div div div"));

    img.height = header.offsetHeight + firstSection.offsetHeight;

    if (windowWidth < 400) {
        img.height = 0;
        children.forEach(child => {
            console.log(child)
            child.className = "d-flex flex-wrap justify-content-center align-items-center w-100 gap-2"
        });
    }
    else if (windowWidth < 993) {
        img.height = firstSection.offsetHeight;
        img.style.marginTop = header.offsetHeight + "px";
        children.forEach(child => {
            child.className = "d-flex flex-wrap justify-content-center align-items-center gap-3"
        });
    }
    else {
        img.style.marginTop = "0px";
        children.forEach(child => {
            child.className = "d-flex flex-wrap justify-content-center align-items-center gap-3"
        });
    }
}

async function sendEmail(event) {
    let send = event.target.children[0];
    let loading = event.target.children[1];
    try{
        event.preventDefault();
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;
        var to = 'matiasortiz01@outlook.com'
    
        if (name == "" || email == "" || message == "") return alert("Please fill all the fields");
    
        let url = `https://email-sender-9qlw.onrender.com/contact?name=${name}&from=${email}&to=${to}&subject=Nuevo mensaje de contacto&message=${message}`;
        let response = await fetch(url);
    
        if (response.ok) {
            alert("Message sent successfully");
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        }
        else throw new Error("Message could not be sent");
    }
    catch(e){
        alert("Message could not be sent");
    }
    finally{
        send.classList.remove("d-none");
        loading.classList.add("d-none");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var navbarCollapse = document.querySelector('.navbar-collapse');

    navbarCollapse.addEventListener('hidden.bs.collapse', function () {
        handleResize();
    });

    navbarCollapse.addEventListener('shown.bs.collapse', function () {
        handleResize();
    });
});