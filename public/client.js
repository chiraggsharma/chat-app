const socket = io() // Calling the socket library

let person;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')


// Getting the name of the user
// The loop will execute until the user enter's their name  
do {

    person = prompt('Enter Your name: ')

} while(!person)


// Sending message using the 'Enter key'.
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

// Function to send message on pressing the 'Enter key'
function sendMessage(message) {
    let msg = {
        user: person, // Passing the name that we got from the prompt
        message: message.trim() // Passing the message that the user has typed
    }

// Appending the message so that it firsts display the message on browser and then the message is sent to the server 
appendMessage(msg, 'outgoing')
textarea.value = ''
scrollToBottom();

// Sending to server
socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type /// Passing the incoming or outgoing class dynamically
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv )

}

// Receieve messages from the server
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})


// This function helps to automatic scroll to the new receieved and sent message
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}