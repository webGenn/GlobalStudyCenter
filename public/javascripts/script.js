// Navigation

let navbar = document.getElementById("navbar");

function hideMenu(){
    navbar.style.top = "-120vh";
}
function showMenu(){
    navbar.style.top = "0";
}

// About us

let skillTab = document.getElementById("tab_contentSkill");
let expTab = document.getElementById("tab_contentExp");
let eduTab = document.getElementById("tab_contentEdu");

let skill = document.getElementById("skill");
let exp = document.getElementById("exp");
let edu = document.getElementById("edu");

function showSkills(){
    skillTab.classList.add("active_tab");
    expTab.classList.remove("active_tab");
    eduTab.classList.remove("active_tab");

    skill.style.color = "#f40c56";
    exp.style.color = "#ababab";
    edu.style.color = "#ababab";
}

function showExp(){
    expTab.classList.add("active_tab");
    skillTab.classList.remove("active_tab");
    eduTab.classList.remove("active_tab");
    
    exp.style.color = "#f40c56";
    skill.style.color = "#ababab";
    edu.style.color = "#ababab";
}

function showEdu(){
    eduTab.classList.add("active_tab");
    skillTab.classList.remove("active_tab");
    expTab.classList.remove("active_tab");

    edu.style.color = "#f40c56";
    skill.style.color = "#ababab";
    exp.style.color = "#ababab";
}


// Contact Form Validation

let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let cityError = document.getElementById("cityError");
let phoneError = document.getElementById("phoneError");
let genderError = document.getElementById("genderError");
let msgError = document.getElementById("msgError");

function nameValid(){
    let name = document.getElementById("name");
    if(name.value == ""){
        nameError.innerHTML = "Name is required";
        nameError.style.color = "red";
        return false
    }
    if(name.value.length < 4){
        nameError.innerHTML = "Name is short";
        nameError.style.color = "red";
        return false
    }
    if(name.value.length > 30){
        nameError.innerHTML = "Name is long";
        nameError.style.color = "red";
        return false;
    }
    else{
        nameError.innerHTML = "It Looks Good!";
        nameError.style.color = "green";
        return true;
    }
}

function emailValid(){
    let email = document.getElementById("email");
    if(email.value == ""){
        emailError.innerHTML = "Email is required";
        emailError.style.color = "red";
        return false
    }
    else{
        emailError.innerHTML = "Email Is Valid";
        emailError.style.color = "green";
        return true
    }
}

function cityValid(){
    let city = document.getElementById("city");
    if(city.value == ""){
        cityError.innerHTML = "City Is Required";
        cityError.style.color = "red";
        return false
    }
    if(city.value.length < 5){
        cityError.innerHTML = "City Name Is short";
        cityError.style.color = "red";
        return false
    }
    if(city.value.length > 25){
        cityError.innerHTML = "City Name Is long";
        cityError.style.color = "red";
        return false
    }
    else{
        cityError.innerHTML = "It Looks Good";
        cityError.style.color = "green";
        return true
    }

}

function phoneValid(){
    let phone = document.getElementById("phone");
    if(phone.value == ""){
        phoneError.innerHTML = "Phone Number is required";
        phoneError.style.color = "red";
        return false
    }
    if(phone.value.length !== 10){
        phoneError.innerHTML = "Number Must Be 10 Digits";
        phoneError.style.color = "red";
        return false
    }
    if(phone.value.charAt(0) != 9 && phone.value.charAt(0) != 8 && phone.value.charAt(0) != 7 && phone.value.charAt(0) != 6){
        phoneError.innerHTML = "Invalid Number";
        phoneError.style.color = "red";
        return false
    }
    else{
        phoneError.innerHTML = "Phone Number is valid";
        phoneError.style.color = "green";
        return true
    }
}

function msgValid(){
    let msg = document.getElementById("msg");
    if(msg.value == ""){
        msgError.innerHTML = "Message is required";
        msgError.style.color = "red";
        return false
    }
    if(msg.value.length < 10){
        msgError.innerHTML = "More Characters Required";
        msgError.style.color = "red";
        return false
    }
    if(msg.value.length > 150){
        msgError.innerHTML = "Less Characters Required";
        msgError.style.color = "red";
        return false
    }
    else{
        msgError.innerHTML = "It Looks Good!";
        msgError.style.color = "green";
        return true
    }
}

function contactFormValid(){
    if(!nameValid() || !emailValid() || !cityValid() || !phoneValid() || !msgValid()){
        return false
    }
    else{
        return true
    }
}