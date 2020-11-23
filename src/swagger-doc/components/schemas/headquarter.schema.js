module.exports = {
    "type": "object",
    "properties":{
        "id":{
            "type":"string"
        },
        "address":{
            "type":"string"
        },
        "location":{
            "type":"object",
            "properties":{
                "type": {
                    "type":"string",
                    "enum": ["Point"]
                },
                "coordinates":{
                    "type":"array",
                    "items":{
                        "type": "decimal"
                    }
                }
            }
        },
        "Documents":{
            "type":"array",
            "items":{
                "$ref": "#/components/schemas/Document"
            }
        },
    },
    "example": {
        "id": "e83c1505-0a91-4bbd-8e60-8d7329336511",
        "address": "5 avenida 5-55 edificio europlaza torre 4 nivel 6 oficina 604 zona 14",
        "location": {
            "type": "Point",
            "coordinates": [
                14.5870221,
                -90.5159167
            ]
        },
        "Documents": [
            {
                "name": "antecedentes penales",
                "description": "es la constancia oficial de que una persona ha sido condenada con sentencia firme por un delito",
                "order": 3,
                "DocumentMetadatas": []
            },
            {
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
                    }
                ]
            }
        ]
    }
}