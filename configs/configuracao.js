const textInput = document.getElementById('textInput');
const chat = document.getElementById('chat');
 let context = {};
 const templateChatMessage = (message, from) => `
    <div class="from-${from}">
        <div class="message-inner">
            <p>${message}</p>
        </div>
    </div>
`;
 const InsertTemplateInTheChat = (template) => {
    const div = document.createElement('div');
    div.innerHTML = template;
     chat.appendChild(div);
     chat.scrollTop = chat.scrollHeight;
};
 const getWatsonMessageAndInsertTemplate = async (text = '') => {
    const uri = 'http://localhost:8000/conversation/';
     const response = await (await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text,
            context,
        }),
    })).json();
     context = response.context;
     const template = templateChatMessage(response.output.text, 'watson');
     InsertTemplateInTheChat(template);
};
 textInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13 && textInput.value) {
        getWatsonMessageAndInsertTemplate(textInput.value);
     const template = templateChatMessage(textInput.value, 'user');
    InsertTemplateInTheChat(template);
    
    textInput.value = '';
  }
});
 getWatsonMessageAndInsertTemplate(); 