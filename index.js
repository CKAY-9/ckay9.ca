const secret_style_span = document.getElementById("secret_style");
const pfp_img = document.getElementById("pfp");
const secret_count_span = document.getElementById("secret_count");
const miku_approved = document.getElementById("miku");
const ckay9_element = document.getElementById("ckay9");
const body_element = document.body;
const github_pfp = "https://avatars.githubusercontent.com/u/53030585?v=4";
const name_h1 = document.getElementById("name");

let name_letters_pressed = [0, 0, 0, 0, 0];
let ckay9_pressed = false;

const secrets = [
	"ckay9_span",
	"itsjustanhtml",
	"pfp",
	"random_miku",
	"name_code",
];

const possible_fonts = [
	'"Open Sans", sans-serif',
	'"Roboto", sans-serif',
	'"Merriweather", serif',
	'"Times New Roman", Times, serif',
];

const changeStyle = () => {
	window.localStorage.setItem("itsjustanhtml", "true");
	secretUpdate();

	const random_font_index = Math.floor(Math.random() * possible_fonts.length);
	const random_font = possible_fonts[random_font_index];

	let style = document.createElement("style");
	style.innerHTML = `
        body, body * {
            font-family: ${random_font} !important;
        }
    `;
	document.head.appendChild(style);

	if (Math.random() <= 0.5) {
		body_element.style.background = "black";
		body_element.style.color = "white";
		pfp_img.style.filter = "invert(1)";
	} else {
		body_element.style.background = "white";
		body_element.style.color = "black";
		pfp_img.style.filter = "invert(0)";
	}
};

const randomMiku = () => {
	window.localStorage.setItem("random_miku", "true");
	secretUpdate();

	miku_approved.style.bottom = `${Math.random() * 80}vh`;
	miku_approved.style.left = `${Math.random() * 80}vw`;
	miku_approved.style.rotate = `${
		Math.random() * 360 * (Math.random() - 1 / 2)
	}deg`;
};

const enableMiku = () => {
	miku_approved.style.opacity = "1";
};

const ckay9_click = () => {
	window.localStorage.setItem("ckay9_span", "true");
	secretUpdate();

	if (ckay9_pressed) {
		return;
	}

	ckay9_pressed = true;
	should_create = true;

	setInterval(() => {
		if (!should_create) {
			return;
		}

		for (let i = 0; i < 4; i++) {
			const add_span = document.createElement("span");
			add_span.innerText = "ckay9 ckay9";
			ckay9_element.appendChild(add_span);
			if (ckay9_element.scrollHeight >= body_element.scrollHeight + 18) {
				should_create = false;
				return;
			}
		}
	}, 300);
};

const secretUpdate = () => {
	let total_completed = 0;
	for (const secret of secrets) {
		const value = window.localStorage.getItem(secret);
		if (value === null) {
			continue;
		}

		total_completed += value.trim().toLowerCase() === "true" ? 1 : 0;
	}

	secret_count_span.innerText = `${total_completed}/${secrets.length}`;
};

const clearSecrets = () => {
	for (const secret of secrets) {
		window.localStorage.removeItem(secret);
	}
	secretUpdate();
};

const pfpSecret = () => {
	window.localStorage.setItem("pfp", "true");
	secretUpdate();

	pfp_img.style.opacity = "0";

	setTimeout(() => {
		if (pfp_img.src == github_pfp) {
			pfp_img.src = "./pfp.png";
		} else {
			pfp_img.src = github_pfp;
		}

		pfp_img.style.opacity = "1";
	}, 250);
};

const ckay9LetterClick = (char_clicked) => {
	switch (char_clicked) {
		case "c":
			if (!name_letters_pressed[2]) {
				break;
			}
			name_letters_pressed[0] = 1;
			break;
		case "k":
			if (!name_letters_pressed[4]) {
				break;
			}
			name_letters_pressed[1] = 1;
			break;
		case "a":
			name_letters_pressed[2] = 1;
			break;
		case "y":
			if (!name_letters_pressed[1]) {
				break;
			}
			name_letters_pressed[3] = 1;
			break;
		case "9":
			if (!name_letters_pressed[0]) {
				break;
			}
			name_letters_pressed[4] = 1;
			break;
		default:
			break;
	}

	console.log(name_letters_pressed);

	for (const flag of name_letters_pressed) {
		console.log(flag);
		if (!flag) {
			return;
		}
	}

	window.localStorage.setItem("name_code", "true");
	secretUpdate();

	name_h1.classList.add("rainbow_text_animated");
	name_h1.style.fontSize = "3rem";
};

const loadCKAY9LettersSecret = () => {
	for (const char of "ckay9") {
		const element = document.getElementById("name_" + char);
		if (element === null) {
			continue;
		}

		element.onclick = () => {
			ckay9LetterClick(char);
		};
	}
};

secret_style_span.onclick = () => {
	changeStyle();
	enableMiku();
};

miku_approved.onclick = () => {
	randomMiku();
};

ckay9_element.onclick = () => {
	ckay9_click();
};

secret_count_span.onclick = () => {
	clearSecrets();
};

pfp_img.onclick = () => {
	pfpSecret();
};

window.onload = () => {
	loadCKAY9LettersSecret();
	secretUpdate();
};
