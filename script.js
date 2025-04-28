// Array of chat contact names
const contacts = ["Alice", "Bob", "Charlie", "Diana"];

// Find the explorer and chat container
const explorer = document.getElementById('explorer');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

// Store chat messages for each contact
const chatData = {};

// Default selected user
let selectedUser = null;

// Populate the explorer with contacts
contacts.forEach(name => {
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item';
    chatItem.textContent = name;
    explorer.appendChild(chatItem);

    // Store empty chat history for each user
    chatData[name] = [];

    // Click to open chat with that user
    chatItem.addEventListener('click', () => openChat(name));
});

// Function to open chat with a selected user
function openChat(user) {
    selectedUser = user;
    chatMessages.innerHTML = ""; // Clear chat window
    chatData[user].forEach(msg => chatMessages.appendChild(msg)); // Load chat history
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
}

// Handle sending messages
chatForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!selectedUser) {
        alert("Select a user to chat with!");
        return;
    }

    const messageText = chatInput.value.trim();
    if (messageText === "") return;

    // Create and save message
    const messageElement = document.createElement('p');
    messageElement.classList.add('message', 'user-message');
    messageElement.innerHTML = `<strong>You:</strong> ${messageText}`;
    chatMessages.appendChild(messageElement);
    chatData[selectedUser].push(messageElement);

    // Simulate user response
    setTimeout(() => {
        const reply = document.createElement('p');
        reply.classList.add('message');
        reply.innerHTML = `<strong>${selectedUser}:</strong> Got it!`;
        chatMessages.appendChild(reply);
        chatData[selectedUser].push(reply);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    // Auto-scroll & clear input
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = "";
});

