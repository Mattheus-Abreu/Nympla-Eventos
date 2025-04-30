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

            <button onclick="subscribe(${event.id})" class="action" href="#">
              Inscrever-se
            </button>
          </div>
       
      `

        cardsContainer.appendChild(card)
    }

  } catch (error) {
      alert(error.message + "Erro ao carregar os eventos" + error.status)
  }

    
}

async function subscribe(event_id){
    const result = await Swal.fire({
        title: 'Confirmar inscrição?',
        text: "Você deseja se inscrever neste evento?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, inscrever!',
        cancelButtonText: 'Cancelar'
    });

    

    if (!result.isConfirmed) {
        return; 
    }

    const token = window.localStorage.getItem("token")

    const tokenPayload = token.split(".")[1]
    const payload = JSON.parse(atob(tokenPayload))
    const userId = payload.userId

    const data = {
        user_id: userId,
        event_id: event_id,
    }

    const reply = await fetch("http://localhost:8080/subscription", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    
      if (reply.status == 201) {
        alert("Inscricao realizada com sucesso!");
      }else{
        alert("Você ja se inscreveu neste evento!");        
      }

}

async function logout() {
    window.localStorage.removeItem("token");
    window.location.href = "Login.html";
  }


    