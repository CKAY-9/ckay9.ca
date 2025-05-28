const messages_element = document.getElementById("messages");
let messages = [];
const guest_message_input = document.getElementById("guest_message_input");
const guest_message_name = document.getElementById("guest_message_name");
const guestlist_api = "https://guestlist.ckay9.ca";

const submitGuestMessage = async () => {
	const message = guest_message_input.value;
	const name = guest_message_name.value;

	if (message.length < 5) {
		return;
	}

	if (message.length >= 255 || name.length >= 50) {
		return;
	}

	messages_element.innerHTML += `
        <div class="message" id="message_${messages.length + 1}">
            <span>${
				name.length <= 0 ? `Guest #${messages.length + 1}` : name
			}</span>
            <span>${message}</span>
        </div>
    `;

	messages.push({
		message: message,
		name: name,
        offset: (new Date()).getTimezoneOffset(),
		id: messages.length + 1,
	});

	const create_response = await fetch(`${guestlist_api}/message`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			message: message,
			name: name,
			timezone: new Date().getTimezoneOffset(),
		}),
	});

	guest_message_input.value = "";
	guest_message_name.value = "";
};

const getExistingMessages = async () => {
	const messages_response = await fetch(`${guestlist_api}/message`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const messages_json = await messages_response.json();
	messages = messages_json

	for (let i = 0; i < messages.length; i++) {
		let message = messages[i];
        console.log(message);
		messages_element.innerHTML += `
            <div class="message" id="message_${message.id}">
                <span>${
					message.name.length <= 0
						? `Guest #${message.id}`
						: message.name
				}</span>
                <span>${message.message}</span>
            </div>
        `;
	}
};

(async () => {
	await getExistingMessages();
})();
