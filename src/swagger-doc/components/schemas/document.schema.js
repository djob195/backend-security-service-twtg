module.exports = {
    "type": "object",
    "properties":{
        "name":{
            "type":"string"
        },
        "description":{
            "type":"string"
        },
        "order":{
            "type":"int"
        },
        "DocumentMetadatas":{
            "type":"array",
            "items":{
                "$ref": "#/components/schemas/DocumentMetadata"
            }
        },
    },
    "example": {
        "name": "documento de identificación",
        "description": "documento personal de identifación único que identifica a un guatemalteco",
        "order": 1,
        "DocumentMetadatas": [
            {
                "regex": "^[0-9]{13}$",
                "name": "código único de identificación",
                "mask": "#### ####### ####",
                "id": 1,
                "hint": "1234 56789 0101",
                "key": "cui"
            },
            {
                "regex": "^(m|M|f|F)$",
                "name": "sexo",
                "mask": "A",
                "id": 2,
                "hint": "m",
                "key": "sex"
            }]
        }
}