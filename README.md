# Test de Technique pour SmartOp

Ce projet prend la forme d’une application web composé d’un frontend développé avec la technologie Angular et d’une API Rest développé avec le framework NodeJS. Le frontend communique
avec le backend à l’aide de requêtes HTTP sur le port 3000 de l’API, tandis que le backend est connecté à une base de donnée sur MongoDB Atlas. 

## Pré-requis

#### Node.js, Angular
Pour démarrer l'application il faut avoir préalablement installé Node.js, Angular

## Ouverture de l'application

Veuillez ouvrir les scripts `launch-backend.sh` et `launch-frontend.sh` séparément, ou utilise les commandes 
pour backend: 
```bash
cd backend
npm start
```
Pour frontend:
 ```bash
cd frontend
ng serve
```

Puis rendez-vous sur le port 4200 de votre server local ou avec l'URL :
###### http://localhost:4200

Lorsque vous accédez à l'application, la page affiche automatiquement tous les noms des chirurgiens et les informations connexes dans un tableau. \
![image](ecran.jpg)

Lorsque vous saisissez le nom d'un chirurgien dans le champ de recherche situé en haut du formulaire, les informations relatives au chirurgien correspondant s'affichent automatiquement.\
![image](ecran recherche.jpg)

