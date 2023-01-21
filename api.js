// Obtener la sección donde se mostrará la información de los elementos
const elementsSection = document.getElementById("elements");

// URL de la API
const apiUrl = "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json";
generatePage("All", "All");

function activateFilterPhase(id) {
  document.getElementById("AllPhase").classList.remove("active");
  document.getElementById("Solid").classList.remove("active");
  document.getElementById("Liquid").classList.remove("active");
  document.getElementById("Gas").classList.remove("active");
  document.getElementById(id).classList.add("active");

  getFilters();
}

function activateFilterCategory(id) {
  document.getElementById("AllCategory").classList.remove("active");
  document.getElementById("diatomic nonmetal").classList.remove("active");
  document.getElementById("noble gas").classList.remove("active");
  document.getElementById("alkali metal").classList.remove("active");
  document.getElementById("alkaline earth metal").classList.remove("active");
  document.getElementById("metalloid").classList.remove("active");
  document.getElementById("polyatomic nonmetal").classList.remove("active");
  document.getElementById("post-transition metal").classList.remove("active");
  document.getElementById("transition metal").classList.remove("active");
  document.getElementById("lanthanide").classList.remove("active");
  document.getElementById("actinide").classList.remove("active");
  document.getElementById(id).classList.add("active");

  getFilters();
}

function getFilters() {
  var phase;
  var category;

  if (document.getElementById("AllPhase").classList.contains("active")) {
    phase = "All";
  } else if (document.getElementById("Solid").classList.contains("active")) {
    phase = "Solid";
  } else if (document.getElementById("Liquid").classList.contains("active")) {
    phase = "Liquid"
  } else if (document.getElementById("Gas").classList.contains("active")) {
    phase = "Gas"
  }

  if (document.getElementById("AllCategory").classList.contains("active")) {
    category = "All";
  } else if (document.getElementById("diatomic nonmetal").classList.contains("active")) {
    category = "diatomic nonmetal";
  } else if (document.getElementById("noble gas").classList.contains("active")) {
    category = "noble gas";
  } else if (document.getElementById("alkali metal").classList.contains("active")) {
    category = "alkali metal";
  } else if (document.getElementById("alkaline earth metal").classList.contains("active")) {
    category = "alkaline earth metal";
  } else if (document.getElementById("metalloid").classList.contains("active")) {
    category = "metalloid";
  } else if (document.getElementById("polyatomic nonmetal").classList.contains("active")) {
    category = "polyatomic nonmetal";
  } else if (document.getElementById("post-transition metal").classList.contains("active")) {
    category = "post-transition metal";
  } else if (document.getElementById("transition metal").classList.contains("active")) {
    category = "transition metal";
  } else if (document.getElementById("lanthanide").classList.contains("active")) {
    category = "lanthanide";
  } else if (document.getElementById("actinide").classList.contains("active")) {
    category = "actinide";
  }

  deleteElements();
  generatePage(phase, category);
}

function generatePage(filterPhase, filterCategory) {
  // Hacer una llamada a la API utilizando fetch
  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Recorrer los elementos de la tabla periódica
    data.elements.forEach((element) => {
      // Crear un elemento <div> para cada elemento
      const elementDiv = document.createElement("div");
      elementDiv.classList.add("element");
      elementDiv.classList.add("card");
      elementDiv.classList.add("ms-5");
      elementDiv.classList.add("mb-5");
      elementDiv.style.width = "18rem";
      elementDiv.style.background = "#4DA4EA";
      if (element.category=="diatomic nonmetal") { 
        elementDiv.style.background = "#015146";
      } else if (element.category=="noble gas") { 
        elementDiv.style.background = "#3a2151";
      } else if (element.category=="alkali metal") { 
        elementDiv.style.background = "#924f00";
      } else if (element.category=="alkaline earth metal") { 
        elementDiv.style.background = "#9b7113";
      } else if (element.category=="metalloid") { 
        elementDiv.style.background = "#015146";
      } else if (element.category=="polyatomic nonmetal") { 
        elementDiv.style.background = "#003666";
      } else if (element.category=="post-transition metal") { 
        elementDiv.style.background = "#3e6418";
      } else if (element.category=="transition metal") { 
        elementDiv.style.background = "#a81825";
      } else if (element.category=="lanthanide") { 
        elementDiv.style.background = "#704c26";
      } else if (element.category=="actinide") { 
        elementDiv.style.background = "#732e4c";
      }

      elementDiv.style.color = "#777";
      if (element.phase=="Gas") { 
        elementDiv.style.color = "#f44";
      } else if (element.phase=="Liquid") { 
        elementDiv.style.color = "#99f";
      } else if (element.phase=="Solid") { 
        elementDiv.style.color = "#b5b5b5";
      }

      // Crear un elemento <h2> para el nombre del elemento
      const elementName = document.createElement("h2");
      elementName.textContent = `${element.number}.  ${element.symbol}`;
      elementName.classList.add("mt-2");

      // Crear un elemento <img src="http:...
      const elementImage = document.createElement("img");
      elementImage.classList.add("card-img-top");
      if(element.bohr_model_image!=undefined) {
        elementImage.src = element.bohr_model_image;
      } else {
        elementImage.src = "https://th.bing.com/th/id/R.08dd330189d256e097f19c9f0f7d6307?rik=iwIh5Peey98btQ&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fassassinscreed%2fimages%2f3%2f39%2fNot-found.jpg%2frevision%2flatest%3fcb%3d20110517171552&ehk=8hqTonUkws%2bimDsJ4D%2bb45Vfe3gG41PXycQQlFy2AIA%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
      }

      // Creamos un elemento <H5> para definir el titulo de la carta
      const elementSymbol = document.createElement("h5");
      elementSymbol.textContent = element.name
      elementSymbol.classList.add("card-title");
      
      // Crear un elemento <p> para la información del elemento
      const elementInfo = document.createElement("p");
      elementInfo.textContent = `Electron configuration: ${element.electron_configuration}`;
      elementInfo.classList.add("card-text");

      // Creamos un elemento <a> para enlaçar con la wiki del elemento
      const elementWiki = document.createElement("a");
      elementWiki.textContent = "Wikipedia";
      elementWiki.classList.add("btn");
      elementWiki.classList.add("btn-primary");
      elementWiki.classList.add("m-3");
      elementWiki.href = element.source;


      // Agregar los elementos <h2> y <p> al elemento <div>
      elementDiv.appendChild(elementName);
      elementDiv.appendChild(elementImage);
      elementDiv.appendChild(elementSymbol);
      elementDiv.appendChild(elementInfo);
      elementDiv.appendChild(elementWiki);

      if ((element.phase == filterPhase || filterPhase == "All") && (element.category == filterCategory || filterCategory == "All")) {
        // Agregar el elemento <div> a la sección de elementos
        elementsSection.appendChild(elementDiv);
      }
    });
  })
  .catch((error) => {
    console.error("Error al obtener la información de los elementos:", error);
  });
}

function deleteElements(){
  const parent = document.getElementById("elements")
   while (parent.firstChild) {
      parent.firstChild.remove()
   }
}