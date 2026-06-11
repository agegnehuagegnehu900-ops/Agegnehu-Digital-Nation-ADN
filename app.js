document.addEventListener('DOMContentLoaded', () => {
    const passportForm = document.getElementById('passportForm');
    const generateCardBtn = document.getElementById('generateCardBtn');

    const cardName = document.getElementById('cardName');
    const cardRole = document.getElementById('cardRole');
    const cardImage = document.getElementById('cardImage');
    const cardId = document.getElementById('cardId');
    
    // Get the blockchain select element from your HTML
    const blockchainSelect = document.getElementById('blockchainChoice');

    // Blockchain configurations for network switching
    const networks = {
        "Polygon (Fast & Affordable)": {
            chainId: '0x89', // 137 in Hexadecimal
            chainName: 'Polygon Mainnet',
            rpcUrls: ['https://polygon-rpc.com/'],
            nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
            blockExplorerUrls: ['https://polygonscan.com/']
        },
        "Ethereum (Secure & Global)": {
            chainId: '0x1', // 1 in Hexadecimal
        }
    };

    // Event listener for interactive passport building and Web3 connection
    if (generateCardBtn) {
        generateCardBtn.addEventListener('click', async () => {
            const fullNameInput = document.getElementById('fullName').value;
            const profilePicInput = document.getElementById('profilePic').value;
            const techSkillInput = document.getElementById('techSkill').value;
            const selectedNetwork = blockchainSelect ? blockchainSelect.value : '';

            // Basic form validation check
            if (fullNameInput === '' || profilePicInput === '') {
                alert('Please fill out all fields to generate your ADN Digital Passport.');
                return;
            }

            // Web3 Wallet and Network Handling Logic
            let finalPassportId = 'ADN-TEMP-0000';

            if (typeof window.ethereum !== 'undefined' && (selectedNetwork.includes("Polygon") || selectedNetwork.includes("Ethereum"))) {
                try {
                    // Request wallet connection
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const walletAddress = accounts[0];
                    
                    // Format the wallet address to display on the passport (e.g., 0x1234...abcd)
                    finalPassportId = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;

                    // Switch network if Polygon is selected
                    if (selectedNetwork.includes("Polygon")) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: networks["Polygon (Fast & Affordable)"].chainId }],
                            });
                        } catch (switchError) {
                            // If network does not exist in MetaMask, add it
                            if (switchError.code === 4902) {
                                await window.ethereum.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [networks["Polygon (Fast & Affordable)"]],
                                });
                            }
                        }
                    }
                } catch (error) {
                    console.error("Wallet connection failed:", error);
                    alert("Wallet connection was denied or failed. Generating local passport instead.");
                }
            } 
            // Handling Solana if selected (Requires Phantom Wallet)
            else if (selectedNetwork.includes("Solana")) {
                if (window.solana && window.solana.isPhantom) {
                    try {
                        const resp = await window.solana.connect();
                        const walletAddress = resp.publicKey.toString();
                        finalPassportId = `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}`;
                    } catch (err) {
                        console.error("Phantom connection rejected:", err);
                    }
                } else {
                    alert("Please install Phantom Wallet to use the Solana network!");
                    return;
                }
            }

            // Live updating the DOM passport template
            cardName.textContent = fullNameInput.toUpperCase();
            cardRole.textContent = techSkillInput.toUpperCase();
            cardImage.src = profilePicInput;
            cardId.textContent = `ID: ${finalPassportId}`;

            // Smooth subtle entry animation effect for the passport card
            const passportCard = document.getElementById('passportCard');
            if (passportCard) {
                passportCard.style.transform = 'scale(0.95)';
                passportCard.style.transition = 'transform 0.1s ease';

                setTimeout(() => {
                    passportCard.style.transform = 'scale(1)';
                    passportCard.style.borderColor = '#00FF5D';
                    passportCard.style.boxShadow = '0 20px 40px rgba(0, 245, 93, 0.2)';
                }, 100);
            }
        });
    }

    // Add blockchain selection logging
    if (blockchainSelect) {
        blockchainSelect.addEventListener('change', function () {
            console.log("Citizen selected network: " + this.value);
        });
    }
});
                          
