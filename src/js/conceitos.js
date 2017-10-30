function start() {
  var infoPotion = new XMLHttpRequest();
  var arrayPotion = {};
  infoPotion.open('GET','json/potions.json');
  infoPotion.onload = function(){
    arrayPotion = JSON.parse(infoPotion.responseText);
    var contadorProdutos=0;
    for (var index in arrayPotion.potions){
      contadorProdutos++;
    }
    rowBuilder(contadorProdutos);
    var row_number = 0;
    for (var index in arrayPotion.potions){
      buildItemHTML(arrayPotion.potions[index],"catalog_row_"+row_number);
      if(parseInt(index)%3==0){
        row_number++;
      }
    }
  }
  infoPotion.send();
};


function rowBuilder(arrayLength){
  var row_number=0;
  var catalogContainer = document.getElementById("catalogContainer");
  for(var i=0; i<arrayLength; i++){
    if(i%3==0){
      var row = document.createElement("tr");
      row.setAttribute("id", "catalog_row_" + row_number);
      row_number++;
      catalogContainer.appendChild(row);
    }
  }

}
function buildItemHTML(itemData, id_row){ //tô gerando HTML via JS
  //
  var cell = document.createElement("td"); //criar elemento (td)
  var cell_attribute = document.createAttribute("class"); //cria um atributo do tipo CLASS
  cell_attribute.value = 'item'; //atribui a classe 'item' já existente no stylesheet à classe recém criada
  cell.setAttributeNode(cell_attribute); //atribui o atributo 'attribute' no elemento (TD)
  // var cell = document.createElement("td");
  // cell.setAttribute("class", "item");
  //
  var image = document.createElement("img");
  // var image_attribute_class = document.createAttribute("class");
  // var image_attribute_src = document.createAttribute('src');
  // image_attribute_class.value = 'item-img';
  // image_attribute_src.value = "img/products/" + itemData.image;
  image.setAttribute("class", "item-img");
  image.setAttribute("src", "img/products/" + itemData.image);
  image.onclick = function(){
    openLightbox(itemData);
  }
  var br = document.createElement("br");
  var span_inner = document.createElement("span");
  var span_outter = document.createElement("span");
  span_inner.innerHTML = '$' + itemData.price;
  span_outter.innerHTML = itemData.name + ' - ';
  span_outter.appendChild(span_inner);

  cell.appendChild(image);
  cell.appendChild(br);
  cell.appendChild(span_outter);
  //
  var catag = document.getElementById(id_row);
  catag.appendChild(cell);
}

function openLightbox(itemData){
  document.getElementById("lightboxPotion").style = "display: block;";
  document.getElementById("lightboxName").innerHTML = itemData.name;
  document.getElementById("lightboxUseEffect").innerHTML = itemData.effect;
  document.getElementById("lightboxImage").innerHTML = "<img src='img/products/"+itemData.image+"'>";
  var ul = document.getElementById("lightboxIngredients");
  ul.innerHTML = "";
  for(var i=0; i<itemData.ingredients.length; i++){
    var li = document.createElement("li");
    li.innerHTML = itemData.ingredients[i];
    ul.appendChild(li);
  }
  document.getElementById("lightboxPrice").innerHTML = itemData.price;
  console.log(itemData);
}

function closeLightbox(){
 document.getElementById("lightboxPotion").style = "display: none;";
}
