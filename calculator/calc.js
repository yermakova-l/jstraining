var Calc = {
    cashedDom: function(){
       this.resultField = document.getElementById("resultfld"); 
       this.calcButtonField = document.getElementById("calc");
    },
    
    settings: function(){
        this.input = '';
        this.result = 0;
        this.firstArg = 0;
        this.secondArg = '';
        this.firstOperator = '';
        this.argCount = 0;
        this.temp = '';
        this.isLastDigit = false;
        this.isLastOperator = false;
        
    },
    
    bindEvents: function(){
        this.calcButtonField.addEventListener('click', this.eventFilter.bind(this), false);
    },
    
    init: function(){
          this.cashedDom();
          this.settings();
          this.bindEvents();
    },
    
    eventFilter: function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        this.input = target.textContent || target.innerText;
        this.inputAnalizer();
    },
    
    inputAnalizer: function(){
       
        switch(this.input){
            
            case 'CL': this.settings(); this.renderResult(); break;
            
            case '+': case '-': case '*': case '/':
                if(this.isLastDigit && this.argCount == 0){
                    this.firstOperator = this.input;
                    this.firstArg = parseFloat(this.temp);
                    this.temp = '';
                    this.argCount = 1;
                    this.isLastDigit = false;
                    this.isLastOperator = true;
                }else if(this.isLastDigit && this.argCount == 1){
                    this.secondArg = parseFloat(this.temp);
                    this.temp = '';
                    
                    this.calculate(this.firstArg, this.firstOperator,this.secondArg);
                    
                    this.firstOperator = this.input;
                    this.firstArg = this.result;
                    this.isLastDigit = false;
                    this.isLastOperator = true;
                    this.argCount = 2;
                    this.renderResult();
                }else if(this.isLastDigit && this.argCount == 2){
                    this.secondArg = parseFloat(this.temp);
                    this.temp = '';
                    
                    this.calculate(this.firstArg, this.firstOperator,this.secondArg);
                    
                    this.firstOperator = this.input;
                    this.firstArg = this.result;
                    this.isLastDigit = false;
                    this.isLastOperator = true;
                    this.renderResult();
                }
                break;

            case '0':case '1':case '2':case '3':case '4':
            case '5':case '6':case '7':case '8':case '9':case '.':
                
                if(!this.isLastDigit && !this.isLastOperator && this.argCount == 0){
                    this.temp = this.input;
                    this.isLastDigit = true;
                    //this.result = parseFloat(this.temp);
                    this.renderArgument();
                    
                }else if(this.isLastDigit && !this.isLastOperator && this.argCount == 0){
                    
                    this.temp += this.input;
                    //this.result = parseFloat(this.temp);
                    this.isLastDigit = true;
                    this.renderArgument();
                
                }else if(this.isLastOperator && this.argCount == 1){
                    this.temp += this.input;
                    this.isLastDigit = true;
                   // this.isLastOperator = false;
                    this.renderArgument();
                }else if(this.isLastOperator && this.argCount == 2){
                    this.temp += this.input;
                    this.isLastDigit = true;
                   // this.isLastOperator = false;
                    this.renderArgument();
                }
                break;

        }
    },
    
    renderResult: function () {
        this.resultField.innerHTML= this.result;
    },
    
    renderArgument: function () {
        this.resultField.innerHTML= this.temp;
    },
    
    calculate: function( arg1, oper, arg2){
        
        switch(oper){
            
            case '+':
                this.result =  arg1 + arg2;
                break;
                
            case '-':
                this.result =  arg1 - arg2;
                break;
                
            case '*':
               this.result =  arg1 * arg2;
                break;
                
            case '/':
                if(this.arg2 !== 0 )
                    this.result = arg1 / arg2;
                
                break;
            
            
            
            
        }
        
    }
};

Calc.init();

