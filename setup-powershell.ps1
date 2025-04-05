# Configuration de la politique d'exécution pour l'utilisateur actuel
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# Configuration des variables d'environnement
$env:Path += ";C:\Program Files\nodejs"

Write-Host "Configuration PowerShell terminée avec succès!" 