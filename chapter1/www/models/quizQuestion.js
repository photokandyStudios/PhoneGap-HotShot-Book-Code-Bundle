/*****************************************************************************
 *
 * PhoneGap HotShot
 * Chapter 1 - Let's Get Local
 * Application Project: Quiz Time
 *
 * Quiz Question Object and Model
 *
 *****************************************************************************/

var QQ = QQ || {};    // set up our namespace

/**
 *
 * The question object constructor. Returns an object with theQuestion set.
 * Returns the object.
 *
 * @param theQuestion    the Question to ask
 *
 */ 
QQ.Question = function ( theQuestion )
{
    // so we can always get back to ourselves
    var self = this;
    
    // assign the question
    self.question = theQuestion;
    
    // create our answers, initially a blank array
    self.answers = Array();
    
    // the correct answer; by default all answers are considered correct
    self.correctAnswer = -1; // index into the answers array
    
    /**
     *
     * Tests to see if theAnswerGiven matches the correctAnswer.
     * If the correctAnswer is -1, all given answers are considered
     * correct.
     *
     * @param theAnswerGiven      The answer given by the user
     *      
     */
    self.testAnswer = function( theAnswerGiven )
    {
        if ((theAnswerGiven == self.correctAnswer) || (self.correctAnswer == -1))
        {
            return true;
        }    
        else
        {
            return false;
        }
    }
    
    /**
     *
     * Returns the answer at the given index.
     *
     * @param theIndex    Index of question, zero based
     *
     */
    self.answerAtIndex = function ( theIndex )
    {
        return self.answers[ theIndex ];
    }
    
    /**
     *
     * Returns the nuber of answers
     *
     */
    self.answerCount = function ()
    {
        return self.answers.length;
    }
    
    /**
     *
     * Adds the specified answer to the question. The answer goes
     * on the end of the answers array.
     *
     * @param theAnswer    The answer to add
     *
     * @returns self (permits daisy-chain)
     */
    self.addAnswer = function( theAnswer )
    {
        self.answers.push ( theAnswer );
        return self;
    }
    
    /**
     *
     * Returns an array with the answer order randomized
     *
     * @return array
     *
     */
     
    self.getRandomizedAnswers = function ()
    {
        var randomizedArray = Array();
        var theRandomNumber;
        var theNumberExists;
        
        // go through each item in the answers array
        for (var i=0; i<self.answers.length; i++)
        {
        
            // always do this at least once
            do 
            {
                // generate a random number less than the count of answers
                theRandomNumber = Math.floor ( Math.random() * self.answers.length );
                theNumberExists = false;
                
                // check to see if it is already in the array
                for (var j=0; j<randomizedArray.length; j++)
                {
                    if ( randomizedArray[j] == theRandomNumber )
                    {
                        theNumberExists = true;
                    }
                }
                
                // If it exists, we repeat the loop.
            } while ( theNumberExists );
            
            // We have a random number that is unique in the array; 
            // add it to it.
            randomizedArray.push ( theRandomNumber );
        }
        
        return randomizedArray;
    }
    
    /**
     *
     * Sets the correct answer to the specified index.
     *
     * @param theIndex    The correct answer, zero based
     *
     */
    self.setCorrectAnswer = function ( theIndex )
    {
        self.correctAnswer = theIndex;
        return self;
    }
    
    /**
     *
     * Returns the correct answer
     *
     * @return the correct answer
     *
     */
    self.getCorrectAnswer = function ()
    {
        return self.correctAnswer;
    }
    
    /**
     *
     * Returns the Question
     *
     * @return question
     *
     */
    self.getQuestion = function()
    {
        return self.question;
    }
}

QQ.questions = Array();

/**
 *
 * Adds the question to the questions array
 *
 */
QQ.addQuestion = function (theQuestion)
{
    QQ.questions.push ( theQuestion );
}

/**
 *
 * Returns the number of questions
 *
 */
QQ.count = function ()
{
    return QQ.questions.length;
}

/**
 *
 * Returns a random question.
 *
 */
QQ.getRandomQuestion = function ()
{
    var theQuestion = Math.floor (Math.random() * QQ.count());
    return QQ.questions[theQuestion];
}
