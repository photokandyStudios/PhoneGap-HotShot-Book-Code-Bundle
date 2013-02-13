//REQUIRES: quizQuestion.js
/*****************************************************************************
 *
 * PhoneGap HotShot
 * Chapter 1 - Let's Get Local
 * Application Project: Quiz Time
 *
 * Quiz Questions
 *
 *****************************************************************************/


//
// QUESTION 1
//
QQ.addQuestion ( new QQ.Question ( "WHAT_IS_THE_COLOR_OF_THE_SUN?" )
                       .addAnswer( "YELLOW" )
                       .addAnswer( "WHITE" )
                       .addAnswer( "GREEN" )
                       .setCorrectAnswer ( 0 ) );
                       
PKLOC.addTranslation ( "en", "WHAT_IS_THE_COLOR_OF_THE_SUN?", "What is the color of the Sun?" );
PKLOC.addTranslation ( "en", "YELLOW", "Yellow" );
PKLOC.addTranslation ( "en", "WHITE",  "White" );
PKLOC.addTranslation ( "en", "GREEN",  "Green" );

PKLOC.addTranslation ( "es", "WHAT_IS_THE_COLOR_OF_THE_SUN?", "¿Cuál es el color del Sol?" );
PKLOC.addTranslation ( "es", "YELLOW", "Amarillo" );
PKLOC.addTranslation ( "es", "WHITE",  "Blanco" );
PKLOC.addTranslation ( "es", "GREEN",  "Verde" );                        


//
// QUESTION 2
//
QQ.addQuestion ( new QQ.Question ( "WHAT_IS_THE_NAME_OF_THE_FOURTH_PLANET?" )
                       .addAnswer( "MARS" )
                       .addAnswer( "VENUS" )
                       .addAnswer( "MERCURY" )
                       .setCorrectAnswer ( 0 ) );
                       
PKLOC.addTranslation ( "en", "WHAT_IS_THE_NAME_OF_THE_FOURTH_PLANET?", "What is the name of the fourth planet?" );
PKLOC.addTranslation ( "en", "MARS", "Mars" );
PKLOC.addTranslation ( "en", "VENUS", "Venus" );
PKLOC.addTranslation ( "en", "MERCURY", "Mercury" );

PKLOC.addTranslation ( "es", "WHAT_IS_THE_NAME_OF_THE_FOURTH_PLANET?", "¿Cuál es el nombre del cuarto planeta?" );
PKLOC.addTranslation ( "es", "MARS", "Marzo" );
PKLOC.addTranslation ( "es", "VENUS", "Venus" );
PKLOC.addTranslation ( "es", "MERCURY", "Mercurio" );


//
// QUESTION 3
//
QQ.addQuestion ( new QQ.Question ( "WHO_IS_MANS_BEST_FRIEND?" )
                       .addAnswer( "CAT" )
                       .addAnswer( "DOG" )
                       .addAnswer( "FISH" )
                       .setCorrectAnswer ( 1 ) );

PKLOC.addTranslation ( "en", "WHO_IS_MANS_BEST_FRIEND?", "Who is Man's Best Friend?" );
PKLOC.addTranslation ( "en", "CAT", "The Cat" );
PKLOC.addTranslation ( "en", "DOG", "The Dog" );
PKLOC.addTranslation ( "en", "FISH", "Fish" );

PKLOC.addTranslation ( "es", "WHO_IS_MANS_BEST_FRIEND?", "¿Quién es el mejor amigo del hombre?" );
PKLOC.addTranslation ( "es", "CAT", "El Gato" );
PKLOC.addTranslation ( "es", "DOG", "El Perro" );
PKLOC.addTranslation ( "es", "FISH", "La Pesca" );

//
// QUESTION 4
//                     
QQ.addQuestion ( new QQ.Question ( "WHAT_IS_THE_HIGHEST_OFFICE_IN_THE_UNITED_STATES?" )
                       .addAnswer( "SENATOR" )
                       .addAnswer( "CHAIRPERSON" )
                       .addAnswer( "PRESIDENT" )
                       .setCorrectAnswer ( 2 ) );

PKLOC.addTranslation ( "en", "WHAT_IS_THE_HIGHEST_OFFICE_IN_THE_UNITED_STATES?", "What is the highest Office in the United States?" );
PKLOC.addTranslation ( "en", "SENATOR", "Senator" );
PKLOC.addTranslation ( "en", "CHAIRPERSON", "Chairperson" );
PKLOC.addTranslation ( "en", "PRESIDENT", "President" );

PKLOC.addTranslation ( "es", "WHAT_IS_THE_HIGHEST_OFFICE_IN_THE_UNITED_STATES?", "¿Cuál es el cargo más alto en los Estados Unidos?" );
PKLOC.addTranslation ( "es", "SENATOR", "Senador" );
PKLOC.addTranslation ( "es", "CHAIRPERSON", "Chairperson" ); // no actual good translation for this?
PKLOC.addTranslation ( "es", "PRESIDENT", "Prisidente" );


//
// QUESTION 5
//                     
QQ.addQuestion ( new QQ.Question ( "WHY_DID_THE_CHICKEN_CROSS_THE_ROAD?" )
                       .addAnswer( "TO_GET_TO_THE_OTHER_SIDE" )
                       .addAnswer( "BECAUSE_IT_WAS_THERE" )
                       .addAnswer( "SOMETHING_TOLD_IT_TO" )
                       .setCorrectAnswer ( -1 ) );  // all answers equally acceptable

PKLOC.addTranslation ( "en", "WHY_DID_THE_CHICKEN_CROSS_THE_ROAD?", "Why did the chicken cross the road?" );
PKLOC.addTranslation ( "en", "TO_GET_TO_THE_OTHER_SIDE", "To get to the other side." );
PKLOC.addTranslation ( "en", "BECAUSE_IT_WAS_THERE", "Because it was there." );
PKLOC.addTranslation ( "en", "SOMETHING_TOLD_IT_TO", "Something told it to." );

PKLOC.addTranslation ( "es", "WHY_DID_THE_CHICKEN_CROSS_THE_ROAD?", "¿Por qué el pollo cruzó la carretera?" );
PKLOC.addTranslation ( "es", "TO_GET_TO_THE_OTHER_SIDE", "Para llegar a la otra cara." );
PKLOC.addTranslation ( "es", "BECAUSE_IT_WAS_THERE", "Debido a que estaba allí." );
PKLOC.addTranslation ( "es", "SOMETHING_TOLD_IT_TO", "Algo que dijo que." );


//
// QUESTION 6
//                     
QQ.addQuestion ( new QQ.Question ( "WHAT_DO_TEA_AND_COFFEE_HAVE_IN_COMMON?" )
                       .addAnswer( "CAFFEINE" )
                       .addAnswer( "THEY_COME_FROM_THE_SAME_THING" )
                       .addAnswer( "THEY_MAKE_YOU_SLEEPY" )
                       .setCorrectAnswer ( 0 ) );

PKLOC.addTranslation ( "en", "WHAT_DO_TEA_AND_COFFEE_HAVE_IN_COMMON?", "What do 'tea' and 'coffee' have in common?" );
PKLOC.addTranslation ( "en", "CAFFEINE", "Caffeine" );
PKLOC.addTranslation ( "en", "THEY_COME_FROM_THE_SAME_THING", "They come from the same thing." );
PKLOC.addTranslation ( "en", "THEY_MAKE_YOU_SLEEPY", "They make you sleepy." );

PKLOC.addTranslation ( "es", "WHAT_DO_TEA_AND_COFFEE_HAVE_IN_COMMON?", "¿Qué 'té' y el 'café' tienen en común?" );
PKLOC.addTranslation ( "es", "CAFFEINE", "Cafeína" );
PKLOC.addTranslation ( "es", "THEY_COME_FROM_THE_SAME_THING", "Ellos vienen de lo mismo" );
PKLOC.addTranslation ( "es", "THEY_MAKE_YOU_SLEEPY", "Te hacen sueño" );


//
// QUESTION 7
//                     
QQ.addQuestion ( new QQ.Question ( "WHAT_IS_SOLAR_ENERGY?" )
                       .addAnswer( "ENERGY_FROM_THE_SUN" )
                       .addAnswer( "ENERGY_FROM_THE_WIND" )
                       .addAnswer( "ENERGY_FROM_THE_WATER" )
                       .setCorrectAnswer ( 0 ) );
PKLOC.addTranslation ( "en", "WHAT_IS_SOLAR_ENERGY?", "What is Solar Energy?" );
PKLOC.addTranslation ( "en", "ENERGY_FROM_THE_SUN", "Energy from the Sun." );
PKLOC.addTranslation ( "en", "ENERGY_FROM_THE_WIND", "Energy from the wind." );
PKLOC.addTranslation ( "en", "ENERGY_FROM_THE_WATER", "Energy from the water." );

PKLOC.addTranslation ( "es", "WHAT_IS_SOLAR_ENERGY?", "¿Qué es la Energía Solar?" );
PKLOC.addTranslation ( "es", "ENERGY_FROM_THE_SUN", "La energía del Sol." );
PKLOC.addTranslation ( "es", "ENERGY_FROM_THE_WIND", "La energía del viento." );
PKLOC.addTranslation ( "es", "ENERGY_FROM_THE_WATER", "La energía del agua." );


//
// QUESTION 8
//                     
QQ.addQuestion ( new QQ.Question ( "WHAT_DOES_USB_STAND_FOR?" )
                       .addAnswer( "Universal Serial Bus" )
                       .addAnswer( "Universal System Bus" )
                       .setCorrectAnswer ( 0 ) ); // two-answer question

PKLOC.addTranslation ( "en", "WHAT_DOES_USB_STAND_FOR?", "What does USB stand for?" );

PKLOC.addTranslation ( "es", "WHAT_DOES_USB_STAND_FOR?", "¿Qué significa USB?" );


//
// QUESTION 9
//                                            
QQ.addQuestion ( new QQ.Question ( "HOW_MANY_MOONS_DOES_EARTH_HAVE?" )
                       .addAnswer( "NONE" )
                       .addAnswer( "ONE" )
                       .addAnswer( "TWO" )
                       .setCorrectAnswer ( 1 ) );

PKLOC.addTranslation ( "en", "HOW_MANY_MOONS_DOES_EARTH_HAVE?", "How many moons does the Earth have?" );
PKLOC.addTranslation ( "en", "NONE", "None" );
PKLOC.addTranslation ( "en", "ONE", "One" );
PKLOC.addTranslation ( "en", "TWO", "Two" );

PKLOC.addTranslation ( "es", "HOW_MANY_MOONS_DOES_EARTH_HAVE?", "¿Cuántas lunas tiene la Tierra?" );
PKLOC.addTranslation ( "es", "NONE", "Ninguno" );
PKLOC.addTranslation ( "es", "ONE", "Uno" );
PKLOC.addTranslation ( "es", "TWO", "Dos" );


//
// QUESTION 10
//                     
QQ.addQuestion ( new QQ.Question ( "IF_A_TREE_FALLS_IN_THE_FOREST_AND_NO_ONE_IS_AROUND_DOES_IT_STILL_MAKE_A_SOUND?" )
                       .addAnswer( "YES" )
                       .addAnswer( "NO" )
                       .addAnswer( "DONT_KNOW" )
                       .setCorrectAnswer ( -1 ) );

PKLOC.addTranslation ( "en", "IF_A_TREE_FALLS_IN_THE_FOREST_AND_NO_ONE_IS_AROUND_DOES_IT_STILL_MAKE_A_SOUND?", 
                               "If a tree falls in the forest and no one is around, does it still make a sound?" );
PKLOC.addTranslation ( "en", "YES", "Yes" );
PKLOC.addTranslation ( "en", "NO", "No" );
PKLOC.addTranslation ( "en", "DONT_KNOW", "Don't know" );

PKLOC.addTranslation ( "es", "IF_A_TREE_FALLS_IN_THE_FOREST_AND_NO_ONE_IS_AROUND_DOES_IT_STILL_MAKE_A_SOUND?", 
                               "Si un árbol cae en el bosque y no hay nadie alrededor, ¿sigue teniendo un sonido?" );
PKLOC.addTranslation ( "es", "YES", "Sí" );
PKLOC.addTranslation ( "es", "NO", "No" );
PKLOC.addTranslation ( "es", "DONT_KNOW", "No lo sé" );
                       