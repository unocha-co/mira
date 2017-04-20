# Requisitos
- Composer
- Bower
- Npm
# Instalación
1. En la raíz del sitio: 
``` 
composer install
```
- Hacer una copia de **/.env.example** y llamarlo **/.env** 
- Configurar los datos de la base de datos en el archivo **/.env**
``` 
php artisan key:generate
```
- Dar permisos de escritura a la carpetas **/storage/*** y **/bootstrap/cache**
``` 
chmod 777 /path/to/storage/
chmod 777 /path/to/bootstrap/cache
```
2. En la carpeta /public/front/
- Hacer una copia de **/public/front/app/assets/js/constants.js.example** y llamarlo **app/assets/js/constants.js**
- En el archivo **/public/front/app/assets/js/constants.js** cambiar **http://servidor/** por la url nueva del sitio
``` 
npm install
```
``` 
bower install
```
3. Publicar el sitio usando Apache. El archivo de configuración debe ser similar a este:
```     
    Alias /mira /path/to/public/
    <Directory /path/to/public>
        Options +FollowSymLinks -Indexes
        AllowOverride All
        Require all granted

        RewriteEngine On
    </Directory>
```
## Probando el sitio

Ir a `http://servidor/mira/front/app`