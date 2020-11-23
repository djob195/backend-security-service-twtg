module.exports = {
    "type": "object",
    "properties":{
        "regex":{
            "type":"string"
        },
        "name":{
            "type":"string"
        },
        "mask":{
            "type":"string"
        },
        "id":{
            "type":"string"
        },
        "hint":{
            "type":"string"
        },
        "key":{
            "type":"string"
        },
    },
    "example":{
        "regex": "^[0-9]{13}$",
        "name": "código único de identificación",
        "mask": "#### ####### ####",
        "id": 1,
        "hint": "1234 56789 0101",
        "key": "cui"
    }
}