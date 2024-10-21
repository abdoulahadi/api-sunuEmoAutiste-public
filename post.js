// Fonction pour récupérer les images par niveau avec filtrage et tri
async function fetchImagesByNiveau(niveau) {
    const url = 'http://localhost:5000/api/images';
    
    // Définir les paramètres de la requête
    const params = new URLSearchParams({
        filter: JSON.stringify({ Niveau: niveau }),
        range: JSON.stringify([0, 1000]),  // Plage suffisamment large pour obtenir toutes les images
        sort: JSON.stringify(['id', 'ASC'])  // Tri par ID par ordre croissant
    });

    try {
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const images = await response.json();
        return images;
    } catch (error) {
        console.error(`Erreur lors de la récupération des images pour le niveau ${niveau}:`, error);
        return [];
    }
}

// Fonction pour générer des questions diversifiées
function generateQuestions(images, niveau) {
    const questions = [];
    const emotions = {};

    // Organiser les images par émotion
    images.forEach(image => {
        const emotion_id = image.EmotionID.id;  // Extrait l'identifiant de l'émotion
        if (!emotions[emotion_id]) {
            emotions[emotion_id] = [];
        }
        emotions[emotion_id].push(image);
    });

    // Créer des questions pour chaque combinaison possible
    Object.keys(emotions).forEach(emotion_id1 => {
        Object.keys(emotions).forEach(emotion_id2 => {
            if (emotion_id1 !== emotion_id2) {
                emotions[emotion_id1].forEach(img1 => {
                    emotions[emotion_id2].forEach(img2 => {
                        questions.push({
                            "GameID": "6675aed2b02251a6a40c85c3",
                            "Image1ID": img1.id,
                            "Image2ID": img2.id,
                            "Niveau": niveau,
                            "CorrectAnswer": "NON"
                        });
                    });
                });
            } else if (emotions[emotion_id1].length > 1) {  // Si plusieurs images avec la même émotion
                for (let i = 0; i < emotions[emotion_id1].length; i++) {
                    for (let j = i + 1; j < emotions[emotion_id1].length; j++) {
                        questions.push({
                            "GameID": "6675aed2b02251a6a40c85c3",
                            "Image1ID": emotions[emotion_id1][i].id,
                            "Image2ID": emotions[emotion_id1][j].id,
                            "Niveau": niveau,
                            "CorrectAnswer": "OUI"
                        });
                    }
                }
            }
        });
    });

    // Mélanger les questions
    return questions.sort(() => Math.random() - 0.5);
}

// Fonction pour envoyer les questions à l'API
async function postQuestionsWithFormData(questions) {
    const url = 'http://localhost:5000/api/jeu1questions';

    for (const question of questions) {
        const formData = new FormData();

        // Ajouter chaque champ à FormData
        formData.append('GameID', question.GameID);
        formData.append('Image1ID', question.Image1ID);
        formData.append('Image2ID', question.Image2ID);
        formData.append('Niveau', question.Niveau);
        formData.append('CorrectAnswer', question.CorrectAnswer);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Question envoyée avec succès:', result);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la question:', error);
        }
    }
}

// Fonction principale
async function main() {
    const niveaux = ['1', '2', '3'];
    
    for (const niveau of niveaux) {
        const images = await fetchImagesByNiveau(niveau);
        if (images.length < 2) {
            console.log(`Pas assez d'images pour le niveau ${niveau}`);
            continue;
        }

        const questions = generateQuestions(images, niveau);

        // Limiter à 20 questions par niveau
        await postQuestionsWithFormData(questions.slice(0, 20));
    }
}

// Appeler la fonction principale
main();
