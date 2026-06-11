document.addEventListener('DOMContentLoaded', () => {
    const passportForm = document.getElementById('passportForm');
    const generateCardBtn = document.getElementById('generateCardBtn');

    const cardName = document.getElementById('cardName');
    const cardRole = document.getElementById('cardRole');
    const cardImage = document.getElementById('cardImage');
    const cardId = document.getElementById('cardId');

    // Function to generate a professional deterministic unique ID
    function generateUniqueID() {
        const year = 2026;
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        return `ADN-${year}-${randomDigits}`;
    }

    // Event listener for interactive passport building
    if (generateCardBtn) {
        generateCardBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const fullNameInput = document.getElementById('fullName').value.trim();
            const profilePicInput = document.getElementById('profilePic').value.trim();
            const techSkillInput = document.getElementById('techSkill').value;

            // Basic form validation check
            if (fullNameInput === '' || profilePicInput === '') {
                alert('Please fill out all fields to generate your ADN Digital Passport.');
                return;
            }

            // Live updating the DOM passport template
            if (cardName) cardName.textContent = fullNameInput.toUpperCase();
            if (cardRole) cardRole.textContent = techSkillInput.toUpperCase();
            if (cardImage) cardImage.src = profilePicInput;
            if (cardId) cardId.textContent = `ID : ${generateUniqueID()}`;

            // Smooth subtle entry animation effect for the passport card
            const passportCard = document.getElementById('passportCard');
            if (passportCard) {
                passportCard.style.transform = 'scale(0.95)';
                passportCard.style.transition = 'transform 0.1s ease';

                setTimeout(() => {
                    passportCard.style.transform = 'scale(1)';
                    passportCard.style.borderColor = '#00F5D4';
                    passportCard.style.boxShadow = '0 20px 40px rgba(0, 245, 212, 0.25)';
                }, 100);
            }
        });
    }

    // Add blockchain selection logging
    const blockchainSelect = document.getElementById('blockchainChoice');
    if (blockchainSelect) {
        blockchainSelect.addEventListener('change', function() {
            console.log("Citizen selected network: " + this.value);
        });
    }
});
