//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
		console.log("SI");
		
	}
    $('#personalizada').toggleClass('invisible')
  })
}

function leerJSONCiudad() {
	let dropdown = document.getElementById('ciudad');
	dropdown.length = 0;

	let defaultOption = document.createElement('option');
	defaultOption.text = 'Escoger Ciudad';

	dropdown.add(defaultOption);
	dropdown.selectedIndex = 0;

	var url = "json/data.json";

	const request = new XMLHttpRequest();
	request.overrideMimeType("application/json");
	request.open('GET', url, true);
	request.onload  = function() {
	var opciones="";
	  if (request.status === 200) 
	  {
		const data = JSON.parse(request.responseText);
		let option;
			for (let i = 0; i < data.length; i++) {
				if(!(opciones.includes(data[i].Ciudad)))
				{
					opciones = opciones + data[i].Ciudad;
					option = document.createElement('option');
					option.text = data[i].Ciudad;
					option.value = data[i].Ciudad;
					dropdown.add(option);				
				}
				
			}
	   } 
	   else 
	   {
		// Reached the server, but it returned an error
		}   
	}
	//request.onerror = function() {
	  //console.error('An error occurred fetching the JSON from ' + url);
	//};

	request.send();	

}

function leerJSONTipo() {
	let dropdown = document.getElementById('tipo');
	dropdown.length = 0;

	let defaultOption = document.createElement('option');
	defaultOption.text = 'Escoger Tipo';

	dropdown.add(defaultOption);
	dropdown.selectedIndex = 0;

	var url = "json/data.json";

	const request = new XMLHttpRequest();
	request.overrideMimeType("application/json");
	request.open('GET', url, true);
	request.onload  = function() {
	var opciones="";
	  if (request.status === 200) 
	  {
		const data = JSON.parse(request.responseText);
		let option;
			for (let i = 0; i < data.length; i++) {
				if(!(opciones.includes(data[i].Tipo)))
				{
					opciones = opciones + data[i].Tipo;
					option = document.createElement('option');
					option.text = data[i].Tipo;
					option.value = data[i].Tipo;
					dropdown.add(option);				
				}
				
			}
	   } 
	   else 
	   {
		// Reached the server, but it returned an error
		}   
	}
	//request.onerror = function() {
	  //console.error('An error occurred fetching the JSON from ' + url);
	//};

	request.send();	

}

function BuscarValores(Ciudad_,Tipo_,Precio_) {
	console.log(Ciudad_ + " " + Tipo_+ " " + Precio_);
	
	// Saving it's instance to var
	var slider = $("#rangoPrecio").data("ionRangeSlider");

	// Get values
	var Desde = slider.result.from;
	var Hasta = slider.result.to;
	
	var url = "json/data.json";

	const request = new XMLHttpRequest();
	request.overrideMimeType("application/json");
	request.open('GET', url, true);
	request.onload  = function() {
		
	var entro="";
	
	  if (request.status === 200) 
	  {
		const data = JSON.parse(request.responseText);
		let option;
			for (let i = 0; i < data.length; i++) {
				if(entro=="")
				{
					var Precio = data[i].Precio.replace("$", "").replace(",","");
					if( Ciudad_==data[i].Ciudad && Tipo_==data[i].Tipo && Desde<=Precio && Hasta>=Precio  )
					{
						document.getElementById('lblDireccion').innerHTML = data[i].Direccion;
						document.getElementById('lblCiudad').innerHTML = data[i].Ciudad;
						document.getElementById('lblTelefono').innerHTML = data[i].Telefono;
						document.getElementById('lblCodigoPostal').innerHTML = data[i].Codigo_Postal;
						document.getElementById('lblPrecio').innerHTML = data[i].Precio;
						document.getElementById('lblTipo').innerHTML = data[i].Tipo;
						if(data[i].Tipo=="Casa")
							document.getElementById('imagen').src = "img/casa.jpg";
						if(data[i].Tipo=="Apartamento")
							document.getElementById('imagen').src = "img/apto.jpg";
						if(data[i].Tipo=="Casa de Campo")
							document.getElementById('imagen').src = "img/casacampo.jpg";
						
						entro = "1";
					}	
				}	
				
			}
		if(entro=="")
		{
			document.getElementById('lblDireccion').innerHTML = "";
			document.getElementById('lblCiudad').innerHTML = "";
			document.getElementById('lblTelefono').innerHTML = "";
			document.getElementById('lblCodigoPostal').innerHTML = "";
			document.getElementById('lblPrecio').innerHTML = "";
			document.getElementById('lblTipo').innerHTML = "";
			document.getElementById('imagen').src = "img/sinimagen.jpg";
			alert("No se encontraron registros.");
		}
		
	  } 
	   else 
	   {
		// Reached the server, but it returned an error
		}   
	}
	//request.onerror = function() {
	  //console.error('An error occurred fetching the JSON from ' + url);
	//};

	request.send();	

}

setSearch();
leerJSONCiudad();
leerJSONTipo();

document.getElementById("buscar").addEventListener("click", function() 
{
    BuscarValores(document.getElementById('ciudad').value,document.getElementById('tipo').value,document.getElementById('rangoPrecio').value);
}, false);