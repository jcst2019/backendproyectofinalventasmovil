DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR(255) NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(name, image, route,created_at,updated_at ) values ('CLIENTE','https://w7.pngwing.com/pngs/29/1014/png-transparent-businessperson-computer-icons-encapsulated-postscript-others-miscellaneous-logo-silhouette.png','client/products/list','2021-11-23','2021-11-23');
INSERT INTO roles(name, image, route,created_at,updated_at ) values ('VENDEDOR','https://www.clipartmax.com/png/full/289-2896430_about-textpay-departamento-de-ventas-icono.png','vendedor/orden/list','2021-11-23','2021-11-23');
INSERT INTO roles(name, image, route,created_at,updated_at ) values ('ALMACENERO','https://distrimedica.com/wp-content/uploads/almacen-icon.png','almacenero/orden/list','2021-11-23','2021-11-23');

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(80) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL ,
    id_rol BIGSERIAL NOT NULL ,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    foreign key (id_user) REFERENCES users(id) on update CASCADE ON DELETE CASCADE,
    foreign key (id_rol) REFERENCES roles(id) on update CASCADE ON DELETE CASCADE,
    primary key (id_user,id_rol)
);
