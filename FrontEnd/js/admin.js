async function onLoadPage() {
  /* Acessando o conteudo da rota profile */
  const reply = await fetch("http://localhost:8080/auth/admin", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  });

  const data = await reply.json();
  const token = window.localStorage.getItem("token")
  const tokenPayload = token.split(".")[1]
  const payload = JSON.parse(atob(tokenPayload))
  console.log(payload)
  const userName = payload.userName
  

  console.log(data);
  if (reply.status != 200)
    document.querySelector("h1").innerHTML = "Access Denied!";
  else document.querySelector("h1").innerHTML = "Seja bem vindo(a) " + userName;

  loadCards()
}

async function loadCards(){
console.log("entrou")
  const search = document.getElementById("searchName").value

  try {
    let reply
    if(search == ""){
        reply = await fetch("http://localhost:8080/event/all")         
      }else{
        reply = await fetch(`http://localhost:8080/event/${encodeURIComponent(search)}`)
      }
      const data = await reply.json()
      const events = data.status
      console.log(events)

  const cardsContainer = document.getElementById("eventCards")
  cardsContainer.innerHTML = ""

  for(let i = 0 ; i < events.length ; i++){ 
      const event = events[i]

      const startData = new Date(event.data_inicio)
      const fimData = new Date(event.data_fim)

      const options = {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
      }

      const formatedStartData = startData.toLocaleDateString("pt-BR", options)
      const formatedFimData = fimData.toLocaleDateString("pt-BR", options)

      const card = document.createElement("div")
      card.classList.add("card")


    card.innerHTML = `
      
      <img class="image" src="${event.image_url}" alt="${event.nome}"></img>
        <div class="content" >
          <a href="#">
            <span class="title">
              ${event.nome}
            </span>
          </a>

          <p class="desc">
            ${event.descricao}
          </p>

          <p class="desc">
            <strong>Data:</strong> ${formatedStartData} - ${formatedFimData}
          </p>

          <p class="desc">
            <strong>Local:</strong> ${event.localizacao}
          </p>

          <button onclick="getSubscribe(${event.id})" class="action" href="#">
            Inscritos
          </button>
        </div>
     
    `

      cardsContainer.appendChild(card)
  }

} catch (error) {
    alert(error.message + "Erro ao carregar os eventos" + error.status)
}

}

async function getSubscribe(eventId) {
  const reply = await fetch(`http://localhost:8080/admin/subscriptionsEvent/${eventId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + window.localStorage.getItem("token")
    },
  });

  const data = await reply.json();    
  const subscriptions = data.status
  const gridElement = document.querySelector("#registeredList");
  
  gridElement.innerHTML = "";  
  if (subscriptions.length == 0) {
      gridElement.innerHTML = '<div class="col-12"><p class="text-center py-4">Sem inscritos</p></div>';
      new bootstrap.Modal(document.getElementById('registeredModal')).show();
      return;
  }

  for (let i = 0; i < subscriptions.length; i++) {

    const subscription = subscriptions[i];

    
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
        <div class="card mb-3 shadow-sm">
        <div class="card-body">
        <h5 class="card-title">${subscription.user_name}</h5>
        <p class="card-text">
            <strong>Número de inscrição:</strong> ${subscription.id}<br>
            <strong>Check-in:</strong> ${subscription.check_in === 'pending' ? 'Pendente' : 'Feito'}
        </p>
        </div>
        </div>
    `;
    gridElement.appendChild(card);
}
new bootstrap.Modal(document.getElementById('registeredModal')).show();



  
}


async function logout() {
  window.localStorage.removeItem("token");
  window.location.href = "Login.html";
}


  