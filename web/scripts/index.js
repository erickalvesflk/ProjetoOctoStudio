import {generate_participants, generate_projects} from "./index_generators.js";
import {Carousel} from "./carousel.js";

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded",generate_participants)

const go_games_btn = document.querySelector("#see-games-btn")
go_games_btn.addEventListener("click",(event)=>{
    event.preventDefault() // reseta o funcionamento padrão do hyperlink ao ser clicado
    let destination_element = document.querySelector(go_games_btn.getAttribute("href"))
    let absolute_pos_element = destination_element.getBoundingClientRect().top + window.scrollY
    window.scroll({
        top: absolute_pos_element,
        left: 0,
        behavior: "smooth"
    })
})

document.addEventListener("DOMContentLoaded",create_carousel)

const left_arrow = document.querySelector('div#arrow-left')
const right_arrow = document.querySelector('div#arrow-right')

async function create_carousel(){
    let projects_containers = await generate_projects()
    let carousel = new Carousel(projects_containers)

    let auto_roll = true
    left_arrow.addEventListener('click',()=>{
        carousel.go_back()
        auto_roll = false
        carousel.organize_carousel()
    })
    right_arrow.addEventListener('click',()=>{
        carousel.go_foward()
        auto_roll = false
        carousel.organize_carousel()
    })

    while (true) {
        await wait(4000)
        if(auto_roll){
            carousel.go_foward()
        }else{
            await wait(8000)
            auto_roll = true
        }
    }
    
}
const media = window.matchMedia("(min-width: 700px)");
let title = document.querySelector("#about-section-title h1");
media.addEventListener("change", (event) => {
    if (event.matches) {
        title.innerHTML = "Sobre"
    } else {
        title.innerHTML = "Projeto OctoStudio"
    }
});