
/**
 * 
 * Creates an array with the same number of dimensions as the number of the parameters with the given amount of elements
 * 
 * @param {...integer} size the sizes of the dimensions as separate arguments
 * @param {Class} classReference optionally this can be an existing class and if it is then every element will be an instance of that class (except for Number, where the elements will be primitive numbers and not objects). If ommitted the values will be undefined 
 * @param {Array|float} instantiationParameters if a classReference was provided, optionally this can be an array of parameters for the class' initalization. If the elements are numbers, this can be a single number instead of an array. [] by default
 */
function createArray() {
    let array;

    if(Number.isInteger(arguments[0])) {
        array = new Array(arguments[0]);
        let i = arguments[0];
        let newArgs = Array.prototype.slice.call(arguments, 1);
        while(i--)
            array[arguments[0]-1 - i] = createArray.apply(null, newArgs);
    } else{
        if(arguments[0] != undefined){
            if(arguments[0].name === 'Number')
                array = arguments[1] != undefined ? Number.parseFloat(arguments[1]) : 0;
            else
                array = Array.isArray(arguments[1]) ? new arguments[0](...arguments[1]) : array = new arguments[0]();
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
 * @param {Object} options if contains addCellID = true, the cells will have and id whicj is their coordinates like [y,x]
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
 * Creates a radio input which can be switched off on click
 * 
 * @param {Object} toAssign An object of properties to assign to the element (note that this assign is shallow)
 */
function createSwitchableRadioInput(toAssign = undefined){
    let radioButton = document.createElement('input');

    radioButton.addEventListener('mousedown', (event) => {
        event.preventDefault();
        event.target.checked = !event.target.checked;
    });
    radioButton.addEventListener('click', preventEvent);
    if(toAssign != undefined)
        Object.assign(radioButton, toAssign);
    
    return radioButton;
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

/**
 * 
 * Wraps a given element into a newly created one
 * 
 * @param {Element} toWrap Node to wrap
 * @param {String} wrapperElement A createable element's name (eg.: div, span...)
 * @returns {Element} The wrapper element
 */
function wrap(toWrap, wrapperElement) {
    let wrapper = document.createElement(wrapperElement);
    if(toWrap.parentNode)
        toWrap.parentNode.insertBefore(wrapper, toWrap);
    wrapper.appendChild(toWrap);
    return wrapper;
}

/**
 * 
 * A simple function to shorten callback when preventing default is the only intent
 * 
 * @param {Event} event 
 */
function preventEvent(event){
    event.preventDefault();
}

/**
 * 
 * A simple function to shorten callback when selecting the input's content is the only intent
 * 
 * @param {Event} event 
 */
function selectInputText(event){
    event.target.setSelectionRange(0, event.target.value.length);
}