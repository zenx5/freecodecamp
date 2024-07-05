Historia de usuario n.° 1: Debería poder ver un contenedor externo con uno correspondiente id="drum-machine"que contenga todos los demás elementos.

Historia de usuario n.° 2: Dentro #drum-machinepuedo ver un elemento con un id="display".

Historia de usuario n.° 3: Dentro #drum-machinepuedo ver 9 elementos de pad de batería en los que se puede hacer clic, cada uno con un nombre de clase de drum-pad, una identificación única que describe el clip de audio que se configurará para que active el pad de batería y un texto interno que corresponde a una de las siguientes teclas del teclado: Q, W, E, A, S, D, Z, , X. CLos pads de batería DEBEN estar en este orden.

Historia de usuario n.° 4: Dentro de cada .drum-pad, debe haber un audioelemento HTML5 que tenga un srcatributo que apunte a un clip de audio, un nombre de clase de clipy una id correspondiente al texto interno de su padre .drum-pad(por ejemplo id="Q", id="W", , id="E"etc.).

Historia de usuario n.° 5: Cuando hago clic en un elemento, debería activarse .drum-padel clip de audio contenido en su elemento secundario .audio

Historia de usuario n.° 6: Cuando presiono la tecla de activación asociada con cada , se debe activar .drum-padel clip de audio contenido en su elemento secundario (por ejemplo, al presionar la tecla se debe activar el pad de batería que contiene la cuerda , al presionar la tecla se debe activar el pad de batería que contiene la cuerda , etc.).audioQQWW

Historia de usuario n.° 7: Cuando .drum-padse activa a, se muestra una cadena que describe el clip de audio asociado como texto interno del #displayelemento (cada cadena debe ser única).

A continuación se muestran algunos ejemplos de audio que puedes utilizar para tu caja de ritmos:

Calentador 1
Calentador 2
Calentador 3
Calentador 4
Aplaudir
Abierto-HH
Patada y sombrero
Patada
Cerrado-HH
Puedes crear tu proyecto usando esta plantilla de CodePen y haciendo clic Savepara crear tu propio lápiz. O puedes usar este enlace de CDN para ejecutar las pruebas en cualquier entorno que desees:https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js