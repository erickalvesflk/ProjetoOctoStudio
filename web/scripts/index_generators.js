// <div class="participant-container">
//     <img src="imgs/members/member.png" alt="foto de perfil do caleb">
//     <div>
//         <h2>Caleb ...</h2>
//         <a class="btn participant-btn" href="#">Veja mais</a>
//     </div>
// </div>
const path_members = "/web/pages/members/"
function build_participant(participant){
    let container = document.createElement("div")
    container.classList.add("participant-container");

    let profile_img = document.createElement("img")
    if (participant["img"] != ""){
        profile_img.setAttribute("src",`/web/imgs/members/${participant["img"]}`)
    }else{
        profile_img.setAttribute("src","/web/imgs/members/member.png")
    }
    profile_img.setAttribute("alt",`foto de perfil do(a) ${participant["name"]}`)

    let div = document.createElement("div")
    div.innerHTML += `<h2>${participant["name"]}</h2>`

    const file_html_name = participant["name"]
        .split(" ")[0]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()+".html";

    div.innerHTML += `<a class="btn participant-btn" href="${path_members+file_html_name}" >Veja mais</a>`

    container.appendChild(profile_img)
    container.appendChild(div)

    return container
}
/* 
<div class="game-container">
    <img src="imgs/projects/jogo1.png" alt="jogo1">
    <div>
        <h2>Jogo 5</h2>
        <div>
            Criadores <a></a> ...
        </div>
    </div>
    <a class="btn" href="#">Veja mais</a>
</div> 
*/
function build_project(project, num){
    let container = document.createElement("div")
    container.classList.add("game-container");

    let game_img = document.createElement("img")
    if (project["img"] != ""){
        game_img.setAttribute("src",`/web/imgs/projects/${project["img"]}`)
    }else{
        game_img.setAttribute("src","/web/imgs/projects/project.jpg")
    }
    container.appendChild(game_img)

    
    let info_div = document.createElement("div")
    info_div.classList.add("info-div");
    
    info_div.innerHTML += `<h2>${project["name"]}</h2>`
    
    let creators_div = document.createElement("div")
    creators_div.classList.add("creators-div");
    if(project["criators"].length == 1){
        creators_div.innerHTML += "<p>Criador: </p>"
    }else{
        creators_div.innerHTML += "<p>Criadores: </p>"
    }
    project["criators"].forEach((criator_name, index) => {
        const file_html_criator = criator_name
            .split(" ")[0]
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()+".html";
            
        creators_div.innerHTML += `<a href="${path_members+file_html_criator}">${criator_name}</a>`
        if (index != project["criators"].length-1){
            creators_div.innerHTML += "<p>e</p>"
        }
    });
    info_div.appendChild(creators_div)
    container.appendChild(info_div)

    container.innerHTML += `<a class="btn" href="/web/pages/projects/project_${num}.html">Veja mais</a>`

    return container
}

const students_container = document.querySelector("#students-container")
export async function generate_participants() {

    const response = await fetch("../../data/members.json")
    const data_members = await response.json();
    data_members.forEach(member => {
        students_container.append(build_participant(member))
    });
}
const projects_container = document.querySelector("#games-container")
export async function generate_projects() {
    
    let projects_data = []
    let i = 1
    while(i < 1000){
        const response = await fetch(`../../data/projects/project${i > 9 ? `0${i}` : `00${i}`}.json`)
        if (response.status == "404") {
            console.log("opa")
            break
        }
        const data_projects = await response.json();
        projects_data.push(data_projects)
        i += 1
    }
    
    i = 1
    projects_data.forEach(project => {
        const num = i > 9 ? `0${i}` : `00${i}`
        projects_container.appendChild(build_project(project,num))
        i += 1
    });
}