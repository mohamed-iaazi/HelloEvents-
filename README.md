[events.postman_collection.json](https://github.com/user-attachments/files/20432819/events.postman_collection.json)![image](https://github.com/user-attachments/assets/412d3638-5f3d-45dc-82de-84f42bcf0654)[events.postman_collection.json](https://github.com/user-attachments/files/20432818/events.postman_collection.json)# HelloEvents – Application de Réservation d'Événements 🎟️

## 📌 Description

**HelloEvents** est une application web conçue pour permettre aux utilisateurs de réserver des billets pour des événements culturels, professionnels ou associatifs. Le projet a été développé dans le cadre d’un travail collaboratif en entreprise, avec pour objectif de répondre aux besoins d’un client souhaitant une plateforme moderne, sécurisée et facile d’utilisation.


## 🚀 Fonctionnalités

### 🎯 Pour les Clients

- **Page d'accueil** :  
  - Affichage dynamique des événements disponibles.

- **Gestion de compte** :
  - Inscription (création de compte utilisateur).
  - Connexion sécurisée (authentification JWT).
  - Mise à jour du profil.

- **Recherche & Filtrage** :
  - Recherche d'événements par date, lieu, catégorie, etc.

- **Réservation** :
  - Réservation de billets pour les événements sélectionnés.

- **À propos** :
  - Présentation de l'équipe de développement et des valeurs du projet.

### 🛠️ Pour les Administrateurs

- **Tableau de bord** :
  - Statistiques sur les inscriptions, réservations, événements, etc.

- **Gestion** :
  - Gestion des comptes utilisateurs (affichage, suppression).
  - Gestion complète des événements (ajout, modification, suppression, détails).

## 🧰 Technologies utilisées

- **Back-end** :
  - Spring Boot
  - Spring MVC
  - Spring Security (JWT)
  - Spring Data JPA

- **Base de données** :
  - MySQL 

- **Tests** :
  - JUnit



## 🎓 diagrammes UML

![image](https://github.com/user-attachments/assets/04639f31-61af-4a9c-ae5f-5eabcfb44dd3)
![image](https://github.com/user-attachments/assets/b8723a22-4cc2-4719-9878-1242e49d035e)


[Uploading {
	"info": {
		"_postman_id": "8bf31c6e-935a-4018-9132-8ce3db1b9fdb",
		"name": "events",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "41335135"
	},
	"item": [
		{
			"name": "login",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "register",
			"request": {
				"method": "GET",
				"header": [],
				"url": "http://localhost:8080/api/v1/auth/authenticate"
			},
			"response": []
		}
	]
}events.postman_collection.json…]()

