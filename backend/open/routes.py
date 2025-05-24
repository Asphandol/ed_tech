from fastapi import APIRouter, Depends
from open.calls import generate_quote
from users.permissions import get_current_user
from typing import Annotated, Any
from users.schemas import UserCreate


router = APIRouter(prefix='/ai', tags=['openAI calls'])


@router.get('/generate_quote')
def quote(character: str, user: Annotated[Any, Depends(get_current_user)]):
    response = generate_quote(character_type=character)
    return response

