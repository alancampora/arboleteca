## Qué me llevó a construir la app ? 
Cerca de mi casa hay un parque muy hermoso y suelo ir bastante. Muchas veces solo camino y muchas otras voy a correr. 

Una manaña me puse a pensar que cada uno de esos árboles vieron pasar miles de personas y hubo miles de situaciones al rededor de ellos pero, a su vez, nosotros sabemos muy poco de sobre su historia. 

Por ejemplo: 
* ¿Hace cuánto tiempo que están ahí?
* ¿Cómo se llama su especie?
* ¿Cuánto mide?
* ¿Estará sano?
* ¿Cuándo florece?


No dejaba de pensar por qué sabemos tan poco de ellos. Además, si no fuese por cada uno de esos árboles seria imposible correr en verano en el parque 🏃🏽‍♂️.

## Manos a la obra
Lo primero que pensé fue: "tal vez haya una especie de censo..." y, dicho y hecho!  El gobierno de la ciudad publica los datos en https://data.buenosaires.gob.ar/dataset/arbolado-publico-lineal/resource/ecf38a47-563f-42c1-9bd4-7cedf35d536b. 

Por otro lado, a mi parecer, las propiedades son escasas para lo que buscaba hacer: 

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

Me hubiese encantado que tuviera la edad; con eso podría haber mostrado todos los hechos históricos que cada árbol habia atrevesado y agregar un timeline. Ese feature finalmente lo tuve que dejar de lado, pero por lo menos ya podia lograr una experiencia entre la persona y el árbol: 

> El usuario camina por la calle, ve un árbol que le gusta, abre la app y encuentra información de los árboles que lo rodean! 🤯

Además, desarollé un script (o lo vibecodeé, no recuerdo bien) para extender la info con data provieniente de Wikipedia. Con esto, además de los datos del censo, podía mostrar una foto genérica y e información específica de cada especie. También me hubiera encantando que cada árbol tenga su propia foto, pero, como se puede ver arriba, el dataset original no tiene esa info.

# Resultado Final
Ahora sí! Una vez que ya tenía todo deployado y corriendo, ¿cómo iba hacer para probarlo ? Qué mejor que salir a caminar por el parque para ver si la experiencia del usuario funcionaba como lo había pensado! 

Y ahora les dejo un video: 

<div class="video-container">
  <iframe 
    src="https://www.youtube.com/embed/jliZ6mKsaiU?playsinline=1"
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>

# Features que me quedaron pendientes
## 1. Gamification
Con el motor de búsqueda por geolocalización se abría un mundo de posibilidaes. Por ejemplo: 

* Dar puntos a cada usuario por .
* Mostrar un leader board
* Darle más puntos o badges especiales a los usuarios que encuentren, caminando, los árboles más antiguos de la ciudad. Seguramente esa info esté en algún sitio. 

## 2. Búsqueda de árboles notables
Si ya tenía la info, podía agregar una sección de árboles notables con información histórica de cada uno. 

## 3. Fotos de los árboles
Sería genial que al acercarse a un arbol, las personas puedan subir la foto del árbol. Además de sumar puntos, ayudarian a recolectar fotos de manera colectiva. Se podrían armar caminatas grupales para que las personas interactuen y además ayuden a arboloteca a crecer. 

# Fin
Esto es lo que amo de la programación! Tener una idea, desarrollarla y verla andar es algo impagable. La app ahora está offline, pero en algún momento volveré a subirla. Todo esto lo estoy escribiendo un año después, y la verdad que me dieron muchas ganas de volver a construirla. 

Por otro lado, si quieren ver info de árboles pueden usar https://www.arboladourbano.com/, que sigue online, aunque la experiencia es totalmente distina a la de arboleteca. 
