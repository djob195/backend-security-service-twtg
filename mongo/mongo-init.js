db.createUser(
    {
        user: "user",
        pwd: "123456",
        roles: [
            {
                role: "readWrite",
                db: "db"
            }
        ]
    }
);