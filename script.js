let input = document.querySelector('.inp');
let buttons = document.querySelectorAll('.btn');

const obj = {
    val1: 0,
    val2: 0,
    symbol: '',
    res: 0,
    amboxj: null,
    amboxj2: null
};

buttons.forEach(elm => {
    elm.addEventListener('click', function(){
        if(!isNaN(+elm.innerText)){
            if (input.value == 'error') {
                input.value = elm.innerText;
                input.value = 0;
                obj.val1 = 0;
                obj.val2 = 0;
                obj.symbol = '';
                obj.res = 0;
                obj.amboxj = null;
                obj.amboxj2 = null;               
            }
            if (input.value == 0) {
                input.value = elm.innerText;
                obj['val1'] = input.value;                
            } else {
                if (obj.symbol != '') {
                    if (obj['val2'] == 0) {
                        input.value = elm.innerText;
                        obj['val2'] = input.value;

                    } else {
                        input.value += elm.innerText;
                        obj['val2'] = input.value;

                    }
                } else {
                    input.value += elm.innerText;
                    obj['val1'] = input.value;

                }
            }        
        } else if (elm.innerText == 'AC') {
            input.value = 0;
            obj.val1 = 0;
            obj.val2 = 0;
            obj.symbol = '';
            obj.res = 0;
            obj.amboxj = null;
            obj.amboxj2 = null;
        } else if (input.value == 0 && elm.innerText == 0) {
            input.value = '0'
        } else if (elm.innerText == '+/-' && input.value != 0) {
            if (input.value > 0) {
                input.value = +(input.value - input.value - input.value) 
                obj['val1'] = input.value;
            } else {
                input.value = +input.value - +input.value - +input.value;
                obj['val1'] = input.value;
            }
        } else {
            let sym = elm.innerText;
            if (!obj.amboxj2 && obj.val1 != 0 && obj.val2 != 0) {
                input.value += '.';
                obj.amboxj2 = true
            }
            if(sym == '=') {
                sym = ''
            }
            if (obj.symbol == '' && obj.val1 != 0) {
            switch (elm.innerText) {
                case '%':                                                                                                                                                                                                                                                   
                    obj.symbol = '%';
                    break;
                case '/':
                    obj.symbol = '/'                    
                    break;
                case '*':
                    obj.symbol = '*'                    
                    break;
                case '-':
                    obj.symbol = '-'                    
                    break;
                case '+':
                    obj.symbol = '+'                    
                    break;
                case '=':
                    obj.symbol = sym;
                    break;
                case ',':
                    if ((!obj.amboxj || !(parseFloat(obj.val1) == parseInt(obj.val1)) && obj.val2 != 0)) {
                        input.value += '.';
                        obj.amboxj = true;
                    }
                    if (!obj.amboxj2 && obj.val1 != 0 && obj.val2 != 0) {
                        console.log('hop');
                        input.value += '.';
                        obj.amboxj2 = null
                    }
                    break;
                default:
                    obj.symbol = ''
                    break;
            }       
         } else if (obj.symbol != '' && obj.val1 != 0 && sym != ',') {
                switch (obj.symbol) {
                    case '%':
                        obj.res = obj.val1 % obj.val2;
                        obj.val1 = obj.res;
                        obj.val2 = 0;
                        obj.symbol = sym
                        input.value = obj.res;
                        break;
                    case '/':
                        if (obj.val2 != 0) {
                            obj.res = obj.val1 / obj.val2;
                            obj.val1 = obj.res;
                            obj.val2 = 0;
                            obj.symbol = sym
                            input.value = obj.res;
                        } else {
                            input.value = 'error'
                        }
                        
                        break;
                    case '*':
                        obj.res = obj.val1 * obj.val2;
                        obj.val1 = obj.res;
                        obj.val2 = 0;
                        obj.symbol = sym
                        input.value = obj.res;
                        break;
                    case '-':
                        obj.res = obj.val1 - obj.val2; 
                        obj.val1 = obj.res;
                        obj.val2 = 0;
                        obj.symbol = sym
                        input.value = obj.res; 
                        break;
                    case '+':
                        obj.res = +obj.val1 + +obj.val2;   
                        obj.val1 = obj.res;
                        obj.val2 = 0;
                        obj.symbol = sym
                        input.value = obj.res;   
                        break;
                    case '=':
                        obj.symbol = sym;
                        obj.val1 = obj.res;  
                        obj.val2 = 0;                      
                        input.value = obj.res; 
                        obj.amboxj2 = null
                        break;
                    case ',':
                        if (!obj.amboxj || !(parseFloat(obj.res) == parseInt(obj.res))) {
                            input.value += '.';
                            obj.amboxj = true;
                        }
                        if (!obj.amboxj2) {
                            obj.val2 += '.';
                            input.value += '.';
                            obj.amboxj = null;
                            obj.amboxj2 = null;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        
    })
});