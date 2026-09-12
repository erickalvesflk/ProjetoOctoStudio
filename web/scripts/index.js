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


const media = window.matchMedia("(min-width: 700px)");
let title = document.querySelector("#about-section-title h1");
media.addEventListener("change", (event) => {
    if (event.matches) {
        title.innerHTML = "Sobre"
    } else {
        title.innerHTML = "Projeto OctoStudio"
    }
});

document.addEventListener(
    "DOMContentLoaded",
    create_carousel
);

const left_arrow =
    document.querySelector("#arrow-left");

const right_arrow =
    document.querySelector("#arrow-right");

const carousel_media =
    window.matchMedia("(min-width: 760px)");


async function create_carousel() {

    const projects_containers =
        await generate_projects();

    const carousel =
        new Carousel(projects_containers);

    let auto_roll = true;


    function update_carousel(event) {

        if (event.matches) {

            // DESKTOP
            carousel.enable();

        } else {

            // MOBILE
            carousel.disable();

        }
    }


    // Verifica o tamanho inicial da tela
    update_carousel(carousel_media);


    // Detecta mudança mobile <-> desktop
    carousel_media.addEventListener(
        "change",
        update_carousel
    );


    // Botão esquerdo
    left_arrow.addEventListener("click", () => {

        if (!carousel_media.matches)
            return;

        carousel.go_back();

        auto_roll = false;
    });


    // Botão direito
    right_arrow.addEventListener("click", () => {

        if (!carousel_media.matches)
            return;

        carousel.go_foward();

        auto_roll = false;
    });


    // Recalcula posição quando mudar
    // o tamanho da janela
    window.addEventListener("resize", () => {

        if (carousel_media.matches) {
            carousel.organize_carousel(false);
        }

    });


    // Auto roll
    while (true) {

        await wait(4000);

        // Mobile: não faz nada
        if (!carousel_media.matches)
            continue;


        if (auto_roll) {

            carousel.go_foward();

        } else {

            // Usuário mexeu manualmente.
            // Espera mais 8 segundos.

            await wait(8000);

            auto_roll = true;
        }
    }
}