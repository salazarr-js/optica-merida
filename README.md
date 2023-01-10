# Óptica Mérida - Comercio Electrónico

Aplicación web cliente para Comercio Electrónico de [**Óptica Mérida**](https://optica-merida.web.app)

## Pre-requisitos

Antes de empezar, asegúrese de que su entorno de desarrollo incluya `Node.js`, el administrador de paquetes `npm` y el sistema de control de versiones `GIT`

- [Node.js](https://nodejs.org/) versión LTS `12.19.0`
- [GIT](https://git-scm.com/)

## Dependencias

La aplicación fue desarrollada usando el [CLI](https://cli.angular.io/) de Angular, por esto se recomienda tenerlo previamente instalado.

```sh
npm install -g @angular/cli  # Instala el CLI de angular de manera global
npm install                  # Instala todas las dependencias del proyecto
```

## `Dev Server`

Ejecuta el comando `ng serve` para levantar un servidor de desarrollo. Navega a la `url` especificada, suele ser http://localhost:4200/. La aplicación se recargara automaticamente si se realiza algun cambio al codigo fuente.

## `Build`

Ejecuta el comando `ng build` para compilar el proyecto. El proyecto compilado se guardara en la carpeta `dist/`. Usa la bandera `--prod` para compilar con parametros para producción.

> https://www.masvision.com.ar/

# TODOs
- [x] update angular & angular material 
- [x] Setup msw
  - [x] mock home page services
  - [x] mock product detail page services
  - [x] mock cart page services
- [x] fix broken images 
- [x] better empty views
  - [x] empty search
  - [x] 404
  - [x] empty cart
- [ ] fix auth
- [ ] fix email send
- [x] fix stock artifact
- [ ] update third libs
- [x] add searchbar + searching feature
  - [x] hide searchbar on unused routes
- [ ] responsive fixes
  - [x] fix hero
  - [x] fix home page
    - [x] responsive product card
    - [x] responsive filters
  - [ ] fix product detail page
  - [ ] fix cart page
  - [ ] fix sign-in page
- [x] add scroll to top button
- [x] paginador/mostrar mas
- [ ] animations
  - [ ] animate searchbar
  - [x] animate scroll to top
- [ ] alert info 
  this is just a learning/testing propuse e-commerce app,
  - we won't ask or save any personal data
  - the auth sesion will be remove from our servers automatically after some time
  - all the products info and image were scraped from https://www.masvision.com.ar/
    Copyright © 2023 Mas Vision Argentina
  - product prices and stock are simulated
  - you will receive a confirmation mail after finish a simulated "buy", you wont receive any other mail after that ( no spam )
  - any payment method will be asked, the buy proces is just a simulation
  - any sesion data will be saved on server, we use only localstore to simulate the database
- [x] indrement/decrement stock after succesful sale
- [?] cart recomendations, random posts
- [ ] update README
