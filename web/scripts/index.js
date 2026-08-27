document.addEventListener("DOMContentLoaded",generate_participants)

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

    console.log(file_html_name)

    div.innerHTML += `<a class="btn participant-btn" href="${path_members+file_html_name}" >Veja mais</a>`

    container.appendChild(profile_img)
    container.appendChild(div)

    return container
}

const students_container = document.querySelector("#students-container")
async function generate_participants() {

    const response = await fetch("../../data/members.json")
    const data_members = await response.json();
    data_members.forEach(member => {
        students_container.append(build_participant(member))
    });
    
}