
/**
 * 
 * Creates an array with the same number of dimensions as the number of the parameters with the given amount of elements
 * 
 * @param {...integer} size the sizes of the dimensions as separate arguments
 * @param {Class} lastArgument optionally this can be an existing class and if it is then every element will be created with this class's 0 parameter constructor
 */
function createArray() {
    let array;
    let typeGiven = arguments[arguments.length-1] != undefined && ! Number.isInteger( arguments[arguments.length-1] );

    if(arguments.length > typeGiven ? 1 : 0) {
        array = new Array(arguments[0]);
        let i = arguments[0];
        let newArgs = Array.prototype.slice.call(arguments, 1);
        while(i--)
            array[arguments[0]-1 - i] = createArray.apply(null, newArgs);
    } else{
        if(typeGiven){
            if(arguments[0].name === 'Number')
                array = 0;
            else
                array = new arguments[0]();
        }
    }
    
    return array;
}

/**
 * 
 * Delays an async code with the given amount of milliseconds
 * 
 * @param {integer} milliseconds Length of the delay in milliseconds
 */
function waitForMilliseconds(milliseconds){
    return new Promise(resolve =>{
        setTimeout(() =>{
            resolve();
        }, milliseconds);
    });
}

/**
 * 
 * Calls a given function after a precise number of "eventComplete()" call
 * 
 */
class CallFunctionOnMultipleEvents {
    
    /**
     * 
     * Creates a caller object
     * 
     * @param {*} numberOfEvents 
     * @param {*} functionToCall 
     */
    constructor(numberOfEvents, functionToCall){
        this.numberOfEvents = numberOfEvents;
        this.functionToCall = functionToCall;
    }

    /**
     * 
     * Function to call on every completed event
     * 
     */
    eventComplete(){
        this.numberOfEvents--;
        if(this.numberOfEvents <= 0){
            this.functionToCall();
        }
    }

}

/**
 * 
 * Creates a table with the specified number of rows and columns
 * 
 * @param {integer} xCellNum 
 * @param {integer} yCellNum 
 * @param {Object} options optional, if contains addCellID = true, the cells will have and id whicj is their coordinates like [y,x]
 */
function createTable(rowNum, colNum, options = {}){

    let table = document.createElement('table');

    for(let y = 0; y < rowNum; y++){

        let row = document.createElement('tr');
        
        for(let x = 0; x < colNum; x++){
            let cell = document.createElement('td');

            if(options.addCellID)
                cell.id = JSON.stringify({x:x, y:y});
            
            if(options.toAssign){
                Object.assign(cell, options.toAssign);
            }
            
            row.appendChild(cell);
        }
        
        table.appendChild(row);

    }

    return table;

}

/**
 * 
 * Works like the "%" operator, but the result is always positive
 * 
 * @param {integer} num The number
 * @param {integer} mod The modulo
 */
function mathMod(num, mod){
    return ((num % mod) + mod) % mod;
}

/**
 * 
 * Returns if arg can be a proper number (not NaN) with parseFloat
 * 
 * @param {*} arg 
 */
function isNumber(arg){
    return !isNaN(parseFloat(arg)) && !Array.isArray(arg);
}

/**
 * 
 * Returns the "thing"'s Number value.
 * In case it were NaN it will be 0 instead
 * 
 * @param {*} thing 
 */
function convertToNumber(thing){
    return isNumber(thing) ? parseFloat(thing) : 0;
    whole
}

/**
 * 
 * Returns a random whole number with the given parameters
 * 
 * @param {*} possResNum Number.MAX_SAFE_INTEGER by default. The number of possible result values. In case of wholeNum(3), the possible outcomes are 0,1,2. Shouldn't be higher then the default value
 * @param {*} minVal 0 by default. The lowest possible value. In case of wholeNum(3, 2), the possible outcomes are 2,3,4. 
 */
function wholeRand(possResNum = Number.MAX_SAFE_INTEGER, minVal = 0){
	return Math.floor( (Math.random() * possResNum) + minVal );
}

/**
 * 
 * Makes a node visible by setting it's inline display to ""
 * 
 * @param {Node} node 
 */
function nodeOn(node){
    node.style.display = "";
}

/**
 * 
 * Makes a node invisible by setting it's inline display to "none"
 * 
 * @param {Node} node 
 */
function nodeOff(node){
    node.style.display = "none";
}

/**
 * 
 * Sets a node's visibility by setting it's inline display between "" and "none"
 * 
 * @param {Node} node 
 */
function nodeOnOff(node){
    node.style.display == "none" ? nodeOn(node) : nodeOff(node);
}