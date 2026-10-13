const books=[
  {
    "id": "errand",
    "audience": "child",
    "art": 0,
    "ko": {
      "title": "작은 손에 담긴 따뜻한 빵",
      "place": "빵집",
      "subtitle": "처음 맡은 작은 심부름",
      "roles": [
        "지우",
        "준호",
        "빵집 주인"
      ],
      "views": [
        "앞사람이 빵을 오래 고르고 있다. 나는 친구와의 약속에 늦을까 봐 발끝을 꼼지락거린다. 나를 신경 쓰지 않는 걸까?",
        "할머니께 드릴 빵을 고르고 있다. 좋아하시는 맛을 기억하고 싶은데 잘 떠오르지 않는다. 뒤에 사람이 오자 질문하기가 망설여진다.",
        "손님이 빵을 가리켰다 손을 거둔다. 뒤의 손님은 시계를 본다. 나는 둘 다 편하게 물어볼 수 있으면 좋겠다."
      ],
      "hints": [
        "앞사람은 가격표보다 빵의 속을 오래 본다. 손에는 여러 번 접은 메모가 있다.",
        "내 메모에는 작은 글씨로 “할머니, 우유빵?”이 적혀 있다. 종이 모서리를 자꾸 만지는 내 손이 보인다.",
        "“제가 먹을 건 아니어서요.” 손님이 말을 멈춘다. 나는 포장하던 손을 잠깐 내려놓는다."
      ],
      "next": "주인이 “어떤 빵을 찾고 있니?” 하고 물었어. 아이가 할머니께 드릴 빵이라고 말했어. 나는 조금 전까지 시계만 보고 있었는데, 아이 손에 쥔 선물 쪽지가 이제야 보였어.",
      "nextHint": "메모를 꺼내 보여주는 손이 조금 느슨해졌다. 기다리는 손님도 친구에게 연락하고 어깨를 내린다.",
      "ending": "빵 봉투를 받으며 “친구와 약속이 있어서 조금 급했어요”라고 말했어. 아이도 고개를 끄덕였어. 아직 바빴지만 마음은 덜 뾰족했어. 다음에는 내 사정도 말해보고 싶어.",
      "minds": [
        "“늦으면 친구가 서운할까 봐 걱정했어요.”",
        "“할머니를 생각하니 잘 고르고 싶었어요. 물어보면 도와줄 사람이 있었네요.”",
        "“말하기 편한 시간을 만들어주고 싶었어요.”"
      ],
      "diaries": [
        [
          "할아버지가 좋아하시는 부드러운 빵을 사러 왔어요. 나는 그림 쪽지를 꼭 쥐고 내 차례를 기다렸어요. 빵집 아주머니가 웃으며 나를 바라보셨어요. 뒤에서 준호가 노란 책을 들고 인사했어요. 진열대의 빵 두 개가 비슷해 보였어요. 아주머니가 한쪽 빵을 가리켰어요. 나는 빨리 고르라는 뜻인가 싶어서 입을 다물었어요. 사실은 어떤 빵이 부드러운지 묻고 싶었어요.",
          "준호가 시계를 보고 책을 꼭 쥐었어요. 나는 내가 늦게 골라서 준호가 화났나 싶었어요. 입술을 다물고 쪽지를 만지작거렸어요. 준호는 나보다 자기 책을 더 자주 봤어요. 노란 책 사이로 파란 책갈피가 삐져나왔어요. 준호는 구겨진 끝을 자꾸 펴고 있었어요. 나를 재촉하는 것과는 조금 다른 모습이었어요. 나는 준호가 무슨 걱정을 하는지 궁금해졌어요.",
          "“할아버지 드릴 빵인데, 어떤 게 부드러워요?” 하고 물었어요. 아주머니는 내 쪽지를 보며 천천히 알려주셨어요. 준호는 “도서관 책갈피를 잃어버릴까 봐 걱정했어”라고 했어요. 내 생각과는 다른 마음이었어요. 아주머니가 빵 봉지를 내 작은 손에 건네셨어요. 나는 알려주셔서 고맙다고 말했어요. 준호와 웃으며 책갈피를 다시 끼웠어요. 모를 때 묻고, 다른 사람의 말도 들어보면 되겠어요."
        ],
        [
          "빵집에서 지우를 만나 인사했어요. 지우는 쪽지를 보느라 나를 못 본 것 같았어요. 내가 반갑지 않은 걸까 싶었어요. 빌린 책의 책갈피가 자꾸 빠졌어요. 나는 책을 내려다보며 책갈피를 다시 끼웠어요. 지우도 무언가 고르기 어려운 얼굴이었어요.",
          "책을 돌려줄 시간까지 얼마나 남았는지 시계를 봤어요. 나는 책갈피가 없어질까 봐 책을 꼭 쥐었어요. 지우를 빨리 가게 하려던 건 아니었어요. 구겨진 책갈피 끝을 펴다 지우의 쪽지를 봤어요. 빵 그림이 여러 개 그려져 있었어요. 처음 하는 심부름이라 망설이는 걸까요?",
          "지우가 아주머니에게 빵을 물었어요. 나는 책갈피가 걱정됐다고 말했어요. 지우가 나 때문에 그런 줄 알았다고 해서 놀랐어요. 지우와 웃으며 책갈피를 끼웠어요. 아까 인사를 못 들은 것도 쪽지를 보느라 그랬대요. 내 짐작과 다른 까닭을 들으니 마음이 가벼워졌어요."
        ],
        [
          "아이가 그림 쪽지를 들고 들어왔어요. 나는 웃으며 고를 시간을 기다렸어요. 아이가 혼자 해보고 싶은 심부름 같았어요. 빵 하나를 가리켜 보여주었어요. 아이가 조용해져서 돈을 세고 있나 싶었어요. 내 뜻이 아이에게 다르게 보일 수도 있겠네요.",
          "두 아이가 말없이 서 있었어요. 한 아이는 쪽지를, 다른 아이는 책을 꼭 쥐었어요. 저마다 다른 걱정이 있는 걸까요? 노란 책에서 구겨진 책갈피가 보였어요. 쪽지를 든 아이는 빵을 번갈아 보았어요. 나는 서두르지 않고 물어볼 틈을 남겨두었어요.",
          "아이가 할아버지 드릴 부드러운 빵을 물었어요. 이제야 무엇을 알고 싶은지 알았어요. 나는 천천히 설명하고 두 아이의 말도 들었어요. 아이에게 빵 봉지를 건넸어요. 두 아이가 서로를 보며 웃었어요. 기다려주니 저마다 하고 싶던 말이 나왔네요."
        ]
      ],
      "menuContext": "첫 빵 심부름"
    },
    "en": {
      "title": "Warm Bread in Little Hands",
      "place": "Bakery",
      "subtitle": "A first little errand",
      "roles": [
        "Jiwoo",
        "Junho",
        "The baker"
      ],
      "views": [
        "The person ahead takes a long time choosing bread. I wiggle my toes, worried I will be late to meet a friend. Have they forgotten I am here?",
        "I am choosing bread for Grandma. I want to remember her favorite, but I am not sure. When someone joins the line, I hesitate to ask.",
        "A customer points at a loaf, then pulls back. The person behind checks the time. I want both of them to feel free to speak."
      ],
      "hints": [
        "The customer studies the inside of the bread, not its price. They hold a folded note.",
        "My note says “Grandma, milk bread?” in tiny letters. I keep rubbing its corner.",
        "“It is for someone else,” the customer says, then pauses. I put my wrapping down."
      ],
      "next": "The baker asked what bread the child wanted. It was a gift for Grandma. I had been watching the clock; only now did I notice the gift note in the child’s hand.",
      "nextHint": "The hand holding the note relaxes. The waiting customer sends a message and lowers their shoulders.",
      "ending": "I explained that I was hurrying to meet a friend. The child nodded. I still needed to go, but I felt less tense. Next time I would like to say what I need too.",
      "minds": [
        "“I was worried my friend would feel hurt if I was late.”",
        "“I wanted to choose well for Grandma. There was someone I could ask for help.”",
        "“I wanted to make room for both voices.”"
      ],
      "diaries": [
        [
          "I came to buy soft bread for Grandpa. I held my picture note and waited my turn. The baker smiled at me. Junho said hello from behind me, holding a yellow book. Two breads looked almost the same. The baker pointed to one. I wondered if she wanted me to hurry, so I stayed quiet. I really wanted to ask which bread was soft.",
          "Junho looked at the clock and held his book tightly. I wondered if he was cross because I was taking so long. I pressed my lips together and fiddled with my note. Junho looked at his own book more often than at me. A blue bookmark stuck out of the yellow book. Junho kept smoothing its crumpled end. That looked different from rushing me. I wondered what was worrying him.",
          "“Which bread is soft? It is for Grandpa,” I asked. The baker looked at my note and explained slowly. Junho said, “I was worried about losing the library bookmark.” His thoughts were different from what I had guessed. The baker handed the bread bag to my small hands. I thanked her for helping. Junho and I smiled as he tucked his bookmark back in. When I am unsure, I can ask and listen."
        ],
        [
          "I said hello when I saw Jiwoo at the bakery. She was looking at a note and seemed not to notice. I wondered if she was not pleased to see me. My bookmark kept slipping out of the borrowed book. I looked down and tucked it back in. Jiwoo seemed unsure what to choose too.",
          "I checked the clock to see how long I had before returning the book. I gripped the book because I did not want to lose the bookmark. I was not trying to hurry Jiwoo. While smoothing the bookmark, I noticed pictures of bread on Jiwoo’s note. Perhaps this was her first errand. I wondered if she needed help choosing.",
          "Jiwoo asked the baker about the bread. I explained my worry about the bookmark. I was surprised that she had thought I was upset with her. We smiled as I put the bookmark back. Jiwoo said she had missed my hello while looking at her note. Hearing her reason felt better than guessing."
        ],
        [
          "A child came in holding a picture note. I smiled and gave her time to choose. It seemed like an errand she wanted to try herself. I pointed to one bread to help. When she stayed quiet, I wondered if she was counting her money. My gesture might have looked different to her.",
          "Two children stood quietly. One held a note and the other held a book. Could they each be worrying about something different? I saw a crumpled bookmark in the yellow book. The child with the note kept looking between the breads. I left room for a question instead of hurrying them.",
          "The child asked which bread was soft enough for Grandpa. Now I understood what she needed to know. I explained slowly and listened to both children. I handed over the bread bag. The children smiled at each other. Giving them time helped their words come out."
        ]
      ],
      "menuContext": "An errand at the bakery"
    },
    "es": {
      "title": "Pan tibio en manos pequeñas",
      "place": "Panadería",
      "subtitle": "Un primer pequeño encargo",
      "roles": [
        "Jiwoo",
        "Junho",
        "La panadera"
      ],
      "views": [
        "La persona de delante tarda en elegir. Muevo los pies: temo llegar tarde a ver a una amistad. ¿No se ha dado cuenta de que estoy aquí?",
        "Elijo pan para mi abuela. Quiero recordar cuál le gusta, pero no estoy seguro. Cuando llega otra persona, me cuesta preguntar.",
        "Alguien señala un pan y retira la mano. La persona de atrás mira la hora. Quisiera que ambas pudieran hablar con tranquilidad."
      ],
      "hints": [
        "La persona mira la miga, no el precio. Lleva una nota doblada.",
        "Mi nota dice “Abuela, ¿pan de leche?”. No dejo de tocar una esquina del papel.",
        "“No es para mí”, dice la persona y hace una pausa. Dejo un momento el papel de envolver."
      ],
      "next": "Quien atendía preguntó qué pan buscaba la niña. Era un regalo para su abuela. Yo solo miraba el reloj; entonces vi la nota de regalo en su mano.",
      "nextHint": "La mano que sujeta la nota se relaja. La persona que espera envía un mensaje y baja los hombros.",
      "ending": "Expliqué que tenía prisa por ver a una amistad. La niña asintió. Aún debía irme, pero sentí menos tensión. La próxima vez quiero contar también lo que necesito.",
      "minds": [
        "“Me preocupaba que mi amistad se sintiera mal si llegaba tarde.”",
        "“Quería elegir bien para mi abuela. Había alguien a quien pedir ayuda.”",
        "“Quería dejar espacio para las dos voces.”"
      ],
      "diaries": [
        [
          "Vine a comprar pan blandito para el abuelo. Sujeté mi nota con dibujos y esperé mi turno. La panadera me sonrió. Junho me saludó desde atrás con un libro amarillo. Dos panes parecían casi iguales. La panadera señaló uno. Pensé que quería que me diera prisa y me quedé callada. En realidad quería preguntar cuál era blandito.",
          "Junho miró el reloj y sujetó el libro con fuerza. Pensé que estaba enfadado porque yo tardaba mucho. Apreté los labios y jugué con mi nota. Junho miraba su libro más que a mí. Del libro amarillo asomaba un separador azul. Junho alisaba una punta arrugada. Eso no parecía una manera de darme prisa. Me pregunté qué le preocupaba.",
          "“¿Cuál es blandito? Es para el abuelo”, pregunté. La panadera miró mi nota y me lo explicó despacio. Junho dijo: “Me preocupaba perder el separador de la biblioteca”. Pensaba algo distinto de lo que yo había imaginado. La panadera puso la bolsa de pan en mis manos pequeñas. Le di las gracias por ayudarme. Junho y yo sonreímos mientras guardaba su separador. Si no sé algo, puedo preguntar y escuchar."
        ],
        [
          "Saludé a Jiwoo al verla en la panadería. Miraba una nota y parecía no verme. Pensé que quizá no le alegraba encontrarse conmigo. El separador se salía del libro prestado. Miré hacia abajo y lo coloqué otra vez. Jiwoo también parecía no saber qué elegir.",
          "Miré el reloj para saber cuánto faltaba para devolver el libro. Lo sujeté fuerte para no perder el separador. No quería dar prisa a Jiwoo. Al alisar el separador vi dibujos de panes en la nota de Jiwoo. Quizá era su primer encargo. Me pregunté si necesitaba ayuda.",
          "Jiwoo preguntó a la panadera por el pan. Le conté mi preocupación por el separador. Me sorprendió que pensara que estaba enfadado con ella. Sonreímos mientras guardaba el separador. Jiwoo dijo que no había oído mi saludo porque miraba su nota. Escuchar su razón me hizo sentir mejor."
        ],
        [
          "Entró una niña con una nota de dibujos. Le sonreí y le di tiempo para elegir. Parecía un encargo que quería probar por sí misma. Señalé un pan para ayudar. Al verla callada pensé que quizá contaba sus monedas. Mi gesto podía parecerle distinto.",
          "Dos niños estaban callados. Una sujetaba una nota y el otro un libro. ¿Estarían preocupados por cosas distintas? Vi un separador arrugado en el libro amarillo. La niña miraba de un pan a otro. Dejé espacio para preguntar sin darles prisa.",
          "La niña preguntó qué pan era blandito para el abuelo. Por fin entendí qué necesitaba saber. Se lo expliqué despacio y escuché a los dos. Le entregué la bolsa de pan. Los niños se sonrieron. Darles tiempo les ayudó a decir lo que pensaban."
        ]
      ],
      "menuContext": "Un encargo en la panadería"
    }
  },
  {
    "id": "bread",
    "audience": "adult",
    "art": 0,
    "ko": {
      "title": "빵을 고르는 마음",
      "place": "빵집",
      "subtitle": "마음제빵소 이야기",
      "roles": [
        "기다리는 손님",
        "빵을 고르는 손님",
        "빵집 주인"
      ],
      "views": [
        "앞사람이 빵을 오래 고르고 있다. 나는 친구와의 약속에 늦을까 봐 발끝을 꼼지락거린다. 나를 신경 쓰지 않는 걸까?",
        "할머니께 드릴 빵을 고르고 있다. 좋아하시는 맛을 기억하고 싶은데 잘 떠오르지 않는다. 뒤에 사람이 오자 질문하기가 망설여진다.",
        "손님이 빵을 가리켰다 손을 거둔다. 뒤의 손님은 시계를 본다. 나는 둘 다 편하게 물어볼 수 있으면 좋겠다."
      ],
      "hints": [
        "앞사람은 가격표보다 빵의 속을 오래 본다. 손에는 여러 번 접은 메모가 있다.",
        "내 메모에는 작은 글씨로 “할머니, 우유빵?”이 적혀 있다. 종이 모서리를 자꾸 만지는 내 손이 보인다.",
        "“제가 먹을 건 아니어서요.” 손님이 말을 멈춘다. 나는 포장하던 손을 잠깐 내려놓는다."
      ],
      "next": "주인이 “어떤 빵을 찾고 있니?” 하고 물었어. 아이가 할머니께 드릴 빵이라고 말했어. 나는 조금 전까지 시계만 보고 있었는데, 아이 손에 쥔 선물 쪽지가 이제야 보였어.",
      "nextHint": "메모를 꺼내 보여주는 손이 조금 느슨해졌다. 기다리는 손님도 친구에게 연락하고 어깨를 내린다.",
      "ending": "빵 봉투를 받으며 “친구와 약속이 있어서 조금 급했어요”라고 말했어. 아이도 고개를 끄덕였어. 아직 바빴지만 마음은 덜 뾰족했어. 다음에는 내 사정도 말해보고 싶어.",
      "minds": [
        "“늦으면 친구가 서운할까 봐 걱정했어요.”",
        "“할머니를 생각하니 잘 고르고 싶었어요. 물어보면 도와줄 사람이 있었네요.”",
        "“말하기 편한 시간을 만들어주고 싶었어요.”"
      ],
      "diaries": [
        [
          "앞사람이 빵을 오래 고르고 있다. 나는 친구와의 약속에 늦을까 봐 발끝을 꼼지락거린다. 나를 신경 쓰지 않는 걸까?",
          "주인이 “어떤 빵을 찾고 있니?” 하고 물었어. 아이가 할머니께 드릴 빵이라고 말했어. 나는 조금 전까지 시계만 보고 있었는데, 아이 손에 쥔 선물 쪽지가 이제야 보였어.",
          "빵 봉투를 받으며 “친구와 약속이 있어서 조금 급했어요”라고 말했어. 아이도 고개를 끄덕였어. 아직 바빴지만 마음은 덜 뾰족했어. 다음에는 내 사정도 말해보고 싶어."
        ],
        [
          "할머니께 드릴 빵을 고르고 있다. 좋아하시는 맛을 기억하고 싶은데 잘 떠오르지 않는다. 뒤에 사람이 오자 질문하기가 망설여진다.",
          "주인에게 “할머니께 드릴 빵이에요”라고 말했어. 뒤에 있던 손님은 친구와 약속이 있다고 했어. 나는 할머니가 좋아하실지만 생각해서 기다리는 사람이 급한 줄 몰랐어.",
          "주인이 빵을 담아줬어. 도움을 받으니 마음이 놓였어. 기다리던 손님에게도 고맙다고 인사했어. 할머니께 가는 길에 빵 봉투를 꼭 안았어."
        ],
        [
          "손님이 빵을 가리켰다 손을 거둔다. 뒤의 손님은 시계를 본다. 나는 둘 다 편하게 물어볼 수 있으면 좋겠다.",
          "아이에게 어떤 빵을 찾는지 물었다. 할머니 선물이라는 대답 뒤에 기다리던 손님도 약속 시간을 말했다. 나는 두 봉투를 준비하며 누구의 말부터 들어야 할지 생각했다.",
          "두 사람은 빵을 받아 나갔다. 한 사람은 약속에, 한 사람은 할머니께 마음이 가 있었다. 나는 오늘 말하기 편한 시간을 조금 만들었는지 돌아보았다."
        ]
      ],
      "menuContext": "아침의 동네 빵집"
    },
    "en": {
      "title": "The Heart Behind the Bread",
      "place": "Bakery",
      "subtitle": "A story from Maeum Bakery",
      "roles": [
        "The waiting customer",
        "The gift-giving customer",
        "The baker"
      ],
      "views": [
        "The person ahead takes a long time choosing bread. I wiggle my toes, worried I will be late to meet a friend. Have they forgotten I am here?",
        "I am choosing bread for Grandma. I want to remember her favorite, but I am not sure. When someone joins the line, I hesitate to ask.",
        "A customer points at a loaf, then pulls back. The person behind checks the time. I want both of them to feel free to speak."
      ],
      "hints": [
        "The customer studies the inside of the bread, not its price. They hold a folded note.",
        "My note says “Grandma, milk bread?” in tiny letters. I keep rubbing its corner.",
        "“It is for someone else,” the customer says, then pauses. I put my wrapping down."
      ],
      "next": "The baker asked what bread the child wanted. It was a gift for Grandma. I had been watching the clock; only now did I notice the gift note in the child’s hand.",
      "nextHint": "The hand holding the note relaxes. The waiting customer sends a message and lowers their shoulders.",
      "ending": "I explained that I was hurrying to meet a friend. The child nodded. I still needed to go, but I felt less tense. Next time I would like to say what I need too.",
      "minds": [
        "“I was worried my friend would feel hurt if I was late.”",
        "“I wanted to choose well for Grandma. There was someone I could ask for help.”",
        "“I wanted to make room for both voices.”"
      ],
      "diaries": [
        [
          "The person ahead takes a long time choosing bread. I wiggle my toes, worried I will be late to meet a friend. Have they forgotten I am here?",
          "The baker asked what bread the child wanted. It was a gift for Grandma. I had been watching the clock; only now did I notice the gift note in the child’s hand.",
          "I explained that I was hurrying to meet a friend. The child nodded. I still needed to go, but I felt less tense. Next time I would like to say what I need too."
        ],
        [
          "I am choosing bread for Grandma. I want to remember her favorite, but I am not sure. When someone joins the line, I hesitate to ask.",
          "I told the baker the bread was for Grandma. The waiting guest said they had a meeting. I had only been thinking about what Grandma would like.",
          "The baker packed the bread. Asking for help made me feel calmer. I thanked the waiting guest and held the bag close on my way to Grandma."
        ],
        [
          "A customer points at a loaf, then pulls back. The person behind checks the time. I want both of them to feel free to speak.",
          "I asked the child about the bread. After hearing about Grandma, I heard the guest’s meeting time too. As I prepared two bags, I thought about giving both people room to speak.",
          "They left with their bread. One was thinking of a meeting, the other of Grandma. I wondered whether I had made it a little easier for them to share their thoughts."
        ]
      ],
      "menuContext": "A moment at the bakery"
    },
    "es": {
      "title": "El corazón detrás del pan",
      "place": "Panadería",
      "subtitle": "Una historia de la panadería Maeum",
      "roles": [
        "La persona que espera",
        "La persona que elige el pan",
        "La panadera"
      ],
      "views": [
        "La persona de delante tarda en elegir. Muevo los pies: temo llegar tarde a ver a una amistad. ¿No se ha dado cuenta de que estoy aquí?",
        "Elijo pan para mi abuela. Quiero recordar cuál le gusta, pero no estoy seguro. Cuando llega otra persona, me cuesta preguntar.",
        "Alguien señala un pan y retira la mano. La persona de atrás mira la hora. Quisiera que ambas pudieran hablar con tranquilidad."
      ],
      "hints": [
        "La persona mira la miga, no el precio. Lleva una nota doblada.",
        "Mi nota dice “Abuela, ¿pan de leche?”. No dejo de tocar una esquina del papel.",
        "“No es para mí”, dice la persona y hace una pausa. Dejo un momento el papel de envolver."
      ],
      "next": "Quien atendía preguntó qué pan buscaba la niña. Era un regalo para su abuela. Yo solo miraba el reloj; entonces vi la nota de regalo en su mano.",
      "nextHint": "La mano que sujeta la nota se relaja. La persona que espera envía un mensaje y baja los hombros.",
      "ending": "Expliqué que tenía prisa por ver a una amistad. La niña asintió. Aún debía irme, pero sentí menos tensión. La próxima vez quiero contar también lo que necesito.",
      "minds": [
        "“Me preocupaba que mi amistad se sintiera mal si llegaba tarde.”",
        "“Quería elegir bien para mi abuela. Había alguien a quien pedir ayuda.”",
        "“Quería dejar espacio para las dos voces.”"
      ],
      "diaries": [
        [
          "La persona de delante tarda en elegir. Muevo los pies: temo llegar tarde a ver a una amistad. ¿No se ha dado cuenta de que estoy aquí?",
          "Quien atendía preguntó qué pan buscaba la niña. Era un regalo para su abuela. Yo solo miraba el reloj; entonces vi la nota de regalo en su mano.",
          "Expliqué que tenía prisa por ver a una amistad. La niña asintió. Aún debía irme, pero sentí menos tensión. La próxima vez quiero contar también lo que necesito."
        ],
        [
          "Elijo pan para mi abuela. Quiero recordar cuál le gusta, pero no estoy seguro. Cuando llega otra persona, me cuesta preguntar.",
          "Dije que el pan era para mi abuela. La persona que esperaba contó que tenía una cita. Yo solo pensaba en qué le gustaría a mi abuela.",
          "Me prepararon el pan. Pedir ayuda me tranquilizó. Di las gracias a quien esperaba y abracé la bolsa camino a casa de mi abuela."
        ],
        [
          "Alguien señala un pan y retira la mano. La persona de atrás mira la hora. Quisiera que ambas pudieran hablar con tranquilidad.",
          "Pregunté a la niña por el pan. Después de escuchar lo de su abuela, escuché también la hora de la cita. Al preparar dos bolsas pensé en dejar hablar a ambas personas.",
          "Se fueron con su pan. Una pensaba en una cita y la otra en su abuela. Me pregunté si había facilitado un poco que compartieran sus pensamientos."
        ]
      ],
      "menuContext": "Lo que pasó en la panadería"
    },
    "cover": "./bread-adult-cover.png"
  },
  {
    "id": "cups",
    "audience": "child",
    "art": 1,
    "ko": {
      "title": "생일날, 두 개의 잔",
      "place": "생일파티",
      "subtitle": "두 잔 사이의 작은 마음",
      "roles": [
        "함께 온 친구",
        "주문하는 친구",
        "생일파티 직원"
      ],
      "views": [
        "오늘 친구와 생일파티에 갔어. 친구는 나에게 묻지 않고 파란 잔에 코코아, 주황 잔에 우유를 주문했어. 그리고 내 파란 잔의 음료 표시와 내 표정을 번갈아 봤어. 내 선택을 못 믿는 걸까? 조금 답답했어.",
        "오늘 같이 와준 친구에게 음료를 선물하고 싶었어. 코코아를 좋아한다고 했던 게 생각났어. 음료가 바뀔까 봐 파란 잔의 표시를 보고 직원에게 두 번 물었어. 친구가 좋아할지 자꾸 얼굴을 보게 됐어.",
        "오늘 아이가 “파란 잔이 코코아 맞죠?”라고 두 번 물었다. 나는 주문을 잘못 받았나 걱정해서 주문표와 잔의 표시를 다시 보았다. 아이는 자꾸 친구 쪽을 바라보았다."
      ],
      "hints": [
        "친구는 파란 잔의 음료 표시를 보고 직원에게 같은 질문을 두 번 했어. 주머니에는 작은 카드가 있었어.",
        "친구에게 코코아를 골랐어. 파란 잔의 표시와 친구 얼굴을 번갈아 봤어.",
        "아이의 질문은 파란 잔에 든 음료에 대한 것이었어. 작은 카드를 주머니에 넣고 있었어."
      ],
      "next": "직원이 “파란 잔은 코코아, 주황 잔은 우유가 맞죠?” 하고 물었어. 친구가 끄덕이고 작은 카드를 꺼냈어. “오늘 같이 와줘서 고마워.” 내 잔을 자꾸 보던 건 음료가 바뀔까 걱정해서였대.",
      "nextHint": "서로 말한 뒤 컵을 잡은 손이 편안해졌다. 고마움과 답답함이 함께 있을 수도 있다.",
      "ending": "나는 “고마워. 그런데 다음에는 나도 같이 고르고 싶어”라고 말했어. 친구는 좋다고 했어. 답답했던 마음이 다 없어지진 않았지만, 친구가 왜 그랬는지는 조금 알 것 같았어.",
      "minds": [
        "“챙겨준 건 고마워. 나도 고르는 데 함께하고 싶었어.”",
        "“고마움을 표현하고 싶었는데 말이 잘 나오지 않았어.”",
        "“반복 질문에도 다른 이유가 있을 수 있네요.”"
      ],
      "diaries": [
        [
          "오늘 친구와 생일파티에 갔어. 친구는 나에게 묻지 않고 파란 잔에 코코아, 주황 잔에 우유를 주문했어. 그리고 내 파란 잔의 음료 표시와 내 표정을 번갈아 봤어. 내 선택을 못 믿는 걸까? 조금 답답했어.",
          "직원이 “파란 잔은 코코아, 주황 잔은 우유가 맞죠?” 하고 물었어. 친구가 끄덕이고 작은 카드를 꺼냈어. “오늘 같이 와줘서 고마워.” 내 잔을 자꾸 보던 건 음료가 바뀔까 걱정해서였대.",
          "나는 “고마워. 그런데 다음에는 나도 같이 고르고 싶어”라고 말했어. 친구는 좋다고 했어. 답답했던 마음이 다 없어지진 않았지만, 친구가 왜 그랬는지는 조금 알 것 같았어."
        ],
        [
          "오늘 같이 와준 친구에게 음료를 선물하고 싶었어. 코코아를 좋아한다고 했던 게 생각났어. 음료가 바뀔까 봐 파란 잔의 표시를 보고 직원에게 두 번 물었어. 친구가 좋아할지 자꾸 얼굴을 보게 됐어.",
          "직원이 두 음료의 색깔 표시를 읽어줬어. 나는 고개를 끄덕이고 고맙다고 쓴 카드를 내밀었어. 친구는 선물은 고맙지만 다음엔 같이 고르고 싶다고 했어. 내 마음만큼 친구의 마음도 궁금해졌어.",
          "친구와 잔을 나란히 놓았어. 몰래 챙겨주는 것만이 다정한 건 아니구나. 다음에는 “어떤 걸 마시고 싶어?” 하고 먼저 물어보고 싶어."
        ],
        [
          "오늘 아이가 “파란 잔이 코코아 맞죠?”라고 두 번 물었다. 나는 주문을 잘못 받았나 걱정해서 주문표와 잔의 표시를 다시 보았다. 아이는 자꾸 친구 쪽을 바라보았다.",
          "나는 파란 잔의 코코아와 주황 잔의 우유를 소리 내어 확인했다. 주문한 아이가 작은 감사 카드를 꺼냈다. 반복해서 묻던 데에는 음료를 바꾸지 않으려는 마음이 있었다.",
          "두 아이는 다음엔 함께 고르자고 이야기했다. 나는 주문을 실수했나 걱정했는데, 아이는 선물을 잘 전하고 싶었던 거였다. 같은 질문을 우리는 다르게 받아들였다."
        ]
      ],
      "menuContext": "친구의 생일 초대"
    },
    "en": {
      "title": "Two Cups on a Birthday",
      "place": "Birthday party",
      "subtitle": "A small feeling between two cups",
      "roles": [
        "The visiting friend",
        "The ordering friend",
        "The birthday party worker"
      ],
      "views": [
        "Today I went to a birthday party with my friend. Without asking me, they ordered cocoa in a blue cup and milk in an orange one. They kept looking between the label on my blue cup and my face. Did they not trust me to choose? I felt frustrated.",
        "Today I wanted to give my friend a drink for coming with me. I remembered they liked cocoa. Afraid the drinks might switch, I checked the blue cup’s label and asked the worker twice. I kept looking at my friend to see if they liked it.",
        "Today a child asked twice whether the blue cup was cocoa. I worried I had taken the order wrongly, so I checked the order and cup labels. The child kept glancing toward their friend."
      ],
      "hints": [
        "My friend checked the blue cup’s drink label and asked the worker twice. A little card was in their pocket.",
        "I chose cocoa for my friend. I looked between the blue label and their face.",
        "The child was asking which drink was in the blue cup. A small card was in their pocket."
      ],
      "next": "The worker asked, “Cocoa in the blue cup and milk in the orange one, right?” My friend nodded and gave me a little thank-you card. They had been checking that the drinks would not get mixed up.",
      "nextHint": "Their hands relax around the cups. Gratitude and frustration can happen together.",
      "ending": "I said, “Thank you. Next time I want to choose together.” My friend agreed. Some frustration remained, but now I understood a little more about their checking.",
      "minds": [
        "“Thank you for caring. I also wanted to help choose.”",
        "“I wanted to show gratitude, but I felt shy.”",
        "“A repeated question can have another reason.”"
      ],
      "diaries": [
        [
          "Today I went to a birthday party with my friend. Without asking me, they ordered cocoa in a blue cup and milk in an orange one. They kept looking between the label on my blue cup and my face. Did they not trust me to choose? I felt frustrated.",
          "The worker asked, “Cocoa in the blue cup and milk in the orange one, right?” My friend nodded and gave me a little thank-you card. They had been checking that the drinks would not get mixed up.",
          "I said, “Thank you. Next time I want to choose together.” My friend agreed. Some frustration remained, but now I understood a little more about their checking."
        ],
        [
          "Today I wanted to give my friend a drink for coming with me. I remembered they liked cocoa. Afraid the drinks might switch, I checked the blue cup’s label and asked the worker twice. I kept looking at my friend to see if they liked it.",
          "The worker read the drink labels aloud. I nodded and offered my card. My friend thanked me but wanted to choose together next time. I became curious about their wishes too.",
          "We set our cups side by side. A surprise is not the only way to care. Next time I want to ask, “What would you like?” first."
        ],
        [
          "Today a child asked twice whether the blue cup was cocoa. I worried I had taken the order wrongly, so I checked the order and cup labels. The child kept glancing toward their friend.",
          "I read the labels aloud: cocoa in blue, milk in orange. The child brought out a thank-you card. The repeated questions were about keeping the gift’s drinks from being switched.",
          "The friends agreed to choose together next time. I had worried about an order mistake; the child had worried about giving a gift. We had heard the same question differently."
        ]
      ],
      "menuContext": "What happened at a birthday party"
    },
    "es": {
      "title": "Dos tazas en un cumpleaños",
      "place": "Fiesta de cumpleaños",
      "subtitle": "Un pequeño sentimiento entre dos tazas",
      "roles": [
        "La amistad que acompaña",
        "La amistad que pide",
        "La persona que atiende"
      ],
      "views": [
        "Hoy fui a una fiesta de cumpleaños con mi amiga. Sin preguntarme, pidió cacao en una taza azul y leche en una naranja. Miraba la etiqueta de mi taza y luego mi cara. ¿No confiaba en que yo eligiera? Me molestó un poco.",
        "Hoy quería regalar una bebida a mi amigo por venir conmigo. Recordé que le gustaba el cacao. Revisé la etiqueta azul y pregunté dos veces para no confundir las bebidas. Miraba su cara para saber si le gustaba.",
        "Hoy una niña preguntó dos veces si la taza azul tenía cacao. Temí haber anotado mal el pedido y revisé el papel y las etiquetas. Miraba mucho hacia su amigo."
      ],
      "hints": [
        "Mi amiga miró la etiqueta azul y preguntó dos veces. Tenía una tarjeta en el bolsillo.",
        "Elegí cacao para mi amigo. Miraba la etiqueta azul y su cara.",
        "La niña preguntaba qué bebida había en la taza azul. Llevaba una tarjeta en el bolsillo."
      ],
      "next": "Quien atendía preguntó: “Cacao en la taza azul y leche en la naranja, ¿verdad?”. Mi amiga asintió y me dio una tarjeta de agradecimiento. Miraba las tazas para que las bebidas no se confundieran.",
      "nextHint": "Las manos se relajan alrededor de las tazas. El agradecimiento y la molestia pueden aparecer juntos.",
      "ending": "Dije: “Gracias. La próxima vez quiero elegir contigo”. Estuvo de acuerdo. Aún sentía algo de molestia, pero entendía mejor por qué revisaba las tazas.",
      "minds": [
        "“Gracias por pensar en mí. También quería participar al elegir.”",
        "“Quería dar las gracias, pero me daba vergüenza.”",
        "“Una pregunta repetida puede tener otra razón.”"
      ],
      "diaries": [
        [
          "Hoy fui a una fiesta de cumpleaños con mi amiga. Sin preguntarme, pidió cacao en una taza azul y leche en una naranja. Miraba la etiqueta de mi taza y luego mi cara. ¿No confiaba en que yo eligiera? Me molestó un poco.",
          "Quien atendía preguntó: “Cacao en la taza azul y leche en la naranja, ¿verdad?”. Mi amiga asintió y me dio una tarjeta de agradecimiento. Miraba las tazas para que las bebidas no se confundieran.",
          "Dije: “Gracias. La próxima vez quiero elegir contigo”. Estuvo de acuerdo. Aún sentía algo de molestia, pero entendía mejor por qué revisaba las tazas."
        ],
        [
          "Hoy quería regalar una bebida a mi amigo por venir conmigo. Recordé que le gustaba el cacao. Revisé la etiqueta azul y pregunté dos veces para no confundir las bebidas. Miraba su cara para saber si le gustaba.",
          "Leímos las etiquetas de las bebidas. Asentí y entregué mi tarjeta. Mi amigo me dio las gracias, pero quería elegir juntos la próxima vez. Me dio curiosidad lo que él quería también.",
          "Pusimos las tazas una junto a la otra. Una sorpresa no es la única forma de cuidar. La próxima vez quiero preguntar primero: “¿Qué te gustaría?”."
        ],
        [
          "Hoy una niña preguntó dos veces si la taza azul tenía cacao. Temí haber anotado mal el pedido y revisé el papel y las etiquetas. Miraba mucho hacia su amigo.",
          "Leí las etiquetas: cacao en azul y leche en naranja. La niña sacó una tarjeta de agradecimiento. Las preguntas repetidas buscaban que las bebidas del regalo no se intercambiaran.",
          "Acordaron elegir juntos la próxima vez. Yo temía un error en el pedido; la niña temía equivocarse con el regalo. Habíamos entendido la misma pregunta de maneras distintas."
        ]
      ],
      "menuContext": "Lo que pasó en una fiesta de cumpleaños"
    }
  },
  {
    "id": "plate",
    "audience": "child",
    "art": 2,
    "ko": {
      "title": "마지막 한 조각은 누구에게?",
      "place": "식당",
      "subtitle": "마지막 한 조각 이야기",
      "roles": [
        "기다리는 사람",
        "접시를 미는 사람",
        "식당 직원"
      ],
      "views": [
        "마지막 빵이 그대로 있다. 상대가 먹기 싫은 걸까? 나는 먹고 싶지만 먼저 손을 뻗기가 쑥스럽다.",
        "마지막 한 조각을 상대 쪽으로 밀었다. 좋아하는 것 같아서 남겨주고 싶다. 그런데 상대도 손을 대지 않는다.",
        "두 사람이 같은 접시를 자꾸 서로에게 민다. 표정을 보니 다투는 것 같지는 않다."
      ],
      "hints": [
        "상대는 빵을 보다가 내 얼굴을 본다. “먼저 드세요”라는 말을 작게 반복한다.",
        "내 배에서 작은 소리가 난다. 먹고 싶은 마음과 양보하고 싶은 마음이 함께 있다.",
        "두 사람의 손이 접시 앞에서 멈춘다. 아직 원하는 것을 말한 사람은 없다."
      ],
      "next": "직원이 “나누어 먹을까요?” 하고 물었어. 친구가 “사실 나도 먹고 싶었어”라고 말했어. 나도 배가 고프다고 말하자 둘 다 웃었어. 서로 먹으라고 기다리고 있었던 거야.",
      "nextHint": "둘 다 웃지만 조금 쑥스럽다. 상대에게 주고 싶은 마음이 내 배고픔을 없애지는 않는다.",
      "ending": "빵을 반씩 먹었어. 아까는 친구가 먹기 싫은 줄 알았는데, 나에게 주고 싶었던 거였어. 다음엔 배고프다고 말해도 괜찮겠지.",
      "minds": [
        "“먹고 싶다고 말하면 욕심처럼 보일까 봐 걱정했어요.”",
        "“좋아하는 것 같아 남겨주고 싶었어요.”",
        "“누구의 마음도 대신 정하지 않고 물어보고 싶었어요.”"
      ],
      "diaries": [
        [
          "마지막 빵이 그대로 있다. 상대가 먹기 싫은 걸까? 나는 먹고 싶지만 먼저 손을 뻗기가 쑥스럽다.",
          "직원이 “나누어 먹을까요?” 하고 물었어. 친구가 “사실 나도 먹고 싶었어”라고 말했어. 나도 배가 고프다고 말하자 둘 다 웃었어. 서로 먹으라고 기다리고 있었던 거야.",
          "빵을 반씩 먹었어. 아까는 친구가 먹기 싫은 줄 알았는데, 나에게 주고 싶었던 거였어. 다음엔 배고프다고 말해도 괜찮겠지."
        ],
        [
          "마지막 한 조각을 상대 쪽으로 밀었다. 좋아하는 것 같아서 남겨주고 싶다. 그런데 상대도 손을 대지 않는다.",
          "직원이 빵을 나누자고 했어. 친구가 먹고 싶었다고 해서 나도 그렇다고 말했어. 내 배에서는 작은 소리가 났어. 양보하고 싶은 마음과 배고픈 마음이 같이 있었어.",
          "친구와 반씩 먹으니 맛있었어. 나는 친구에게 주고 싶었는데 친구도 같은 생각이었대. 다음엔 좋아하겠지 하고 정하기 전에 물어보고 싶어."
        ],
        [
          "두 사람이 같은 접시를 자꾸 서로에게 민다. 표정을 보니 다투는 것 같지는 않다.",
          "나누어 먹을지 물었다. 두 사람 모두 먹고 싶었다고 대답했다. 나는 두 작은 접시를 가져왔다. 다투는 줄 잠깐 걱정했는데 서로 양보하고 있었다.",
          "접시가 한 번씩 비워졌다. 나는 오늘 두 사람에게 같은 질문을 했지만 서로 다른 망설임을 들었다. 겉으로 보이는 손짓만으로는 알 수 없었다."
        ]
      ],
      "menuContext": "둘이 앉은 식탁"
    },
    "en": {
      "title": "Who Is the Last Piece For?",
      "place": "Restaurant",
      "subtitle": "The story of the last piece",
      "roles": [
        "The person who waits",
        "The person offering the plate",
        "The server"
      ],
      "views": [
        "The last piece of bread sits untouched. Does the other person dislike it? I want it, but I feel shy reaching first.",
        "I push the last piece toward the other person. They seemed to like it, so I want them to have it. But they do not reach for it.",
        "Two people keep sliding a plate toward each other. Their faces do not look angry."
      ],
      "hints": [
        "They glance from the bread to my face and quietly repeat, “After you.”",
        "My stomach makes a little sound. I want to share, and I am hungry too.",
        "Both hands stop beside the plate. Neither person has said what they want."
      ],
      "next": "The server asked whether we wanted to share. My friend admitted wanting some. I said I was hungry too, and we laughed. We had both been waiting for the other to eat.",
      "nextHint": "Both smile and still feel a little shy. Caring about someone does not erase your own hunger.",
      "ending": "We each ate half. I had thought my friend disliked the bread; they had wanted me to have it. Next time I can say I am hungry.",
      "minds": [
        "“I worried that saying I wanted it would look selfish.”",
        "“I thought you liked it and wanted to save it for you.”",
        "“I wanted to ask instead of deciding for them.”"
      ],
      "diaries": [
        [
          "The last piece of bread sits untouched. Does the other person dislike it? I want it, but I feel shy reaching first.",
          "The server asked whether we wanted to share. My friend admitted wanting some. I said I was hungry too, and we laughed. We had both been waiting for the other to eat.",
          "We each ate half. I had thought my friend disliked the bread; they had wanted me to have it. Next time I can say I am hungry."
        ],
        [
          "I push the last piece toward the other person. They seemed to like it, so I want them to have it. But they do not reach for it.",
          "The server offered to split the bread. My friend wanted some, and so did I. My stomach made a little noise. Wanting to offer it and feeling hungry were both real.",
          "Our halves tasted good. I had wanted my friend to have it, and they felt the same. Next time I would like to ask before deciding what they want."
        ],
        [
          "Two people keep sliding a plate toward each other. Their faces do not look angry.",
          "I asked whether they wanted to share. Both wanted some, so I fetched two small plates. I had briefly worried about an argument, but they were offering it to each other.",
          "Both plates became empty. One question revealed two kinds of hesitation. Their hand movements alone had not told me why."
        ]
      ],
      "menuContext": "A moment at the restaurant"
    },
    "es": {
      "title": "¿Para quién es el último trocito?",
      "place": "Restaurante",
      "subtitle": "La historia del último trozo",
      "roles": [
        "La persona que espera",
        "La persona que ofrece el plato",
        "La persona que sirve"
      ],
      "views": [
        "El último trozo sigue en el plato. ¿A la otra persona no le gusta? Yo lo quiero, pero me da vergüenza tomarlo primero.",
        "Empujo el plato hacia la otra persona. Parecía gustarle y quería dejárselo. Pero tampoco lo toma.",
        "Dos personas se ofrecen el mismo plato. Sus caras no parecen enfadadas."
      ],
      "hints": [
        "Mira el pan y luego mi cara. Repite bajito: “Tú primero”.",
        "Mi estómago hace un pequeño ruido. Quiero compartir y también tengo hambre.",
        "Las dos manos se detienen junto al plato. Nadie ha dicho lo que quiere."
      ],
      "next": "Quien servía preguntó si queríamos compartir. Mi amiga dijo que quería un poco. Yo también tenía hambre y nos reímos. Esperábamos que la otra persona comiera primero.",
      "nextHint": "Sonríen y todavía sienten un poco de vergüenza. Cuidar a alguien no hace desaparecer tu hambre.",
      "ending": "Comimos la mitad cada cual. Pensé que no le gustaba el pan; quería dejármelo. La próxima vez puedo decir que tengo hambre.",
      "minds": [
        "“Temía parecer egoísta si decía que lo quería.”",
        "“Pensé que te gustaba y quería dejártelo.”",
        "“Quería preguntar, no decidir por ellas.”"
      ],
      "diaries": [
        [
          "El último trozo sigue en el plato. ¿A la otra persona no le gusta? Yo lo quiero, pero me da vergüenza tomarlo primero.",
          "Quien servía preguntó si queríamos compartir. Mi amiga dijo que quería un poco. Yo también tenía hambre y nos reímos. Esperábamos que la otra persona comiera primero.",
          "Comimos la mitad cada cual. Pensé que no le gustaba el pan; quería dejármelo. La próxima vez puedo decir que tengo hambre."
        ],
        [
          "Empujo el plato hacia la otra persona. Parecía gustarle y quería dejárselo. Pero tampoco lo toma.",
          "Nos ofrecieron partir el pan. Mi amigo quería un poco y yo también. Mi estómago hizo un ruido. Tenía ganas de ofrecerlo y también hambre.",
          "Las mitades estaban ricas. Quería dejárselo y él pensaba lo mismo. La próxima vez quiero preguntar antes de decidir qué quiere."
        ],
        [
          "Dos personas se ofrecen el mismo plato. Sus caras no parecen enfadadas.",
          "Pregunté si querían compartir. Ambas personas querían pan, así que traje dos platos pequeños. Temí una discusión un instante, pero se lo ofrecían mutuamente.",
          "Los dos platos quedaron vacíos. Una pregunta mostró dos dudas distintas. Los movimientos de sus manos no me habían dicho por qué."
        ]
      ],
      "menuContext": "Lo que pasó en el restaurante"
    }
  },
  {
    "id": "door",
    "audience": "child",
    "art": 3,
    "ko": {
      "title": "문 뒤에 숨겨 둔 별",
      "place": "집",
      "subtitle": "종이 별과 작은 환영",
      "roles": [
        "별을 만드는 아이",
        "집에 돌아온 사람",
        "함께 있는 어른"
      ],
      "views": [
        "오늘 아빠가 오기 전에 노란 별을 만들었어. 반갑게 맞아주고 싶었거든. 별 끝이 자꾸 접혀서 속상했어. 문이 열리고 아빠가 종이를 보며 한숨을 쉬었어. 내 별이 싫은 걸까? 나는 별을 등 뒤에 숨겼어.",
        "오늘 집에 들어오니 아침에 치운 탁자에 종이가 흩어져 있었다. 피곤해서 한숨부터 났다. 아이가 손을 등 뒤로 숨겨서 내가 온 게 반갑지 않은가 잠깐 생각했다.",
        "오늘 아이와 별을 만들고 있었다. 아빠가 들어오며 한숨을 쉬자 아이가 별을 숨겼다. 나도 얼른 정리하고 싶었지만, 둘이 무슨 생각을 하는지 먼저 듣고 싶었다."
      ],
      "hints": [
        "별 하나가 자꾸 접힌다. 잘하고 싶은 마음과 무서운 마음이 섞여 있다.",
        "종이 조각 사이에 “어서 와”라고 쓴 카드가 보인다. 테이프가 작은 손에 붙어 있다.",
        "한숨을 쉰 사람의 어깨는 내려가 있고, 아이의 손은 바쁘다. 둘 다 아직 설명하지 않았다."
      ],
      "next": "엄마가 “어떤 마음이 들었어?” 하고 물었어. 나는 별을 보여주며 “아빠를 기쁘게 해주고 싶었어”라고 말했어. 아빠는 피곤해서 한숨이 났다고 했어. 내 선물이 싫었던 건 아니었어.",
      "nextHint": "카드를 숨기던 아이의 손이 앞으로 나온다. 들어주는 사람이 곁에 있다는 걸 알게 된다.",
      "ending": "나는 아빠와 별을 문 옆에 붙였어. 종이는 조금 남아 있었지만 먼저 내 말을 들어줘서 좋았어. 다음에 손이 바빠지면 엄마에게 도와달라고 말해보고 싶어.",
      "minds": [
        "“기쁘게 해주고 싶었어. 잘 안 될 때 도움을 부탁해도 되네.”",
        "“피곤해서 내 마음을 천천히 보지 못했어.”",
        "“아이 마음을 먼저 듣고, 필요한 도움을 함께 찾고 싶었어.”"
      ],
      "diaries": [
        [
          "오늘 아빠가 오기 전에 노란 별을 만들었어. 반갑게 맞아주고 싶었거든. 별 끝이 자꾸 접혀서 속상했어. 문이 열리고 아빠가 종이를 보며 한숨을 쉬었어. 내 별이 싫은 걸까? 나는 별을 등 뒤에 숨겼어.",
          "엄마가 “어떤 마음이 들었어?” 하고 물었어. 나는 별을 보여주며 “아빠를 기쁘게 해주고 싶었어”라고 말했어. 아빠는 피곤해서 한숨이 났다고 했어. 내 선물이 싫었던 건 아니었어.",
          "나는 아빠와 별을 문 옆에 붙였어. 종이는 조금 남아 있었지만 먼저 내 말을 들어줘서 좋았어. 다음에 손이 바빠지면 엄마에게 도와달라고 말해보고 싶어."
        ],
        [
          "오늘 집에 들어오니 아침에 치운 탁자에 종이가 흩어져 있었다. 피곤해서 한숨부터 났다. 아이가 손을 등 뒤로 숨겨서 내가 온 게 반갑지 않은가 잠깐 생각했다.",
          "엄마가 한 사람씩 이야기해보자고 했다. 아이가 환영할 별을 보여주었다. 나는 “피곤해서 한숨이 먼저 나왔어”라고 말했다. 아이 손이 바빴던 이유가 이제 보였다.",
          "문 옆에 별을 함께 붙였다. 나는 정리된 방을 기대했고 아이는 나를 반갑게 맞고 싶었다. 다음에는 숨을 고르고 무엇을 만들고 있는지 물어보고 싶다."
        ],
        [
          "오늘 아이와 별을 만들고 있었다. 아빠가 들어오며 한숨을 쉬자 아이가 별을 숨겼다. 나도 얼른 정리하고 싶었지만, 둘이 무슨 생각을 하는지 먼저 듣고 싶었다.",
          "나는 아이와 돌아온 사람의 말을 차례로 들었다. 아이는 기쁘게 해주고 싶었고 아빠는 피곤했다고 했다. 종이 조각보다 두 사람의 목소리에 먼저 귀를 기울였다.",
          "둘이 별을 붙이는 동안 나는 테이프를 잘라주었다. 바로 정리시키고 싶었던 내 마음도 조금 쉬었다. 무엇이 필요한지 먼저 물어보는 시간을 기억해두고 싶다."
        ]
      ],
      "menuContext": "친구를 맞는 집"
    },
    "en": {
      "title": "The Star Behind the Door",
      "place": "Home",
      "subtitle": "Paper stars and a little welcome",
      "roles": [
        "The child making stars",
        "The person arriving home",
        "The caring adult"
      ],
      "views": [
        "Today I made a yellow star before Dad came home. I wanted to welcome him. Its points kept folding and I felt upset. When he saw the paper, he sighed. Did he dislike my star? I hid it behind my back.",
        "Today I came home to paper on the table I had tidied. I sighed from tiredness. My child hid their hands behind their back. For a moment I wondered if they were not glad I was home.",
        "Today I was making stars with the child. When Dad arrived and sighed, the child hid a star. I wanted to tidy quickly too, but first I wanted to hear their thoughts."
      ],
      "hints": [
        "One star keeps folding. Wanting to do well and feeling scared mix together.",
        "A card saying “Welcome home” lies among the scraps. Tape sticks to a small hand.",
        "One person’s shoulders droop. The child’s hands hurry. Neither has explained yet."
      ],
      "next": "Mom asked how I felt. I showed my star and said I wanted to make Dad happy. Dad said he had sighed because he was tired. It was not because he disliked my gift.",
      "nextHint": "The hidden card comes forward. The child finds someone nearby who will listen.",
      "ending": "I hung the star by the door with Dad. Some paper was still on the floor, but I liked being heard first. Next time I can ask Mom for help when my hands get busy.",
      "minds": [
        "“I wanted a happy surprise. I can ask for help when it is hard.”",
        "“I was too tired to notice my own feelings slowly.”",
        "“I wanted to listen first and find help together.”"
      ],
      "diaries": [
        [
          "Today I made a yellow star before Dad came home. I wanted to welcome him. Its points kept folding and I felt upset. When he saw the paper, he sighed. Did he dislike my star? I hid it behind my back.",
          "Mom asked how I felt. I showed my star and said I wanted to make Dad happy. Dad said he had sighed because he was tired. It was not because he disliked my gift.",
          "I hung the star by the door with Dad. Some paper was still on the floor, but I liked being heard first. Next time I can ask Mom for help when my hands get busy."
        ],
        [
          "Today I came home to paper on the table I had tidied. I sighed from tiredness. My child hid their hands behind their back. For a moment I wondered if they were not glad I was home.",
          "Mom invited us to take turns speaking. The child showed a welcome star. I explained that tiredness had brought out my sigh. Now I could see why those small hands had been busy.",
          "We hung the star together. I had expected a tidy room; my child had hoped to welcome me. Next time I want to pause and ask what they are making."
        ],
        [
          "Today I was making stars with the child. When Dad arrived and sighed, the child hid a star. I wanted to tidy quickly too, but first I wanted to hear their thoughts.",
          "I listened to the child and the returning parent in turn. One wanted to give a happy surprise; the other was tired. I listened to their voices before dealing with the paper.",
          "I cut tape while they hung the star. My urge to tidy right away rested for a moment too. I want to remember to ask what is needed first."
        ]
      ],
      "menuContext": "A moment at home"
    },
    "es": {
      "title": "La estrella detrás de la puerta",
      "place": "Casa",
      "subtitle": "Estrellas de papel y una bienvenida",
      "roles": [
        "La niña que hace estrellas",
        "La persona que llega a casa",
        "La persona adulta que acompaña"
      ],
      "views": [
        "Hoy hice una estrella amarilla antes de que papá volviera. Quería darle la bienvenida. Las puntas se doblaban y me frustré. Al ver los papeles, suspiró. ¿No le gustaba mi estrella? La escondí detrás de mí.",
        "Hoy encontré papeles en la mesa que había ordenado. Suspiré de cansancio. Mi hija escondió las manos detrás de la espalda. Un momento pensé que quizá no le alegraba verme.",
        "Hoy hacía estrellas con la niña. Cuando papá llegó y suspiró, escondió una estrella. También quería ordenar pronto, pero primero quería escuchar sus pensamientos."
      ],
      "hints": [
        "Una estrella se dobla una y otra vez. Se mezclan las ganas de hacerlo bien y el miedo.",
        "Entre los recortes hay una tarjeta que dice “Bienvenido a casa”. Hay cinta en una mano pequeña.",
        "Una persona tiene los hombros caídos; las manos de la niña se apresuran. Nadie ha explicado todavía."
      ],
      "next": "Mamá preguntó cómo me sentía. Mostré la estrella y dije que quería alegrar a papá. Él había suspirado porque estaba cansado, no porque no le gustara mi regalo.",
      "nextHint": "La tarjeta sale de su escondite. La niña descubre que hay alguien que quiere escucharla.",
      "ending": "Colgué la estrella junto a la puerta con papá. Quedaban papeles, pero me gustó que me escucharan primero. La próxima vez puedo pedir ayuda a mamá.",
      "minds": [
        "“Quería dar una sorpresa bonita. Puedo pedir ayuda si algo cuesta.”",
        "“El cansancio no me dejó mirar mis emociones con calma.”",
        "“Quería escuchar primero y buscar ayuda juntos.”"
      ],
      "diaries": [
        [
          "Hoy hice una estrella amarilla antes de que papá volviera. Quería darle la bienvenida. Las puntas se doblaban y me frustré. Al ver los papeles, suspiró. ¿No le gustaba mi estrella? La escondí detrás de mí.",
          "Mamá preguntó cómo me sentía. Mostré la estrella y dije que quería alegrar a papá. Él había suspirado porque estaba cansado, no porque no le gustara mi regalo.",
          "Colgué la estrella junto a la puerta con papá. Quedaban papeles, pero me gustó que me escucharan primero. La próxima vez puedo pedir ayuda a mamá."
        ],
        [
          "Hoy encontré papeles en la mesa que había ordenado. Suspiré de cansancio. Mi hija escondió las manos detrás de la espalda. Un momento pensé que quizá no le alegraba verme.",
          "Mamá nos invitó a hablar por turnos. La niña mostró una estrella de bienvenida. Expliqué que había suspirado por cansancio. Entonces entendí sus manos apresuradas.",
          "Colgamos la estrella juntos. Yo esperaba una habitación ordenada; mi hija quería darme la bienvenida. La próxima vez quiero detenerme y preguntar qué está haciendo."
        ],
        [
          "Hoy hacía estrellas con la niña. Cuando papá llegó y suspiró, escondió una estrella. También quería ordenar pronto, pero primero quería escuchar sus pensamientos.",
          "Escuché por turnos a la niña y a quien volvía. Una quería dar una sorpresa y el otro estaba cansado. Escuché sus voces antes de ocuparme de los papeles.",
          "Corté cinta mientras colgaban la estrella. También descansaron mis ganas de ordenar enseguida. Quiero recordar preguntar primero qué necesitan."
        ]
      ],
      "menuContext": "Lo que pasó en casa"
    }
  },
  {
    "id": "ball",
    "audience": "child",
    "art": 4,
    "ko": {
      "title": "노란 공이 기다려 준 날",
      "place": "놀이터",
      "subtitle": "천천히 가까워지는 시간",
      "roles": [
        "먼저 온 보호자",
        "새로 온 보호자",
        "놀이터 안내자"
      ],
      "views": [
        "새로 온 사람이 멀리 서 있다. 우리와 놀기 싫은 걸까? 나는 공을 쥔 채 조금 서운해졌다.",
        "우리 개가 내 다리 뒤로 숨는다. 낯선 곳이어서 잠시 기다리고 싶다. 상대가 오해할까 봐 말하기가 조심스럽다.",
        "두 보호자가 서로를 보지만 말을 하지 않는다. 개들이 편한 거리를 두고 기다릴 수 있게 돕고 싶다."
      ],
      "hints": [
        "새로 온 개는 보호자 다리 뒤에서 주변을 살핀다. 보호자는 공을 꺼냈다가 넣는다.",
        "개를 재촉하고 싶지는 않다. 내 손도 목줄을 너무 꼭 잡고 있음을 알아차린다.",
        "멀리 있는 사람도 작은 미소로 인사한다. 거리를 두는 것이 싫다는 뜻만은 아닐 수 있다."
      ],
      "next": "안내자가 새로 온 강아지는 시간이 조금 필요하다고 했어. 나는 공을 내밀면 반가울 줄 알았는데, 그 강아지는 잠깐 냄새를 맡고 싶었던 거야. 줄을 조금 뒤로 옮겼어.",
      "nextHint": "노란 공은 아직 바닥에 있다. 함께 놀지 않아도 인사를 나눌 수 있다.",
      "ending": "공은 바닥에 있었고 두 강아지는 각자 냄새를 맡았어. 같이 뛰지 않아도 인사할 수 있었어. 내 즐거운 속도가 모두에게 편한 건 아니구나 싶었어.",
      "minds": [
        "“같이 놀고 싶어서, 거리가 서운하게 느껴졌어요.”",
        "“우리 개가 편해질 때까지 기다리고 싶었어요.”",
        "“안전한 거리를 존중하면서 두 사람의 말을 듣고 싶었어요.”"
      ],
      "diaries": [
        [
          "새로 온 사람이 멀리 서 있다. 우리와 놀기 싫은 걸까? 나는 공을 쥔 채 조금 서운해졌다.",
          "안내자가 새로 온 강아지는 시간이 조금 필요하다고 했어. 나는 공을 내밀면 반가울 줄 알았는데, 그 강아지는 잠깐 냄새를 맡고 싶었던 거야. 줄을 조금 뒤로 옮겼어.",
          "공은 바닥에 있었고 두 강아지는 각자 냄새를 맡았어. 같이 뛰지 않아도 인사할 수 있었어. 내 즐거운 속도가 모두에게 편한 건 아니구나 싶었어."
        ],
        [
          "우리 개가 내 다리 뒤로 숨는다. 낯선 곳이어서 잠시 기다리고 싶다. 상대가 오해할까 봐 말하기가 조심스럽다.",
          "안내자가 편한 거리를 지켜도 된다고 했다. 나는 “우리 강아지가 아직 낯설어해요”라고 말했다. 상대는 한 걸음 뒤로 물러났다. 싫다고 생각할까 걱정했던 마음이 조금 놓였다.",
          "강아지가 공 쪽으로 코를 내밀었다. 나는 서두르지 않고 기다렸다. 같이 놀고 싶은 마음은 있었지만 우리에게 맞는 시간을 지켜도 괜찮았다."
        ],
        [
          "두 보호자가 서로를 보지만 말을 하지 않는다. 개들이 편한 거리를 두고 기다릴 수 있게 돕고 싶다.",
          "나는 새 보호자에게 강아지의 상태를 물었다. 시간이 필요하다는 말을 듣고 거리를 두어도 된다고 했다. 공을 건넨 사람은 반갑게 맞고 싶었던 거였다.",
          "두 보호자가 강아지를 살피며 기다렸다. 나는 같은 공이 한쪽에겐 초대이고 다른 쪽에겐 낯선 자극일 수 있음을 다시 생각했다. 오늘은 조금 천천히 안내했다."
        ]
      ],
      "menuContext": "놀이터에서의 기다림"
    },
    "en": {
      "title": "The Day the Yellow Ball Waited",
      "place": "Playground",
      "subtitle": "Getting closer, slowly",
      "roles": [
        "The first guardian",
        "The new guardian",
        "The park guide"
      ],
      "views": [
        "The new person stands far away. Do they not want to play with us? Holding the ball, I feel a little left out.",
        "My dog hides behind my legs. I want to give them time in this new place. I hesitate to explain, worried about being misunderstood.",
        "Two guardians look at each other without speaking. I want to help them keep a comfortable distance for their dogs."
      ],
      "hints": [
        "The new dog watches from behind a leg. Its guardian takes out a ball, then puts it away.",
        "I do not want to hurry my dog. I notice I am gripping the leash too tightly too.",
        "The person farther away smiles a little. Distance does not always mean dislike."
      ],
      "next": "The guide said the new dog needed time. I had thought offering a ball would be welcoming; the dog wanted to sniff first. I moved our leash back a little.",
      "nextHint": "The yellow ball stays on the ground. They can say hello without playing together.",
      "ending": "The ball stayed on the ground while the dogs sniffed separately. We could greet each other without running together. My excited pace was not comfortable for everyone.",
      "minds": [
        "“I wanted to play, so the distance felt disappointing.”",
        "“I wanted to wait until my dog felt comfortable.”",
        "“I wanted to respect safe space and hear both voices.”"
      ],
      "diaries": [
        [
          "The new person stands far away. Do they not want to play with us? Holding the ball, I feel a little left out.",
          "The guide said the new dog needed time. I had thought offering a ball would be welcoming; the dog wanted to sniff first. I moved our leash back a little.",
          "The ball stayed on the ground while the dogs sniffed separately. We could greet each other without running together. My excited pace was not comfortable for everyone."
        ],
        [
          "My dog hides behind my legs. I want to give them time in this new place. I hesitate to explain, worried about being misunderstood.",
          "The guide said a comfortable distance was fine. I explained that my dog felt unsure. The other guardian stepped back. I felt less worried that they would think I was unfriendly.",
          "My dog reached its nose toward the ball. I waited without rushing. I wanted to join in, but keeping our own pace was all right too."
        ],
        [
          "Two guardians look at each other without speaking. I want to help them keep a comfortable distance for their dogs.",
          "I asked how the new dog was feeling. Hearing that it needed time, I offered space. The person with the ball had wanted to welcome them.",
          "The guardians waited and watched their dogs. I thought again about how the same ball could feel like an invitation or something unfamiliar. Today I guided a little more slowly."
        ]
      ],
      "menuContext": "A moment at the playground"
    },
    "es": {
      "title": "El día que la pelota amarilla esperó",
      "place": "Parque infantil",
      "subtitle": "Acercarse poco a poco",
      "roles": [
        "La persona que llegó primero",
        "La persona recién llegada",
        "La persona que orienta"
      ],
      "views": [
        "La persona nueva está lejos. ¿No quiere jugar con nosotros? Con la pelota en la mano, siento algo de tristeza.",
        "Mi perro se esconde detrás de mis piernas. Quiero darle tiempo en este lugar nuevo. Me cuesta explicarlo por miedo a que no me entiendan.",
        "Dos personas se miran sin hablar. Quiero ayudarles a mantener una distancia cómoda para sus perros."
      ],
      "hints": [
        "El perro nuevo observa detrás de una pierna. Su persona saca una pelota y la guarda.",
        "No quiero apresurar a mi perro. También noto que aprieto demasiado la correa.",
        "La persona que está lejos sonríe. La distancia no siempre significa rechazo."
      ],
      "next": "Quien orientaba dijo que el perro nuevo necesitaba tiempo. Pensé que ofrecer la pelota sería amable; el perro quería olfatear primero. Retrocedí un poco con la correa.",
      "nextHint": "La pelota amarilla sigue en el suelo. Podemos saludarnos sin jugar juntos.",
      "ending": "La pelota quedó en el suelo mientras olfateaban por separado. Podíamos saludarnos sin correr juntos. Mi ritmo entusiasmado no era cómodo para todos.",
      "minds": [
        "“Quería jugar y la distancia me dio pena.”",
        "“Quería esperar a que mi perro se sintiera cómodo.”",
        "“Quería respetar el espacio y escuchar a las dos personas.”"
      ],
      "diaries": [
        [
          "La persona nueva está lejos. ¿No quiere jugar con nosotros? Con la pelota en la mano, siento algo de tristeza.",
          "Quien orientaba dijo que el perro nuevo necesitaba tiempo. Pensé que ofrecer la pelota sería amable; el perro quería olfatear primero. Retrocedí un poco con la correa.",
          "La pelota quedó en el suelo mientras olfateaban por separado. Podíamos saludarnos sin correr juntos. Mi ritmo entusiasmado no era cómodo para todos."
        ],
        [
          "Mi perro se esconde detrás de mis piernas. Quiero darle tiempo en este lugar nuevo. Me cuesta explicarlo por miedo a que no me entiendan.",
          "Podíamos mantener una distancia cómoda. Expliqué que mi perro se sentía inseguro. La otra persona retrocedió. Me preocupó menos que pensara que no quería saludar.",
          "Mi perro acercó la nariz a la pelota. Esperé sin apurarlo. Quería participar, pero también podía respetar nuestro ritmo."
        ],
        [
          "Dos personas se miran sin hablar. Quiero ayudarles a mantener una distancia cómoda para sus perros.",
          "Pregunté cómo estaba el perro nuevo. Necesitaba tiempo y ofrecí espacio. Quien tenía la pelota quería dar una bienvenida.",
          "Esperaron observando a sus perros. Pensé que la misma pelota podía ser una invitación o algo desconocido. Hoy orienté con un poco más de calma."
        ]
      ],
      "menuContext": "Lo que pasó en el parque infantil"
    }
  },
  {
    "id": "stars",
    "audience": "child",
    "art": 5,
    "ko": {
      "title": "삐뚤빼뚤, 우리의 별",
      "place": "학교",
      "subtitle": "아직 보여주지 못한 그림",
      "roles": [
        "모둠 친구",
        "그림을 그리는 친구",
        "선생님"
      ],
      "views": [
        "오늘 친구들과 별 그림을 만들었어. 나는 종이를 자르고 있었는데 친구는 그림을 꼭 잡고 보여주지 않았어. 나만 준비하는 것 같아 속상했어. 친구가 나와 하기 싫은 걸까?",
        "오늘 우리 생각을 다 넣은 그림을 보여주고 싶었어. 별을 고치다 보니 종이가 지우개 부스러기로 가득했어. 친구가 보여달라고 했지만 아직 예쁘지 않아서 숨겼어. 부끄러웠어.",
        "오늘 모둠 그림을 만들던 아이들 사이가 조용해졌다. 한 아이는 종이를 숨겼고 다른 아이는 입술이 뾰로통했다. 시간이 얼마 남지 않아 나도 조급했지만, 각자 무엇을 생각하는지 궁금했다."
      ],
      "hints": [
        "책상에는 지우개 부스러기가 많다. 종이 한쪽에 “우리”라는 글자가 보인다.",
        "별 모양을 여러 번 다시 그렸다. 잘하고 싶은 마음이 도움을 청하기 어렵게 만든다.",
        "그림을 쥔 손가락 끝이 하얗다. 옆 친구는 아직 자기 생각을 물어봐주길 기다린다."
      ],
      "next": "선생님이 무슨 생각을 하고 있었는지 물었어. 나는 “나만 준비하는 것 같아서 속상했어”라고 말했어. 친구는 우리 생각을 다 넣고 싶어서 그림을 고치고 있었대. 지우개 부스러기가 그제야 다르게 보였어.",
      "nextHint": "종이가 두 사람 사이에 펼쳐졌다. 선생님은 대신 그려주지 않고 아이들의 말을 기다린다.",
      "ending": "우리는 별을 함께 붙였어. 나는 내 생각을 말하고 친구에게도 물어봤어. 그림이 아직 완벽하지 않아도 같이 보고 이야기할 수 있었어. 혼자라고 느꼈던 마음이 조금 작아졌어.",
      "minds": [
        "“내가 필요 없는 사람처럼 느껴져서 속상했어.”",
        "“완성하지 않아도 도움을 받을 수 있네.”",
        "“아이들이 자기 목소리를 찾도록 곁에서 듣고 싶었어.”"
      ],
      "diaries": [
        [
          "오늘 친구들과 별 그림을 만들었어. 나는 종이를 자르고 있었는데 친구는 그림을 꼭 잡고 보여주지 않았어. 나만 준비하는 것 같아 속상했어. 친구가 나와 하기 싫은 걸까?",
          "선생님이 무슨 생각을 하고 있었는지 물었어. 나는 “나만 준비하는 것 같아서 속상했어”라고 말했어. 친구는 우리 생각을 다 넣고 싶어서 그림을 고치고 있었대. 지우개 부스러기가 그제야 다르게 보였어.",
          "우리는 별을 함께 붙였어. 나는 내 생각을 말하고 친구에게도 물어봤어. 그림이 아직 완벽하지 않아도 같이 보고 이야기할 수 있었어. 혼자라고 느꼈던 마음이 조금 작아졌어."
        ],
        [
          "오늘 우리 생각을 다 넣은 그림을 보여주고 싶었어. 별을 고치다 보니 종이가 지우개 부스러기로 가득했어. 친구가 보여달라고 했지만 아직 예쁘지 않아서 숨겼어. 부끄러웠어.",
          "선생님이 내 말을 기다려줬어. 나는 “너희 생각을 다 넣고 싶었어. 덜 그린 걸 보여주기 부끄러웠어”라고 말했어. 친구는 혼자 하는 것 같아 속상했다고 했어. 내가 숨긴 종이가 그렇게 보였구나.",
          "그림을 책상 가운데 놓았어. 친구가 별을 붙여줬어. 나는 다 완성한 뒤에야 함께할 수 있는 줄 알았는데, 덜 된 그림도 같이 볼 수 있었어. 다음엔 조금 일찍 보여주고 싶어."
        ],
        [
          "오늘 모둠 그림을 만들던 아이들 사이가 조용해졌다. 한 아이는 종이를 숨겼고 다른 아이는 입술이 뾰로통했다. 시간이 얼마 남지 않아 나도 조급했지만, 각자 무엇을 생각하는지 궁금했다.",
          "나는 누구 탓인지 말하기 전에 각자 생각을 물었다. 한 아이는 혼자라고 느꼈고 다른 아이는 모두의 생각을 넣으려 애쓰고 있었다. 둘이 같은 종이를 보면서도 다른 걱정을 하고 있었다.",
          "아이들이 별을 붙이는 동안 나는 필요한 것을 물었다. 빨리 완성시키고 싶던 내 마음도 알아차렸다. 오늘은 완성보다 아이들이 자기 말을 꺼내는 시간이 기억에 남는다."
        ]
      ],
      "menuContext": "함께 꾸미는 교실"
    },
    "en": {
      "title": "Our Wonderfully Wobbly Stars",
      "place": "School",
      "subtitle": "The picture not yet shared",
      "roles": [
        "The group partner",
        "The drawing partner",
        "The teacher"
      ],
      "views": [
        "Today we made a star picture together. I cut paper, but my friend held their drawing close and would not show it. I felt as if I was preparing alone. Did they not want to work with me?",
        "Today I wanted to show a picture with everyone’s ideas. Changing the stars left eraser crumbs everywhere. My friend asked to see it, but it did not look good enough yet. I hid it because I felt shy.",
        "Today the group became quiet while making a picture. One child hid the paper and another looked upset. With little time left, I felt hurried too, but I wondered what each child was thinking."
      ],
      "hints": [
        "Eraser crumbs cover the desk. The word “we” appears on the paper.",
        "I have redrawn the star many times. Wanting to do well makes it hard to ask for help.",
        "The fingers holding the paper are tight. The other child is waiting to be asked for an idea."
      ],
      "next": "The teacher asked what we had been thinking. I said I felt alone doing the work. My friend had been changing the picture to include all our ideas. Now the eraser crumbs looked different to me.",
      "nextHint": "The paper opens between them. The teacher listens instead of drawing it for them.",
      "ending": "We added stars together. I shared an idea and asked about theirs. We could talk about a picture before it was perfect. My lonely feeling became a little smaller.",
      "minds": [
        "“I felt hurt because I thought I was not needed.”",
        "“I can ask for help before I finish.”",
        "“I wanted to listen while they found their own voices.”"
      ],
      "diaries": [
        [
          "Today we made a star picture together. I cut paper, but my friend held their drawing close and would not show it. I felt as if I was preparing alone. Did they not want to work with me?",
          "The teacher asked what we had been thinking. I said I felt alone doing the work. My friend had been changing the picture to include all our ideas. Now the eraser crumbs looked different to me.",
          "We added stars together. I shared an idea and asked about theirs. We could talk about a picture before it was perfect. My lonely feeling became a little smaller."
        ],
        [
          "Today I wanted to show a picture with everyone’s ideas. Changing the stars left eraser crumbs everywhere. My friend asked to see it, but it did not look good enough yet. I hid it because I felt shy.",
          "The teacher waited for my words. I explained that I wanted to include everyone’s ideas and felt shy showing an unfinished drawing. My friend had felt left alone. So that was how my hidden paper had looked to them.",
          "I put the drawing in the middle of the table. My friend added a star. I had thought I must finish first; we could look at an unfinished picture together. Next time I want to show it sooner."
        ],
        [
          "Today the group became quiet while making a picture. One child hid the paper and another looked upset. With little time left, I felt hurried too, but I wondered what each child was thinking.",
          "Before deciding whose fault it was, I asked each child about their thoughts. One felt alone; the other was trying to include everyone. The same paper held two different worries.",
          "As they added stars, I asked what they needed. I noticed my own wish to finish quickly too. Today I remember their voices more than the finished picture."
        ]
      ],
      "menuContext": "A moment at school"
    },
    "es": {
      "title": "Nuestras estrellas un poquito torcidas",
      "place": "Escuela",
      "subtitle": "El dibujo que aún no mostramos",
      "roles": [
        "La compañera del grupo",
        "El compañero que dibuja",
        "La maestra"
      ],
      "views": [
        "Hoy hicimos un dibujo de estrellas. Yo recortaba, pero mi amiga sujetaba el dibujo sin mostrarlo. Sentí que preparaba todo a solas. ¿No quería trabajar conmigo?",
        "Hoy quería mostrar un dibujo con todas nuestras ideas. Cambié las estrellas y llené la mesa de restos de goma. Mi amigo pidió verlo, pero aún no me parecía bonito. Lo escondí por vergüenza.",
        "Hoy el grupo se quedó callado al dibujar. Una niña escondía el papel y otro niño parecía molesto. Quedaba poco tiempo y yo también tenía prisa, pero quería saber qué pensaba cada cual."
      ],
      "hints": [
        "Hay restos de goma sobre la mesa. En el papel se lee “nosotros”.",
        "He dibujado la estrella muchas veces. Querer hacerlo bien me dificulta pedir ayuda.",
        "Los dedos aprietan el papel. La otra niña espera que le pidan una idea."
      ],
      "next": "La maestra preguntó qué pensábamos. Dije que sentía que trabajaba a solas. Mi amiga cambiaba el dibujo para incluir nuestras ideas. Entonces vi los restos de goma de otra manera.",
      "nextHint": "El papel se abre entre los dos. La maestra escucha en vez de dibujar por ellos.",
      "ending": "Pegamos estrellas juntos. Conté una idea y pregunté por la suya. Podíamos hablar de un dibujo sin que fuera perfecto. Me sentí un poco menos a solas.",
      "minds": [
        "“Me dolía pensar que no me necesitaban.”",
        "“Puedo pedir ayuda antes de terminar.”",
        "“Quería escuchar mientras encontraban su propia voz.”"
      ],
      "diaries": [
        [
          "Hoy hicimos un dibujo de estrellas. Yo recortaba, pero mi amiga sujetaba el dibujo sin mostrarlo. Sentí que preparaba todo a solas. ¿No quería trabajar conmigo?",
          "La maestra preguntó qué pensábamos. Dije que sentía que trabajaba a solas. Mi amiga cambiaba el dibujo para incluir nuestras ideas. Entonces vi los restos de goma de otra manera.",
          "Pegamos estrellas juntos. Conté una idea y pregunté por la suya. Podíamos hablar de un dibujo sin que fuera perfecto. Me sentí un poco menos a solas."
        ],
        [
          "Hoy quería mostrar un dibujo con todas nuestras ideas. Cambié las estrellas y llené la mesa de restos de goma. Mi amigo pidió verlo, pero aún no me parecía bonito. Lo escondí por vergüenza.",
          "La maestra esperó mis palabras. Quería incluir todas las ideas y me daba vergüenza mostrar el dibujo sin terminar. Mi amigo se había sentido solo. Así había visto él mi papel escondido.",
          "Puse el dibujo en medio. Mi amigo pegó una estrella. Creía que debía terminar primero; podíamos verlo juntos sin acabarlo. La próxima vez quiero mostrarlo antes."
        ],
        [
          "Hoy el grupo se quedó callado al dibujar. Una niña escondía el papel y otro niño parecía molesto. Quedaba poco tiempo y yo también tenía prisa, pero quería saber qué pensaba cada cual.",
          "Antes de decidir de quién era la culpa, pregunté qué pensaba cada cual. Una persona se sentía sola y la otra intentaba incluir a todas. El mismo papel guardaba dos preocupaciones.",
          "Pregunté qué necesitaban mientras pegaban estrellas. Noté también mis propias ganas de terminar pronto. Hoy recuerdo sus voces más que el dibujo acabado."
        ]
      ],
      "menuContext": "Lo que pasó en la escuela"
    }
  },
  {
    "id": "twohomes",
    "audience": "adult",
    "art": 0,
    "ko": {
      "title": "식어버린 두 잔의 차",
      "place": "카페",
      "subtitle": "기다림 사이에 놓인 마음",
      "roles": [
        "기다리는 친구",
        "잠시 자리를 비운 친구",
        "카페 주인"
      ],
      "views": [
        "친구는 차를 주문하자마자 밖으로 나갔다. 두 잔의 김이 옅어지는 동안 나는 컵의 손잡이를 만지작거렸다. 오늘은 나와 이야기하고 싶지 않은 걸까?",
        "친구가 창가에서 어깨를 움츠렸다. 나는 잠깐 다녀오겠다고만 말하고 나왔다. 빨리 돌아가고 싶어 발걸음이 바쁘다.",
        "창가 손님이 문을 자꾸 바라본다. 맞은편 의자에는 가방이 그대로 있다. 나는 찬바람이 들어오는 창문을 조금 닫는다."
      ],
      "hints": [
        "친구의 가방은 의자에 남아 있고, 창문 틈에서 바람이 들어온다.",
        "내 휴대전화에는 친구와 나누던 대화가 열린 채다. 나는 친구의 움츠린 어깨를 떠올린다.",
        "나간 손님이 문 앞에서 접은 목도리를 털고 있다."
      ],
      "next": "문이 열리고 친구가 목도리를 들고 들어왔다. 추워 보였다고 했다. 나는 혼자 두고 간 줄 알았는데 친구는 내 어깨를 생각하고 있었다. “조금 서운했어”라고 말하니 친구가 내 말을 들어주었다.",
      "nextHint": "친구는 자기 컵보다 먼저 목도리를 내 쪽으로 밀어놓았다.",
      "ending": "차는 식었지만 이야기는 조금 따뜻해졌다. 나는 같이 있을 시간을 기다렸고 친구는 말없이 챙겨주고 싶었다. 같은 창가에서 우리는 서로 다른 것을 보고 있었다.",
      "minds": [
        "“함께 이야기할 시간을 기다리고 있었어.”",
        "“말보다 먼저 챙겨주고 싶었는데, 내 마음이 보이는 줄 알았어.”",
        "“새 차가 필요하면 물어보려고 했어요. 둘의 이야기를 서두르게 하고 싶지는 않았죠.”"
      ],
      "diaries": [
        [
          "친구는 차를 주문하자마자 밖으로 나갔다. 두 잔의 김이 옅어지는 동안 나는 컵의 손잡이를 만지작거렸다. 오늘은 나와 이야기하고 싶지 않은 걸까?",
          "문이 열리고 친구가 목도리를 들고 들어왔다. 추워 보였다고 했다. 나는 혼자 두고 간 줄 알았는데 친구는 내 어깨를 생각하고 있었다. “조금 서운했어”라고 말하니 친구가 내 말을 들어주었다.",
          "차는 식었지만 이야기는 조금 따뜻해졌다. 나는 같이 있을 시간을 기다렸고 친구는 말없이 챙겨주고 싶었다. 같은 창가에서 우리는 서로 다른 것을 보고 있었다."
        ],
        [
          "친구가 창가에서 어깨를 움츠렸다. 나는 잠깐 다녀오겠다고만 말하고 나왔다. 빨리 돌아가고 싶어 발걸음이 바쁘다.",
          "목도리를 내밀자 친구는 말없이 나가서 서운했다고 했다. 나는 따뜻하게 해주고 싶은 생각에 빠져 기다리는 시간을 잊었다. “다음엔 말하고 다녀올게”라고 했다.",
          "친구 옆에 앉았다. 목도리를 건네는 마음과 곁에 있어주길 바라는 마음이 달랐다. 다정한 뜻만으로 다 전해지는 것은 아니라는 생각이 컵 옆에 남았다."
        ],
        [
          "창가 손님이 문을 자꾸 바라본다. 맞은편 의자에는 가방이 그대로 있다. 나는 찬바람이 들어오는 창문을 조금 닫는다.",
          "손님이 목도리를 들고 돌아왔다. 기다리던 손님은 서운했다고 말했다. 나는 새 차를 준비할까 생각하다가 둘이 이야기를 이어갈 시간을 두었다.",
          "차가 필요하면 알려달라고 했다. 같은 빈 의자를 보며 나는 주문을, 손님은 관계를 생각했다. 작은 카페에서도 마음이 향하는 곳은 제각각이었다."
        ]
      ],
      "menuContext": "친구와 차 한 잔"
    },
    "en": {
      "title": "Two Cups of Cooling Tea",
      "place": "The café",
      "subtitle": "The feelings between moments of waiting",
      "roles": [
        "The waiting friend",
        "The friend who stepped out",
        "The café owner"
      ],
      "views": [
        "My friend stepped outside just after we ordered tea. As the steam faded, I turned my cup by its handle. Did they not want to talk with me today?",
        "My friend hunched their shoulders by the window. I said only that I would be right back. Now I hurry, hoping to return soon.",
        "The guest by the window keeps watching the door. A bag still sits on the opposite chair. I gently close the drafty window."
      ],
      "hints": [
        "Their bag is still on the chair, and cold air slips through the window.",
        "Our conversation is still open on my phone. I remember my friend’s hunched shoulders.",
        "The returning guest brushes off a folded scarf at the door."
      ],
      "next": "My friend returned with a scarf, saying I had looked cold. I had felt left behind; they had been thinking about my shoulders. When I said I felt hurt, they listened.",
      "nextHint": "Before reaching for their own cup, my friend slid the scarf toward me.",
      "ending": "The tea cooled, but our conversation felt warmer. I had wanted time together; my friend had wanted to help quietly. At the same window we had noticed different things.",
      "minds": [
        "“I had been looking forward to our time together.”",
        "“I wanted to care for you before saying anything. I thought you could see what I meant.”",
        "“I was ready to offer fresh tea, without rushing their conversation.”"
      ],
      "diaries": [
        [
          "My friend stepped outside just after we ordered tea. As the steam faded, I turned my cup by its handle. Did they not want to talk with me today?",
          "My friend returned with a scarf, saying I had looked cold. I had felt left behind; they had been thinking about my shoulders. When I said I felt hurt, they listened.",
          "The tea cooled, but our conversation felt warmer. I had wanted time together; my friend had wanted to help quietly. At the same window we had noticed different things."
        ],
        [
          "My friend hunched their shoulders by the window. I said only that I would be right back. Now I hurry, hoping to return soon.",
          "When I offered the scarf, my friend said my unexplained exit had hurt. I had thought so much about warming them that I forgot the wait. I promised to explain next time.",
          "I sat beside my friend. Offering a scarf and wanting company were different kinds of care. Good intentions alone had not told the whole story."
        ],
        [
          "The guest by the window keeps watching the door. A bag still sits on the opposite chair. I gently close the drafty window.",
          "The guest returned with a scarf. The waiting guest shared their hurt. I considered fresh tea, then gave them space to keep talking.",
          "I offered tea if they wanted it. Looking at the same empty chair, I had thought about an order; the guest had thought about a friendship. Our attention had gone to different places."
        ]
      ],
      "menuContext": "A moment over tea with a friend"
    },
    "es": {
      "title": "Dos tazas de té que se enfrían",
      "place": "La cafetería",
      "subtitle": "Sentimientos entre momentos de espera",
      "roles": [
        "La amistad que espera",
        "La amistad que salió un momento",
        "Quien atiende la cafetería"
      ],
      "views": [
        "Mi amistad salió justo después de pedir el té. Mientras el vapor desaparecía, giré la taza por el asa. ¿Hoy no quería conversar conmigo?",
        "Mi amistad encogió los hombros junto a la ventana. Solo dije que volvería pronto. Ahora camino deprisa para regresar.",
        "La persona junto a la ventana mira la puerta. La bolsa sigue en la silla de enfrente. Cierro un poco la ventana por donde entra aire frío."
      ],
      "hints": [
        "Su bolsa sigue en la silla y entra frío por la ventana.",
        "Nuestra conversación sigue abierta en mi teléfono. Recuerdo sus hombros encogidos.",
        "La persona que vuelve sacude una bufanda doblada junto a la puerta."
      ],
      "next": "Mi amiga volvió con una bufanda porque parecía que yo tenía frío. Yo me sentía abandonada; ella pensaba en mis hombros. Escuchó cuando dije que me había dolido.",
      "nextHint": "Antes de coger su taza, acercó la bufanda hacia mí.",
      "ending": "El té se enfrió, pero la conversación se hizo más cálida. Yo quería tiempo juntas y ella quería ayudar en silencio. Junto a la misma ventana habíamos visto cosas distintas.",
      "minds": [
        "“Esperaba con ilusión nuestro rato juntos”.",
        "“Quería cuidarte antes de hablar. Pensé que se entendía mi intención”.",
        "“Podía ofrecer té nuevo sin apresurar su conversación”."
      ],
      "diaries": [
        [
          "Mi amistad salió justo después de pedir el té. Mientras el vapor desaparecía, giré la taza por el asa. ¿Hoy no quería conversar conmigo?",
          "Mi amiga volvió con una bufanda porque parecía que yo tenía frío. Yo me sentía abandonada; ella pensaba en mis hombros. Escuchó cuando dije que me había dolido.",
          "El té se enfrió, pero la conversación se hizo más cálida. Yo quería tiempo juntas y ella quería ayudar en silencio. Junto a la misma ventana habíamos visto cosas distintas."
        ],
        [
          "Mi amistad encogió los hombros junto a la ventana. Solo dije que volvería pronto. Ahora camino deprisa para regresar.",
          "Al ofrecer la bufanda, mi amiga dijo que le dolió que saliera sin explicar. Pensé tanto en abrigarla que olvidé la espera. Prometí avisar la próxima vez.",
          "Me senté a su lado. Dar una bufanda y desear compañía eran formas distintas de cuidar. Las buenas intenciones no habían contado toda la historia."
        ],
        [
          "La persona junto a la ventana mira la puerta. La bolsa sigue en la silla de enfrente. Cierro un poco la ventana por donde entra aire frío.",
          "Volvió con una bufanda. La persona que esperaba contó su tristeza. Pensé en traer té nuevo, pero dejé espacio para que siguieran conversando.",
          "Ofrecí té si lo querían. Ante la misma silla vacía yo pensaba en el pedido y la persona en una amistad. Nuestra atención iba a lugares distintos."
        ]
      ],
      "menuContext": "Una tarde de té con una amistad"
    }
  },
  {
    "id": "page",
    "audience": "adult",
    "art": 1,
    "ko": {
      "title": "조금 늦은 첫걸음",
      "place": "동네 공방",
      "subtitle": "서툰 시작을 함께하는 마음",
      "roles": [
        "처음 온 수강생",
        "옆자리 수강생",
        "공방 선생님"
      ],
      "views": [
        "처음 만든 컵이 한쪽으로 기울었다. 옆 사람이 컵을 보며 웃자 나는 손으로 컵을 가렸다. 내 서툰 모습을 우습게 보는 걸까?",
        "옆자리 컵의 기울어진 손잡이가 내 컵과 꼭 닮았다. 반가워서 웃었는데 그 사람이 컵을 가렸다. 내가 웃은 이유를 말하고 싶다.",
        "두 사람의 작업대에 삐뚤어진 컵이 하나씩 놓여 있다. 한 사람은 손을 숨기고 다른 사람은 말을 망설인다. 나는 의자를 가져와 곁에 앉는다."
      ],
      "hints": [
        "옆 사람은 자기 컵을 버리지 않고 조심스럽게 돌려본다.",
        "내 컵도 한쪽으로 기울었다. 바닥에는 고쳐 붙인 손잡이 자국이 있다.",
        "두 컵의 손잡이가 비슷하게 비뚤어져 있다."
      ],
      "next": "옆 사람이 자기 컵을 보여주었다. 내 컵처럼 손잡이가 기울어져 있었다. “닮아서 웃었어요. 저도 처음이에요.” 나는 긴장했다고 말했다. 그 웃음은 나를 평가하는 웃음이 아니었다.",
      "nextHint": "그 사람은 내 컵을 고치려 하지 않고 자기 컵을 나란히 놓았다.",
      "ending": "두 컵을 나란히 두었다. 내 손은 아직 서툴렀지만 숨기고 싶지는 않았다. 같은 삐뚤어진 모양을 보고 나는 부족함을, 그 사람은 반가움을 떠올렸다는 것이 오래 남았다.",
      "minds": [
        "“못하는 사람으로 보일까 봐 긴장했어요.”",
        "“닮은 컵을 보니 혼자가 아닌 것 같아 반가웠어요.”",
        "“예쁜 컵을 만드는 것만큼, 처음인 마음을 편하게 말했으면 했어요.”"
      ],
      "diaries": [
        [
          "처음 만든 컵이 한쪽으로 기울었다. 옆 사람이 컵을 보며 웃자 나는 손으로 컵을 가렸다. 내 서툰 모습을 우습게 보는 걸까?",
          "옆 사람이 자기 컵을 보여주었다. 내 컵처럼 손잡이가 기울어져 있었다. “닮아서 웃었어요. 저도 처음이에요.” 나는 긴장했다고 말했다. 그 웃음은 나를 평가하는 웃음이 아니었다.",
          "두 컵을 나란히 두었다. 내 손은 아직 서툴렀지만 숨기고 싶지는 않았다. 같은 삐뚤어진 모양을 보고 나는 부족함을, 그 사람은 반가움을 떠올렸다는 것이 오래 남았다."
        ],
        [
          "옆자리 컵의 기울어진 손잡이가 내 컵과 꼭 닮았다. 반가워서 웃었는데 그 사람이 컵을 가렸다. 내가 웃은 이유를 말하고 싶다.",
          "내 컵을 보여주며 닮아서 웃었다고 말했다. 옆 사람은 자기 서툰 모습을 보고 웃는 줄 알았다고 했다. 반가웠던 내 표정이 누군가에게는 다른 뜻으로 보였다.",
          "컵을 나란히 놓고 함께 웃었다. 나는 혼자가 아니라는 기쁨을 먼저 느꼈고 옆 사람은 평가받는 긴장을 느꼈다. 다음에는 웃음 뒤의 말을 조금 빨리 건네고 싶다."
        ],
        [
          "두 사람의 작업대에 삐뚤어진 컵이 하나씩 놓여 있다. 한 사람은 손을 숨기고 다른 사람은 말을 망설인다. 나는 의자를 가져와 곁에 앉는다.",
          "같은 모양의 두 컵을 보고 한 사람은 긴장했고 다른 사람은 반가워했다. 나는 고치는 방법보다 만드는 동안 어떤 마음이었는지 물었다.",
          "컵은 그대로 기울어져 있었다. 오늘은 결과를 잘 만드는 일만큼 서로의 말을 듣는 시간이 중요했다. 나도 서둘러 도와주려던 마음을 잠시 내려놓았다."
        ]
      ],
      "menuContext": "처음 찾아간 공방"
    },
    "en": {
      "title": "A First Step, a Little Later",
      "place": "The neighborhood workshop",
      "subtitle": "Beginning imperfectly, together",
      "roles": [
        "The new participant",
        "The person next to them",
        "The pottery teacher"
      ],
      "views": [
        "My first cup leaned to one side. When the person beside me smiled at it, I covered it with my hands. Were they laughing at how clumsy I was?",
        "The handle on their cup leaned just like mine. I smiled in recognition, but they hid their cup. I want to explain my smile.",
        "Two crooked cups sit on the table. One person hides their hands; the other hesitates to speak. I pull up a chair beside them."
      ],
      "hints": [
        "The person beside me gently turns their own cup instead of throwing it away.",
        "My cup leans too. A mark shows where I reattached the handle.",
        "Both handles bend in much the same way."
      ],
      "next": "My neighbor showed a cup with a handle as crooked as mine. “I smiled because they look alike. It is my first day too.” I admitted being nervous. Their smile had not been judging me.",
      "nextHint": "Instead of fixing my cup, they placed their own beside it.",
      "ending": "We placed the cups together. My hands were still new to this, but I no longer wanted to hide. The same crooked shape had meant inadequacy to me and companionship to them.",
      "minds": [
        "“I worried that everyone would think I was no good at this.”",
        "“Seeing a cup like mine made me feel less alone.”",
        "“I wanted them to feel welcome to talk about being new, as well as making cups.”"
      ],
      "diaries": [
        [
          "My first cup leaned to one side. When the person beside me smiled at it, I covered it with my hands. Were they laughing at how clumsy I was?",
          "My neighbor showed a cup with a handle as crooked as mine. “I smiled because they look alike. It is my first day too.” I admitted being nervous. Their smile had not been judging me.",
          "We placed the cups together. My hands were still new to this, but I no longer wanted to hide. The same crooked shape had meant inadequacy to me and companionship to them."
        ],
        [
          "The handle on their cup leaned just like mine. I smiled in recognition, but they hid their cup. I want to explain my smile.",
          "I showed my cup and explained my smile. My neighbor had thought I was laughing at their clumsiness. My pleased expression had carried another meaning for someone else.",
          "We smiled beside the cups. I had felt glad not to be alone; they had felt judged. Next time I want to put words beside my smile sooner."
        ],
        [
          "Two crooked cups sit on the table. One person hides their hands; the other hesitates to speak. I pull up a chair beside them.",
          "Two similar cups had brought nervousness to one person and recognition to the other. I asked how making them had felt before offering a repair.",
          "The cups still leaned. Listening mattered alongside making things well. I paused my own urge to help quickly."
        ]
      ],
      "menuContext": "A first visit to the workshop"
    },
    "es": {
      "title": "Un primer paso, un poco más tarde",
      "place": "El taller del barrio",
      "subtitle": "Empezar sin perfección, juntos",
      "roles": [
        "La persona que llega por primera vez",
        "La persona de al lado",
        "Quien enseña cerámica"
      ],
      "views": [
        "Mi primera taza se inclinaba hacia un lado. Cuando la persona de al lado sonrió al verla, la tapé con las manos. ¿Se reía de mi torpeza?",
        "El asa de su taza se inclinaba igual que la mía. Sonreí al reconocerlo, pero tapó su taza. Quiero explicar mi sonrisa.",
        "Hay dos tazas torcidas sobre la mesa. Una persona esconde las manos y la otra duda en hablar. Acerco una silla y me siento con ellas."
      ],
      "hints": [
        "La persona de al lado gira su propia taza con cuidado en vez de tirarla.",
        "Mi taza también se inclina. Se ve la marca donde volví a pegar el asa.",
        "Las dos asas están torcidas de una forma parecida."
      ],
      "next": "La persona de al lado mostró un asa tan torcida como la mía. “Sonreí porque se parecen. También es mi primer día”. Dije que estaba nerviosa. Su sonrisa no me juzgaba.",
      "nextHint": "En vez de arreglar mi taza, puso la suya a su lado.",
      "ending": "Pusimos las tazas juntas. Aún aprendía, pero ya no quería esconderme. La misma forma torcida significaba para mí falta de habilidad y para la otra persona compañía.",
      "minds": [
        "“Temía que pensaran que no sabía hacer nada”.",
        "“Una taza como la mía me hizo sentir menos a solas”.",
        "“Quería que pudieran hablar de cómo se siente empezar, además de hacer tazas”."
      ],
      "diaries": [
        [
          "Mi primera taza se inclinaba hacia un lado. Cuando la persona de al lado sonrió al verla, la tapé con las manos. ¿Se reía de mi torpeza?",
          "La persona de al lado mostró un asa tan torcida como la mía. “Sonreí porque se parecen. También es mi primer día”. Dije que estaba nerviosa. Su sonrisa no me juzgaba.",
          "Pusimos las tazas juntas. Aún aprendía, pero ya no quería esconderme. La misma forma torcida significaba para mí falta de habilidad y para la otra persona compañía."
        ],
        [
          "El asa de su taza se inclinaba igual que la mía. Sonreí al reconocerlo, pero tapó su taza. Quiero explicar mi sonrisa.",
          "Mostré mi taza y expliqué mi sonrisa. Pensaba que me reía de su torpeza. Mi alegría había significado otra cosa para alguien más.",
          "Sonreímos junto a las tazas. Yo sentía compañía y la otra persona se sentía juzgada. La próxima vez quiero acompañar antes la sonrisa con palabras."
        ],
        [
          "Hay dos tazas torcidas sobre la mesa. Una persona esconde las manos y la otra duda en hablar. Acerco una silla y me siento con ellas.",
          "Dos tazas parecidas habían provocado nervios en una persona y reconocimiento en la otra. Pregunté cómo se habían sentido antes de ofrecer una reparación.",
          "Las tazas seguían inclinadas. Escuchar importaba tanto como hacerlas bien. Detuve un momento mis propias ganas de ayudar enseguida."
        ]
      ],
      "menuContext": "La primera visita al taller"
    }
  },
  {
    "id": "shop",
    "audience": "adult",
    "art": 2,
    "ko": {
      "title": "불을 켜두는 저녁",
      "place": "집으로 돌아오는 길",
      "subtitle": "말 대신 남겨둔 작은 온기",
      "roles": [
        "집에 돌아온 사람",
        "함께 사는 사람",
        "옆집 이웃"
      ],
      "views": [
        "늦게 돌아온 저녁, 식탁에는 빈 그릇 두 개가 놓여 있었다. 함께 사는 사람은 짧게 “왔어?”라고 말했다. 늦어서 화가 난 걸까? 나는 현관에서 가방 끈을 꼭 잡았다.",
        "오는 길에 사 온 귤을 꺼내려고 했는데 상대의 얼굴이 조용하다. 나를 기다리느라 지친 걸까? 나도 긴 하루를 보내 말을 고를 힘이 적다.",
        "복도에서 둘의 짧은 인사가 들린다. 조금 전 옆집 사람은 “이 불빛이 현관에서도 보일까요?”라며 작은 등을 옮겼다."
      ],
      "hints": [
        "그릇은 하나가 아니라 두 개다. 작은 등도 현관 쪽을 향하고 있다.",
        "귤 봉지 안에는 상대가 좋아하는 작은 귤을 따로 담아두었다.",
        "작은 등은 책상보다 현관을 더 밝히고 있다."
      ],
      "next": "귤 봉지를 꺼내자 상대가 웃었다. 같이 먹으려고 그릇을 꺼내놨다고 했다. 나는 화난 줄 알았다고 말했고, 상대는 지쳤지만 함께 있고 싶었다고 했다. 작은 등은 내가 들어오는 길을 비추고 있었다.",
      "nextHint": "작은 등 아래에 두 사람의 그릇과 귤이 함께 놓였다.",
      "ending": "밥을 데우는 동안 잠시 조용히 앉았다. 나는 반가운 말을, 상대는 함께 먹을 시간을 기다렸다. 조용함 속에 없다고 생각했던 마음이 있었다. 모를 때는 물어볼 자리가 남아 있었다.",
      "minds": [
        "“오늘은 반갑게 맞아주는 말이 듣고 싶었어.”",
        "“길게 말할 힘은 없었지만 함께 먹고 싶었어.”",
        "“그 불빛은 돌아오는 사람을 생각하며 옮긴 거였어요.”"
      ],
      "diaries": [
        [
          "늦게 돌아온 저녁, 식탁에는 빈 그릇 두 개가 놓여 있었다. 함께 사는 사람은 짧게 “왔어?”라고 말했다. 늦어서 화가 난 걸까? 나는 현관에서 가방 끈을 꼭 잡았다.",
          "귤 봉지를 꺼내자 상대가 웃었다. 같이 먹으려고 그릇을 꺼내놨다고 했다. 나는 화난 줄 알았다고 말했고, 상대는 지쳤지만 함께 있고 싶었다고 했다. 작은 등은 내가 들어오는 길을 비추고 있었다.",
          "밥을 데우는 동안 잠시 조용히 앉았다. 나는 반가운 말을, 상대는 함께 먹을 시간을 기다렸다. 조용함 속에 없다고 생각했던 마음이 있었다. 모를 때는 물어볼 자리가 남아 있었다."
        ],
        [
          "오는 길에 사 온 귤을 꺼내려고 했는데 상대의 얼굴이 조용하다. 나를 기다리느라 지친 걸까? 나도 긴 하루를 보내 말을 고를 힘이 적다.",
          "귤 봉지를 보니 내가 좋아하는 작은 귤이었다. 상대는 내 짧은 인사를 화난 말로 들었다고 했다. 나는 지쳐서 말이 적었고 같이 먹으려고 기다렸다고 말했다.",
          "두 그릇을 채우고 나란히 앉았다. 나는 불빛과 그릇으로 마음을 전했고 상대는 목소리를 기다렸다. 다음엔 짧게라도 “와서 반가워”라고 말하고 싶다."
        ],
        [
          "복도에서 둘의 짧은 인사가 들린다. 조금 전 옆집 사람은 “이 불빛이 현관에서도 보일까요?”라며 작은 등을 옮겼다.",
          "작은 등 아래로 두 사람이 식탁에 앉는 모습이 보였다. 나는 아까 불빛이 현관에서 보이는지 물어왔던 말을 떠올렸다. 기다린다는 마음이 그런 질문으로 나올 수도 있었다.",
          "문을 닫고 우리 집으로 돌아왔다. 같은 불빛을 보고 나는 조명의 방향을, 이웃은 돌아오는 사람을 생각했었다. 오늘 저녁에는 나도 인사를 한마디 더 건네고 싶었다."
        ]
      ],
      "menuContext": "등불이 켜진 집"
    },
    "en": {
      "title": "A Light Left On",
      "place": "Coming home",
      "subtitle": "A little warmth left without words",
      "roles": [
        "The person coming home",
        "The person they live with",
        "The neighbor"
      ],
      "views": [
        "I came home late to two empty bowls on the table. “You are back,” my housemate said quietly. Were they angry that I was late? I held my bag strap tightly in the doorway.",
        "I reach for the mandarins I bought on the way, but the other person looks quiet. Are they tired of waiting for me? After a long day, I have few words myself.",
        "I hear a brief greeting from next door. Earlier, my neighbor moved a little lamp and asked, “Can you see this light from the entrance?”"
      ],
      "hints": [
        "There are two bowls, not one. The little lamp faces the entrance.",
        "I put the smaller mandarins they like in a separate part of the bag.",
        "The lamp lights the doorway more than the desk."
      ],
      "next": "When I unpacked the mandarins, my housemate smiled. The bowls were waiting for us to eat together. I admitted thinking they were angry. They were tired but wanted company; the lamp had been lighting my way in.",
      "nextHint": "The two bowls and the mandarins sat together beneath the little lamp.",
      "ending": "We sat quietly while dinner warmed. I had wanted welcoming words; they had wanted a shared meal. A feeling I thought absent had been there in the quiet. There was still room to ask.",
      "minds": [
        "“Today I wanted to hear that someone was glad I was home.”",
        "“I had few words left, but I wanted us to eat together.”",
        "“That light was moved with the returning person in mind.”"
      ],
      "diaries": [
        [
          "I came home late to two empty bowls on the table. “You are back,” my housemate said quietly. Were they angry that I was late? I held my bag strap tightly in the doorway.",
          "When I unpacked the mandarins, my housemate smiled. The bowls were waiting for us to eat together. I admitted thinking they were angry. They were tired but wanted company; the lamp had been lighting my way in.",
          "We sat quietly while dinner warmed. I had wanted welcoming words; they had wanted a shared meal. A feeling I thought absent had been there in the quiet. There was still room to ask."
        ],
        [
          "I reach for the mandarins I bought on the way, but the other person looks quiet. Are they tired of waiting for me? After a long day, I have few words myself.",
          "The bag held the small mandarins I love. My housemate had heard anger in my short greeting. I explained that I was tired and had been waiting to eat together.",
          "I filled two bowls. I had spoken through light and dishes; they had been waiting for my voice. Next time I want to say, even briefly, that I am glad they are home."
        ],
        [
          "I hear a brief greeting from next door. Earlier, my neighbor moved a little lamp and asked, “Can you see this light from the entrance?”",
          "I saw the pair sit beneath the little lamp. I remembered the earlier question about whether its light reached the doorway. Waiting for someone could sound like a question about a lamp.",
          "I went back to my home. The same light had made me think about its direction and my neighbor about someone returning. Tonight I wanted to offer one more greeting too."
        ]
      ],
      "menuContext": "An evening coming home"
    },
    "es": {
      "title": "Una luz encendida al volver",
      "place": "El regreso a casa",
      "subtitle": "Un poco de calidez sin palabras",
      "roles": [
        "La persona que vuelve a casa",
        "La persona con quien vive",
        "La persona vecina"
      ],
      "views": [
        "Llegué tarde y vi dos cuencos vacíos en la mesa. “Ya llegaste”, dijo en voz baja la persona con quien vivo. ¿Estaba enfadada por mi demora? Apreté la correa de la bolsa en la entrada.",
        "Voy a sacar las mandarinas que compré, pero su rostro está callado. ¿Se cansó de esperarme? Después de un día largo, a mí también me quedan pocas palabras.",
        "Oigo un saludo breve desde el piso vecino. Antes, mi vecina movió una lámpara pequeña y preguntó: “¿Se ve esta luz desde la entrada?”."
      ],
      "hints": [
        "Hay dos cuencos, no uno. La lámpara apunta hacia la entrada.",
        "Separé en la bolsa las mandarinas pequeñas que le gustan.",
        "La lámpara ilumina más la entrada que el escritorio."
      ],
      "next": "Al sacar las mandarinas, sonrió. Los cuencos esperaban para comer juntos. Admití que pensé que estaba molesta. Tenía cansancio, pero quería compañía; la lámpara iluminaba mi entrada.",
      "nextHint": "Los dos cuencos y las mandarinas quedaron juntos bajo la lámpara.",
      "ending": "Nos sentamos en silencio mientras se calentaba la cena. Yo quería palabras de bienvenida y ella una comida compartida. Había un sentimiento donde yo pensé que no lo había. Aún podíamos preguntar.",
      "minds": [
        "“Hoy quería escuchar que se alegraban de verme”.",
        "“Me quedaban pocas palabras, pero quería que comiéramos juntos”.",
        "“Movió esa luz pensando en quien volvía a casa”."
      ],
      "diaries": [
        [
          "Llegué tarde y vi dos cuencos vacíos en la mesa. “Ya llegaste”, dijo en voz baja la persona con quien vivo. ¿Estaba enfadada por mi demora? Apreté la correa de la bolsa en la entrada.",
          "Al sacar las mandarinas, sonrió. Los cuencos esperaban para comer juntos. Admití que pensé que estaba molesta. Tenía cansancio, pero quería compañía; la lámpara iluminaba mi entrada.",
          "Nos sentamos en silencio mientras se calentaba la cena. Yo quería palabras de bienvenida y ella una comida compartida. Había un sentimiento donde yo pensé que no lo había. Aún podíamos preguntar."
        ],
        [
          "Voy a sacar las mandarinas que compré, pero su rostro está callado. ¿Se cansó de esperarme? Después de un día largo, a mí también me quedan pocas palabras.",
          "La bolsa traía las mandarinas pequeñas que me gustan. Había oído enfado en mi saludo breve. Expliqué que estaba cansada y esperaba para comer juntos.",
          "Llené dos cuencos. Hablaba con la luz y los platos; él esperaba mi voz. La próxima vez quiero decir, aunque sea brevemente, que me alegra que haya vuelto."
        ],
        [
          "Oigo un saludo breve desde el piso vecino. Antes, mi vecina movió una lámpara pequeña y preguntó: “¿Se ve esta luz desde la entrada?”.",
          "Vi a la pareja sentarse bajo la lámpara. Recordé la pregunta sobre si su luz llegaba a la entrada. Esperar a alguien podía sonar como una pregunta sobre una lámpara.",
          "Volví a mi casa. La misma luz me hacía pensar en su dirección y a mi vecina en alguien que regresaba. Esa noche quise ofrecer también un saludo más."
        ]
      ],
      "menuContext": "Una noche al volver a casa"
    }
  }
];
