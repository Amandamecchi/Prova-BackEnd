CREATE DATABASE pets;

\c pets;

CREATE TABLE dono (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    photo TEXT
);


CREATE TABLE animal (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    dono_id INTEGER REFERENCES dono(id) ON DELETE CASCADE,
    raca VARCHAR(255) NOT NULL 
);

INSERT INTO dono (name, photo) VALUES 
    ('João', NULL),
    ('Maria', NULL);

INSERT INTO animal (name, tipo, raca, dono_id)
VALUES
('Rex', 'Cachorro', 'Labrador', 1),
('Mimi', 'Gato', 'Siamês', 2),
('Bob', 'Cachorro', 'Bulldog', 1);


