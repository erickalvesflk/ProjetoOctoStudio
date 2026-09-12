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

class GuideItems(TypedDict):
    text: str
    vdo: str

class Project(TypedDict):
    name: str
    creators: list[str]
    diff: Literal["easy","mid","hard"]
    diff_dev: Literal["easy","mid","hard"]
    desc: str
    guide: GuideItems

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
    projects_json = sorted(listdir(PROJECTS_JSON_PATH))
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

        vdo_path = path.join(path.join(path.join(WEB_PATH,"videos"),"projects"),project_data['guide']["vdo"])
        if path.exists(vdo_path):
            project_data['guide']["vdo"] = f"../../videos/projects/{project_data['guide']["vdo"]}"
        else:
            project_data['guide']["vdo"] = ""
        projects_data.append(project_data)
    return projects_data