/* English and Spanish first-person texts aligned with the approved Korean narrators.
   Apply after story-refinement.js and adult-ko-review.js, before rendering. */
(()=>{'use strict';
 const lang=window.heartLanguage?.()||'ko';
 if(!['en','es'].includes(lang)||typeof visualBooks==='undefined')return;
 const manuscripts={
  "en": {
    "sleeve": [
      [
        "While taking out my spring clothes, I found an old navy jacket. The shoulders still fitted me, but the sleeves covered my hands. I took it to the neighbourhood alterations shop to have the sleeves shortened so I could wear it again. “With slightly shorter sleeves, I think I'd wear it more often.” Reuben, the tailor, cleared a space on his workbench for the jacket.",
        "I spread my customer Mira's navy jacket on the workbench. Before taking her hand away, she brushed a sleeve. I took out my measuring tape and examined the inside of the cuff first. The lining of an old jacket can be fragile. As I listened to the sleeve length she wanted, I considered where to make the alteration."
      ],
      [
        "Reuben turned back the cuff, then fell silent for a moment. The scissors stayed on the workbench. I watched his hands. “It's quite worn, isn't it?” I asked with a smile, though I felt worried. I was afraid he would say it was too worn to mend.",
        "Inside the sleeve, I found a small patch sewn on with white thread. The stitches were unevenly spaced: someone had sewn them by hand. Shortening the sleeve to the length Mira wanted might mean cutting away the patch too. I left the scissors untouched and examined the lining more closely. I heard Mira ask, “It's quite worn, isn't it?” But I was still thinking about the alteration and did not answer straight away."
      ],
      [
        "Reuben's eyebrows drew together slightly. I waited, holding my bag straps. I even wondered whether I should try another shop. I wanted to wear this jacket again. If Reuben said, “We can alter it so you can wear it again,” I thought I would feel relieved.",
        "I folded the cuff, then opened it again. I was looking for a way to shorten the sleeve without losing the hand-sewn patch. I noticed Mira waiting with her hands around her bag straps. I thought I might find a way if I looked a little more closely. Wanting to work out the alteration before explaining it to her, I looked inside the sleeve again."
      ],
      [
        "“There's a hand-sewn patch here. Would you like me to keep it?” Reuben pointed to a small piece of fabric inside the cuff. White stitches ran around its edges. I let go of my bag straps and leaned forward. I had been wondering whether the jacket was too worn to mend. But Reuben was asking me whether I wanted to keep these stitches.",
        "I showed Mira the small patch inside the cuff. “There's a hand-sewn patch here. Would you like me to keep it?” She leaned forward and pointed to it. I moved my hand aside so she could touch it. Before settling on the sleeve length, I wanted to hear whether those stitches were something she wished to keep."
      ],
      [
        "“My mother mended it when I started my first job. Please keep her stitches.” I brushed the patch with a fingertip. “Of course. If I change where the lining folds, I can shorten the sleeve and keep this part.” Reuben folded the cuff to show me. I was glad my mother's stitches could stay. My shoulders relaxed a little; I had not realised how tense they were.",
        "“My mother mended it when I started my first job. Please keep her stitches.” I nodded as Mira spoke. “Of course. If I change where the lining folds, I can shorten the sleeve and keep this part.” I pointed to the new fold. After hearing her story, I wanted to take particular care to preserve those stitches. Mira's shoulders seemed a little less tense than before."
      ],
      [
        "A few days later, I tried on the altered jacket and bent and straightened my arm. My mother's white stitches were still inside the shorter sleeve. “At first, I worried it was too worn to mend,” I said. Reuben replied, “I was looking for a way to alter it without losing those stitches. I should have told you.” Only then did I understand why he had examined the jacket in silence. I smiled and brushed the stitching. “I should have told you why this jacket mattered to me, too.”",
        "A few days later, Mira came to try on the altered jacket. I asked whether it was comfortable, and she moved her arm and checked inside the cuff. “At first, I worried it was too worn to mend.” Only after hearing that did I learn what she had been worried about that day. “I was looking for a way to alter it without losing those stitches. I should have told you.” Next time I examined a garment, I wanted to explain to my customer what I was checking."
      ]
    ],
    "station": [
      [
        "For the first time since I left my job, I decided to take a weekday trip. I met my friend Mateo in the waiting room of a small station. He took out two train tickets and showed me the route on his phone. “I've worked it all out today.” I thanked him for planning our trip.",
        "When we travelled together, Asha usually arranged our departure time and found the way. This time, I wanted to do the planning for her. I had booked the train tickets and looked up the walk from the station where we would arrive. In the waiting room, I showed her the tickets and my phone. “I've worked it all out today.” When Asha smiled and thanked me, I felt pleased too."
      ],
      [
        "As we sat side by side in the waiting room, Mateo explained what we would do when we reached our destination. “You can just relax and follow me.” I reached towards the phone to look with him, then drew my hand back. I was grateful that my friend had made the arrangements. But I wanted to help choose where we would walk and what we would do, too.",
        "I thought of the times I had seen Asha looking after other people, even on her days off. Today, I hoped she could rest without having to plan our trip. “You can just relax and follow me.” I continued explaining the schedule on my phone. I wanted to explain the route I had looked up clearly, so I pointed out each part on the screen."
      ],
      [
        "While Mateo checked the train's departure time, I looked out of the window. Then I took a paper map from my bag and unfolded it on my lap. Since I left my job, I had often heard, “Now you can rest.” There were times when I wanted to rest, but I did not want to leave all the planning for this trip to my friend. I looked for a route we might walk on our way back.",
        "When I finished explaining, Asha was looking out of the window. I wondered whether she disliked the destination I had chosen. Unsure how to ask, I checked the departure time on my phone again. When I looked back at her, she had a map open on her lap. I wanted to ask what she was thinking, so I looked away from my screen and turned towards her."
      ],
      [
        "Mateo lowered his phone and asked, “Did you want to go somewhere else?” I shook my head. “No, I'd like to go where you chose. Thank you for getting everything ready.” I opened the map towards him so we could both see it. “But I'd like to help choose our walk back, too.” Along with saying thank you, I wanted to tell him what I hoped to do.",
        "I wondered why Asha was looking at her map. “Did you want to go somewhere else?” She shook her head. “No, I'd like to go where you chose. Thank you for getting everything ready. But I'd like to help choose our walk back, too.” I looked at the map as I listened. So she wanted to choose the route together, rather than change our destination. I felt I was beginning to understand what she wanted to do."
      ],
      [
        "“You've always taken care of things. I wanted you to rest today,” Mateo said. I nodded and pointed to a route on the map. “Thank you for thinking of me. Shall we take the route you found on the way there, and the one I found on the way back?” “That sounds good. Show me your route.” Hearing his answer, I began to explain the way I had found.",
        "“You've always taken care of things. I wanted you to rest today,” I said. Asha pointed to the map. “Thank you for thinking of me. Shall we take the route you found on the way there, and the one I found on the way back?” I studied the path she was pointing to. We could follow my plan and try her route as well. “That sounds good. Show me your route.” This time, I listened while Asha explained."
      ],
      [
        "There was still time before our train arrived. As I gathered the two tickets, Mateo pointed to a station near our return route. “Shall we try this walking path on the way back? If we're tired, we can go straight to the station,” I said. “How long would this route take?” he asked. I sat beside my friend and studied the map. I grew a little more curious about the path we would walk together.",
        "While Asha gathered the two tickets, I pointed to a station near our return route. “Shall we try this walking path on the way back? If we're tired, we can go straight to the station,” she said. “How long would this route take?” I traced the path she was pointing to. We still had time before the train arrived. We left the map open and looked at that route a little longer."
      ]
    ],
    "flowers": [
      [
        "After class, I met Mum at the neighbourhood flower shop. She had just finished work, and it was her birthday. I had said I wanted to give her flowers, so we had come to choose them together. “You like yellow freesias, Mum.” I pointed to the yellow flowers. I felt a little proud that I remembered the flowers she loved.",
        "After work, I went to the flower shop to meet my daughter, Lucia. It was my birthday, and I was grateful that she had said she wanted to give me flowers. She pointed to yellow freesias, flowers I used to put on our table. Today, the pale purple flowers beside them caught my eye as well."
      ],
      [
        "I picked up some yellow flowers. Mum reached towards the pale purple ones, then stopped. “Shall we ask for a bouquet of these yellow flowers?” I asked, but she did not answer straight away. Had I remembered her favourite flowers incorrectly? I looked from the yellow flowers in my hands to Mum's face and back again.",
        "I stopped just as I was reaching for a pale purple flower. In front of me were the yellow flowers Lucia had chosen. She had picked them with me in mind. Would choosing different flowers hurt her feelings? I wanted to say thank you and explain that today I wanted the pale purple flowers. I took a moment to think how to say both."
      ],
      [
        "Mum held up the pale purple flowers. “I've been drawn to this pale purple lately.” I looked down at the yellow flowers in my hands. I had been so sure she would like them. Now I was unsure which flowers to give her. Mum held some yellow flowers beside the pale purple ones. Had she stopped liking yellow flowers? I wanted to ask her myself.",
        "“I've been drawn to this pale purple lately.” I held up the flowers I liked to show my daughter. Lucia looked down at the yellow flowers without answering. Had I made it sound as though I no longer liked yellow flowers? I wanted to add that I liked the ones she had chosen, too. Holding the two colours side by side, I looked at her face."
      ],
      [
        "“Don't you like yellow flowers any more?” I asked. Mum replied, “I still do. I'm happy you remembered. Today, I wanted to choose some pale purple flowers as well.” I looked up. Hearing her words, I felt that choosing the yellow flowers had not been a mistake. She could like the flowers I had picked and still want others, too. I looked again at the pale purple flowers she was holding.",
        "“Don't you like yellow flowers any more?” Lucia asked. I looked at my daughter and answered, “I still do. I'm happy you remembered. Today, I wanted to choose some pale purple flowers as well.” She raised her head and looked at me. I felt relieved after saying both thank you and which flowers I wanted to choose today."
      ],
      [
        "“Which flowers catch your eye?” Mum asked. I pointed to the pink cosmos. “I like these. I like the way they sway gently in the breeze.” Mum took another look at the flowers I had pointed to. We placed some pink flowers beside the yellow and pale purple ones. Telling her about the flowers I liked made me feel a little excited.",
        "I grew curious about the flowers Lucia liked these days. “Which flowers catch your eye?” She pointed to the pink cosmos. “I like these. I like the way they sway gently in the breeze.” I looked at the flowers and listened. Now I understood why she liked them. If I had not asked, I would not have known."
      ],
      [
        "We made a bouquet with pink flowers among the yellow and pale purple ones. I said to Mum, “Next time, I'll ask first which flowers you like that day.” “Thank you. I enjoyed choosing them together today.” She held the bouquet and smiled. I smiled too. On the way home, I wanted to ask what songs she had been enjoying lately.",
        "I held the bouquet of yellow, pale purple and pink flowers. “Next time, I'll ask first which flowers you like that day,” Lucia said. “Thank you. I enjoyed choosing them together today.” I looked at my daughter and smiled. I was grateful that she remembered the flowers I used to love and had asked about the flowers I wanted today."
      ]
    ],
    "notes": [
      [
        "I handed my colleague Ren a proposal for a booklet about a neighbourhood walking route. I would present it at tomorrow's team meeting. This was the first project I had been asked to plan, and I had revised the first page several times. I included an example of someone using the booklet to find their way, because I wanted to show how it would be used. “Could you read this and tell me what you think?” When Ren took out a pen, I pulled my chair closer.",
        "I read the walking-route booklet proposal my colleague Davi had given me. He told me he would present the project at tomorrow's team meeting. It was the first one he had planned. Before my own first presentation, a colleague had helped by pointing out confusing sentences. This time, I wanted to help. I picked up a red pen and looked at the wording and the order of the explanations."
      ],
      [
        "Ren drew a red line where the explanations in the later pages could be reordered. “What if you moved this explanation earlier?” I nodded. That would make the presentation easier to follow. But as he spoke only about things to change, I began to wonder whether everything else was lacking too. I especially wanted to know whether the example I had worked so hard on for the first page was clear.",
        "I first pointed out how the explanations in the later pages could be reordered to help the audience follow the presentation. “What if you moved this explanation earlier?” When Davi nodded, I mentioned other things to change. I thought the first-page example showed clearly how the booklet would be used, but I had not said so yet. I believed it would help to start with the parts that needed changing."
      ],
      [
        "I straightened the scattered pages and looked at the first one again. ‘Should I take this example out too?’ Ren had not told me to remove it, but hearing one suggested change after another had made me less sure of myself. I was willing to change the order of the explanations, but I wanted to keep the first-page example. I decided to explain why I had included it and ask what Ren thought.",
        "Davi's replies were shorter than before. I wondered whether I had been explaining too quickly. I stopped my pen before marking another spot. Davi was gathering the pages and looking at the first one again. Instead of carrying on with my explanation, I wanted to hear whether he had something to say."
      ],
      [
        "“I'll change the order of the explanations. But what did you think of the example on the first page? Does it make clear how the booklet would be used?” I asked. Ren put down his pen and read the first page again. “Yes. I can picture someone new to the area using the booklet to find the walking route.” I opened the first page out a little more towards him. I felt a little relieved: it seemed that what I had wanted to show had come across.",
        "“I'll change the order of the explanations. But what did you think of the example on the first page? Does it make clear how the booklet would be used?” At Davi's question, I read the first page again. This example had made it easy for me to understand how the booklet would be used. But I had not said that yet. I put down my pen and answered, “Yes. I can picture someone new to the area using the booklet to find the walking route.”"
      ],
      [
        "“Let's keep the first page and just change the order of the explanations later on,” Ren said. I felt relieved and smiled. “That's what I wanted the example to show: how the booklet would be used.” He nodded. We set the first page aside and rearranged the others to work out which explanation should follow it.",
        "“Let's keep the first page and just change the order of the explanations later on,” I said. Davi smiled. “That's what I wanted the example to show: how the booklet would be used.” I listened to what he had wanted to convey on that first page. I wished I had asked what he had in mind before suggesting changes. We decided together on the order of the explanations that would follow the example."
      ],
      [
        "As we gathered the pages, I said to Ren, “Would you read my next draft too? I'd like to hear what needs changing, and which parts are easy to understand.” “Of course. Next time, before I read it, I'll ask which parts you'd like feedback on,” he replied. I opened a folder and began putting the pages inside. Ren arranged the remaining sheets in order for me. Next time I handed him a draft, I wanted to tell him what I was wondering about, too.",
        "“Would you read my next draft too? I'd like to hear what needs changing, and which parts are easy to understand,” Davi said. Hearing him, I realised he also needed feedback about what was coming across well. “Of course. Next time, before I read it, I'll ask which parts you'd like feedback on.” While he put the pages into a folder, I arranged the remaining sheets in order. Next time, I wanted to listen to what he had to say before reading his draft."
      ]
    ]
  },
  "es": {
    "sleeve": [
      [
        "Mientras sacaba mi ropa de primavera, encontré una vieja chaqueta azul marino. Los hombros aún me quedaban bien, pero las mangas me cubrían las manos. La llevé al taller de arreglos del barrio para acortarlas y volver a ponérmela. «Con las mangas un poco más cortas, creo que la usaría más a menudo». Reuben, el sastre, despejó un lado de la mesa de trabajo para extender la chaqueta.",
        "Extendí sobre la mesa de trabajo la chaqueta azul marino de mi clienta Mira. Antes de apartar la mano, ella acarició una manga. Saqué la cinta métrica y examiné primero el interior del puño. El forro de una prenda antigua puede estar debilitado. Mientras escuchaba qué largo quería, pensé por dónde hacer el arreglo."
      ],
      [
        "Reuben volvió el puño de la manga y se quedó callado un momento. Las tijeras seguían sobre la mesa. Miré sus manos. «Está bastante gastada, ¿verdad?», pregunté con una sonrisa, aunque estaba preocupada. Temía que me dijera que la chaqueta estaba demasiado gastada para arreglarla.",
        "En el interior de la manga encontré un pequeño parche cosido con hilo blanco. Las puntadas tenían una separación desigual: alguien lo había cosido a mano. Si cortaba la manga hasta el largo que quería Mira, quizá también tendría que cortar aquel parche. Sin tocar las tijeras, examiné el forro con más atención. Oí su pregunta: «Está bastante gastada, ¿verdad?» Pero, mientras pensaba cómo hacer el arreglo, no supe qué responderle enseguida."
      ],
      [
        "Reuben frunció un poco el ceño. Esperé sujetando las correas de mi bolso. Incluso pensé en probar en otro taller. Quería volver a ponerme aquella chaqueta. Si Reuben me dijera «Podemos arreglarla para que vuelva a usarla», me quedaría más tranquila.",
        "Doblé el puño y volví a desplegarlo. Buscaba la forma de acortar la manga sin quitar el parche cosido a mano. Vi a Mira esperando, con las manos en las correas del bolso. Me parecía que, si examinaba la manga un poco más, encontraría una solución. Quería saber cómo hacer el arreglo antes de explicárselo, así que volví a mirar el interior de la manga."
      ],
      [
        "«Aquí hay un parche cosido a mano. ¿Quiere que lo conserve?» Reuben señaló el pequeño trozo de tela en el interior del puño. Unas puntadas blancas recorrían los bordes. Solté las correas de mi bolso y me incliné hacia delante. Había pensado que quizá la chaqueta estaba demasiado gastada para arreglarla. Pero Reuben me estaba preguntando si quería conservar aquellas puntadas.",
        "Le mostré a Mira el pequeño parche del interior del puño. «Aquí hay un parche cosido a mano. ¿Quiere que lo conserve?» Ella se inclinó hacia delante y lo señaló. Aparté mi mano para que pudiera tocarlo. Antes de decidir el largo de la manga, quería saber si deseaba conservar aquellas puntadas."
      ],
      [
        "«Mi madre la remendó cuando empecé en mi primer trabajo. Por favor, conserve sus puntadas». Acaricié el parche con la punta del dedo. «Claro. Si cambio el lugar del doblez del forro, puedo acortar la manga sin quitar esta parte». Reuben dobló el puño para mostrármelo. Qué alivio poder conservar las puntadas de mi madre. Relajé un poco los hombros; no me había dado cuenta de lo tensos que estaban.",
        "«Mi madre la remendó cuando empecé en mi primer trabajo. Por favor, conserve sus puntadas». Asentí al escuchar a Mira. «Claro. Si cambio el lugar del doblez del forro, puedo acortar la manga sin quitar esta parte». Señalé dónde haría el nuevo doblez. Después de escuchar su historia, quise conservar aquellas puntadas con especial cuidado. Me pareció que los hombros de Mira estaban algo menos tensos que antes."
      ],
      [
        "Unos días después, me probé la chaqueta arreglada y doblé y estiré el brazo. Las puntadas blancas de mi madre seguían dentro de la manga, ahora más corta. «Al principio me preocupaba que estuviera demasiado gastada para arreglarla», dije. Reuben respondió: «Yo buscaba una forma de arreglarla sin quitar esas puntadas. Debí habérselo explicado». Solo entonces entendí por qué había examinado la chaqueta en silencio. Sonreí y acaricié las puntadas. «Yo también debí haberle contado por qué esta chaqueta es tan importante para mí».",
        "Unos días después, Mira volvió para probarse la chaqueta arreglada. Le pregunté si le resultaba cómoda y ella movió el brazo y miró dentro del puño. «Al principio me preocupaba que estuviera demasiado gastada para arreglarla». Solo al oírlo supe qué le había preocupado aquel día. «Yo buscaba una forma de arreglarla sin quitar esas puntadas. Debí habérselo explicado». La próxima vez que examinara una prenda, quería contarle también a mi cliente qué estaba comprobando."
      ]
    ],
    "station": [
      [
        "Por primera vez desde que dejé de trabajar, decidí hacer una excursión entre semana. Me encontré con mi amigo Mateo en la sala de espera de una pequeña estación. Sacó dos billetes de tren y me mostró el recorrido en el móvil. «Hoy lo he preparado todo». Le di las gracias por organizar nuestra excursión.",
        "Cuando viajábamos juntos, Asha solía organizar la hora de salida y buscar el camino. Esta vez quería encargarme yo de los preparativos. Había reservado los billetes de tren y buscado por dónde caminar desde la estación de destino. En la sala de espera le enseñé los billetes y mi móvil. «Hoy lo he preparado todo». Cuando Asha sonrió y me lo agradeció, yo también me alegré."
      ],
      [
        "Sentados uno al lado del otro en la sala de espera, Mateo explicó lo que haríamos al llegar a nuestro destino. «Tú solo relájate y ven conmigo». Acercé la mano al móvil para mirar con él, pero luego la retiré. Agradecía los preparativos de mi amigo. Sin embargo, yo también quería participar en la elección de los caminos y de las cosas que haríamos.",
        "Recordé las veces que había visto a Asha ocuparse de otras personas, incluso en sus días libres. Quería que hoy descansara sin tener que organizar nuestra excursión. «Tú solo relájate y ven conmigo». Seguí explicando el plan en mi móvil. Quería mostrarle bien el recorrido que había buscado, así que fui señalando cada tramo en la pantalla."
      ],
      [
        "Mientras Mateo comprobaba la hora de salida del tren, miré por la ventana. Después saqué de mi bolso un mapa de papel y lo desplegué sobre el regazo. Desde que dejé de trabajar, había oído a menudo: «Ahora ya puedes descansar». A veces sí quería descansar, pero no deseaba dejar toda la organización de aquella excursión en manos de mi amigo. Busqué en el mapa un camino por el que pudiéramos pasear a la vuelta.",
        "Cuando terminé de explicar el plan, Asha miraba por la ventana. Me pregunté si no le gustaría el destino que había elegido. Dudé cómo preguntárselo y volví a comprobar la hora de salida en el móvil. Al mirarla otra vez, vi que tenía un mapa abierto sobre el regazo. Quería preguntarle en qué pensaba, así que aparté los ojos de mi pantalla y me volví hacia ella."
      ],
      [
        "Mateo bajó el móvil y preguntó: «¿Querías ir a otro sitio?» Negué con la cabeza. «No, me apetece ir al lugar que has elegido. Gracias por prepararlo todo». Extendí el mapa hacia él para que ambos pudiéramos verlo. «Pero yo también quiero ayudar a elegir el camino de vuelta». Además de darle las gracias, quería contarle lo que a mí me apetecía hacer.",
        "Me preguntaba por qué Asha miraba el mapa. «¿Querías ir a otro sitio?» Ella negó con la cabeza. «No, me apetece ir al lugar que has elegido. Gracias por prepararlo todo. Pero yo también quiero ayudar a elegir el camino de vuelta». Miré el mapa mientras la escuchaba. Así que quería decidir juntos el recorrido, no cambiar nuestro destino. Me pareció que empezaba a entender lo que ella quería hacer."
      ],
      [
        "«Siempre te has encargado tú. Hoy quería que descansaras», dijo Mateo. Asentí y señalé un camino en el mapa. «Gracias por pensar en mí. ¿Y si a la ida seguimos el camino que has buscado tú y a la vuelta el que he encontrado yo?» «Me parece bien. Enséñame tu recorrido». Al oír su respuesta, empecé a explicarle el camino que había encontrado.",
        "«Siempre te has encargado tú. Hoy quería que descansaras», dije. Asha señaló el mapa. «Gracias por pensar en mí. ¿Y si a la ida seguimos el camino que has buscado tú y a la vuelta el que he encontrado yo?» Miré el camino que indicaba. Podíamos seguir mi plan y probar también su recorrido. «Me parece bien. Enséñame tu recorrido». Esta vez escuché la explicación de Asha."
      ],
      [
        "Todavía faltaba un rato para que llegara nuestro tren. Mientras guardaba los dos billetes, Mateo señaló una estación cercana al camino de vuelta. «¿Damos un paseo por este sendero a la vuelta? Si nos cansamos, podemos ir directamente a la estación», dije. «¿Cuánto tardaríamos por este camino?», preguntó él. Seguí mirando el mapa junto a mi amigo. Sentía un poco más de curiosidad por el camino que recorreríamos juntos.",
        "Mientras Asha guardaba los dos billetes, señalé una estación cercana a nuestro camino de vuelta. «¿Damos un paseo por este sendero a la vuelta? Si nos cansamos, podemos ir directamente a la estación», dijo ella. «¿Cuánto tardaríamos por este camino?» Recorrí con el dedo el sendero que señalaba. Aún teníamos tiempo antes de que llegara el tren. Dejamos el mapa abierto y seguimos mirando aquel recorrido un poco más."
      ]
    ],
    "flowers": [
      [
        "Después de clase, me encontré con mamá en la floristería del barrio. Ella acababa de salir del trabajo y era su cumpleaños. Yo había dicho que quería regalarle flores, así que habíamos ido a elegirlas juntas. «Te gustan las fresias amarillas, mamá». Señalé las flores amarillas. Me sentía un poco orgullosa de recordar las flores que le gustaban.",
        "Después del trabajo fui a la floristería para encontrarme con mi hija Lucía. Era mi cumpleaños y agradecía que hubiera dicho que quería regalarme flores. Señaló las fresias amarillas que yo solía poner en la mesa de casa. Pero hoy también me llamaron la atención las flores lilas que había al lado."
      ],
      [
        "Tomé unas flores amarillas. Mamá acercó la mano a las flores lilas y luego se detuvo. «¿Pedimos que nos hagan un ramo con estas flores amarillas?», pregunté, pero ella no respondió enseguida. ¿Me habría equivocado al recordar sus flores favoritas? Miré las flores amarillas que tenía en las manos y después el rostro de mamá.",
        "Me detuve justo cuando iba a tomar una flor lila. Delante tenía las flores amarillas que Lucía había elegido pensando en mí. ¿Se sentiría dolida si escogía otras? Quería darle las gracias y contarle que hoy me apetecían las flores lilas. Pensé un momento cómo decir ambas cosas."
      ],
      [
        "Mamá levantó las flores lilas para mostrármelas. «Últimamente me atrae este color lila». Bajé la vista hacia las flores amarillas que tenía en las manos. Había estado tan segura de que le gustarían. Ahora dudaba qué flores regalarle. Mamá sostuvo también unas flores amarillas junto a las lilas. ¿Ya no le gustaban las flores amarillas? Quería preguntárselo yo misma.",
        "«Últimamente me atrae este color lila». Levanté las flores que me gustaban para enseñárselas a mi hija. Lucía miró las flores amarillas sin responder. ¿Habría dado a entender que ya no me gustaban? Quería añadir que también me gustaban las que ella había elegido. Sostuve juntas las flores de ambos colores y miré su rostro."
      ],
      [
        "«¿Ya no te gustan las flores amarillas?», pregunté. Mamá respondió: «Sí, todavía me gustan. Me alegra que lo hayas recordado. Hoy quería elegir también unas flores lilas». Levanté la cabeza. Al escucharla, sentí que no me había equivocado al elegir las flores amarillas. Podían gustarle las que yo había escogido y querer otras también. Volví a mirar las flores lilas que sostenía.",
        "«¿Ya no te gustan las flores amarillas?», preguntó Lucía. Miré a mi hija y respondí: «Sí, todavía me gustan. Me alegra que lo hayas recordado. Hoy quería elegir también unas flores lilas». Ella levantó la cabeza y me miró. Sentí alivio después de darle las gracias y contarle qué flores quería elegir hoy."
      ],
      [
        "«¿Qué flores te llaman la atención?», preguntó mamá. Señalé los cosmos rosas. «Me gustan estas. Me gusta cómo se mecen suavemente con la brisa». Mamá volvió a mirar las flores que yo había señalado. Colocamos unas flores rosas junto a las amarillas y las lilas. Me hizo ilusión contarle cuáles me gustaban.",
        "Sentí curiosidad por las flores que le gustaban últimamente a Lucía. «¿Qué flores te llaman la atención?» Señaló los cosmos rosas. «Me gustan estas. Me gusta cómo se mecen suavemente con la brisa». Miré las flores mientras la escuchaba. Ahora entendía por qué le gustaban. Si no le hubiera preguntado, no lo habría sabido."
      ],
      [
        "Hicimos un ramo con flores rosas entre las amarillas y las lilas. Le dije a mamá: «La próxima vez te preguntaré primero qué flores te gustan ese día». «Gracias. Me ha gustado elegirlas juntas hoy». Abrazó el ramo y sonrió. Yo también sonreí. De camino a casa quería preguntarle qué canciones estaba escuchando últimamente.",
        "Abracé el ramo de flores amarillas, lilas y rosas. «La próxima vez te preguntaré primero qué flores te gustan ese día», dijo Lucía. «Gracias. Me ha gustado elegirlas juntas hoy». Miré a mi hija y sonreí. Agradecía que recordara las flores que antes me gustaban y que me hubiera preguntado cuáles quería elegir hoy."
      ]
    ],
    "notes": [
      [
        "Le entregué a mi compañero de equipo Ren una propuesta para un folleto sobre una ruta de paseo del barrio. Iba a presentarla en la reunión del día siguiente. Era la primera vez que me encargaba de planificar un proyecto y había revisado la primera página varias veces. Incluí un ejemplo de alguien que usaba el folleto para encontrar el camino, porque quería mostrar cómo se utilizaría. «¿Puedes leerlo y decirme qué te parece?» Cuando Ren sacó un bolígrafo, acerqué mi silla.",
        "Leí la propuesta para el folleto de la ruta de paseo que me había dado mi compañero Davi. Me dijo que iba a presentar el proyecto en la reunión del día siguiente. Era el primero que había planificado. Antes de mi propia primera presentación, un compañero me había ayudado señalándome las frases confusas. Esta vez quería ayudar yo. Tomé un bolígrafo rojo y examiné las frases y el orden de las explicaciones."
      ],
      [
        "Ren trazó una línea roja donde convenía cambiar el orden de las explicaciones de las últimas páginas. «¿Y si pusieras esta explicación antes?» Asentí. Así sería más fácil seguir la presentación. Pero, como solo hablaba de lo que había que cambiar, empecé a preguntarme si todo lo demás también estaría mal. Sobre todo quería saber si se entendía el ejemplo de la primera página, al que había dedicado tanto esfuerzo.",
        "Empecé por señalar cómo cambiar el orden de las explicaciones de las últimas páginas para que fuera más fácil seguir la presentación. «¿Y si pusieras esta explicación antes?» Como Davi asintió, mencioné otras cosas que podía corregir. A mí me parecía que el ejemplo de la primera página mostraba bien cómo se utilizaría el folleto, pero aún no lo había dicho. Creía que lo más útil era empezar por las partes que necesitaban cambios."
      ],
      [
        "Alineé las hojas que estaban sueltas y volví a mirar la primera. «¿También debería quitar este ejemplo?», pensé. Ren no me había dicho que lo quitara, pero escuchar una corrección tras otra me había hecho perder confianza. Estaba dispuesto a cambiar el orden de las explicaciones, aunque quería conservar el ejemplo de la primera página. Decidí contar por qué lo había incluido y preguntarle a Ren qué opinaba.",
        "Las respuestas de Davi eran más cortas que antes. Me pregunté si estaba explicando las cosas demasiado deprisa. Detuve el bolígrafo antes de marcar otro punto. Davi estaba ordenando las hojas y había vuelto a mirar la primera página. En vez de seguir con mi explicación, quería escuchar si tenía algo que decir."
      ],
      [
        "«Cambiaré el orden de las explicaciones. Pero ¿qué te ha parecido el ejemplo de la primera página? ¿Se entiende cómo se utilizaría el folleto?», pregunté. Ren dejó el bolígrafo y volvió a leer la primera página. «Sí. Me imagino a alguien que no conoce el barrio usando el folleto para encontrar la ruta de paseo». Extendí un poco más la primera página hacia él. Sentí algo de alivio: me pareció que se había entendido lo que quería mostrar.",
        "«Cambiaré el orden de las explicaciones. Pero ¿qué te ha parecido el ejemplo de la primera página? ¿Se entiende cómo se utilizaría el folleto?» Ante la pregunta de Davi, volví a leer la primera página. Aquel ejemplo me había permitido entender con facilidad cómo se utilizaría el folleto. Pero aún no lo había dicho. Dejé el bolígrafo y respondí: «Sí. Me imagino a alguien que no conoce el barrio usando el folleto para encontrar la ruta de paseo»."
      ],
      [
        "«Dejemos la primera página como está y cambiemos solo el orden de las explicaciones de después», dijo Ren. Sentí alivio y sonreí. «Eso quería mostrar con el ejemplo: cómo se utilizaría el folleto». Él asintió. Dejamos la primera página a un lado y cambiamos el orden de las demás para decidir qué explicación debía ir a continuación.",
        "«Dejemos la primera página como está y cambiemos solo el orden de las explicaciones de después», dije. Davi sonrió. «Eso quería mostrar con el ejemplo: cómo se utilizaría el folleto». Escuché lo que había querido transmitir en aquella primera página. Debería haberle preguntado qué tenía en mente antes de sugerir cambios. Decidimos juntos el orden de las explicaciones que seguirían al ejemplo."
      ],
      [
        "Mientras ordenábamos las hojas, le dije a Ren: «¿Leerías también mi próximo borrador? Me gustaría que me dijeras qué hay que cambiar y qué partes se entienden bien». «Claro. La próxima vez, antes de leerlo, te preguntaré sobre qué partes quieres mi opinión», respondió. Abrí una carpeta y empecé a guardar las hojas. Ren ordenó las que quedaban para ayudarme. La próxima vez que le entregara un borrador, quería contarle también qué dudas tenía.",
        "«¿Leerías también mi próximo borrador? Me gustaría que me dijeras qué hay que cambiar y qué partes se entienden bien», dijo Davi. Al oírlo, me di cuenta de que también necesitaba saber qué se había transmitido con claridad. «Claro. La próxima vez, antes de leerlo, te preguntaré sobre qué partes quieres mi opinión». Mientras él guardaba las hojas en una carpeta, ordené las que quedaban. La próxima vez quería escuchar primero lo que tuviera que contarme y después leer su borrador."
      ]
    ]
  }
};
 const titles={en:{sleeve:{2:'Waiting for an answer'},flowers:{2:'A colour I like these days',4:'Which flowers do you like?'}},es:{sleeve:{2:'Mientras esperaba una respuesta'},flowers:{2:'Últimamente me gusta este color',4:'¿Qué flores te gustan?'}}};
 const clueMessages={
  en:{
   sleeve:{0:["Mira's hands are close to the jacket.","Reuben clears space on the workbench to spread out the jacket."],2:["Mira holds her bag straps together.","Reuben examines the inside of the cuff."]},
   station:{2:["Asha looks out of the window.","A paper map lies open on Asha's lap."],4:["Both point to routes on the same map.","Mateo looks at the route Asha is pointing to."]},
   flowers:{4:["Lucia points to the pink flowers.","The flowers they have chosen lie side by side."]},
   notes:{1:["Davi's smile has faded.","Ren's pen points to a part that needs changing."],4:["With the first page set aside, they look at the order of the other sheets.","A smile has returned to Davi's face."],5:["Pages with red editing marks lie on the table.","Both gather the pages together."]}
  },
  es:{
   sleeve:{0:["Las manos de Mira están cerca de la chaqueta.","Reuben despeja un espacio en la mesa para extender la chaqueta."],2:["Mira sujeta juntas las correas del bolso.","Reuben examina el interior del puño."]},
   station:{2:["Asha mira por la ventana.","Hay un mapa de papel abierto sobre el regazo de Asha."],4:["Ambos señalan caminos en el mismo mapa.","Mateo mira el recorrido que señala Asha."]},
   flowers:{4:["Lucía señala las flores rosas.","Las flores que han elegido están unas junto a otras."]},
   notes:{1:["La sonrisa de Davi se ha apagado.","El bolígrafo de Ren señala una parte que necesita cambios."],4:["Con la primera página a un lado, miran el orden de las otras hojas.","Davi vuelve a sonreír."],5:["Sobre la mesa hay hojas con marcas rojas de corrección.","Los dos ordenan las hojas juntos."]}
  }
 };
 const revised=[];
 for(const [id,pairs] of Object.entries(manuscripts[lang])){
  const b=visualBooks.find(book=>book.id===id);if(!b)continue;
  pairs.forEach(([read,other],page)=>{
   b.scenes[page].text=read;b.activities[0].scenes[page].text=other;
   revised.push({book:id,page,views:2});
  });
 }
 for(const [id,pages] of Object.entries(titles[lang])){
  const b=visualBooks.find(book=>book.id===id);if(!b)continue;
  for(const [page,title] of Object.entries(pages)){b.scenes[page].title=title;b.activities[0].scenes[page].title=title;}
 }
 for(const [id,pages] of Object.entries(clueMessages[lang])){
  const b=visualBooks.find(book=>book.id===id);if(!b)continue;
  for(const [page,messages] of Object.entries(pages))for(const list of [b.scenes,b.activities[0].scenes])messages.forEach((message,i)=>{list[page].clues[i].message=message;});
 }
 window.heartAdultTranslationReview={version:'20261023-first-person',narration:'first-person',language:lang,scenes:revised};
})();
