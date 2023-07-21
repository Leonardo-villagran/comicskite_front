/* CREATE DATABASE comics*/
/* CREATE DATABASE comics*/

-- Tabla usuario
CREATE TABLE IF NOT EXISTS "usuario" (
	"id_usuario" SERIAL PRIMARY KEY,
	"email" VARCHAR,
	"nombre" VARCHAR,
	"apellido" VARCHAR,
	"direccion" VARCHAR,
	"telefono" VARCHAR NOT NULL,
	"password" VARCHAR,
	"administrador" INTEGER NOT NULL DEFAULT 0
);

-- Datos de ejemplo para la tabla usuario
INSERT INTO "usuario" ("email", "nombre", "apellido", "direccion", "telefono", "password", "administrador")
VALUES
	('leonardovillagran@yahoo.com', 'Leonardo', 'Villagrán Chicago', 'Siempre viva 742', '2132314234', '$2a$10$xS7LOJaVslNc8Q.44jJ./uwbVYSChtc2MgDR8qjO4lbRCL93PZ/CG', 1),
	('leonardovillagran2@yahoo.com', 'Leonardo2', 'Villagrán Chicago2', 'Siempre viva 7422', '21323142342', '$2a$10$OIl3BHa4.7xMnY7LIrsHRu6d8qt4YFCbrXhSnIec6YwuR/OHfD6kS', 0),
	('leonardovillagran3@yahoo.com', 'Leonardo 3', 'Villagrán Chicago', 'Siempre viva 742', '2132314234', '$2a$10$JIHB.znSN63btgXsJLS4reQBjgZgFpJwxZlpvqEw8d14oM1dRDTha', 0),
	('yonofui@legion.cl', 'Yono', 'Fui', 'Siempre viva 742', '2132314234', '$2a$10$jmEt4XfcBVsPwK4XpWBhjepEKZ9TuxiAzkdRNiFSdEnHg07jBi3vC', 0),
	('paololanderos@gmail.com', 'Paolo', 'Landeros', 'siempre viva 742', '23423423', '$2a$10$iq7C7YUM9N6WaKixoGFd6Os.VJfYN6iJs34n/UChxoYA4vZnUfVEy', 1),
	('admin@gmail.com', 'Admin', 'Administrator', 'Siempre viva 742', '+56 12234 1234', '$2a$10$JJKBtKGVz6xNfDxM.OjqNuPzgDSoGqD635G3jD9j2ULHbLvr4e6nS', 1),
	('lorenzochacano@gmail.com', 'Lorenzo', 'Chacano', 'Siempre viva 742', '+56 12234 1234', '$2a$10$b5iFg4IA/m//DfMibSF2FOsdu89jZbUP.NzraDq0B1J7NS9vs4niC', 1);

-- Tabla producto
CREATE TABLE IF NOT EXISTS "producto" (
	"id_producto" SERIAL PRIMARY KEY,
	"nombre" VARCHAR,
	"numero" INTEGER,
	"imagen_pequena" VARCHAR,
	"imagen_grande" VARCHAR,
	"detalle" TEXT,
	"precio" INTEGER,
	"stock" INTEGER,
	"id_usuario" INTEGER,
	CONSTRAINT "producto_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Datos de ejemplo para la tabla producto
INSERT INTO "producto" ("nombre", "numero", "imagen_pequena", "imagen_grande", "detalle", "precio", "stock", "id_usuario")
VALUES
('Deathstroke', 1, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/1fd98871-71cf-4ea0-847b-e3f7f242a87a?alt=media&token=056fcf5d-c847-4418-bcbd-38742e7fc6d5', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/405cc285-42e5-42a3-a673-8fe402dee461?alt=media&token=3abfc61d-f7a8-4158-bdca-d979d4466e3a', 'REVIEW: Explosiones, acción trepidante, una nueva y sorprendente compañera y el hijo de @#1€% más grande de todo el Universo DC. Bienvenidos a las sombras. Bienvenidos a Deathstroke Inc. Después de sufrir varias pérdidas irreparables.', 100, 95, 1),
	('Superman', 1002, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/6fcfd4fc-9814-4325-a90d-854d43ea4bd9?alt=media&token=69ca1118-5eaa-4d93-839f-dfabd83e7322', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/2f855070-6779-4530-a58e-5dc7001fbbf7?alt=media&token=2d94c5d5-0c0c-41f6-a551-d784ae0a8285', 'REVIEW: Explosiones, acción trepidante, una nueva y sorprendente compañera y el hijo de @#1€% más grande de todo el Universo DC. Bienvenidos a las sombras. Bienvenidos a Deathstroke Inc. Después de sufrir varias pérdidas irreparables.', 100, 46, 1),
	('Green Lantern', 50, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/51739d1e-a03c-4c56-add1-05b5b8176ff8?alt=media&token=b491ac04-3bab-480e-897a-b3d7ef7cd7f0', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/50d6b617-b239-479c-9511-9a0960528395?alt=media&token=3d96d128-8ad6-40b5-b3d1-39bbc1cda820', 'Written by Christian Alamy, Geoff Johns, Doug Mahnke. BLACKEST NIGHT spreads with an oversized anniversary issue! Surrounded by friends and enemies, Hal Jordan goes into battle with a being he will never defeat - the Black Lantern Spectre! Can Saint Walker, Sinestro and the others put a stop to this bizarre Spectre rebirth? Plus, Atrocitus reveals a tie to a power that may make him the most unbeatable of all the Lanterns!', 2000, 95, 1),
	('Spawn', 307, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/3c216e36-8bf5-4e71-b5bd-445dcf86b8f9?alt=media&token=cef5b6bd-5e6d-4722-9e78-cdebb8247b8e', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/93c02200-a623-49a1-b655-abef3ec5d66e?alt=media&token=3628337d-f066-41be-81df-3c6f97a52536', 'While a strange assailant stalks the city, ripping out human hearts, another otherwordly being arrives. As his mind reels, our tortured hero remembers that he struck a deal with the devil in order to return to his beloved wife - five years after his death.', 3000, 0, 1);

-- Tabla likes
CREATE TABLE IF NOT EXISTS "likes" (
	"id_like" SERIAL PRIMARY KEY,
	"id_usuario" INTEGER NOT NULL,
	"id_producto" INTEGER NOT NULL,
	CONSTRAINT "likes_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto" ("id_producto") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT "likes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla orden_compra
CREATE TABLE IF NOT EXISTS "orden_compra" (
	"id_orden_compra" SERIAL PRIMARY KEY,
	"fecha_venta" DATE NOT NULL,
	"detalle_productos" TEXT,
	"id_usuario" INTEGER NOT NULL,
	CONSTRAINT "orden_compra_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON UPDATE CASCADE ON DELETE CASCADE
);
