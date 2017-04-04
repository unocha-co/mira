# Requisitos
- Composer
- Bower
- Npm
# Intalación
1. En la raíz del sitio: 
``` 
composer install
```
- Hacer una copia de **.env.example** y llamarlo **.env** 
- Configurar los datos de la base de datos en el archivo **.env**
``` 
php artisan key:generate
```
- Dar permisos 777 a la carpetas **storage/*** y **bootstrap/cache**
2. En la carpeta path-to-app/public/front/
- Hacer una copia de **app/assets/js/constants.js.example** y llamarlo **app/assets/js/constants.js**
- En el archivo **app/assets/js/constants.js** cambiar **url-del-sitio** por la url nueva del sitio
``` 
npm install
```
``` 
bower install
```
## Probando el sitio

Ir a `path-to-app/public/front/app`