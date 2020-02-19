// variables

const input = document.querySelector('.numo input');

const button = document.querySelectorAll('.num-keys');

const equal = document.querySelector(".eq-keys");

const clear = document.querySelector('.op-keys[op=clear]');

const negate = document.querySelector('.op-keys[op=negate]');


// looping tro each button assignin its inner text to the input value
button.forEach((btn) => {
    
    btn.addEventListener('click', () =>{
    input.value = input.value !== "0" ? input.value + btn.innerText : btn.innerText;
    
  }) 
  
})
//  stores tha input value for computation
const buffer =[]


//  call back function called from within extra data attribute
const opCallBack = (opn) => {
    let currentVal = parseFloat(input.value);
    if(opn === "percent"){
        currentVal *= 0.01;
        input.value = currentVal;
    }else{
        if(buffer && buffer.length){
            buffer.push({value: currentVal});

            const result = evaluate(buffer)

            buffer.push({value: result})
            buffer.push({value: opn})

            input.value = "";
        }else{
            buffer.push({value: currentVal});
            buffer.push({value: opn});
            input.value = "";
        }
    }
    
}

// evalute funtion called from within the call back function
const evaluate = buffer => {
    const secondOp = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOP = buffer.pop().value;

    switch(operator){
        case "addition":
           return firstOP + secondOp;
           break;
        case "subtract":
            return firstOP - secondOp;
            break;
        case "multiply":
            return firstOP * secondOp;
            break;
        case "devide": 
            return firstOP / secondOp;
            break;
        default:
            return secondOp;

    }

}


//  loops for the estra data value attached to each opearation key
for( const opn of ['percent', 'devide', 'multiply', 'addition', 'subtract']){
    
    document.querySelector(`.op-keys[op=${opn}] `).addEventListener('click', () => {
        opCallBack(opn)
    })

}

// given functions to the equal key. this also calls bthe evalute function within it
// and set the result to the input value
equal.addEventListener('click', () => {
    if(buffer && buffer.length){
        buffer.push({value: parseFloat(input.value)});

        input.value = evaluate(buffer)
    }
})

// clear button 
clear.addEventListener('click', ()=> {
    input.value = "0";
    buffer.length = 0;
})


// negate button
negate.addEventListener('click', () => {
    const negative = parseFloat(input.value);

    input.value = -negative;
})