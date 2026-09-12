from os import path

GENERATOR_PATH = path.dirname(path.dirname(path.abspath(__file__))) # ProjetoOcto/generator/
TEMPLATE_PATH = path.join(GENERATOR_PATH,"template") # ProjetoOcto/generator/template/

MAIN_PROJECT_PATH = path.dirname(path.abspath(GENERATOR_PATH)) # ProjetoOcto/

WEB_PATH = path.join(MAIN_PROJECT_PATH,"web") # ProjetoOcto/web/
PAGES_PATH = path.join(WEB_PATH,"pages") # ProjetoOcto/web/pages/
MEMBERS_WEB_PATH = path.join(PAGES_PATH,"members") # ProjetoOcto/web/pages/members/
PROJECTS_WEB_PATH = path.join(PAGES_PATH,"projects") # ProjetoOcto/web/pages/projects/
PROJECTS_IMGS_WEB_PATH = path.join(PROJECTS_WEB_PATH,"info") # ProjetoOcto/web/pages/projects/

DATA_PATH = path.join(MAIN_PROJECT_PATH,"data") # ProjetoOcto/data
PROJECTS_JSON = path.join(DATA_PATH,"projects.json") # ProjetoOcto/data/projects.json
MEMBER_JSON = path.join(DATA_PATH,"members.json") # ProjetoOcto/data/members.json