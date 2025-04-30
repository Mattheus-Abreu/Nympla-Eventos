create table users (
	id serial primary key,
	name varchar,
	email varchar unique,
	password varchar,
	birth date,
	role varchar
)

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL,
    preco DECIMAL(10,2),
    localizacao VARCHAR(255)
)

create EXTENSION if not exists "uuid-ossp"

create table subscriptions(
	id uuid primary key default uuid_generate_v4(),
	user_id int not null,
	event_id int not null,
	check_in varchar default 'pending',
	foreign key (user_id) references users(id) on delete cascade,
	foreign key (event_id) references events(id) on delete cascade,
	unique(user_id, event_id)
)

INSERT INTO subscriptions (user_id, event_id, check_in) VALUES
(1, 1, 'pending'),
(2, 1, 'checked_in'),
(3, 2, 'pending'),
(7, 2, 'checked_in'),
(8, 3, 'pending'),
(1, 4, 'pending'),
(2, 5, 'cancelled'),
(3, 3, 'pending'),
(7, 4, 'pending'),
(8, 5, 'checked_in');

select * from subscriptions

select * from subscriptions where id = '95aefa46-16a0-48ab-9e87-086d58f4079b'

alter table events add column image_url text

select


insert into users(name, email, password, birth, role)
values ('Matheus', 'mths@gmail.com', '123', '18-09-2001', 'user')

insert into users(name, email, password, birth, role)
values ('Gustavo', 'deltta@gmail.com', '321', '15-07-2004', 'user')

INSERT INTO events (nome, descricao, data_inicio, data_fim, preco, localizacao) VALUES
('Tech Conference 2025', 'Conferência de tecnologia com palestras sobre IA e inovação.', '2025-06-15 09:00:00', '2025-06-15 18:00:00', 199.99, 'São Paulo, SP'),
('Maratona de Programação', 'Competição para desenvolvedores testarem suas habilidades.', '2025-07-20 08:00:00', '2025-07-20 20:00:00', 0.00, 'Rio de Janeiro, RJ'),
('Festival de Música', 'Evento com diversas bandas e artistas nacionais.', '2025-09-10 14:00:00', '2025-09-12 23:00:00', 299.90, 'Belo Horizonte, MG'),
('Feira de Startups', 'Encontro para investidores e empreendedores apresentarem ideias.', '2025-08-05 10:00:00', '2025-08-05 17:00:00', 120.00, 'Curitiba, PR'),
('Hackathon de IA', 'Competição de 48h focada em inteligência artificial.', '2025-10-22 18:00:00', '2025-10-24 18:00:00', 50.00, 'Florianópolis, SC');

UPDATE EVENTS SET IMAGE_URL = 
'https://reserhub.com/br/wp-content/uploads/sites/10/2023/06/AI-Hackathon.webp' WHERE ID=5



select * from users

select * from events

DROP TABLE events;
