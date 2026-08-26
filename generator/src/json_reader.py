from src.constants import *
from typing import List, TypedDict, Literal
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


def load_members_json() -> Members:
    with open(MEMBER_JSON, "r", encoding="utf-8") as member_json:
        data_members : Members = load_json(member_json)

    member_json.close()

    for member in data_members:
        if member["img"] != "":
            img_path = path.join(path.join(path.join(WEB_PATH,"imgs"),"members"),member["img"])
            if path.exists(img_path):
                member["img"] = f"../../imgs/members/{member["img"]}"
            else:
                member["img"] = ""
    return data_members