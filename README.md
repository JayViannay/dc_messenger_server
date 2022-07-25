##### DesCodeuses 
##### Promo ANNIE 2022
##### Projet 8 -  Création d'une application web type slack/messenger
    
    []: # Language: Javascript
    []: # Framework: Node.js
    []: # Description: Serveur Node.Js Express
    []: # Architecture : MVC
    []: # Version: v1.0
    []: # Date: 2022-07-16

### Installation

- Créer une nouvelle base de données nommée `dc_messenger` depuis le fichier data.sql

- Cloner le template du serveur sur votre machine puis à la racine du projet : 
    - Créer un nouveau fichier `.env` en copiant/collant le fichier `.env.example` puis remplissez le avec les bonnes informations de votre environnement local.
    - Depuis votre terminal, **toujours à la racine du serveur**, éxécuter les commandes suivantes :
        ```bash
        npm install
        npm run dev
        ```

- Le serveur se lance en local et affiche les informations de connexion dans le terminal
    - Pour l'arrêter, il suffit de taper dans votre terminal :
        ```bash
        ctrl + c
        ```

- Des entrées sont disponibles sur l'entité User :
    - GET http://localhost:5050/api/users
    - GET http://localhost:5050/api/users/:id
    - POST http://localhost:5050/api/users
