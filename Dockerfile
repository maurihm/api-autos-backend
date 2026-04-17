# Usa la imagen base ligera de Node.js 20
FROM node:20-slim

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json primero
COPY package*.json ./

# Instala solo las dependencias de producción
RUN npm install --production

# Copia el resto del código del backend al contenedor
COPY . .

# Solución a nivel global de Node.js para omitir la validación del certificado (Aiven)
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Expone el puerto 10000 (puerto por defecto en Render)
EXPOSE 10000

# Comando para iniciar el servidor
CMD ["npm", "start"]
