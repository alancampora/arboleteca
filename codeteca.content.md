## Qué me llevó a construir la app ? 
Cerca de mi casa hay un parque muy hermoso y suelo ir bastante. Muchas veces solo camino y muchas otras voy a correr. 

Una manaña me puse a pensar que cada uno de esos árboles vieron pasar miles de personas y hubo miles de situaciones al rededor de ellos pero, a su vez, nosotros sabemos muy poco de sobre su historia. 

Por ejemplo: 
* Hace cuanto tiempo que están ahi ? 
* Cómo se llama su especie ?
* Cuanto mide ?
* Estará sano ?
* Cuando florece ? 

No dejaba de pensar por qué sabemos tan poco de ellos. Además, si no fuese por cada uno de esos árboles seria imposible correr en verano en el parque 🏃🏽‍♂️.

## Manos a la obra
Lo primero que pensé fue: "tal vez haya una especie de censo..." y dicho y hecho!  El gobierno de la ciudad publica los datos en https://data.buenosaires.gob.ar/dataset/arbolado-publico-lineal/resource/ecf38a47-563f-42c1-9bd4-7cedf35d536b. 

Por otro lado, a mi parecer, las propiedades son esacasas para lo que buscaba hacer: 

* long	
* lat	
* nro_registro	
* tipo_activ	
* comuna	
* manzana	calle_nombre	
* calle_altura	
* calle_chapa	
* direccion_normalizada	
* ubicacion	
* nombre_cientifico	
* ancho_acera	
* estado_plantera
* ubicacion_plantera	
* nivel_plantera	
* diametro_altura_pecho	
* altura_arbol

Me hubiese encantado que tenga la edad, con eso podía entender todos los hechos históricos que cada arbol habia atrevesado y podia agregar un timeline. Ese feature finalmente lo tuve que dejar de lado, pero por lo menos ya podia lograr una experiencia entre la persona y el arbol: 

> El usuario camina por la calle, ve un arbol que le gusta, abre la app y encuentra información de los árboles que lo rodean! 🤯

Además, desarollé un script (o lo vibecodee, no recuerdo bien) para extender la info con data provieniente de wikipedia. Con esto podia mostrar una foto genérica y una foto de cada arbol. También me hubiera encantando que cada arbol tenga su foto, pero, como se puede ver arriba, el dataset original no tiene esa info.

# Resultado Final
Ahora sí! Una vez que ya tenía todo deployado y corriendo, cómo iba hacer para probarlo ? Qué mejor que salir a caminar por el parque para ver si la experiencia del usuario funcionaba como lo había pensado. 

Y ahora les dejo un video: 

<div class="video-container">
  <iframe 
    src="https://www.youtube.com/embed/jliZ6mKsaiU?playsinline=1"
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>


