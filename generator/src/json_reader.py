from src.constants import *
from typing import TypedDict, Literal
from json import load as load_json

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

    with open(PROJECTS_JSON, "r", encoding="utf-8") as projects_json_file:
        projects_data : list[Projects] = load_json(projects_json_file)
        projects_json_file.close()

    for project_data in projects_data:
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

    return projects_data