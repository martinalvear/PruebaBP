# 1. Usamos la imagen oficial de OpenJDK 17 como base
FROM openjdk:17-jdk-slim

# 2. Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos el JAR del microservicio a la imagen del contenedor
COPY target/*.jar app.jar

# 4. Exponemos el puerto en el que corre el microservicio
EXPOSE 8083

# 5. Definimos el comando para ejecutar el microservicio
ENTRYPOINT ["java", "-jar", "app.jar"]
