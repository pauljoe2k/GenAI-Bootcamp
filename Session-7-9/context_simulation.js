// context_simulation.js
const chatHistory = [];
const maxContextLimit = 5;

function addMessageToChat(user, text) {
    const message = { user, text };
    chatHistory.push(message);

    // Check if context window is full
    if (chatHistory.length === maxContextLimit) {
        console.log('⚠️ Context window is full! Older messages will start disappearing.');
    }

    // Remove oldest message if limit exceeded
    if (chatHistory.length > maxContextLimit) {
        const removed = chatHistory.shift();
        console.log(`🗑️ Removed oldest message: ${removed.user}: ${removed.text}`);
    }

    // Display current chat history
    console.log('--- Chat History ---');
    chatHistory.forEach((msg, index) => {
        console.log(`${index + 1}. ${msg.user}: ${msg.text}`);
    });
    console.log('-------------------\n');
}

// Simulate a conversation
addMessageToChat('User', 'Hello!');
addMessageToChat('Bot', 'Hi there!');
addMessageToChat('User', 'How are you?');
addMessageToChat('Bot', 'I am good, thank you!');
addMessageToChat('User', 'What can you do?'); // Context window full here
addMessageToChat('Bot', 'I can chat with you.'); // Oldest message removed
addMessageToChat('User', 'Tell me a joke.');
addMessageToChat('Bot', 'Why did the computer show up late? It had a hard drive!');
