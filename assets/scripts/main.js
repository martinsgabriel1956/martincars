(function () {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"
  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.
  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.
  Essas informações devem ser adicionadas no HTML via Ajax.
  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.
  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  let elements = {
    nameInterprese: document.querySelector('#nameInterprese'),
    telInterprese: document.querySelector('#telInterprese'),
    inputs: document.querySelectorAll('input'),
    submitBtn: document.querySelector('#submitBtn'),
    carData: document.querySelector('#carData'),
    form: document.querySelector('form'),
  }

  function showInfo() {
    fetch('./company.json').then(res => res.json()).then(data => {
      elements.nameInterprese.innerHTML = data.name;
      elements.telInterprese.innerHTML = data.tel;
    });
  }

  window.onload = showInfo();

  function registerCar() {
    const tr = document.createElement("tr");
    
    elements.inputs.forEach(input => {
      const td = document.createElement("td");

      if(!input.value) {
        alert("Please enter a value");
        throw new Error('erro');
      }

      td.innerHTML = input.value
      input.value = "";
      tr.appendChild(td);
    })
    elements.carData.appendChild(tr);
  }

  elements.form.addEventListener("submit", e => {
    e.preventDefault();
    registerCar()
  })

})();

