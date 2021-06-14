/*
Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados, 
salvando-os temporariamente na memória de um servidor.
Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para 
que possamos utilizar para salvar as informações dos nossos carros.
Para utilizá-lo, você vai precisar fazer o seguinte:
- Via terminal, acesse o diretório `server`;
- execute o comando `npm install` para instalar as dependências;
- execute `node app.js` para iniciar o servidor.
Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço: 
`http://localhost:3000`
O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
As mudanças que você irá precisar fazer no seu projeto são:
- Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
`http://localhost:3000/car`
- Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
os seguintes campos:
  - `image` com a URL da imagem do carro;
  - `brandModel`, com a marca e modelo do carro;
  - `year`, com o ano do carro;
  - `plate`, com a placa do carro;
  - `color`, com a cor do carro.
Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.
Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
do pull request.
*/

function app() {
  let elements = {
    nameInterprese: document.querySelector("#nameInterprese"),
    telInterprese: document.querySelector("#telInterprese"),
    inputs: document.querySelectorAll("input"),
    submitBtn: document.querySelector("#submitBtn"),
    carData: document.querySelector("#carData"),
    form: document.querySelector("form"),
  };
  
  
  elements.form.addEventListener("submit", (e) => {
    e.preventDefault();
    features.insertInfo();
    features.registerCar();

  });
  
  const features = {
    showInfo() {
      fetch("./company.json")
      .then((res) => res.json())
      .then((data) => {
        elements.nameInterprese.innerHTML = data.name;
        elements.telInterprese.innerHTML = data.tel;
      });
    },
    registerCar() {
      const tr = document.createElement("tr");
      
      elements.inputs.forEach((input) => {
        const td = document.createElement("td");
        
        if (!input.value) {
          alert("Please enter a value");
          throw new Error("erro");
        }
        
        td.innerHTML = input.value;
        input.value = "";
        tr.appendChild(td);
      });
      tr.appendChild(this.removeCar());
      elements.carData.appendChild(tr);
    },
    removeCar() {
      const td = document.createElement("td");
      const removeBtn = document.createElement("button");
      
      removeBtn.textContent = "remover carro";
      removeBtn.classList.add("removeBtn");
      removeBtn.addEventListener("click", features.remove);
      
      td.appendChild(removeBtn);
      
      return td;
    },
    remove(e) {
      e.preventDefault();
      const tr = this.parentNode.parentNode;
      tr.classList.add("removeClass");
    },
    insertInfo() {
      let image = document.querySelector("#imgCar").value;
      let brandModel = document.querySelector("#modelCar").value;
      let year = document.querySelector("#yearCar").value;
      let plate = document.querySelector("#plateCar").value;
      let color = document.querySelector("#colorCar").value;
      
      fetch('http://localhost:3000', {
        method: 'POST', body: JSON.stringify({
          image,
          brandModel,
          year,
          plate,
          color
        })
      }).then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))
    }
  };
  
  
  window.onload = features.showInfo();
}

app();
