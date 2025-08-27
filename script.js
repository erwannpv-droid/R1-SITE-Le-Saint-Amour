const messages = document.getElementById("messages");
const userInput = document.getElementById("userInput");

// Contexte du restaurant
const context = `
Le Saint Amour est un restaurant à Aigues-Mortes.
Horaires : lun-mar et ven-dim 12h-14h et 19h-21h30. Mer-jeu fermé.
Téléphone : 09 81 17 91 61.
Adresse : 5 Rue Sadi Carnot, 30220 Aigues-Mortes.
Cuisine française généreuse, personnel très accueillant.
`;

async function send() {
  const question = userInput.value.trim();
  if (!question) return;

  append("Vous", question);
  userInput.value = "";

  // 🔁 Remplace 'YOUR_API_KEY' par une clé OpenAI ou une API gratuite comme OpenRouter
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: context },
        { role: "user", content: question }
      ],
      max_tokens: 150
    })
  });

  const data = await res.json();
  const answer = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas compris.";
  append("Assistant", answer);
}

function append(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender} :</strong> ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
