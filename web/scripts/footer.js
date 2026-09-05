const FOOTER = document.querySelector('footer')

document.addEventListener('DOMContentLoaded', ()=>{
    FOOTER.classList.add(`back`)
    generateFooter()
})

function generateFooter(){
    FOOTER.innerHTML += (
    `<section id="footer_title">
        <h1 class="end1">&nbsp;&#x1F47E; Projeto Octostudio</h1><br>
        <p class="end1">&nbsp;PATROCINADO POR:</p><br>
        <p class="end11"> <strong>UERJ-ZO</strong><br>departamento NucTI</p><br>
    </section>`
    )

    FOOTER.innerHTML += 
    `<main id="footer__main">
        <section>
            <h1 class="end2">&nbsp;UERJ-ZO</h1>
            <p class="end2">&nbsp;Excelência no ensino público, pesquisa e extensão. <br>&nbsp;Transformando a Zona Oeste do Rio através da ciência e tecnologia.</p><br>
        </section>
        <section id="contact">
            <h1 class="end3">&nbsp;ONDE ESTAMOS</h1><br>
            <div>
                <div>
                    <address class="cep">
                        &nbsp;&#x1F4CD;Avenida Manuel Caldeira de Alvarenga, 1203<br>&nbsp;
                        Campo Grande, Rio de Janeiro - RJ<br>&nbsp;
                        CEP: 23070-200
                    </address><br>
                </div>
                <div>
                    &nbsp; <iframe class="maps" src="https://www.google.com/maps/embed?origin=mfe&amp;pb=!1m2!2m1!1sUERJ-ZO+-+Universidade+do+Estado+do+Rio+de+Janeiro+campus+Zona+Oeste" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
               </div>
                <p class="email" id="contact__email"><br>
                    &nbsp;&#x1F4E5;&nbsp;FCEE: fcee@uerj.br
                </p>
            </div>
        </section>
    </main>`
    
}