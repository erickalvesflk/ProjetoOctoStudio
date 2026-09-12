const HEADER = document.querySelector('header')
let menu_btn = document.querySelector("#menu-btn");
let nav_options_div = document.querySelector("#nav__options")
let nav_options_elements = document.querySelectorAll("li.nav__option")

document.addEventListener('DOMContentLoaded', ()=>{
    generateHeader()

    menu_btn = document.querySelector("#menu-btn")
    nav_options_div = document.querySelector("#nav__options")
    nav_options_elements = document.querySelectorAll("li.nav__option")
    
    menu_btn.addEventListener("click",menu_gui)
    load_nav_options_action()
})

function generateHeader(){
    const is_internal_page = window.location.pathname.includes("/web/pages/")
    const home_path = is_internal_page ? "../../../index.html" : ""
    const logo_path = is_internal_page ? "../../imgs/main/icon.png" : "web/imgs/main/icon.png"

    let title_div = document.createElement('div')
    title_div.innerHTML =(
    `<a href="${is_internal_page ? home_path : "index.html"}">
        <img src="${logo_path}" alt="Logo UERJ em parceria com Octostudio" id="icon">
        <h1 id="header__title">Projeto Octostudio</h1>
    </a>`
    )

    let nav = document.createElement('nav')
    nav.innerHTML = (
    `<button id="menu-btn">
            <i class="fa-solid fa-bars" id="menu-icon"></i>
    </button>
    <ul id="nav__options">
          <li class="nav__option"><a href="${home_path}#about-container">Inicio</a></li>
          <li class="nav__option"><a href="#">Formulário</a></li>
          <li class="nav__option"><a href="${home_path}#members-container">Participantes</a></li>
          <li class="nav__option"><a href="${home_path}#games-section">Jogos</a></li>
    </ul>`
    )

    HEADER.appendChild(title_div)
    HEADER.appendChild(nav)    
}

function load_nav_options_action(){
    nav_options_elements.forEach((nav, index) => {
        let hyper_link = nav.querySelector("a")
        if(hyper_link.innerText == "Formulário"){
            hyper_link.addEventListener("click",(event)=>{
                event.preventDefault() // reseta o funcionamento padrão do hyperlink ao ser clicado
                window.open("https://forms.gle/A7zwF59eVPxsNpJN6", "_blank");
            })
            return
        }else if(hyper_link.getAttribute("href")[0] === "."){
            hyper_link.addEventListener("click",(event)=>{
                window.location.href = hyper_link.getAttribute("href")
            })
            return
        }   
        hyper_link.addEventListener("click",(event)=>{
            event.preventDefault() // reseta o funcionamento padrão do hyperlink ao ser clicado
            let destination_element = document.querySelector(hyper_link.getAttribute("href"))
            let absolute_pos_element = destination_element.getBoundingClientRect().top + window.scrollY - 60
            window.scroll({
                top: absolute_pos_element,
                left: 0,
                behavior: "smooth"
            })
            if(window.innerWidth < 700){
                menu_gui()
            }
        })
    });
}

function menu_gui(event) {
    const style = getComputedStyle(nav_options_div);
    const is_open = style.display === "none"
    if (is_open){
        nav_options_div.style.display = "block"
    }else{
        nav_options_div.style.display = "none"
    }
}

const media = window.matchMedia("(min-width: 700px)");
media.addEventListener("change", (event) => {
    if (event.matches) {
        nav_options_div.style.display = "flex"
    }else{
        nav_options_div.style.display = "none"
    }
});

window.addEventListener("load", () => {
    const section = window.location.hash;
    history.replaceState(null, "", window.location.pathname);

    if (section) {
        const element = document.querySelector(section);

        const y = element.getBoundingClientRect().top
                + window.scrollY
                - 60;

        window.scrollTo({
            top: y,
            behavior: "smooth"
        });
    }
});