
export class Carousel{
    #projects_container_section = document.querySelector("#games-carousel")
    actual_index = 1

    constructor(projects_containers){     
        this.projects_containers = projects_containers
        this.projects_amount = projects_containers.length
        this.projects_showing
        this.projects_containers.forEach(project => {
            console.log(this.projects_showing)
            this.#projects_container_section.appendChild(project)
        });
        this.organize_carousel()
    }

    go_foward(){
        this.actual_index++;

        if (this.actual_index >= this.projects_containers.length) {
            this.actual_index = 0;
        }

        this.organize_carousel(); 
    }
    go_back(){
        this.actual_index--;

        if (this.actual_index < 0) {
            this.actual_index = this.projects_containers.length - 1;
        }

        this.organize_carousel();
    }

    normalize_int(i){
        if (i >= this.projects_amount){
            return i%this.projects_amount
        }else if(i < 0){
            return this.projects_amount - Math.abs(i)%this.projects_amount
        }
        return i
    }
    organize_carousel() {
        const total = this.projects_containers.length;

        this.projects_containers.forEach((project, index) => {
            let order = index - this.actual_index;

            if (order > total / 2) {
                order -= total;
            }

            if (order < -total / 2) {
                order += total;
            }

            project.style.order = order;

            project.classList.toggle(
                "focus-game-container",
                order === 0
            );
        });
    }
}