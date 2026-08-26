from os.path import join
from src.constants import *
import src.json_reader as json_reader
from jinja2 import Environment, FileSystemLoader
import unicodedata

def remove_special_chars(texto):
    # Normaliza o texto para separar as letras dos acentos
    texto_normalizado = unicodedata.normalize('NFKD', texto)
    # Codifica em ASCII ignorando os acentos e decodifica de volta para string
    return texto_normalizado.encode('ascii', 'ignore').decode('utf-8')

def members_html() -> None: 
    MEMBERS = json_reader.load_members_json()
    env = Environment(loader=FileSystemLoader(TEMPLATE_PATH))
    member_template = env.get_template("member.html")

    for MEMBER in MEMBERS:
        member_html = member_template.render(member=MEMBER)
        first_name = remove_special_chars(MEMBER['name'].split(" ")[0].lower())

        with open(join(MEMBERS_WEB_PATH,f"{first_name}.html"),"w", encoding="utf-8") as member_html_file:
            member_html_file.write(member_html)
