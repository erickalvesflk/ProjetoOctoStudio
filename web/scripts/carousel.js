export class Carousel {

    #carousel = document.querySelector("#games-carousel");

    actual_index = 0;
    virtual_index = 0;

    constructor(projects_containers) {

        this.projects_containers = projects_containers;
        this.projects_amount = projects_containers.length;

        // Primeira cópia
        this.before_clones = projects_containers.map(project => {
            const clone = project.cloneNode(true);
            clone.dataset.clone = "true";
            return clone;
        });

        // Segunda cópia
        this.after_clones = projects_containers.map(project => {
            const clone = project.cloneNode(true);
            clone.dataset.clone = "true";
            return clone;
        });

        // Limpa o container
        this.#carousel.innerHTML = "";

        // Cópia anterior
        this.before_clones.forEach(project => {
            this.#carousel.appendChild(project);
        });

        // Originais
        this.projects_containers.forEach(project => {
            this.#carousel.appendChild(project);
        });

        // Cópia seguinte
        this.after_clones.forEach(project => {
            this.#carousel.appendChild(project);
        });

        this.all_projects = [
            ...this.before_clones,
            ...this.projects_containers,
            ...this.after_clones
        ];

        // Começa na lista central
        this.virtual_index = this.projects_amount;

        this.organize_carousel(false);
    }


    #get_card_step() {

        const card = this.all_projects[this.virtual_index];

        const style =
            getComputedStyle(this.#carousel);

        const gap =
            parseFloat(style.columnGap) ||
            parseFloat(style.gap) ||
            0;

        return card.offsetWidth + gap;
    }


    #get_position() {

        const container =
            this.#carousel.parentElement;

        const card =
            this.all_projects[this.virtual_index];

        const center =
            container.clientWidth / 2
            - card.offsetWidth / 2;

        const step =
            this.#get_card_step();

        return center - this.virtual_index * step;
    }


    organize_carousel(animate = true) {

        this.#carousel.style.transition =
            animate
                ? "transform .4s ease"
                : "none";

        // Remove foco de TODOS
        this.all_projects.forEach(project => {
            project.classList.remove(
                "focus-game-container"
            );
        });

        // Foco apenas no card que está no centro
        const current =
            this.all_projects[this.virtual_index];

        current.classList.add(
            "focus-game-container"
        );

        this.actual_index =
            this.virtual_index % this.projects_amount;

        const position =
            this.#get_position();

        this.#carousel.style.transform =
            `translateX(${position}px)`;
    }


    go_foward() {

        this.virtual_index++;

        this.organize_carousel(true);

        // Entramos na terceira cópia
        if (
            this.virtual_index >=
            this.projects_amount * 2
        ) {

            setTimeout(() => {

                // Volta para a cópia central
                this.virtual_index -=
                    this.projects_amount;

                this.organize_carousel(false);

            }, 400);
        }
    }


    go_back() {

        this.virtual_index--;

        this.organize_carousel(true);

        // Entramos na primeira cópia
        if (
            this.virtual_index <
            this.projects_amount
        ) {

            setTimeout(() => {

                // Volta para a cópia central
                this.virtual_index +=
                    this.projects_amount;

                this.organize_carousel(false);

            }, 400);
        }
    }


    disable() {

        this.#carousel.style.transform = "";
        this.#carousel.style.transition = "";

        // No mobile, esconde todas as cópias
        this.before_clones.forEach(project => {
            project.style.display = "none";
        });

        this.after_clones.forEach(project => {
            project.style.display = "none";
        });

        this.projects_containers.forEach(project => {

            project.style.display = "";

            project.classList.remove(
                "focus-game-container"
            );
        });
    }


    enable() {

        // Desktop: mostra novamente as cópias
        this.before_clones.forEach(project => {
            project.style.display = "";
        });

        this.after_clones.forEach(project => {
            project.style.display = "";
        });

        this.projects_containers.forEach(project => {
            project.style.display = "";
        });

        // Volta para a região central
        this.virtual_index =
            this.projects_amount +
            this.actual_index;

        this.organize_carousel(false);
    }
}