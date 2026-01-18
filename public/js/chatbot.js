
document.addEventListener('DOMContentLoaded', () => {
    // Check if chatbot already exists
    if (document.getElementById('hope-chatbot-container')) return;

    // --- HTML Injection ---
    const chatbotHTML = `
        <style>
            /* Webkit (Chrome, Edge, Safari) */
            #chat-messages::-webkit-scrollbar {
                width: 8px;
            }
            #chat-messages::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.05);
                border-radius: 4px;
                margin: 4px;
            }
            #chat-messages::-webkit-scrollbar-thumb {
                background: #84cc16; /* lime-500 */
                border-radius: 4px;
                border: 2px solid rgba(255, 255, 255, 0.3);
            }
            #chat-messages::-webkit-scrollbar-thumb:hover {
                background: #65a30d; /* lime-600 */
            }
            /* Firefox */
            #chat-messages {
                scrollbar-width: auto;
                scrollbar-color: #84cc16 rgba(0, 0, 0, 0.05);
            }
        </style>
        <div id="hope-chatbot-container" class="fixed bottom-4 right-4 z-[9999] font-sans flex flex-col items-end">
            <!-- Chat Window -->
            <div id="chat-window" class="hidden flex flex-col w-[90vw] sm:w-[350px] h-[450px] sm:h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 transform origin-bottom-right mb-4">
                <!-- Header -->
                <div class="bg-lime-500 p-4 flex justify-between items-center text-white flex-shrink-0">
                    <div class="flex items-center space-x-3">
                        <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <h3 class="font-bold text-lg">Hope Assistant</h3>
                    </div>
                    <button id="close-chat" class="hover:bg-white/10 p-1 rounded-full transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                
                <!-- Messages Area with Scroll -->
                <div id="chat-messages" class="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 space-y-3">
                    <!-- Messages will be injected here -->
                    <div class="flex justify-start animate-fadeIn">
                        <div class="bg-white border border-gray-200 text-gray-800 rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm max-w-[80%] text-sm leading-relaxed">
                            Bonjour ! Je suis l'assistant virtuel de Hope Comms. Comment puis-je vous aider aujourd'hui ?
                        </div>
                    </div>
                </div>

                <!-- Input Area - Fixed at Bottom -->
                <div class="p-4 bg-white border-t border-gray-100 flex-shrink-0">
                    <form id="chat-form" class="flex space-x-2">
                        <input type="text" id="chat-input" placeholder="Écrivez votre message..." autocomplete="off" class="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 text-sm">
                        <button type="submit" class="bg-lime-500 text-white p-2 rounded-full hover:bg-lime-600 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <!-- Toggle Button -->
            <button id="chatbot-toggle" class="flex items-center justify-center w-14 h-14 bg-lime-500 text-white rounded-full shadow-lg hover:bg-lime-600 hover:scale-105 transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 group-hover:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);


    // --- Knowledge Base ---
    const knowledgeBase = [
        {
            keywords: ['bonjour', 'salut', 'hello', 'hi', 'coucou'],
            response: "Bonjour ! Bienvenue chez Hope Comms. Je suis là pour répondre à toutes vos questions sur nos services et notre agence."
        },
        {
            keywords: ['service', 'faisons', 'offre', 'proposez', 'publicité', 'marketing', 'digital', 'événementiel', 'activités'],
            response: "Nous proposons une gamme complète de services : Publicité 360° (institutionnelle, marque, produit), Marketing Digital pour engager votre communauté, et Événementiel & Média (organisation de conférences, newsletters, magazines internes)."
        },
        {
            keywords: ['prix', 'tarif', 'coût', 'combien', 'devis', 'facture', 'payer'],
            response: "Chaque projet est unique chez Hope Comms. Nos tarifs sont adaptés sur mesure à vos besoins. Souhaitez-vous être mis en relation avec notre équipe commerciale pour un devis personnalisé ?"
        },
        {
            keywords: ['contact', 'joindre', 'téléphone', 'mail', 'email', 'adresse', 'ou', 'situer', 'localisation'],
            response: "Vous pouvez nous contacter directement au +243 822 032 633 ou via le formulaire de notre page Contact. Nous sommes situés en République Démocratique du Congo."
        },
        {
            keywords: ['équipe', 'team', 'expert', 'qui', 'personnel', 'staff', 'chef'],
            response: "Notre équipe est composée d'experts passionnés : Jean-Marc Kalonji (DG), Sarah Mbuyi (Directrice Création) et David Kabongo (Responsable Marketing), prêts à propulser votre communication."
        },
        {
            keywords: ['valeur', 'pourquoi', 'choisir', 'avantage', 'force', 'différence'],
            response: "Pourquoi nous choisir ? Nous avons une expertise locale approfondie du marché congolais, une approche sur mesure pour chaque client, et une créativité sans limite pour garantir l'impact de vos campagnes."
        },
        {
            keywords: ['mission', 'vision', 'but', 'objectif'],
            response: "Notre mission est d'accompagner les entreprises et institutions dans leur stratégie de communication, en transformant vos idées en campagnes percutantes pour soigner et entretenir votre réputation."
        },
        {
            keywords: ['rdc', 'congo', 'kinshasa', 'pays', 'ville'],
            response: "Absolument ! Nous sommes fièrement basés en République Démocratique du Congo et spécialisés dans le marché local."
        }
    ];

    const fallbackResponse = "Je suis spécialisé dans les questions concernant Hope Comms et nos services de communication. Pourriez-vous reformuler votre demande en lien avec nos activités (Services, Équipe, Contact, Valeurs) ?";

    // --- Logic ---
    function findBestMatch(text) {
        const lowerText = text.toLowerCase();

        for (const entry of knowledgeBase) {
            if (entry.keywords.some(keyword => lowerText.includes(keyword))) {
                return entry.response;
            }
        }

        return null;
    }

    // --- State Management ---
    const STATE_KEY = 'hope_chatbot_state';
    const MESSAGES_KEY = 'hope_chatbot_messages';

    const chatWindow = document.getElementById('chat-window');
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');

    // Save State
    function saveState(isOpen) {
        sessionStorage.setItem(STATE_KEY, isOpen ? 'open' : 'closed');
    }

    function saveMessages() {
        sessionStorage.setItem(MESSAGES_KEY, messagesContainer.innerHTML);
    }

    function scrollToBottom() {
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 10);
    }

    function toggleChat() {
        chatWindow.classList.toggle('hidden');
        const isHidden = chatWindow.classList.contains('hidden');
        saveState(!isHidden); // Update state on user interaction
        if (!isHidden) { // If opening
            setTimeout(() => chatInput.focus(), 100);
            scrollToBottom();
        }
    }

    // Explicitly expose close function for external use
    window.closeChatbot = function () {
        if (!chatWindow.classList.contains('hidden')) {
            toggleChat();
        }
    };

    function addMessage(text, isUser = false) {
        const div = document.createElement('div');
        div.className = isUser ? 'flex justify-end animate-fadeIn' : 'flex justify-start animate-fadeIn';

        const bubbleColor = isUser ? 'bg-lime-500 text-white' : 'bg-white border border-gray-200 text-gray-800';
        const borderRadius = isUser ? 'rounded-tl-xl rounded-tr-xl rounded-bl-xl' : 'rounded-tr-xl rounded-br-xl rounded-bl-xl';

        div.innerHTML = `
            <div class="${bubbleColor} ${borderRadius} p-3 shadow-sm max-w-[80%] text-sm break-words leading-relaxed">
                ${text}
            </div>
        `;
        messagesContainer.appendChild(div);
        scrollToBottom();
        saveMessages();
    }

    // --- Event Listeners ---
    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        // User Message
        addMessage(text, true);
        chatInput.value = '';

        // Bot Response
        setTimeout(() => {
            const match = findBestMatch(text);
            const response = match ? match : fallbackResponse;
            addMessage(response, false);
        }, 600);
    });

    // --- Initialization ---
    // Do NOT automatically open based on previous state
    // const isOpen = sessionStorage.getItem(STATE_KEY) === 'open'; // Ignored

    // Restore messages logic
    const savedMessages = sessionStorage.getItem(MESSAGES_KEY);
    if (savedMessages) {
        messagesContainer.innerHTML = savedMessages;
    } else {
        saveMessages();
    }

    // Always start closed visually (hidden class is there by default)
    // If we wanted to enforce it: chatWindow.classList.add('hidden');
});
