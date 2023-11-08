# Se connecter au VPS

`ssh debian@vps-3863d601.vps.ovh.net`

karl@vps-3863d601.vps.ovh.net password: `v7R4ZfCRAPDN`

# Mettre Ngnix en place

## Installation

`sudo apt update`

`sudo apt install nginx`

## Vérification

`systemctl status nginx`

```bash
Output
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2020-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   Memory: 3.5M
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```

## Configuration

Avec le serveur Web Nginx, vous pouvez utiliser des blocs de serveur (similaires aux hôtes virtuels dans Apache) pour encapsuler les détails de configuration et héberger plusieurs domaines à partir d’un seul serveur.

Nous allons configurer un domaine appelé vps-3863d601.vps.ovh.net, mais vous devez le remplacer par le nom propre à votre domaine.

Créez le répertoire pour votre_domaine comme suit en utilisant le drapeau -p pour créer tout répertoire parent nécessaire :

`sudo mkdir -p /var/www/mongodb`

Ensuite, attribuez la propriété du répertoire avec la variable d’environnement $USER

`sudo chown -R $USER:$USER /var/www/mongodb`

Pour vous assurer que vos autorisations sont correctes et permettre au propriétaire de lire, écrire et exécuter les fichiers tout en accordant uniquement des autorisations de lecture et d’exécution aux groupes et aux autres, vous pouvez saisir la commande suivante :

`sudo chmod -R 755 /var/www/mongodb`

Pour que Nginx puisse offrir ce contenu, vous devez créer un bloc serveur en utilisant les directives correctes. Au lieu de directement modifier le fichier de configuration par défaut, créons-en un nouveau dans /etc/nginx/sites-available/vps-3863d601.vps.ovh.net:

`sudo nano /etc/nginx/sites-available/mongodb`

Nous allons configurer notre server en reverse-proxy.

> NOTE : il ne faut pas confondre proxy et reverse proxy. Un proxy est un serveur qui se positionne généralement entre les utilisateurs et internet et qui permet à ceux-ci d'accéder à internet au travers son service de proxy. Un reverse proxy se positionne en frontal d'un serveur web et permet de rediriger les requêtes venant de l'internet vers des serveurs (web) qui eux, sont en internes du réseau. C'est donc exactement l'inverse.

## Qu'est-ce qu'un serveur proxy ?

Quand on parle de proxy de transfert, un proxy quoi, on parle d'un serveur situé devant un groupe d'ordinateurs clients. Lorsque ces derniers adressent des requêtes envoyées à des sites et services sur Internet, le serveur proxy intercepte ces requêtes et communique ensuite avec les serveurs web au nom des clients, agissant ainsi comme un intermédiaire.

![](https://cf-assets.www.cloudflare.com/slt3lc6tev37/2MZmHGnCdYbQBIsZ4V11C6/25b48def8b56b63f7527d6ad65829676/forward_proxy_flow.png)

Dans une communication Internet standard, un ordinateur A se connecterait directement à un serveur C, c'est-à-dire que le client enverrait des requêtes au serveur d'origine et que le serveur d'origine répondrait au client. Avec un proxy de transfert en place, l'ordinateur A envoie ses requêtes au proxy B, qui les transmet la requête au serveur C. Le serveur C envoie ensuite sa réponse au proxy B, qui la retransmet à l'ordinateur A.

Pourquoi ajouter un proxy ?

- Pour éviter les restrictions de navigation imposées par l'État ou les institutions
- Pour bloquer l'accès à certains contenus :
- Pour protéger son identité en ligne :

## En quoi un proxy inverse est-il différent ?

Un reverse-proxy désigne un serveur placé devant un ou plusieurs serveurs web et qui intercepte les requêtes provenant des clients. Il est différent d'un proxy de transfert, qui se place lui devant les clients.

La différence entre un proxy de transfert et un reverse-proxy s'avère subtile, mais importante. Un moyen simple de la résumer consisterait à dire qu'un proxy de transfert se place devant un client et garantit l'absence de communication entre un serveur d'origine et ce client spécifique. Un reverse-proxy, quant à lui, se situe devant un serveur d'origine et garantit l'absence de communication entre un client et le serveur d'origine protégé.

![Alt text](https://cf-assets.www.cloudflare.com/slt3lc6tev37/3msJRtqxDysQslvrKvEf8x/f7f54c9a2cad3e4586f58e8e0e305389/reverse_proxy_flow.png)

En général, l'ensemble des requêtes provenant d'un ordinateur D circulent directement vers un serveur d'origine F, qui renvoie ses réponses directement à l'ordinateur D. Dans une situation de proxy inverse, l'ensemble des requêtes de l'ordinateur D se rendront directement au serveur de proxy E, qui transmettra les requêtes au serveur d'origine F et recevra les réponses de ce dernier, avant de les transmettre à l'ordinateur D.

Découvrez ci-dessous certains des avantages liés à l'utilisation d'un proxy inverse :

- Équilibrage de charge : un site web populaire accueillant des millions d'utilisateurs chaque jour peut ne pas être en mesure de gérer l'ensemble du trafic entrant sur son site à l'aide d'un seul serveur d'origine. À la place, le site peut être réparti sur un ensemble de serveurs différents, tous dédiés au traitement des requêtes pour le même site. Dans ce cas, un proxy inverse peut constituer une solution d'équilibrage de charge permettant de distribuer le trafic entrant de manière égale entre les différents serveurs afin d'éviter la surcharge de l'un d'entre eux. En cas de défaillance complète d'un serveur, les autres serveurs peuvent prendre le relais pour gérer le trafic.

- Protection contre les attaques : avec un proxy inverse en place, un site ou un service web n'a jamais besoin de révéler l'adresse IP de son ou ses serveurs d'origine. Il est donc beaucoup plus difficile pour les pirates de lancer une attaque ciblée contre eux, comme une attaque DDoS. Les pirates ne pourront alors viser que le proxy inverse, qui peut compter sur une sécurité plus stricte et davantage de ressources pour repousser une cyberattaque.

- Équilibrage de la charge des serveurs à l'échelle mondiale (Global Server Load Balancing, GSLB) : cette forme d'équilibrage de charge permet à un site web d'être distribué sur plusieurs serveurs dans le monde entier. Le proxy inverse redirigera alors les clients vers le serveur le plus proche géographiquement. Cette solution permet de réduire les distances que les requêtes et les réponses doivent parcourir, minimisant ainsi les temps de chargement.
- Mise en cache : un proxy inverse peut également mettre en cache le contenu afin d'améliorer la rapidité d'un site. Ainsi, un utilisateur à Paris visitant un site web associé à un proxy inverse (et disposant de serveurs web à Los Angeles) pourrait en fait se connecter à un serveur proxy inverse local à Paris, qui se chargera ensuite de communiquer avec un serveur d'origine à Los Angeles. Le serveur proxy pourra alors mettre en cache (ou enregistrer temporairement) les données de réponse. Les utilisateurs parisiens qui se rendront par la suite sur ce site obtiendront la version mise en cache localement en réponse du serveur de proxy inverse parisien, entraînant ainsi une expérience de navigation plus rapide.
- Chiffrement SSL : le chiffrement et le déchiffrement des communications SSL (ou TLS) de chaque client peuvent s'avérer coûteux en termes de calcul pour un serveur d'origine. Un proxy inverse peut ainsi être configuré pour déchiffrer toutes les requêtes entrantes et chiffrer l'ensemble des réponses sortantes, afin de libérer de précieuses ressources sur le serveur d'origine.

La règle `server` est comme virtual host dans Apache

```
server {
  listen 80;
  listen [::]:80;

  server_name vps-3863d601.vps.ovh.net;

  root /var/www/mongodb;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Ensuite, activons le fichier en créant un lien depuis celui-ci vers le répertoire sites-enabled, que Nginx lit lors du démarrage :

`sudo ln -s /etc/nginx/sites-available/mongodb /etc/nginx/sites-enabled/`

Ensuite, procédez à un test pour vous assurer qu’il n’y a aucune erreur de syntaxe dans aucun de vos fichiers Nginx :

`sudo nginx -t`

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

S’il n’y a pas de problème, redémarrez Nginx pour activer vos modifications :

`sudo systemctl restart nginx`

### Répertoires importants

`/var/www` : le contenu web réel (qui par défaut ne consiste qu’en la page Nginx par défaut que vous avez vue précédemment), est présenté à partir du répertoire /var/www/html. Cela peut être modifié en changeant les fichiers de configuration Nginx.

`/etc/nginx` : répertoire de configuration Nginx. Tous les fichiers de configuration Nginx se trouvent ici.

`/etc/nginx/nginx.conf` : fichier de configuration principal de Nginx. Celui-ci peut être modifié pour apporter des changements à la configuration globale de Nginx.

`/etc/nginx/sites-available` : répertoire dans lequel vous pouvez stocker les blocs de serveur par site. Nginx n’utilisera pas les fichiers de configuration trouvés dans ce répertoire à moins qu’ils ne soient liés au répertoire sites-enabled. En règle générale, la configuration de tous les blocs de serveur se fait dans ce répertoire, puis s’active en établissant une liaison avec l’autre répertoire.

`/etc/nginx/sites-enabled/` : répertoire dans lequel les blocs de serveur par site activés sont stockés. En règle générale, ils sont créés en reliant les fichiers de configuration trouvés dans le répertoire sites-available.

# Création des clés SSH pour se connecter à Github

`ssh-keygen -t ed25519 -a 256`

- Appuyer 3 fois sur Enter

`sudo systemctl restart ssh`

`sudo systemctl restart sshd`

`cd ~/.ssh`

`cat id_ed25519.pub >> authorized_keys`

`cat id_ed25519.pub`

- copier puis ajouter à GitHub

# Installation du VPS pour gérer le code

## Node + npm

`sudo apt update`

`sudo apt upgrade`

`sudo apt install curl`

`curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - `

`sudo apt-get install -y nodejs`

`node -v`

`npm -v`

## Git

`sudo apt-get install git`

# Le code

`cd /var/www`

`mkdir mongodb`

`cd mongodb`

`git init`

`git remote add origin git@github.com:karlmorisset/node-sdis.git`

`git remote -v`

`git pull origin main`

`git branch -M main`

# Installation des dépendances

- Pour faire marcher bcrypt

`sudo npm install -g node-gyp`

- puis

`npm install`

`touch .env`

- NODE_PORT=3000
- MONGO_CNX=mongodb+srv://karl:qgEatSp4xQNsoRGJ@cluster0.nwjji7c.mongodb.net/?retryWrites=true&w=majority
- JWT_SECRET="SDIS de Moselle"

# MongoDB

Ajouter l'IP du server à la whitelist de MongoDB

- Goto https://cloud.mongodb.com et se connecter
- Aller sur Security > Network Access
- Ajouter l'IP du server à la liste

# PM2

## Installation

`sudo npm i -g pm2`

`cd /var/www/mongodb`

`pm2 start index.js --node-args='--experimental-modules --es-module-specifier-resolution=node index.js'`

On vérifie que l'instance est bien online

`pm2 ls`

```
┌────┬──────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name     │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼──────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ index    │ default     │ 0.0.1   │ fork    │ 7171     │ 43m    │ 0    │ online    │ 0%       │ 88.5mb   │ debian   │ disabled │
└────┴──────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

On vérifie que tout va bien au cas où
`pm2 logs`

# Le Graal

Enfin on peut se connecter pour voir si tout va bien

http://vps-3863d601.vps.ovh.net

# Installer mysql/mariadb

### Installation

`sudo apt install mariadb-client mariadb-server -y`

### Sécurisation de root

`sudo mysql_secure_installation`

- Enter current password for root (enter for none) : **[Enter]**
- Switch to unix_socket authentication [Y/n]: **n**
- Change the root password? [Y/n] : **Y**
- New password : **votre mot de passe**
- Re-enter new password : **votre mot de passe**
- Remove anonymous users? [Y/n] : **Y**
- Disallow root login remotely? [Y/n] : **n**
- Remove test database and access to it? [Y/n] : **Y**
- Reload privilege tables now? [Y/n] : **Y**

### Se connecter à mariadb

`sudo mysql -uroot -p`

### Ajouter un utilisateur non-root

```sql
GRANT ALL ON *.* TO 'UTILISATEUR'@'localhost' IDENTIFIED BY 'MOTDEPASSE';
FLUSH PRIVILEGES;
exit;
```

### Créer la base et les tables

Préparer un fichier `database.sql` à la racine du dossier du projet

```sql
CREATE DATABASE rugby;

USE rugby;

CREATE TABLE `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `body` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `authorId` int DEFAULT NULL,
  `matchId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `matches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team1` varchar(255) NOT NULL,
  `team2` varchar(255) NOT NULL,
  `score1` varchar(255) DEFAULT '0',
  `score2` varchar(255) DEFAULT '0',
  `date` date NOT NULL,
  `stadium` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `played` varchar(255) NOT NULL,
  `formated` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
```

### Ajouter la base et les tables

1. Se rendre dans le dossier contenant le fichier
2. Se connecter à MariaDB : `sudo mysql -uroot -p`
3. `source database.sql`
4. `exit`
