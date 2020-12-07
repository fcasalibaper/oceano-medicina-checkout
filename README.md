# Oceano medicina
Repositorio de Oceano medicina - Checkout

## Instalación

Instalar [GULP](https://gulpjs.com/docs/en/getting-started/quick-start/) global:
```bash
npm install --global gulp-cli
```

Bajar el repositorio, abrir la consola, posicionarse en el root del proyecto <code>Oceano-medicina/</code> e instalar el mismo, esto instalara sus dependencias (requiere tener Node instalado)
[NODEJS](https://nodejs.org/es/download/). Se instala del siguiente modo:

```bash
npm install
```

## Iniciar proyecto

Despues de su instalación, iniciar el proyecto tipiando lo siguiente:

```bash
gulp
```

## Entorno del proyecto, <small><i>(aclaraciones)</i></small>
Dentro de la carpeta del proyecto, hay 2 subcarpetas importantes, app/ y
src/, es donde están todos los archivos que se modifican, como html, css y js, por ejemplo.

### CSS
Lo q respecta a css, esta hecho con SASS(.scss). Los archivos dentro de <code>src/css/\*.scss</code>, que de modifiquen, se compilan y se sirven en la carpeta app/css/oceano.min.css; de igual manera pasa con el js y el html.

### HTML
Es como antes en: <code>src/html/\*.html</code>, se compilan y se sirven, compilados en <code>app/\*.html</code>.

En <code>src/html/includes/\*.html</code>, para evitar spaghetti code, y ayudar a legibilidad del código se usa una libreria para maneajar includes, con lo cual podemos encontrar pequeños pedazos de .html que se terminan incuyendo en un archivo root .html (por ej en: ```Oceano-medicina/src/html/index.html```), de esta manera: <code>@@include('file.inc.html')</code>. Esto es sólo para la version de desarrollo, ya que en la version que se sirve en ```Oceano-medicina/src/html/*.html```, ya está todo unificado, sin los includes, pero si con el código dentro de él, por ej en: ```Oceano-medicina/app/index.html```.

### Imágenes
Las mismas están en la carpeta ```Oceano-medicina/src/images```, al escribir el comando: ```gulp imagesmin```, éstas, se comprimen y se sirven en: ```Oceano-medicina/app/images```. Esto no es necesario, pero es recomendable para reducir el tamaño.

### JS
El mismo se escribe en ES6, que si bien no es compatible con algunos navegadores no tan modernos, un plugin del compilador (BABEL) lo "traduce" a una version compatible para todos los mismo en el bundle final.

Funciona como se explica anteriormente, se modifican files en <code>src/scripts/\*.js</code>, al guardar, automaticamente, se compilan y se sirven, compilados y minificados en <code>app/scripts/oceano.min.js</code>

Con lo cual, para realizar modificaciones en el proyecto, por favor:

    1 - Instalar el proyecto con el comando: npm install
    2 - Iniciar el proyecto con el comando: gulp
    3 - Una vez iniciado, cualquier modficación que se haga, ya sea de html, css, o js, se realiza desde la siguiente ruta: Oceano-medicina/src/*
    4 - Los cambios que se hacen en el punto anterior al guardar, automaticamente, se commpilan en: Oceano-medicina/app/*.
    5 - El contenido de ésta última es la carpeta que se debe subir a producción, ya que está compilada y minificada (Oceano-medicina/app/*).

#### Estructura de archivos:

```bash
-- Oceano-medicina/
    |-- app/
    |   |-- css/
    |   |-- scripts/
    |   |
    |   *.html
    |   
    |-- src/
        |-- html/
        |    |-- includes/
        |    |
        |   *.html
        |
        |-- images/
        |-- css/
        |-- scripts/
 ```

