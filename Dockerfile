# Dockerfile para el frontend
FROM node:latest

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios y el package.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del frontend
COPY . .

ENV VITE_API_URL=http://localhost:3000

RUN npm run build

# Servir los archivos estáticos del build con el servidor web incorporado de Node.js
CMD ["npx", "serve", "-s", "dist"]