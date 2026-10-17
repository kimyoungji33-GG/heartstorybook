/* Two local-review manuscripts. No scores, romance framing, or forced written answers. */
(()=>{'use strict';
const t=(ko,en,es)=>({ko,en,es});
const drafts=[
  {
    "id": "flowers",
    "title": {
      "ko": "엄마가 고른 오늘의 꽃",
      "en": "The Flowers Mum Chose Today",
      "es": "Las flores que mamá eligió hoy"
    },
    "place": {
      "ko": "동네 꽃가게",
      "en": "Neighborhood flower stall",
      "es": "Puesto de flores del barrio"
    },
    "description": {
      "ko": "엄마가 좋아하는 꽃을 안다고 생각했어요. 오늘 눈길이 머문 꽃은 조금 달랐어요.",
      "en": "She thought she knew her mum’s favorite flowers. Today, a different flower caught her eye.",
      "es": "Creía conocer las flores favoritas de su madre. Hoy, otra flor le llamó la atención."
    },
    "people": [
      {
        "ko": "루시아",
        "en": "Lucia",
        "es": "Lucía"
      },
      {
        "ko": "엘레나",
        "en": "Elena",
        "es": "Elena"
      }
    ],
    "profiles": [
      {
        "name": "루시아",
        "age": 23,
        "gender": "여성",
        "background": "칠레계 캐나다인 · 대학생"
      },
      {
        "name": "엘레나",
        "age": 48,
        "gender": "여성",
        "background": "칠레계 캐나다인 · 직장인 · 루시아의 엄마"
      }
    ],
    "scenes": [
      {
        "title": {
          "ko": "기억해 둔 노란 꽃",
          "en": "The yellow flowers she remembered",
          "es": "Las flores amarillas que recordaba"
        },
        "text": {
          "ko": "수업을 마친 루시아는 일을 끝낸 엄마와 꽃가게에서 만났어요. 엄마의 생일에 함께 꽃을 고르기로 했지요. “엄마는 노란 프리지아 좋아하잖아.” 루시아가 익숙한 꽃을 가리켰어요. 엄마가 좋아하는 것을 기억하고 있다는 게 조금 뿌듯했어요.",
          "en": "After class, Lucia met her mum at the flower stall when her working day was over. They were choosing flowers for Elena’s birthday. “You like yellow freesias, Mum.” Lucia pointed to the familiar flowers. She felt quietly pleased that she remembered something her mum loved.",
          "es": "Después de clase, Lucía se reunió con su madre en el puesto de flores, al terminar la jornada de Elena. Iban a elegir flores para su cumpleaños. «Te gustan las fresias amarillas, mamá». Lucía señaló las flores conocidas. Le alegraba recordar algo que a su madre le gustaba."
        },
        "other": {
          "ko": "엘레나는 일터에서 곧장 꽃가게로 왔어요. 딸이 자기 생일을 챙겨준 마음이 고마웠지요. 루시아가 노란 프리지아를 가리켰어요. 예전에 식탁에 자주 놓던 꽃이었어요. 그런데 오늘 엘레나의 눈에는 옆 통의 연보라 꽃이 먼저 들어왔어요.",
          "en": "Elena came straight from work. She was grateful that her daughter had made time for her birthday. Lucia pointed to yellow freesias, flowers Elena used to put on their table. Today, though, her eyes went first to the pale purple flowers in the next bucket.",
          "es": "Elena llegó directamente del trabajo. Agradecía que su hija hubiera reservado tiempo para su cumpleaños. Lucía señaló las fresias amarillas que antes ponía en la mesa. Sin embargo, hoy sus ojos se fijaron primero en las flores de color lila del cubo de al lado."
        },
        "clues": [
          {
            "ko": "루시아가 노란 꽃을 가리켜요. 기억해 둔 엄마의 취향을 떠올리고 있어요.",
            "en": "Lucia points to the yellow flowers, remembering what her mum has liked.",
            "es": "Lucía señala las flores amarillas y recuerda los gustos de su madre."
          },
          {
            "ko": "엘레나의 시선은 옆 통의 연보라 꽃에 머물러요.",
            "en": "Elena’s gaze rests on the pale purple flowers in the next bucket.",
            "es": "La mirada de Elena se detiene en las flores lilas del cubo de al lado."
          }
        ]
      },
      {
        "title": {
          "ko": "뻗었다가 멈춘 손",
          "en": "A hand that paused",
          "es": "Una mano que se detuvo"
        },
        "text": {
          "ko": "루시아는 노란 꽃을 골라 들었어요. 엄마의 손은 연보라 꽃 쪽으로 갔다가 잠시 멈췄어요. “이걸로 묶어달라고 할까?” 루시아가 물었어요. 엄마는 바로 대답하지 않았어요. 기억을 잘못했나 싶어 루시아의 목소리가 조금 작아졌어요.",
          "en": "Lucia picked up the yellow flowers. Her mum reached toward the pale purple ones, then paused. “Shall we ask for these to be wrapped?” Lucia asked. Elena did not answer right away. Wondering whether she had remembered wrongly, Lucia’s voice grew a little quieter.",
          "es": "Lucía tomó las flores amarillas. Su madre acercó la mano a las lilas y se detuvo. «¿Pedimos que envuelvan estas?», preguntó Lucía. Elena no respondió enseguida. La voz de Lucía bajó un poco: quizá no lo recordaba bien."
        },
        "other": {
          "ko": "엘레나는 연보라 꽃 한 송이를 만져보려다 손을 멈췄어요. 딸이 기억해서 골라준 꽃이 눈앞에 있었거든요. 다른 꽃을 고르면 딸이 서운할까요? 고맙다는 마음과 오늘 고르고 싶은 꽃을 어떻게 함께 말할지 잠시 생각했어요.",
          "en": "Elena paused before touching a pale purple stem. The flowers her daughter had remembered were right in front of her. Would choosing something else disappoint Lucia? She considered how to express both her gratitude and what she wanted to choose today.",
          "es": "Elena se detuvo antes de tocar una flor lila. Tenía delante las flores que su hija había recordado. ¿Le dolería que eligiera otras? Pensó cómo expresar a la vez su agradecimiento y lo que hoy le apetecía elegir."
        },
        "clues": [
          {
            "ko": "엘레나의 손이 연보라 꽃 가까이에서 멈췄어요. 하고 싶은 말이 아직 나오지 않았을 수 있어요.",
            "en": "Elena’s hand pauses near the pale purple flowers. She may not have found her words yet.",
            "es": "La mano de Elena se detiene cerca de las flores lilas. Quizá aún no encuentre las palabras."
          },
          {
            "ko": "루시아는 노란 꽃을 든 채 엄마의 얼굴을 바라봐요.",
            "en": "Lucia holds the yellow flowers and watches her mum’s face.",
            "es": "Lucía sostiene las flores amarillas y mira el rostro de su madre."
          }
        ]
      },
      {
        "title": {
          "ko": "요즘은 이 빛이 좋아",
          "en": "This color, these days",
          "es": "Este color, últimamente"
        },
        "text": {
          "ko": "엄마가 연보라 꽃 한 송이를 꺼냈어요. “요즘은 이 빛이 좋더라.” 루시아는 노란 꽃을 내려다보았어요. 선물하고 싶은 마음이 잘못 전해진 것 같아 마음 한쪽이 작아졌어요. 엄마는 노란 꽃도 자기 쪽으로 가까이 당겨 놓았어요.",
          "en": "Her mum lifted a pale purple flower. “I’ve been drawn to this color lately.” Lucia looked down at the yellow stems. She felt a little smaller, as though her wish to give a thoughtful present had missed its mark. Elena drew the yellow flowers closer to her too.",
          "es": "Su madre sacó una flor lila. «Últimamente me gusta este color». Lucía miró los tallos amarillos. Se sintió un poco pequeña, como si su deseo de acertar con el regalo no hubiera llegado bien. Elena acercó también las flores amarillas hacia sí."
        },
        "other": {
          "ko": "엘레나는 요즘 눈길이 가는 꽃을 딸에게 보여주고 싶었어요. 그런데 루시아가 꽃을 내려다보고 있었어요. 노란 꽃을 좋아하던 걸 딸이 기억해줘서 고마웠어요. 엘레나는 노란 꽃도 가까이 놓고 딸의 얼굴을 다시 보았어요.",
          "en": "Elena wanted to show her daughter the flowers that had caught her eye lately. But Lucia was looking down. She was grateful that her daughter remembered how much she had liked the yellow flowers. Elena brought the yellow flowers closer and looked at her daughter again.",
          "es": "Elena quería enseñarle las flores que últimamente le llamaban la atención. Pero Lucía miraba hacia abajo. Le agradecía que recordara cuánto le habían gustado las flores amarillas. Acercó las flores amarillas y volvió a mirarla."
        },
        "clues": [
          {
            "ko": "루시아의 눈길이 노란 꽃으로 내려갔어요. 표정만 보고 마음을 단정하지 않고 이야기를 더 들어봐요.",
            "en": "Lucia looks down at the yellow flowers. We can listen before deciding what her expression means.",
            "es": "Lucía baja la mirada hacia las flores amarillas. Podemos escuchar antes de decidir qué significa su expresión."
          },
          {
            "ko": "엘레나는 연보라 꽃 옆에 노란 꽃도 가까이 놓아요.",
            "en": "Elena brings the yellow flowers close beside the pale purple stem.",
            "es": "Elena acerca las flores amarillas junto a la flor lila."
          }
        ]
      },
      {
        "title": {
          "ko": "안 좋아진 건 아니야",
          "en": "It doesn’t mean I stopped liking them",
          "es": "No significa que ya no me gusten"
        },
        "text": {
          "ko": "“노란 꽃은 이제 안 좋아해?” 루시아가 물었어요. “지금도 좋아. 네가 기억해줘서 기뻐.” 엄마가 말했어요. “오늘은 이 꽃도 보고 싶었어.” 루시아는 고개를 들었어요. 엄마는 루시아가 노란 꽃을 기억해준 것도 기뻐했어요. 오늘은 연보라 꽃도 함께 고르고 싶었던 거예요.",
          "en": "“Don’t you like the yellow ones anymore?” Lucia asked. “I still do. I’m glad you remembered,” her mum said. “Today I wanted to look at these too.” Lucia lifted her head. Her mum was happy that Lucia had remembered the yellow flowers. Today she wanted to choose some pale purple ones too.",
          "es": "«¿Ya no te gustan las amarillas?», preguntó Lucía. «Sí me gustan. Me alegra que lo recuerdes», dijo su madre. «Hoy también quería mirar estas». Lucía levantó la cabeza. A su madre le alegraba que Lucía hubiera recordado las flores amarillas. Hoy también quería elegir algunas lilas."
        },
        "other": {
          "ko": "딸이 조심스럽게 물어주어서 엘레나도 말을 고를 수 있었어요. “네가 기억해줘서 기뻐. 오늘은 이 꽃도 보고 싶었어.” 딸의 어깨가 조금 내려갔어요. 엘레나는 자기가 좋아하는 것이 늘 예전과 같을 필요는 없다는 말을, 딸에게 해도 괜찮다고 느꼈어요.",
          "en": "Her daughter’s gentle question gave Elena room to find her words. “I’m glad you remembered. Today I wanted to look at these too.” Lucia’s shoulders relaxed a little. Elena felt she could tell her daughter that what she liked did not always have to stay the same.",
          "es": "La pregunta cuidadosa de su hija le dio espacio para hablar. «Me alegra que lo recuerdes. Hoy también quería mirar estas». Los hombros de Lucía se relajaron un poco. Elena sintió que podía decirle que sus gustos no tenían por qué ser siempre los mismos."
        },
        "clues": [
          {
            "ko": "두 사람이 꽃보다 서로의 얼굴을 바라봐요. 물어보고 들을 틈이 생겼어요.",
            "en": "They look at each other rather than the flowers. There is room to ask and listen.",
            "es": "Se miran la una a la otra, en vez de mirar las flores. Hay espacio para preguntar y escuchar."
          },
          {
            "ko": "루시아의 어깨가 조금 내려갔어요. 엄마의 설명을 들은 뒤의 모습이에요.",
            "en": "Lucia’s shoulders relax a little after hearing her mum explain.",
            "es": "Los hombros de Lucía se relajan un poco después de escuchar a su madre."
          }
        ]
      },
      {
        "title": {
          "ko": "너는 어떤 꽃이 보여?",
          "en": "Which flower catches your eye?",
          "es": "¿Qué flor te llama la atención?"
        },
        "text": {
          "ko": "“너는 어떤 꽃이 눈에 들어?” 엄마가 물었어요. 루시아는 분홍 코스모스를 가리켰어요. “나는 이게 좋아. 가볍게 흔들리는 게.” 엄마는 꽃을 한 번 더 살펴보았어요. 두 사람은 고른 꽃을 탁자 위에 나란히 놓고, 어떤 빛깔이 어울리는지 함께 살펴보았어요.",
          "en": "“Which flower catches your eye?” her mum asked. Lucia pointed to pink cosmos. “I like these. The way they move so lightly.” Elena took another look. They laid the flowers they had chosen side by side on the table and looked together at how the colors went with one another.",
          "es": "«¿Qué flor te llama la atención a ti?», preguntó su madre. Lucía señaló unos cosmos rosas. «Me gustan estos, cómo se mueven tan suavemente». Elena volvió a mirarlos. Pusieron las flores elegidas una al lado de la otra sobre la mesa y miraron juntas cómo combinaban los colores."
        },
        "other": {
          "ko": "엘레나는 자기가 좋아하는 꽃만 이야기하고 싶지는 않았어요. “너는 어떤 꽃이 보여?” 딸이 분홍 꽃을 고른 이유를 들으니 아침 바람에 흔들리던 화단이 떠올랐어요. 딸에게도 요즘 좋아하는 것이 있다는 걸, 물어봐야 알 수 있었어요.",
          "en": "Elena did not want to talk only about her own flowers. “Which one catches your eye?” Hearing why Lucia chose the pink flowers reminded her of a flowerbed moving in a morning breeze. Her daughter had things she liked these days too. Asking helped her notice them.",
          "es": "Elena no quería hablar solo de sus propias flores. «¿Cuál te llama la atención?». Al escuchar por qué Lucía escogía las rosas, recordó un jardín moviéndose con la brisa. Su hija también tenía gustos de ahora. Preguntar le ayudó a descubrirlos."
        },
        "clues": [
          {
            "ko": "루시아가 분홍 꽃을 가리키며 자기 취향을 이야기해요.",
            "en": "Lucia points to a pink flower and shares what she likes.",
            "es": "Lucía señala una flor rosa y cuenta lo que le gusta."
          },
          {
            "ko": "고른 꽃들이 나란히 놓여 있어요. 아직 하나로 서둘러 정하지 않았어요.",
            "en": "Their chosen flowers lie side by side. They have not rushed to settle on one.",
            "es": "Las flores elegidas están una junto a la otra. No se han apresurado a decidir."
          }
        ]
      },
      {
        "title": {
          "ko": "오늘 함께 고른 꽃",
          "en": "Chosen together, today",
          "es": "Elegidas juntas, hoy"
        },
        "text": {
          "ko": "노란 꽃과 연보라 꽃, 분홍 꽃 한 송이가 종이 안에서 만났어요. “다음에는 먼저 물어볼게. 오늘 어떤 꽃이 좋은지.” 루시아가 말했어요. 엄마는 꽃다발을 안고 웃었어요. 집에 가는 길, 루시아는 엄마가 요즘 즐겨 듣는 노래도 물어보고 싶어졌어요.",
          "en": "Yellow flowers, pale purple flowers and one pink stem came together in the wrapping paper. “Next time I’ll ask first—which flowers you like today,” Lucia said. Her mum smiled, holding the bouquet. On the way home, Lucia wanted to ask what music her mum had been enjoying lately too.",
          "es": "Flores amarillas, lilas y una rosa se reunieron en el papel. «La próxima vez preguntaré primero qué flores te gustan hoy», dijo Lucía. Su madre sonrió con el ramo en brazos. De camino a casa, Lucía quiso preguntarle también qué música escuchaba últimamente."
        },
        "other": {
          "ko": "꽃다발을 안자 딸이 “오늘 어떤 꽃이 좋아?” 하고 다시 물어주었어요. 엘레나는 연보라 꽃을 한 번 더 보았어요. 딸이 기억해준 노란 꽃도 반가웠어요. 예전의 자기를 기억해주는 마음과 지금의 자기를 물어봐 주는 마음을 함께 받은 생일이었어요.",
          "en": "As Elena held the bouquet, her daughter asked again, “Which flowers do you like today?” Elena looked once more at the pale purple flowers. The remembered yellow ones were welcome too. On this birthday, she felt both remembered for who she had been and asked about who she was now.",
          "es": "Con el ramo en brazos, Elena oyó de nuevo: «¿Qué flores te gustan hoy?». Miró otra vez las lilas. También le alegraban las amarillas que su hija había recordado. En aquel cumpleaños se sintió recordada por quien había sido y escuchada como era ahora."
        },
        "clues": [
          {
            "ko": "꽃다발 안에 두 사람이 고른 꽃이 함께 보여요.",
            "en": "The bouquet holds flowers both of them chose.",
            "es": "El ramo reúne flores que eligieron las dos."
          },
          {
            "ko": "루시아와 엘레나가 서로를 보며 미소를 지어요. 오늘 새로 알게 된 취향이 있어요.",
            "en": "Lucia and Elena smile at each other. They have learned something new about each other today.",
            "es": "Lucía y Elena se sonríen. Hoy han descubierto algo nuevo de la otra."
          }
        ]
      }
    ]
  },
  {
    "id": "notes",
    "title": {
      "ko": "빨간 표시 옆의 한마디",
      "en": "A Word Beside the Red Marks",
      "es": "Una frase junto a las marcas rojas"
    },
    "place": {
      "ko": "작은 디자인 사무실",
      "en": "A small design office",
      "es": "Un pequeño estudio de diseño"
    },
    "description": {
      "ko": "고칠 점을 알려주는 동료에게, 이해하기 쉬웠던 부분도 묻고 싶었어요.",
      "en": "He wanted to ask his colleague which parts were clear, as well as which parts needed changing.",
      "es": "Quería saber qué partes le habían resultado claras a su compañero, además de cuáles había que cambiar."
    },
    "people": [
      {
        "ko": "다비",
        "en": "Davi",
        "es": "Davi"
      },
      {
        "ko": "렌",
        "en": "Ren",
        "es": "Ren"
      }
    ],
    "profiles": [
      {
        "name": "다비",
        "age": 32,
        "gender": "남성",
        "background": "브라질 · 디자이너"
      },
      {
        "name": "렌",
        "age": 39,
        "gender": "남성",
        "background": "일본 · 기획자 · 다비의 직장동료"
      }
    ],
    "scenes": [
      {
        "title": {
          "ko": "내일 보여줄 자료",
          "en": "The draft for tomorrow",
          "es": "El borrador para mañana"
        },
        "text": {
          "ko": "다비는 동네 산책길을 소개하는 안내 책자 기획안을 렌에게 건넸어요. 내일 팀 회의에서 발표할 자료였어요. 처음 기획을 맡은 다비는 처음 오는 사람도 길을 쉽게 찾을 수 있도록 첫 장에 예시를 넣었어요. “읽어보고 말해줄래?” 렌이 펜을 꺼내자 다비는 의자를 가까이 당겼어요.",
          "en": "Davi handed Ren his proposal for a booklet about local walking trails. He would present it at tomorrow’s team meeting. It was his first proposal, and he had included an example on the first page to show how the booklet could help a newcomer find the way. “Would you read it and tell me what you think?” As Ren took out a pen, Davi drew his chair closer.",
          "es": "Davi le entregó a Ren su propuesta para un folleto sobre los senderos del barrio. La presentaría en la reunión del equipo al día siguiente. Era su primera propuesta y había incluido un ejemplo en la primera página para mostrar cómo el folleto ayudaría a orientarse a quienes llegaran por primera vez. «¿Lo lees y me dices qué te parece?». Cuando Ren sacó un bolígrafo, Davi acercó la silla."
        },
        "other": {
          "ko": "렌은 다비가 준비한 산책길 안내 책자 기획안을 읽었어요. 같은 팀 동료의 첫 발표가 잘 끝나길 바랐어요. 자기도 처음 발표할 때 헷갈리는 문장을 미리 짚어준 동료가 고마웠거든요. 렌은 설명 순서와 문장을 살펴보며 빨간 펜을 들었어요.",
          "en": "Ren read Davi’s proposal for a walking-trail booklet. He wanted his teammate’s first presentation to go well. Before his own first presentation, he had appreciated a colleague pointing out unclear sentences. He picked up a red pen to check the wording and the order.",
          "es": "Ren leyó la propuesta de Davi para un folleto de senderos. Quería que la primera presentación de su compañero saliera bien. Antes de la suya, había agradecido que otro compañero señalara las frases poco claras. Tomó un bolígrafo rojo para revisar las frases y el orden."
        },
        "clues": [
          {
            "ko": "다비가 자료를 건네고 렌 쪽으로 의자를 당겼어요. 어떤 말을 기대하고 있을까요?",
            "en": "Davi hands over the draft and moves closer. What might he be hoping to hear?",
            "es": "Davi entrega el borrador y se acerca. ¿Qué espera escuchar?"
          },
          {
            "ko": "렌이 펜을 들고 첫 장을 읽어요.",
            "en": "Ren reads the first page with a pen in hand.",
            "es": "Ren lee la primera página con el bolígrafo en la mano."
          }
        ]
      },
      {
        "title": {
          "ko": "먼저 눈에 들어온 빨간 선",
          "en": "The red marks he noticed first",
          "es": "Las marcas rojas que vio primero"
        },
        "text": {
          "ko": "렌은 설명 순서가 헷갈리는 부분에 빨간 선을 그었어요. “이 설명을 앞으로 옮기면 어떨까?” 다비는 고개를 끄덕였어요. 그렇게 고치면 발표를 따라 듣기 더 쉬울 것 같았어요. 다비는 렌이 첫 장의 예시를 보고, 처음 오는 사람에게 왜 이 안내 책자가 필요한지 알 수 있었는지도 궁금했어요.",
          "en": "Ren marked a section where the order was confusing. “What if this explanation came earlier?” Davi nodded. That change could make the presentation easier to follow. He also wanted to know whether the first-page example had helped Ren understand why a newcomer would need the booklet.",
          "es": "Ren marcó una parte cuyo orden resultaba confuso. «¿Y si esta explicación fuera antes?». Davi asintió. El cambio podía hacer más fácil seguir la presentación. También quería saber si el ejemplo de la primera página había ayudado a Ren a entender por qué alguien nuevo en el barrio necesitaría el folleto."
        },
        "other": {
          "ko": "렌은 다비가 발표하다가 설명 순서를 헷갈리지 않도록 고칠 곳부터 짚어주었어요. 다비가 고개를 끄덕이자 계속 설명했지요. 자료에 빨간 표시가 하나씩 늘었어요. 첫 장의 예시는 이해하기 쉽다고 생각했지만, 그 이야기는 하지 않은 채 고칠 점만 말하고 있었어요.",
          "en": "Ren began by pointing out changes that could help Davi keep his presentation in order. When Davi nodded, he continued. Red marks appeared one by one. He thought the first-page example was easy to understand, but had not said so. So far he had only talked about changes.",
          "es": "Ren empezó señalando los cambios que ayudarían a Davi a mantener el orden de la presentación. Cuando Davi asintió, continuó. Las marcas rojas fueron aumentando. El ejemplo de la primera página le parecía fácil de entender, pero no lo había dicho. Hasta entonces solo había hablado de cambios."
        },
        "clues": [
          {
            "ko": "다비는 고개를 끄덕이지만 입가의 웃음은 줄었어요. 동의와 다른 마음이 함께 있을 수도 있어요.",
            "en": "Davi nods, but his smile has faded. Agreement can sit beside another feeling.",
            "es": "Davi asiente, pero su sonrisa se ha apagado. Estar de acuerdo puede convivir con otro sentimiento."
          },
          {
            "ko": "렌의 펜은 고칠 부분을 짚고 있어요.",
            "en": "Ren’s pen points to a section to revise.",
            "es": "El bolígrafo de Ren señala una parte que conviene revisar."
          }
        ]
      },
      {
        "title": {
          "ko": "말을 꺼내기 전",
          "en": "Before finding the words",
          "es": "Antes de encontrar las palabras"
        },
        "text": {
          "ko": "다비는 첫 장의 모서리를 가지런히 맞췄어요. “이 예시도 빼야 하나?”라는 생각이 스쳤지요. 설명 순서는 렌의 말대로 바꿔볼 생각이었어요. 하지만 처음 오는 사람이 안내 책자를 보고 길을 찾는 예시는 그대로 두고 싶었어요. 그 장면을 넣은 이유를 렌에게 이야기해볼까 생각했어요.",
          "en": "Davi aligned the corners of the first page. “Should I remove this example too?” he wondered. He was willing to change the order as Ren suggested. But he wanted to keep the example of a newcomer using the booklet to find the way. He considered telling Ren why he had included it.",
          "es": "Davi alineó las esquinas de la primera hoja. «¿Tendré que quitar también este ejemplo?», pensó. Estaba dispuesto a cambiar el orden como sugería Ren. Pero quería conservar el ejemplo de alguien que usaba el folleto para orientarse por primera vez. Pensó en contarle por qué lo había incluido."
        },
        "other": {
          "ko": "렌은 다비의 대답이 짧아진 것을 느꼈어요. 설명이 너무 빨랐나 싶었지요. 한 군데 더 알려주려던 펜을 잠시 멈췄어요. 다비가 첫 장의 예시를 다시 보고 있었어요. 렌은 다음 설명을 하기 전에 다비가 말을 꺼낼 때까지 기다렸어요.",
          "en": "Ren noticed that Davi’s answers had grown shorter. Perhaps he was explaining too quickly. He paused before pointing out another change. Davi was looking at the example on the first page again. Ren waited for him to speak before continuing.",
          "es": "Ren notó que las respuestas de Davi eran más cortas. Quizá estaba explicando demasiado deprisa. Se detuvo antes de señalar otro cambio. Davi volvía a mirar el ejemplo de la primera página. Ren esperó a que hablara antes de continuar."
        },
        "clues": [
          {
            "ko": "다비가 종이 모서리를 맞추며 첫 장을 다시 보아요.",
            "en": "Davi aligns the paper corners and looks at the first page again.",
            "es": "Davi alinea las esquinas y vuelve a mirar la primera hoja."
          },
          {
            "ko": "렌의 펜이 종이 위에서 잠시 멈췄어요.",
            "en": "Ren’s pen pauses above the paper.",
            "es": "El bolígrafo de Ren se detiene sobre el papel."
          }
        ]
      },
      {
        "title": {
          "ko": "첫 장의 예시는 어땠어?",
          "en": "What did you think of the first example?",
          "es": "¿Qué te pareció el primer ejemplo?"
        },
        "text": {
          "ko": "“설명 순서는 바꿔볼게. 첫 장의 예시는 어땠어? 어떤 사람에게 필요한 책자인지 알겠어?” 다비가 물었어요. 렌은 펜을 내려놓고 첫 장을 다시 읽었어요. 다비는 대답을 기다렸어요. 이 예시가 안내 책자의 쓰임을 설명하는 데 도움이 됐다면, 그 부분은 고치지 않고 두고 싶었어요.",
          "en": "“I’ll try changing the order. What did you think of the example on the first page? Does it show who the booklet is for?” Davi asked. Ren put down his pen and reread the page. Davi waited for an answer. If the example helped explain how the booklet would be used, he wanted to leave that part as it was.",
          "es": "«Voy a cambiar el orden. ¿Qué te pareció el ejemplo de la primera página? ¿Se entiende a quién va dirigido el folleto?», preguntó Davi. Ren dejó el bolígrafo y releyó la hoja. Davi esperó la respuesta. Si el ejemplo ayudaba a explicar para qué serviría el folleto, quería dejar esa parte como estaba."
        },
        "other": {
          "ko": "질문을 듣고 렌은 첫 장을 다시 보았어요. 안내 책자를 처음 펼쳐 든 사람이 그림을 보고 산책길을 찾는 예시였어요. 그 예시를 보자 이 책자가 누구에게 필요한지 알 수 있었어요. 렌은 그 점도 다비에게 말해주기로 했어요. “첫 장을 보니 이 책자가 어떻게 쓰일지 알겠어.”",
          "en": "Ren looked at the first page again. The example showed someone opening the booklet for the first time and using its pictures to find a walking trail. That had made it clear to Ren who needed the booklet. He decided to tell Davi. “The first page helps me see how this booklet would be used.”",
          "es": "Ren volvió a mirar la primera página. El ejemplo mostraba a alguien que abría el folleto por primera vez y encontraba un sendero siguiendo sus dibujos. Así había entendido a quién le serviría el folleto. Decidió decírselo a Davi. «La primera página me ayuda a ver cómo se usaría este folleto»."
        },
        "clues": [
          {
            "ko": "다비가 첫 장을 가리키며 렌을 바라봐요. 필요한 도움을 구체적으로 물었어요.",
            "en": "Davi points to the first page and looks at Ren. He has asked for a specific kind of help.",
            "es": "Davi señala la primera página y mira a Ren. Ha pedido una ayuda concreta."
          },
          {
            "ko": "렌이 펜을 내려놓고 자료를 다시 읽어요.",
            "en": "Ren puts his pen down and reads the draft again.",
            "es": "Ren deja el bolígrafo y vuelve a leer el borrador."
          }
        ]
      },
      {
        "title": {
          "ko": "첫 장은 그대로 두자",
          "en": "Let’s keep the first page",
          "es": "Dejemos la primera página"
        },
        "text": {
          "ko": "“이 예시를 보니까 처음 오는 사람도 길을 찾을 수 있겠어. 첫 장은 그대로 두고, 뒤쪽 설명 순서만 바꿔보자.” 렌이 말했어요. “나도 그래서 이 예시를 넣었어.” 다비가 대답했어요. 두 사람은 첫 장을 옆에 두고, 나머지 종이를 어떤 순서로 놓을지 함께 살폈어요.",
          "en": "“This example shows how someone new to the area could find the way. Let’s keep the first page and change the order of the explanations after it,” Ren said. “That’s why I included it,” Davi replied. They set the first page aside and worked out the order of the remaining sheets together.",
          "es": "«Este ejemplo muestra cómo podría orientarse alguien que llega por primera vez. Dejemos la primera página y cambiemos el orden de las explicaciones que vienen después», dijo Ren. «Por eso lo incluí», respondió Davi. Apartaron la primera hoja y decidieron juntos el orden de las demás."
        },
        "other": {
          "ko": "“첫 장은 그대로 두자.” 렌이 말하자 다비가 고개를 끄덕이며 미소를 지었어요. 렌은 첫 장을 옆에 놓고 물었어요. “이 예시를 넣을 때 어떤 점을 보여주고 싶었어?” 다비는 처음 오는 사람도 길을 헤매지 않았으면 했다고 말했어요. 렌은 그 설명을 듣고, 예시 뒤에 어떤 내용을 이어 놓으면 좋을지 다비와 함께 정했어요.",
          "en": "“Let’s keep the first page,” Ren said, and Davi nodded with a small smile. Ren set that page aside and asked, “What did you want to show with this example?” Davi said he wanted newcomers to find the way without getting lost. After listening, Ren worked with him to decide what should follow the example.",
          "es": "«Dejemos la primera página», dijo Ren, y Davi asintió con una pequeña sonrisa. Ren apartó la hoja y preguntó: «¿Qué querías mostrar con este ejemplo?». Davi dijo que quería que quienes llegaran por primera vez pudieran orientarse sin perderse. Después de escucharlo, Ren decidió con él qué explicación debía ir a continuación."
        },
        "clues": [
          {
            "ko": "첫 장을 옆에 두고, 나머지 종이의 순서를 함께 살펴보고 있어요.",
            "en": "They set the first page aside and consider the order of the remaining sheets together.",
            "es": "Apartan la primera página y miran juntos el orden de las demás."
          },
          {
            "ko": "다비의 입가에 미소가 돌아왔어요. 렌이 남겨도 될 부분을 알려준 뒤의 모습이에요.",
            "en": "A smile returns to Davi’s face after Ren points out what is worth keeping.",
            "es": "Davi vuelve a sonreír después de que Ren señale lo que merece conservarse."
          }
        ]
      },
      {
        "title": {
          "ko": "다음 자료를 건넬 때",
          "en": "When handing over the next draft",
          "es": "Al entregar el próximo borrador"
        },
        "text": {
          "ko": "자료를 정리하며 다비가 말했어요. “다음에도 고칠 곳 말해줘. 이해하기 쉬웠던 설명이 있으면 그것도 알려주면 좋겠어.” 렌은 고개를 끄덕였어요. “나는 읽기 전에 어떤 의견이 필요한지 먼저 물어볼게.” 다비가 서류철을 펼쳐 들고, 렌이 첫 장부터 순서대로 모은 종이를 그 안에 넣었어요.",
          "en": "As they gathered the pages, Davi said, “Please tell me what needs changing next time too. If an explanation is clear, I’d like to hear that as well.” Ren nodded. “Before I read it, I’ll ask what you’d like feedback on.” Davi held a folder open while Ren put the sheets inside, starting with the first page.",
          "es": "Al ordenar las hojas, Davi dijo: «La próxima vez también dime lo que hay que cambiar. Si alguna explicación es clara, me gustaría saberlo». Ren asintió. «Antes de leerlo, preguntaré sobre qué necesitas mi opinión». Davi sostuvo una carpeta abierta mientras Ren metía dentro las hojas, empezando por la primera página."
        },
        "other": {
          "ko": "다비가 다음 발표 자료도 읽어봐 달라고 말했어요. 렌은 동료가 다시 부탁해준 것이 고마웠어요. 다음에는 펜을 들기 전에 “오늘은 어떤 부분에 대한 의견을 듣고 싶어?” 하고 물어보려고요. 다비가 서류철을 펼쳐 들었어요. 렌은 첫 장부터 종이의 순서를 맞춰 그 안에 넣었어요.",
          "en": "Davi asked Ren to read his next presentation draft too. Ren was glad his colleague had asked him again. Next time, before picking up a pen, he would ask, “Which part would you like feedback on today?” Davi held a folder open. Ren arranged the sheets in order, starting with the first page, and put them inside.",
          "es": "Davi le pidió a Ren que leyera también el borrador de su próxima presentación. Ren agradeció que volviera a pedírselo. La próxima vez, antes de tomar el bolígrafo, preguntaría: «¿Sobre qué parte te gustaría conocer mi opinión hoy?». Davi sostuvo una carpeta abierta. Ren ordenó las hojas desde la primera página y las metió dentro."
        },
        "clues": [
          {
            "ko": "책상에는 빨간 수정 표시가 있는 종이와 첫 장의 예시가 놓여 있어요.",
            "en": "The table holds pages with red editing marks and the first-page example.",
            "es": "Sobre la mesa están las hojas con marcas rojas y el ejemplo de la primera página."
          },
          {
            "ko": "두 사람이 자료를 함께 정리해요. 다음에도 도움을 주고받을 말이 생겼어요.",
            "en": "They gather the pages together. They have found words for asking and offering help next time.",
            "es": "Ordenan las hojas juntos. Han encontrado palabras para pedir y ofrecer ayuda la próxima vez."
          }
        ]
      }
    ]
  }
];
window.adultNewDraftBooks=drafts;
// Per-scene anchors follow the painted gesture, not a fixed spot on every picture.
const anchors={flowers:{main:[[[31,64],[71,35]],[[71,60],[29,35]],[[29,36],[71,66]],[[34,36],[34,58]],[[18,63],[54,83]],[[72,68],[34,36]]],other:[[[37,64],[77,62]],[[75,65],[35,36]],[[33,37],[75,65]],[[36,35],[37,57]],[[22,65],[57,83]],[[70,69],[34,36]]]},notes:{main:[[[47,62],[77,62]],[[31,36],[61,74]],[[35,76],[78,72]],[[43,78],[72,49]],[[54,83],[32,36]],[[56,83],[30,65]]],other:[[[39,68],[76,75]],[[35,36],[76,74]],[[38,79],[73,72]],[[41,78],[74,80]],[[48,81],[34,36]],[[56,83],[33,66]]]}};
const flowerOther=[
 [drafts[0].scenes[0].clues[0],t('연보라 꽃이 엘레나의 눈앞에 있어요. 딸이 가리킨 노란 꽃과 나란히 보여요.','Pale purple flowers are in Elena’s view, beside the yellow ones her daughter points to.','Elena ve las flores lilas junto a las amarillas que señala su hija.')],
 null,null,
 [t('루시아가 엄마를 바라보며 이야기를 들어요. 물어보고 들을 틈이 생겼어요.','Lucia looks at her mum and listens. There is room to ask and hear each other.','Lucía mira a su madre y escucha. Hay espacio para preguntar y escucharse.'),drafts[0].scenes[3].clues[1]],
 null,null
];
drafts[1].scenes[4].clues[1]=t('다비의 입가에 미소가 돌아왔어요. 렌이 남겨도 될 부분을 알려준 뒤의 모습이에요.','A smile returns to Davi’s face after Ren points out what is worth keeping.','Davi vuelve a sonreír después de que Ren señale lo que merece conservarse.');
for(const draft of drafts){
 const pick=(value,lang)=>value[lang];const crops=Array.from({length:6},(_,i)=>({x:i%2*50,y:Math.floor(i/2)*100/3,w:50,h:100/3}));
 const getClues=(s,lang,other,i)=>(other&&draft.id==='flowers'&&flowerOther[i]||s.clues).map((text,j)=>({x:anchors[draft.id][other?'other':'main'][i][j][0],y:anchors[draft.id][other?'other':'main'][i][j][1],text:pick(text,lang)}));
 const b={id:draft.id,title:draft.title.ko,place:draft.place.ko,description:draft.description.ko,people:draft.people.map(v=>v.ko),cover:`./images/adult118-${draft.id}-cover.png`,atlas:`./images/adult118-${draft.id}-main.png`,otherAtlas:`./images/adult118-${draft.id}-other.png`,crops,otherCrops:crops,scenes:draft.scenes.map((s,i)=>({title:s.title.ko,text:s.text.ko,other:s.other.ko,clues:getClues(s,'ko',false,i),otherClues:getClues(s,'ko',true,i)}))};
 window.adultPreviewBooks.push(b);window.adultCharacterProfiles[draft.id]=draft.profiles;
 for(const lang of ['en','es'])window.adultBookLocales[lang][draft.id]={title:pick(draft.title,lang),place:pick(draft.place,lang),description:pick(draft.description,lang),people:draft.people.map(v=>pick(v,lang)),scenes:draft.scenes.map((s,i)=>({title:pick(s.title,lang),text:pick(s.text,lang),other:pick(s.other,lang),clues:s.clues.map(v=>pick(v,lang)),otherClues:(draft.id==='flowers'&&flowerOther[i]||s.clues).map(v=>pick(v,lang))}))};
}
// Match the actual painted seams; generated tiles are not assumed to be perfectly equal.
const seams={sleeve:{main:[627,417,811],other:[626,414,816]},station:{main:[627,416,830],other:[627,416,788]},flowers:{main:[627,410,815],other:[626,416,825]},notes:{main:[627,417,824],other:[627,407,803]}};
function paintedCrops([split,y1,y2]){const xs=[0,split,1254],ys=[0,y1,y2,1254];return Array.from({length:6},(_,i)=>{const col=i%2,row=Math.floor(i/2),left=xs[col]+2,top=ys[row]+2,right=xs[col+1]-2,bottom=ys[row+1]-2;return {x:left/1254*100,y:top/1254*100,w:(right-left)/1254*100,h:(bottom-top)/1254*100};});}
for(const b of window.adultPreviewBooks){if(seams[b.id]){b.crops=paintedCrops(seams[b.id].main);b.otherCrops=paintedCrops(seams[b.id].other);}}
})();
