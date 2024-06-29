# micro-home/Dockerfile
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto para el servidor
EXPOSE 3003

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]