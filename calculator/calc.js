var Calc = {
    cashedDom: function(){
       this.resultField = document.getElementById("resultfld"); 
       this.calcButtonField = document.getElementById("calc");
    },
    
    settings: function(){
        this.input = '';
        this.result = 0;
        this.arg = '';
        this.isLastDigit = false;
        
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
            
            case '+':
                if(this.isLastDigit){
                    this.result += parseFloat(this.arg);
                    this.isLastDigit = false;
                    this.renderResult();
                }
                break;
                
            case '-': 
                if(this.isLastDigit){
                    this.result -= parseFloat(this.arg);
                    this.isLastDigit = false;
                    this.renderResult();
                }
                break;

            case '*': 
                if(this.result == 0){
                        this.result = 1;
                } 
                if(this.isLastDigit){
                    
                    this.result *= parseFloat(this.arg);
                    this.isLastDigit = false;
                    this.renderResult();
                }
                break;
            case '/':
                if(this.result == 0){
                        this.result = 1;
                } 
                if(this.isLastDigit){
                    
                    this.result /= parseFloat(this.arg);
                    this.isLastDigit = false;
                    this.renderResult();
                }
                break;

            case '0':case '1':case '2':case '3':case '4':
            case '5':case '6':case '7':case '8':case '9':case '.':
                
                if(!this.isLastDigit){
                    
                    this.arg = this.input;
                    this.isLastDigit = true;
                    this.renderArgument();
                }else if(this.isLastDigit){
                    
                    this.arg += this.input;
                    this.isLastDigit = true;
                    this.renderArgument();
                }
                
                break;
                
                
                
                 
            
            
        }
    },
    
    renderResult: function () {
        this.resultField.innerHTML= this.result;
    },
    
    renderArgument: function () {
        this.resultField.innerHTML= this.arg;
    }
};

Calc.init();

