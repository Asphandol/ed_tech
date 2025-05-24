from open.client import OpenAIClient
from open.dummy import characters
import json


def generate_quote(character_type: str) -> dict:
    character = characters.get(character_type)
    if not character:
        return {"error": "Invalid character type"}

    prompt = (
        f"You're {character['name']}, a {character_type} character who is {character['traits']}.\n"
        f"Respond with a single original quote in this exact JSON format:\n"
        f'{{"quote": "your quote here"}}'
    )

    client = OpenAIClient().get_client()
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a quote generator that responds with JSON."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.9,
        max_tokens=100
    )


    content = response.choices[0].message.content.strip()

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {"quote": content} 
