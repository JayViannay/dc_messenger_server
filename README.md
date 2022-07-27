##### DesCodeuses 
##### Promo ANNIE 2022
##### Projet 8 -  Création d'une application web type slack/messenger
    
    []: # Language: Javascript
    []: # Framework: Node.js
    []: # Description: Serveur Node.Js Express
    []: # Architecture : MVC
    []: # Version: v1.0
    []: # Date: 2022-07-16

### 👾 Installation du serveur

- Créer une nouvelle base de données nommée `dc_messenger` depuis le fichier data.sql
  
- Cloner le template du serveur sur votre machine puis à la racine du projet : 
    - Créer un nouveau fichier `.env` en copiant/collant le fichier `.env.sample` puis remplissez le avec les bonnes informations de votre environnement local.
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



### 👾 Installation du client : 

- Cloner le [client_repo]('https://github.com/JennyViannay/dc_project_8_client')
- A la racine du répertoire client :
```bash
npm install
npm start
```

### 📝 Instructions :

- Parcourir le dossier `service` du client pour comprendre comment celui-ci requête le serveur et quelles fonctionnalités restent à implémenter côté serveur.
- Côté serveur, parcourir le code et compléter les méthodes manquantes en suivant les commentaires.
- Tester l'application en utilisant le client.


### 🕵️ Users Stories :

- En tant qu'utilisateur je peux ajouter un `user`
- En tant que qu'utilisateur je peux sélectionner un `user`
- En tant qu'utilisateur, après avoir sélectionné un `user`, je peux :
    - Afficher la liste de mes conversations
    - Sélectionner une conversation et consulter ses messages
    - Sélectionner une conversation et envoyer un message
    - Créer une nouvelle conversation avec un ou plusieurs autres `user`

###  🚩 Contraintes : 
> Un `user` ne peut pas créer de conversation avec lui-même. <br>
> Un `user` ne peut pas créer une nouvelle conversation avec un autre `user` si une conversation existe entre eux. <br>
> Un `user` ne peut pas sélectionner une conversation qui n'existe pas. <br>
> A chaque fois qu'un `user` crée une conversation de groupe, c'est à dire avec plus de 2 participants lui compris, on créera à chaque fois une nouvelle conversation même si les participants sont identiques.

#### 🎈 Bonus et axes d'améliorations :

##### Améliorer notre application avec de nouvelles fonctionnalités :
    - Possibilité d'ajouter des participants à une conversation en cours 
    - Possibilité de supprimer un participant d'une conversation en cours 
    - Possibilité de nommer une conversation de groupe (participants > 2) 
    - Ajouter un système de notification pour les nouveaux messages
