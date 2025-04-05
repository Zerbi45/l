# Medieval Cards Game

Un jeu de cartes médiéval fantasy avec système de case opening et clicker.

## Installation

1. **Configuration initiale (une seule fois)**
   ```bash
   # Exécuter en tant qu'administrateur PowerShell
   .\setup-powershell.ps1
   ```

2. **Installation du projet**
   ```bash
   # Double-cliquez sur setup-project.bat
   # ou exécutez :
   .\setup-project.bat
   ```

3. **Démarrage du projet**
   ```bash
   npm start
   ```

## Fonctionnalités

- **Mine d'Or (Clicker)**
  - Cliquez pour gagner de l'or
  - Améliorez votre multiplicateur
  - Achetez des auto-clickers

- **Cases**
  - Case Commune (100 or)
  - Case Rare (250 or)
  - Case Épique (500 or)

- **Collection**
  - Visualisez vos cartes obtenues
  - Triées par numéro de slot
  - Différentes raretés avec effets visuels

## Résolution des problèmes courants

1. **Erreur npm :**
   ```bash
   npm cache clean --force
   npm install
   ```

2. **Erreur PowerShell :**
   - Relancez setup-powershell.ps1 en tant qu'administrateur

3. **Port 3000 occupé :**
   ```bash
   npm start -- --port 3001
   ``` 