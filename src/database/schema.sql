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
    raça VARCHAR(255) NOT NULL
);

INSERT INTO dono (name, photo) VALUES 
    ('João', NULL),
    ('Maria', NULL);

INSERT INTO animal (name, tipo, dono_id, raça) VALUES 
    ('Rex', 'Cachorro', 1, 'vira-lata'),
    ('Mingau', 'Gato', 1, 'persa'),
    ('Pipoca', 'Coelho',  1, 'mini-lop'),
    ('Luna', 'Cachorro',  2, 'labrador'),
    ('Thor', 'Gato', 2, 'siames');


