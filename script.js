const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const userSelect = document.getElementById("userSelect");

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  chatBox.innerHTML = '';
  messages.forEach(msg => appendMessage(msg.user, msg.text, msg.time));
}

function appendMessage(user, text, time) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${user.toLowerCase()}`;
  messageDiv.innerHTML = `<strong>${user}:</strong> ${text} <br><small>${time}</small>`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const user = userSelect.value;
  const text = messageInput.value.trim();
  if (!text) return;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msg = { user, text, time };

  let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  messages.push(msg);
  localStorage.setItem("chatMessages", JSON.stringify(messages));

  appendMessage(user, text, time);
  messageInput.value = '';
  messageInput.focus();
}

function clearChat() {
  if (confirm("Clear all messages?")) {
    localStorage.removeItem("chatMessages");
    chatBox.innerHTML = '';
  }
}

// Enable Enter key to send message
messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Initial message load
loadMessages();
