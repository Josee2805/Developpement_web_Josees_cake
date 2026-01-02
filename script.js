/* ========================================
   FICHIER JAVASCRIPT - VALIDATION FORMULAIRE
   Josée's Cake
   ======================================== */

// Attendre que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {
    
    // RÉCUPÉRATION DES ÉLÉMENTS DU FORMULAIRE
    // On stocke les références dans des variables pour y accéder facilement
    const form = document.getElementById('contactForm');
    const nomInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('telephone');
    const sujetSelect = document.getElementById('sujet');
    const messageTextarea = document.getElementById('message');
    
    // RÉCUPÉRATION DES CHAMPS CONDITIONNELS
    // Ces champs seront affichés ou masqués selon le sujet sélectionné
    const champDomaine = document.getElementById('champ-domaine');
    const champTicket = document.getElementById('champ-ticket');
    const champUrgence = document.getElementById('champ-urgence');
    const champIncident = document.getElementById('champ-incident');
    
    // RÉCUPÉRATION DES ZONES DE MESSAGES D'ERREUR
    // Ces spans afficheront les erreurs de validation en temps réel
    const errorNom = document.getElementById('error-nom');
    const errorEmail = document.getElementById('error-email');
    const errorTelephone = document.getElementById('error-telephone');
    const errorSujet = document.getElementById('error-sujet');
    const errorMessage = document.getElementById('error-message');
    const errorType = document.getElementById('error-type');
    
    // Zone pour afficher le message de succès
    const successMessage = document.getElementById('success-message');

    /* ========================================
       A) AFFICHAGE/MASQUAGE DES CHAMPS CONDITIONNELS
       ======================================== */
    
    // Écouter le changement de valeur du menu déroulant "Sujet"
    sujetSelect.addEventListener('change', function() {
        
        // ÉTAPE 1 : Masquer tous les champs conditionnels
        champDomaine.style.display = 'none';
        champTicket.style.display = 'none';
        champUrgence.style.display = 'none';
        champIncident.style.display = 'none';
        
        // ÉTAPE 2 : Réinitialiser les valeurs des champs masqués
        // Important pour éviter d'envoyer des données invisibles
        document.getElementById('domaine').value = '';
        document.getElementById('ticket').value = '';
        document.getElementById('urgence').value = '';
        document.getElementById('incident').value = '';
        
        // ÉTAPE 3 : Récupérer la valeur sélectionnée
        const sujetValue = this.value;
        
        // ÉTAPE 4 : Afficher les champs selon le sujet sélectionné
        if (sujetValue === 'information') {
            // Si "Demande d'information" : afficher le champ "Domaine d'intérêt"
            champDomaine.style.display = 'block';
            console.log('Champ affiché : Domaine d\'intérêt');
            
        } else if (sujetValue === 'support') {
            // Si "Support technique" : afficher "Numéro de ticket" ET "Urgence"
            champTicket.style.display = 'block';
            champUrgence.style.display = 'block';
            console.log('Champs affichés : Numéro de ticket et Urgence');
            
        } else if (sujetValue === 'reclamation') {
            // Si "Réclamation" : afficher "Date de l'incident"
            champIncident.style.display = 'block';
            console.log('Champ affiché : Date de l\'incident');
            
        } else if (sujetValue === 'autre') {
            // Si "Autre" : aucun champ supplémentaire
            console.log('Aucun champ conditionnel affiché');
        }
    });

    /* ========================================
       B) VALIDATION EN TEMPS RÉEL
       ======================================== */
    
    /* VALIDATION DU NOM : Au moins 3 caractères */
    nomInput.addEventListener('input', function() {
        // Récupérer la valeur et supprimer les espaces aux extrémités
        const nomValue = this.value.trim();
        
        if (nomValue.length === 0) {
            // Si le champ est vide : pas de message d'erreur
            errorNom.textContent = '';
            this.style.borderColor = '#ddd';
            
        } else if (nomValue.length < 3) {
            // Si moins de 3 caractères : afficher l'erreur
            errorNom.textContent = 'Le nom doit contenir au moins 3 caractères';
            this.style.borderColor = '#e74c3c'; // Bordure rouge
            
        } else {
            // Si valide : supprimer l'erreur et bordure verte
            errorNom.textContent = '';
            this.style.borderColor = '#2ecc71'; // Bordure verte
        }
    });

    /* VALIDATION DE L'EMAIL : Doit contenir @ et un point */
    emailInput.addEventListener('input', function() {
        const emailValue = this.value.trim();
        // Expression régulière pour valider le format email
        // ^ = début, $ = fin, + = au moins 1 caractère
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue.length === 0) {
            // Si vide : pas d'erreur
            errorEmail.textContent = '';
            this.style.borderColor = '#ddd';
            
        } else if (!emailRegex.test(emailValue)) {
            // Si le format est invalide
            errorEmail.textContent = 'Format email invalide (doit contenir @ et un point)';
            this.style.borderColor = '#e74c3c';
            
        } else {
            // Si valide
            errorEmail.textContent = '';
            this.style.borderColor = '#2ecc71';
        }
    });

    /* VALIDATION DU TÉLÉPHONE : Uniquement des chiffres, 10 minimum */
    telephoneInput.addEventListener('input', function() {
        const telValue = this.value.trim();
        // Expression régulière : ^ = début, [0-9] = chiffres, + = au moins 1, $ = fin
        const telRegex = /^[0-9]+$/;
        
        if (telValue.length === 0) {
            // Si vide : pas d'erreur
            errorTelephone.textContent = '';
            this.style.borderColor = '#ddd';
            
        } else if (!telRegex.test(telValue)) {
            // Si contient autre chose que des chiffres
            errorTelephone.textContent = 'Le téléphone doit contenir uniquement des chiffres';
            this.style.borderColor = '#e74c3c';
            
        } else if (telValue.length < 10) {
            // Si moins de 10 chiffres
            errorTelephone.textContent = 'Le téléphone doit contenir au moins 10 chiffres';
            this.style.borderColor = '#e74c3c';
            
        } else {
            // Si valide
            errorTelephone.textContent = '';
            this.style.borderColor = '#2ecc71';
        }
    });

    /* VALIDATION DU MESSAGE : Au moins 10 caractères */
    messageTextarea.addEventListener('input', function() {
        const messageValue = this.value.trim();
        
        if (messageValue.length === 0) {
            errorMessage.textContent = '';
            this.style.borderColor = '#ddd';
            
        } else if (messageValue.length < 10) {
            errorMessage.textContent = 'Le message doit contenir au moins 10 caractères';
            this.style.borderColor = '#e74c3c';
            
        } else {
            errorMessage.textContent = '';
            this.style.borderColor = '#2ecc71';
        }
    });

    /* ========================================
       C) VALIDATION À LA SOUMISSION
       ======================================== */
    
    // Écouter l'événement de soumission du formulaire
    form.addEventListener('submit', function(event) {
        // ÉTAPE 1 : Empêcher l'envoi par défaut du formulaire
        event.preventDefault();
        
        console.log('Tentative de soumission du formulaire...');
        
        // ÉTAPE 2 : Réinitialiser le message de succès
        successMessage.style.display = 'none';
        successMessage.innerHTML = '';
        
        // ÉTAPE 3 : Variable pour suivre la validité globale du formulaire
        let isValid = true;

        /* VALIDATION DU NOM */
        const nomValue = nomInput.value.trim();
        if (nomValue.length === 0) {
            errorNom.textContent = 'Le nom est obligatoire';
            nomInput.style.borderColor = '#e74c3c';
            isValid = false; // Le formulaire n'est pas valide
        } else if (nomValue.length < 3) {
            errorNom.textContent = 'Le nom doit contenir au moins 3 caractères';
            nomInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            errorNom.textContent = '';
            nomInput.style.borderColor = '#2ecc71';
        }

        /* VALIDATION DE L'EMAIL */
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue.length === 0) {
            errorEmail.textContent = 'L\'email est obligatoire';
            emailInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            errorEmail.textContent = 'Format email invalide';
            emailInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            errorEmail.textContent = '';
            emailInput.style.borderColor = '#2ecc71';
        }

        /* VALIDATION DU TÉLÉPHONE */
        const telValue = telephoneInput.value.trim();
        const telRegex = /^[0-9]+$/;
        if (telValue.length === 0) {
            errorTelephone.textContent = 'Le téléphone est obligatoire';
            telephoneInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (!telRegex.test(telValue)) {
            errorTelephone.textContent = 'Le téléphone doit contenir uniquement des chiffres';
            telephoneInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (telValue.length < 10) {
            errorTelephone.textContent = 'Le téléphone doit contenir au moins 10 chiffres';
            telephoneInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            errorTelephone.textContent = '';
            telephoneInput.style.borderColor = '#2ecc71';
        }

        /* VALIDATION DU SUJET */
        if (sujetSelect.value === '') {
            errorSujet.textContent = 'Veuillez sélectionner un sujet';
            sujetSelect.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            errorSujet.textContent = '';
            sujetSelect.style.borderColor = '#2ecc71';
        }

        /* VALIDATION DU MESSAGE */
        const messageValue = messageTextarea.value.trim();
        if (messageValue.length === 0) {
            errorMessage.textContent = 'Le message est obligatoire';
            messageTextarea.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (messageValue.length < 10) {
            errorMessage.textContent = 'Le message doit contenir au moins 10 caractères';
            messageTextarea.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            errorMessage.textContent = '';
            messageTextarea.style.borderColor = '#2ecc71';
        }

        /* VALIDATION DU TYPE DE DEMANDE (RADIO) */
        // querySelector renvoie le bouton radio coché, ou null si aucun n'est coché
        const typeDemande = document.querySelector('input[name="type-demande"]:checked');
        if (!typeDemande) {
            errorType.textContent = 'Veuillez sélectionner un type de demande';
            isValid = false;
        } else {
            errorType.textContent = '';
        }

        /* SI LE FORMULAIRE N'EST PAS VALIDE */
        if (!isValid) {
            console.log('Formulaire invalide. Soumission annulée.');
            // Faire défiler vers le haut pour voir les erreurs
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false; // Arrêter l'exécution
        }

        /* SI LE FORMULAIRE EST VALIDE : Afficher le récapitulatif */
        console.log('Formulaire valide ! Génération du récapitulatif...');

        // Récupérer le texte de l'option sélectionnée (pas la valeur)
        const sujetText = sujetSelect.options[sujetSelect.selectedIndex].text;
        const typeDemandeValue = typeDemande.value;

        // Construire le HTML du récapitulatif
        let recapitulatif = '<h3>Message envoyé avec succès !</h3>';
        recapitulatif += '<p>Merci ' + nomValue + ', nous avons bien reçu votre message.</p>';
        recapitulatif += '<p><strong>Récapitulatif de votre demande :</strong></p>';
        recapitulatif += '<ul style="text-align: left; list-style-position: inside;">';
        recapitulatif += '<li><strong>Nom :</strong> ' + nomValue + '</li>';
        recapitulatif += '<li><strong>Email :</strong> ' + emailValue + '</li>';
        recapitulatif += '<li><strong>Téléphone :</strong> ' + telValue + '</li>';
        recapitulatif += '<li><strong>Sujet :</strong> ' + sujetText + '</li>';
        recapitulatif += '<li><strong>Type de demande :</strong> ' + (typeDemandeValue === 'particulier' ? 'Particulier' : 'Entreprise') + '</li>';

        // Ajouter les champs conditionnels s'ils sont visibles et remplis
        if (champDomaine.style.display === 'block') {
            const domaineValue = document.getElementById('domaine').value;
            if (domaineValue) {
                recapitulatif += '<li><strong>Domaine d\'intérêt :</strong> ' + domaineValue + '</li>';
            }
        }

        if (champTicket.style.display === 'block') {
            const ticketValue = document.getElementById('ticket').value;
            if (ticketValue) {
                recapitulatif += '<li><strong>Numéro de ticket :</strong> ' + ticketValue + '</li>';
            }
        }

        if (champUrgence.style.display === 'block') {
            const urgenceValue = document.getElementById('urgence').value;
            if (urgenceValue) {
                const urgenceText = document.getElementById('urgence').options[document.getElementById('urgence').selectedIndex].text;
                recapitulatif += '<li><strong>Niveau d\'urgence :</strong> ' + urgenceText + '</li>';
            }
        }

        if (champIncident.style.display === 'block') {
            const incidentValue = document.getElementById('incident').value;
            if (incidentValue) {
                recapitulatif += '<li><strong>Date de l\'incident :</strong> ' + incidentValue + '</li>';
            }
        }

        recapitulatif += '<li><strong>Message :</strong> ' + messageValue + '</li>';
        recapitulatif += '</ul>';
        recapitulatif += '<p style="margin-top: 1rem;">Notre équipe vous répondra dans les plus brefs délais.</p>';

        // Afficher le message de succès avec le récapitulatif
        successMessage.innerHTML = recapitulatif;
        successMessage.style.display = 'block';

        // Faire défiler vers le message de succès
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Réinitialiser le formulaire après 5 secondes
        setTimeout(function() {
            form.reset();
            // Réinitialiser les bordures
            nomInput.style.borderColor = '#ddd';
            emailInput.style.borderColor = '#ddd';
            telephoneInput.style.borderColor = '#ddd';
            sujetSelect.style.borderColor = '#ddd';
            messageTextarea.style.borderColor = '#ddd';
            // Masquer les champs conditionnels
            champDomaine.style.display = 'none';
            champTicket.style.display = 'none';
            champUrgence.style.display = 'none';
            champIncident.style.display = 'none';
        }, 5000);

        return false; // Empêcher l'envoi réel du formulaire
    });

    // Message dans la console pour confirmer que le script est chargé
    console.log('Script de validation du formulaire chargé avec succès !');
});