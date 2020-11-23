module.exports = {
    "get":
    {
        "tags": ["required-documents"],
        "summary": "Trae los documentos requerido",
        "description": "Este servicio trae todos los documentos requeridos de acuerdo a la sede",
        "parameters":[{
            "name":"latitude",
            "in":"query",
            "description": "latitud del celular",
            "schema":{
                "type":"integer"
            }
        }, {
            "name":"longitude",
            "in":"query",
            "description": "longitud del celular",
            "schema":{
                "type":"integer"
            }
        }], 
        "produces": ["application/json"],
        "responses":
        {
            "200":
            {
                "description": "OK",
                "content":
                {
                    "application/json":{
                        "schema":{
                            "$ref": "#/components/schemas/Headquarter"
                        }
                    }
                }
            }
        }
    }
};