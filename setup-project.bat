@echo off
echo Installation du projet Medieval Cards...

:: Création des dossiers
mkdir src\components
mkdir src\data
mkdir src\types

:: Installation des dépendances
call npm install

:: Démarrage du projet
echo Installation terminée! Pour démarrer le projet, exécutez 'npm start'
pause 