from src.constants import *
from typing import List, TypedDict, Literal
from json import load as load_json
from os import path, listdir

class SocialType(TypedDict):
    linkedin: str | Literal[""]
    email: str | Literal[""]
    instagram: str | Literal[""]
    github: str | Literal[""]
class Member(TypedDict):
    name: str
    tags: list[str]
    img : str
    profile: Literal["Aluno do 1° Semestre","professora"]
    social: SocialType

type Members = list[Member]

class Project(TypedDict):
    name: str
    criators: list[str]
    diff: Literal["easy","mid","hard"]
    diff_dev: Literal["easy","mid","hard"]
    desc: str
    instructions: list[tuple[Literal["p", "a", "img"], str]]

type Projects = list[Project]

def load_members_json() -> Members:
    with open(MEMBER_JSON, "r", encoding="utf-8") as member_json_file:
        members_data : Members = load_json(member_json_file)

    member_json_file.close()

    for member in members_data:
        if member["img"] != "":
            img_path = path.join(path.join(path.join(WEB_PATH,"imgs"),"members"),member["img"])
            if path.exists(img_path):
                member["img"] = f"../../imgs/members/{member["img"]}"
            else:
                member["img"] = ""

    return members_data

def load_projects_json() -> Projects:
    projects_data: Projects = []
    projects_json = listdir(PROJECTS_JSON_PATH)

    for project_json in projects_json:

        project_json_path = path.join(PROJECTS_JSON_PATH, project_json)
        with open(project_json_path, "r", encoding="utf-8") as project_json_file:
            project_data : Project = load_json(project_json_file)
        project_json_file.close()

        img_path = path.join(path.join(path.join(WEB_PATH,"imgs"),"projects"),project_data["img"])
        if path.exists(img_path):
            project_data["img"] = f"../../imgs/projects/{project_data["img"]}"
        else:
            project_data["img"] = ""

        projects_data.append(project_data)

    return projects_data