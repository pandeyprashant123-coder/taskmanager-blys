export const taskSchema = `
CREATE TABLE IF NOT EXISTS tasks (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    body VARCHAR(45) NOT NULL,
    created_at DATE NOT NULL,
    user_id VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE (id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
`;

export const userSchema = `
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(45) NOT NULL,
    phone VARCHAR(45) NOT NULL,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    user_id VARCHAR(45) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (id)
);
`;