async function onLoadPage() {
    /* Acessando o conteudo da rota profile */
    const reply = await fetch("http://localhost:8080/auth/profile", {
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
    else document.querySelector("h1").innerHTML = "Seja bem vindo(a) " + userName;;

    loadCardsSubscriptions()
  }


async function loadCardsSubscriptions(){
    console.log("entrou")
    const token = window.localStorage.getItem("token")
    const tokenPayload = token.split(".")[1]
    const payload = JSON.parse(atob(tokenPayload))
    const userId = payload.userId
    try {
      let reply = await fetch(`http://localhost:8080/subscription/user/${userId}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token")
        },
      })
      
        const data = await reply.json()
        const events = data.status
        console.log(data)
  
    const cardsContainer = document.getElementById("eventSubscriptions")
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
              <strong>Data:</strong> ${formatedStartData} - ${formatedFimData}
            </p>
  
            <button onclick="deleteSubscription(${event.id}, ${userId})" class="action" href="#">
              Cancelar inscrição
            </button>
          </div>
       
      `
  
        cardsContainer.appendChild(card)
    }
  
  } catch (error) {
      alert(error.message + "Erro ao carregar os eventos" + error.status)
  }
  }

async function deleteSubscription(eventId, userId) {

  const result = await Swal.fire({
    title: 'Cancelar inscrição?',
    text: "Você deseja cancelar a inscrição neste evento?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim cancelar!',
    cancelButtonText: 'Manter inscrição'
  });

  if (!result.isConfirmed) {
    return; 
  }


  try {
    const data ={event_id: eventId, user_id: userId }
    console.log(data)
    const res = await fetch(`http://localhost:8080/subscription/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    })

    alert("Inscrição cancelada com sucesso!")
    loadCardsSubscriptions()

    

    
  } catch (error) {
    alert(error.message + "Erro ao cancelar inscrição")
    return { error: error.message }      
  }
}

async function logout() {
  window.localStorage.removeItem("token");
  window.location.href = "Login.html";
}