const chatBox = document.getElementById('chat-box');
const input = document.getElementById('msg-input');

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  chatBox.innerHTML = '';

  messages.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
      ${msg.text}
      <div class="timestamp">${msg.time}</div>
    `;
    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  messages.push({ text, time });
  localStorage.setItem('chatMessages', JSON.stringify(messages));
  input.value = '';
  loadMessages();
}

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

loadMessages();
