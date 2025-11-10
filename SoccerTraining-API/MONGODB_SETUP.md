# Configuración de MongoDB para SoccerTraining API

## Opción 1: MongoDB Atlas (Recomendado - Gratis)

### Paso 1: Crear cuenta en MongoDB Atlas
1. Ve a https://www.mongodb.com/cloud/atlas/register
2. Crea una cuenta gratuita (M0 Free Tier)

### Paso 2: Crear un Cluster
1. Una vez dentro, haz clic en "Build a Database"
2. Selecciona el plan **FREE (M0)**
3. Elige una región cercana a ti
4. Dale un nombre a tu cluster (ej: "SoccerTraining")
5. Haz clic en "Create"

### Paso 3: Crear usuario de base de datos
1. Ve a "Database Access" en el menú lateral
2. Haz clic en "Add New Database User"
3. Elige "Password" como método de autenticación
4. Crea un usuario y contraseña (guárdalos bien, los necesitarás)
5. En "Database User Privileges", selecciona "Read and write to any database"
6. Haz clic en "Add User"

### Paso 4: Configurar acceso de red
1. Ve a "Network Access" en el menú lateral
2. Haz clic en "Add IP Address"
3. Selecciona "Allow Access from Anywhere" (0.0.0.0/0) para desarrollo
   - ⚠️ Para producción, deberías agregar solo IPs específicas
4. Haz clic en "Confirm"

### Paso 5: Obtener la cadena de conexión
1. Ve a "Database" en el menú lateral
2. Haz clic en "Connect" en tu cluster
3. Selecciona "Connect your application"
4. Copia la cadena de conexión (se verá así):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Paso 6: Configurar el archivo .env
1. Abre el archivo `.env` en la carpeta `SoccerTraining-API`
2. Reemplaza la línea `MONGO_URI` con tu cadena de conexión:
   ```
   MONGO_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster0.xxxxx.mongodb.net/soccertraining?retryWrites=true&w=majority
   ```
   - Reemplaza `TU_USUARIO` con el usuario que creaste
   - Reemplaza `TU_PASSWORD` con la contraseña que creaste
   - Reemplaza `cluster0.xxxxx` con el nombre de tu cluster
   - Asegúrate de agregar `/soccertraining` antes del `?` para especificar el nombre de la base de datos

### Ejemplo:
```
MONGO_URI=mongodb+srv://admin:miPassword123@cluster0.abc123.mongodb.net/soccertraining?retryWrites=true&w=majority
```

---

## Opción 2: MongoDB Local

### Instalación en Windows

1. **Descargar MongoDB Community Server**
   - Ve a https://www.mongodb.com/try/download/community
   - Selecciona Windows como sistema operativo
   - Descarga el instalador MSI

2. **Instalar MongoDB**
   - Ejecuta el instalador
   - Selecciona "Complete" installation
   - Marca "Install MongoDB as a Service"
   - Completa la instalación

3. **Verificar instalación**
   - MongoDB debería iniciarse automáticamente como servicio
   - Puedes verificar en "Services" (servicios de Windows)

4. **Configurar .env**
   - Abre el archivo `.env`
   - Usa esta URI:
   ```
   MONGO_URI=mongodb://localhost:27017/soccertraining
   ```

---

## Verificar la conexión

Una vez configurado el `.env`, ejecuta:
```bash
cd SoccerTraining-API
yarn dev
```

Deberías ver:
```
✅ MongoDB Connected: ...
🚀 Server running on port 5000
```

Si ves un error, verifica:
- ✅ La URI en `.env` está correcta
- ✅ El usuario y contraseña son correctos
- ✅ Tu IP está permitida en Network Access (si usas Atlas)
- ✅ MongoDB está corriendo (si usas local)

