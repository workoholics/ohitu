'use strict';

/**
 * @ngdoc service
 * @name appOhituApp.fixedLiterals
 * @description
 * # fixedLiterals
 * Service in the appOhituApp.
 */
angular.module('appOhituApp')
  .service('fixedLiterals', function fixedLiterals() {
    
  	return{
  		'eu':
		{
			/*Titles*/
			'challengeList': 'Erronken zerrenda',
			'challengeInner': 'Nire erronka',
			'challengeInnerEnd': 'Nire amaitutako erronka',
			'challengeNewTarget':'Erronka gehitu',
			'challengeNewPer':'Erronka gehitu',
			'challengeNewLength':'Erronka gehitu',
			'challengeNewPromise':'Erronka gehitu',
			'about':'Gure buruz',
			'tips':'Gomendioak',
			'profile':'Nire profila',
			/*Start*/
			'enter': 'Sartu',
			'newUser':'Erabiltzaile berria',
			'userOrEmail':'Erabiltzaile edo email-a',
			'offline':'Ohitu erabiltzeko sarera konektatu egin behar zara. Konprobatu zure konexioa',
			/*Login*/
			'password':'Pasahitza',
			'back':'Atzera',
			'forgotClaim':'Pasahitza ahaztu zaizu?',
			'retry':'Berriz saiatu',
			/*New User*/
			'newUserTitle':'Erabiltzaile berria',
			'email': 'Posta elektronikoa',
			'user': 'Erabiltzailea',
			'rptPassword':'Pasahitza errepikatu',
			'create': 'Sortu',
			/*Forgot*/
			'forgotTitle': 'Pasahitza ahaztu duzu?',
			'forgotSubtitle': 'Baliozko posta elektronikoa bidali ezkero, bertan izango duzu zure pasahitz berria.',
			'send': 'Bidali',
			/*Email sent*/
			'emailSentDesc': 'Email bat bidali dizugu zure pasahitz berriarekin. Ez baduzu aurkitzen begira ezazu spam direktorioan.',
			'return': 'Bueltatu',
			/*Challenge list*/
			'chListSubtitle':'Gaurko erronka bete duzu?',
			'chListCheck':'Markatu eta jarraitu.',
			'chListLastTitle':'Zure azkenaldiko abentura',
			'weekSuccess':'Ederki, aste honetan helburua bete duzu!',
			'progressPre':'Erronkaren %',
			'progressPost':' bete duzu.',
			'otherChallengesTitle':'Zure erronka aktiboen artean',
			'otherChallengesEmpty':'Ez daukazu erronka gehiagorik',
			'endedChallengesTitle':'Bukaturiko erronkak',
			'renewChallenge':'Erronka berritu',
			'finishedChallengesEmpty':'Ez daukazu bukaturiko erronkarik',
			'challengesEmpty':'Ez daukazu erronkarik',
			/*Challenge inner*/
			'weeksLeft':'Aste honetan falta zaizkizu: ',
			'creationDate':'Sortze data: ',
			'finishDate':'Bukatze epea: ',
			'triesDone':'Egindako errepikapenak: ',
			'deleteChallenge':'Erronka ezabatu',
			/*Challenge modal*/
			'deleteChallengeConfirm':'Zihur zaude erronka ezabatu nahi duzula?',
			'yes':'Bai',
			'no':'Ez',
			/*New challenge target*/
			'challengeTargetSubtitle': 'Zer lortu nahi duzu?',
			'chooseOther':'Beste bat aukeratu: ',
			'next':'Hurrengoa',
			'writeHere':'Idatzi hemen',
			/*New challenge periodicity*/
			'challengePerSubtitle':'Zer maiztasunarekin?',
			/*New challenge time length*/
			'challengeLengthSubtitle':'Noiz arte?',
			/*New challenge time promise*/
			'challengePromiseSubtitle':'Nori zin egiten diozu?',
			'save':'Gorde',
			/*Profile*/
			'profileSubtitle':'Zure datu pertsonalak',
			'changePassword':'Nire pasahitza aldatu nahi dut',
			'logout': 'Saioa itxi',
			'deleteUser':'Erabiltzailea ezabatu',
			'confirmDeleteUser':'Zihur zaude erabiltzailea ezabatu nahi duzula?',
			/*Change password*/
			'changePasswordLabel':'Idatzi pasahitz berria',
			'changePasswordLabelRpt':'Errepikatu pasahitza',
			'emailLabel': 'Zure email berria',
			/*About*/
			'p1':'Aldatu zure ohiturak eta superhuman bat bilakatu!',
			'p2':'Ohitu animatu egiten zaitu baikortasunarekin, helburua lor dezazun.',
			'p3':'Aukeratu 20 erronka baino gehiagoren artetik bat edo zeure gustuko erronka sortu.',
			'tip1':'Eskailerak igo.',
			'tip2':'Hizkuntzak ikasi.',
			'tip3':'Ura edan...',
			'inst_title':'HORRELA ERABILTZEN DA OHITU',
			'inst1':'Aukeratu zure erronka',
			'inst1_1':'Sortu erronka pertsonala edo aukera ezazu aplikazioa eskaintzen dizun 20 ohitura baino gehiagoren artean, adibidez, eskailerak igo, ez erre, ur gehiago edan, irakurri, hizkuntza berria ikasi...  ',	
			'inst1_2':'Helburu bat baino gehiago izan ahal duzu, zuk aukeratu!',
			'inst1_3':'Ohitu, helmuga bistaratu eta helburua burutik ez galtzera laguntzen zaitu.',
			'inst2_title':'Aukera ezazu erronkaren maiztasun eta luzeera.',
			'inst2_1':'Dagoeneko badaukazu helmuga markatuta, aukera ezazu maiztasuna eta helburua betetzeko izango duzun denbora. Eguneko ohitura betetzean, marka ezazu. Konturatu barik azkeneko helburua lortuko duzu.',
			'inst3_title':'Zin egin ezazu nahi duzun pertsonari.',
			'inst3_1':'Zure kirikiñoari, bikoteari, amari edo zure buruari. Zin egin eta bete!',
			'inst3_2':'Abentura hasteko momentua heldu da. Bakarrik 21 egun behar dira Superhuman bat bihurtzeko.',
			'worko1':'Worköholicsen gozatu dugu Ohitu sortzen. Primerakoa izango litzateke idaztea hello@workoholics.es helbidera, erronkak betetzeko trukuak proposatzeko eta erabiltzaile guztien artean elkarbanatzeko.',
			/*Menu*/
			'menuChallengeList':'Erronken zerrenda',
			'menuChallengeNew':'Erronka gehitu',
			'menuAbout':'Gure buruz',
			'menuTips':'Gomendioak',
			'menuProfile':'Nire profila',
			'menuLogout':'Saioa itxi',

			/*Semana*/
			'day1': 'Astelehena',
			'day2': 'Asteartea',
			'day3': 'Asteazkena',
			'day4': 'Osteguna',
			'day5': 'Ostirala',
			'day6': 'Larunbata',
			'day7': 'Igandea',
			'startDayLabel': 'Sortze eguna: ',

			/*First use slider*/
			'firstUse1':'Abentura handi bat hastear zaude.',
			'firstUse2':'Zure erronka aukeratu.',
			'firstUse2_1':'Hobeto elikatu? Zure gorputzari mugimendua eman?',
			'firstUse3':'Euki helburua zure buruan.',
			'firstUse3_1':'Bakarrik 21 egun behar dira Superhuman bat bihurtzeko.',
			'firstUse4':'Motibazioa mantendu.',
			'firstUse4_1':'Nori zin egiten diozu erronka?',
			'start': 'Hasi',

		},
		'es':
		{
			/*Titles*/
			'challengeList': 'Listado de retos',
			'challengeInner': 'Nire erronka',
			'challengeInnerEnd': 'Mi reto finalizado',
			'challengeNewTarget':'Añadir reto',
			'challengeNewPer':'Añadir reto',
			'challengeNewLength':'Añadir reto',
			'challengeNewPromise':'Añadir reto',
			'tips':'Consejos',
			'profile':'Perfil',
			'about':'Sobre nosotros',
			/*Start*/
			'enter': 'Entrar',
			'newUser':'Nuevo usuario',
			'userOrEmail':'Usuario o email',
			/*Login*/
			'password':'Contraseña',
			'back':'Atras',
			'forgotClaim':'¿Se te ha olvidado la contraseña?',
			'offline':'Para utilizar Ohitu necesitas estar conectado a la red. Comprueba tu conexión',
			'retry':'Volver a intentar',
			/*New User*/
			'newUserTitle':'Nuevo usuario',
			'email':'Email',
			'user':'Usuario',
			'rptPassword':'Repite la contraseña',
			'create': 'Crear',
			/*Forgot*/
			'forgotTitle': '¿Has olvidado tu contraseña?',
			'forgotSubtitle': 'Introduciendo un mail válido te enviaremos una nueva contraseña.',
			'send': 'Enviar',
			/* Email sent*/
			'emailSentDesc': 'Te hemos enviado un mail con tu nueva contraseña. En caso de no encontrarlo en tu bandeja de entrada, comprueba el spam.',
			'return': 'Volver',
			/*Challenge list*/
			'chListSubtitle':'¿Has cumplido el reto de hoy?',
			'chListCheck':'Márcalo en el checkbox y sigue adelante.',
			'chListLastTitle':'Tu última aventura',
			'weekSuccess':'¡Genial, esta semana ya has cumplido!',
			'progressPre':'Has completado el ',
			'progressPost':'% de las veces.',
			'otherChallengesTitle':'Entre tus retos activos',
			'otherChallengesEmpty':'No tienes más retos activos',
			'endedChallengesTitle':'Retos terminados',
			'renewChallenge':'Renovar reto',
			'finishedChallengesEmpty':'No tienes retos terminados',
			'challengesEmpty':'No tienes retos',
			/*Challenge inner*/
			'weeksLeft':'Esta semana te faltan: ',
			'creationDate':'Fecha de creación: ',
			'finishDate':'Fecha fin: ',
			'triesDone':'Repeticiones realizadas: ',
			'deleteChallenge':'Borrar reto',
			/*Challenges modal*/
			'deleteChallengeConfirm':'¿Estas seguro de que quieres borrar el reto?',
			'yes':'Si',
			'no':'No',
			/*New challenge target*/
			'challengeTargetSubtitle': '¿Que quieres conseguir?',
			'chooseOther':'Elegir personalizado: ',
			'next':'Siguiente',
			'writeHere':'Escribe aquí',
			/*New challenge periodicity*/
			'challengePerSubtitle':'¿Con cuanta frecuencia?',
			/*New challenge time length*/
			'challengeLengthSubtitle':'¿Hasta cuando?',
			/*New challenge time promise*/
			'challengePromiseSubtitle':'¿Nori zin egiten diozu?',
			'save':'Guardar',
			/*Profile*/
			'profileSubtitle':'Tus datos personales',
			'changePassword':'Quiero cambiar mi contraseña',
			'logout': 'Cerrar sesión',
			'deleteUser':'Borrar usuario',
			'confirmDeleteUser':'¿Estas seguro que quieres borrar el usuario?',
			/*Change password*/
			'changePasswordLabel':'Introduze tu nueva contraseña',
			'changePasswordLabelRpt':'Repite la contraseña',
			'emailLabel': 'Tu nuevo email',
			/*About*/
			'p1':'¡Cambia tus hábitos y conviértete en un Superhuman!',
			'p2':'Ohitu te anima a conseguirlo con optimismo.',
			'p3':'Escoge entre más de 20 retos diferentes, o crea el tuyo propio.',
			'tip1':'Sube escaleras.',
			'tip2':'Aprende idiomas.',
			'tip3':'Bebe agua...',
			'inst_title':'HORRELA ERABILTZEN DA OHITU',
			'inst1':'Elige tu meta, visualiza tu objetivo',
			'inst1_1':'Crea tu propio objetivo o escoge entre los mas de 20 propósitos a cumplir que la app te ofrece, entre los que se encuentra subir las escaleras, no fumar, beber más agua, leer, aprender un idioma...',
			'inst1_2':'Puedes marcarte uno o varios objetivos ¡tú eliges!',
			'inst1_3':'Ohitu te ayuda a visualizar la meta y no perder de tu mente los objetivos.',
			'inst2_title':'Escoge la frecuencia y duración del reto.',
			'inst2_1':'Ya tienes tu meta marcad, escoge la frecuencia con la que vayas a cumplirla y hasta cuando quieres continuar haciendo el reto. Cuando hayas cumplido el reto, marca tu checkpoint y guarda el registro en la app. Sin darte cuenta conseguirás el objetivo final.',
			'inst3_title':'Prométeselo a quien quieras.',
			'inst3_1':'A tu erizo, a tu pareja, a tu madre o a ti mismo. ¡Promételo y cumple!',
			'inst3_2':'A un toque de comenzar una nueva aventura. Sólo hacen falta 21 días para convertirte en un héroe.',
			'worko1':'En Worköholics hemos disfrutado creando Ohitu. Sería genial que nos escribieras a hello@workoholics.es para aportar tus trucos para conseguir retos y compartirlos con todos los usuarios.',
			/*Menu*/
			'menuChallengeList':'Listado de retos',
			'menuChallengeNew':'Añadir reto',
			'menuAbout':'Sobre nosotros',
			'menuTips':'Consejos',
			'menuProfile':'Perfil',
			'menuLogout':'Cerrar sesión',
			/*Semana*/
			'day1': 'Lunes',
			'day2': 'Martes',
			'day3': 'Miércoles',
			'day4': 'Jueves',
			'day5': 'Viernes',
			'day6': 'Sábado',
			'day7': 'Domingo',
			'startDayLabel': 'Día de creación',

			/*First use slider*/
			'firstUse1':'Estas a punto de empezar una gran aventura.',
			'firstUse2':'Escoge tu reto.',
			'firstUse2_1':'Alimentarte mejor? Darle un poco de movimiento al cuerpo?',
			'firstUse3':'Ten el objetivo en tu cabeza.',
			'firstUse3_1':'Solo hacen falta 21 días para convertirte en un superhuman.',
			'firstUse4':'Mantén la motivación.',
			'firstUse4_1':'A quién se lo prometes?',
			'start': 'Empezar',
		}
		
  	};


  });
