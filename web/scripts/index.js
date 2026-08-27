import {generate_participants, generate_projects} from "./index_generators.js";

document.addEventListener("DOMContentLoaded",generate_participants)
document.addEventListener("DOMContentLoaded",generate_projects)

const go_games_btn = document.querySelector("#games-btn")
go_games_btn.addEventListener("click",(event)=>{
    event.preventDefault() // reseta o funcionamento padrão do hyperlink ao ser clicado
    let destination_element = document.querySelector(go_games_btn.getAttribute("href"))
    let absolute_pos_element = destination_element.getBoundingClientRect().top + window.scrollY - 130
    window.scroll({
        top: absolute_pos_element,
        left: 0,
        behavior: "smooth"
    })
})