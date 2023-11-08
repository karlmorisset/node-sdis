# Créer la base de données

- Aller sur Sequel Ace et créer une base
- Créer les tables
- Exporter le script de création dans un fichier .sql (ne pas oublier d'ajouter le use)

# Installer Sequelize + mysql2

`npm install sequelize mysql2`

## Mettre en place les variables d'environnement

```
MYSQL_BASE=mysql://root:root@127.0.0.1:3306
MYSQL_DB=sdis-rugby
MYSQL_HOST=127.0.0.1
MYSQL_USER=3306
MYSQL_USER=root
MYSQL_PASSWORD=root
```

## Se connecter

```javascript
export const getSequelize = () =>
  new Sequelize(`${process.env.MYSQL_BASE}/${process.env.MYSQL_DB}`);
```

```javascript
export const connectMYSQL = async () => {
  const sequelize = getSequelize();

  await sequelize.authenticate();
  console.log('Connecté à MySQL');
};
```

- Mettre à jour index.js

## Définir les models

#### Match -> se suffit à lui-même

#### User -> se suffit à lui-même

#### Comment -> A besoin de Match et User pour une relation

## Mettre à jour les Controllers

!!! **Les data ne sont pas autocastées avec MariaDB** !!!

## Mettre à jour le routage

Il faut simplement corriger les `import` vers le bon Controller

## Mettre à jour l'authentification

#### Middleware

#### routage

#### Model User avec la fonction login
