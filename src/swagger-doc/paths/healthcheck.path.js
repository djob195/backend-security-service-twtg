module.exports = {
    "get":
    {
        "tags": ["healthcheck"],
        "summary": "verificación del estado del servicio",
        "description": "Endpoint que verifica si se encuentra arriba el servicio",
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
                            "$ref": "#/components/schemas/Healthcheck"
                        }
                    }
                }
            }
        }
    }
};