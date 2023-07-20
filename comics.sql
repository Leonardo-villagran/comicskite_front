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
	('lorenzochacano@gmail.com', 'Lorenzo', 'Chacano', 'Siempre viva 742', '+56 12234 1234', '$2a$10$8i2MvgtgDD4fOFvKc1/qVOFXeL5jCzpe2jM710QGfyiRv.gUS6I12', 1);

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
	('Superman', 1002, 's_chica01.jpg', 's_grande01.jpg', 'REVIEW: Explosiones, acción trepidante, una nueva y sorprendente compañera y el hijo de @#1€% más grande de todo el Universo DC. Bienvenidos a las sombras. Bienvenidos a Deathstroke Inc. Después de sufrir varias pérdidas irreparables.', 100, 10, 1),
	('Deathstroke', 1, 'd_chica01.jpg', 'd_grande01.jpg', 'REVIEW: Explosiones, acción trepidante, una nueva y sorprendente compañera y el hijo de @#1€% más grande de todo el Universo DC. Bienvenidos a las sombras. Bienvenidos a Deathstroke Inc. Después de sufrir varias pérdidas irreparables.', 100, 10, 1),
	('Green Lantern', 50, 'g_chico01.jpg', 'g_grande01.jpg', 'Written by Christian Alamy, Geoff Johns, Doug Mahnke. BLACKEST NIGHT spreads with an oversized anniversary issue! Surrounded by friends and enemies, Hal Jordan goes into battle with a being he will never defeat - the Black Lantern Spectre! Can Saint Walker, Sinestro and the others put a stop to this bizarre Spectre rebirth? Plus, Atrocitus reveals a tie to a power that may make him the most unbeatable of all the Lanterns!', 2000, 30, 1),
	('Spawn', 307, 'spawn_chica01.jpg', 'spawn_grande01.jpg', 'While a strange assailant stalks the city, ripping out human hearts, another otherwordly being arrives. As his mind reels, our tortured hero remembers that he struck a deal with the devil in order to return to his beloved wife - five years after his death.', 3000, 40, 1);

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
