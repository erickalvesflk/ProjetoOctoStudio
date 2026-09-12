// <div class="member-container">
//     <div class="member-info">
//         <img src="WEB/imgs/members/member.png" alt="Imagem do participante">
//         <h2>Nome</h2>
//     </div>
//     <a class="btn btn-member" href="#">Contatos</a>
// </div>
const path_members = "web/pages/members/"
function build_participant(participant){
    let container = document.createElement("div")
    container.classList.add("member-container");
    
    let info = document.createElement("div")
    info.classList.add("member-info");
    let profile_img = document.createElement("img")
    if (participant["img"] != ""){
        profile_img.setAttribute("src",`web/imgs/members/${participant["img"]}`)
    }else{
        profile_img.setAttribute("src","web/imgs/members/member.png")
    }
    profile_img.setAttribute("alt",`foto de perfil do(a) ${participant["name"]}`)

    info.appendChild(profile_img)
    info.innerHTML += `<h2>${participant["name"]}</h2>`

    const file_html_name = participant["name"]
        .split(" ")[0]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()+".html";

        
    container.appendChild(info)
    
    container.innerHTML += `<a class="btn btn-member" href="${path_members+file_html_name}">Contatos</a>`

    return container
}
/* 

<div class="game-container">
    <img src="web/imgs/projects/pedra-papel-tesoura.jpg" alt="Imagem do participante">
    <div class="game-info">
        <h2>Nome do Jogo</h2>
        <a class="btn-game" href="#">Veja mais</a>
    </div>
</div>
 
*/
function build_project(project, num){
    let container = document.createElement("div")
    container.classList.add("game-container");

    let game_img = document.createElement("img")
    if (project["img"] != ""){
        game_img.setAttribute("src",`web/imgs/projects/${project["img"]}`)
    }else{
        game_img.setAttribute("src","web/imgs/projects/project.jpg")
    }
    
    
    container.appendChild(game_img)
    let info_div = document.createElement("div")
    info_div.classList.add("game-info");
    
    info_div.innerHTML += `<h2>${project["name"]}</h2>`
    
    container.appendChild(info_div)
    info_div.innerHTML += `<a class="btn-game" href="web/pages/projects/project_${num}.html">Veja mais</a>`

    return container
}

const member_container = document.querySelector("#members-grid")
export async function generate_participants() {

    const response = await fetch("data/members.json")
    const data_members = await response.json();

    data_members.forEach(member => {
        member_container.append(build_participant(member))
    });
}
export async function generate_projects() {
    
    let projects_data = []
    let i = 1
    let projects_containers = []

    const response = await fetch(`data/projects.json`)
    if (response.status == "404") {
        console.log("Arquivo não encontrado!")
    }else{
        const data_projects = await response.json();
        projects_data = data_projects

        i = 1
        projects_data.forEach(project => {
            const num = i > 9 ? `0${i}` : `00${i}`
            projects_containers.push(build_project(project,num))
            i += 1
        });
    }
    return projects_containers
}