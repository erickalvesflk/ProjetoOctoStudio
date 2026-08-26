from os.path import join as _join
from os.path import exists as _exists_path
from src.constants import *
import src.json_reader as json_reader
from jinja2 import Environment, FileSystemLoader
import unicodedata

env = Environment(loader=FileSystemLoader(TEMPLATE_PATH))

def _remove_special_chars(texto):
    # Normaliza o texto para separar as letras dos acentos
    texto_normalizado = unicodedata.normalize('NFKD', texto)
    # Codifica em ASCII ignorando os acentos e decodifica de volta para string
    return texto_normalizado.encode('ascii', 'ignore').decode('utf-8')

def members_html() -> None: 
    print("- Iniciando Geração das paginas de participantes utilizando o template 'member.html'")
    MEMBERS = json_reader.load_members_json()
    member_template = env.get_template("member.html")

    print("- - Iniciando construção das paginas")
    for MEMBER in MEMBERS:
        member_html = member_template.render(member=MEMBER)
        first_name = _remove_special_chars(MEMBER['name'].split(" ")[0].lower())

        with open(_join(MEMBERS_WEB_PATH,f"{first_name}.html"),"w", encoding="utf-8") as member_html_file:
            member_html_file.write(member_html)

        print(f"- - - Pagina do(a) '{MEMBER['name']}' como '{first_name}.html' finalizado!")

    print("- Geração das paginas de paricipantes finazalida!")

def projects_html() -> None: 
    print("- Iniciando Geração das paginas de projetos utilizando o template 'project.html'")
    PROJECTS = json_reader.load_projects_json()
    project_template = env.get_template("project.html")

    print("- - Iniciando construção das paginas")
    i = 0
    for PROJECT in PROJECTS:
        i += 1

        members_pages = {}
        for criator in PROJECT["criators"]:
            author_html_file_name = _remove_special_chars(criator.split(" ")[0].lower()) + ".html"
            if _exists_path(_join(MEMBERS_WEB_PATH,author_html_file_name)):
                members_pages[criator] = f"../members/{author_html_file_name}"
            else:
                members_pages[criator] = "#"

        project_html = project_template.render(project=PROJECT, members_pages=members_pages)
        html_name = f"project_0{i if i >= 10 else f"0{i}"}"

        with open(_join(PROJECTS_WEB_PATH,f"{html_name}.html"), "w", encoding="utf-8") as project_html_file:
            project_html_file.write(project_html)

        print(f"- - - Pagina do projeto '{PROJECT['name']}' como '{html_name}.html' finalizado!")

    print("- Geração das paginas de projetos finazalida!")