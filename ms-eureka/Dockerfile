# 1. Imagen base con OpenJDK 17
FROM openjdk:17-jdk-slim

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiar el JAR de Eureka
COPY target/*.jar app.jar

# 4. Exponer el puerto de Eureka (8761)
EXPOSE 8761

# 5. Ejecutar Eureka al iniciar el contenedor
ENTRYPOINT ["java", "-jar", "app.jar"]
