class calculator{
    constructor(curr,prev){
        this.curro=curr;
        this.prevo=prev;
        this.clear();
    }
    clear(){
        this.curro.innerHTML=0;
        this.prevo.innerHTML=0;
        this.curr='0';
        this.prev='0';
        this.oper=undefined;
    }
    disp(num){
        const snum = num.toString();
        console.log(snum);
        if(snum.includes('.')){
            var inti = parseFloat(snum.split('.')[0]);
            const frac = snum.split('.')[1];
            if(isNaN(inti)) inti='0';
            else inti = inti.toLocaleString('en', { maximumFractionDigits: 0 });
            return `${inti}.${frac}`;
        }
        else{
            console.log(parseFloat(snum).toLocaleString('en', { maximumFractionDigits: 0 }));
            return parseFloat(snum).toLocaleString('en', { maximumFractionDigits: 0 });
        }
    }
    del(){
        console.log(this.curr.toString().slice(0,-1));
        if(this.curr.toString().slice(0,-1)===''){ this.curr='0';}
        else{
            this.curr=this.curr.toString().slice(0,-1);
        }
        console.log(this.curr);
    }
    compute(){
        var pr = this.prev;
        const cu = parseFloat(this.curr);
        pr = parseFloat(pr.split(',').join(''));
        if(pr==0||isNaN(cu)) return;
        switch(this.oper){
            case '+':
                this.curr = pr + cu;
                this.oper = undefined;
                break;
            case '-':
                this.curr = pr - cu;
                this.oper = undefined;
                break;
            case '*':
                this.curr = pr * cu;
                this.oper = undefined;
                break;
            case '÷':
                this.curr = pr / cu;
                this.oper = undefined;
                break;
            default:
                return;
        }
    }
    app(num){
        if(this.curr==='0') this.curr='';
        if(num.toString()==='.'&& this.curr.includes('.')) return;
        this.curr=this.curr.toString() + num.toString();
    }
    opera(opera){
        if(this.curr === '0') return;
        if(this.prev !== '0'){
            this.compute();
        }
        this.prev=this.disp(this.curr);
        this.oper=opera;
        this.curr='0';
    }
    upd(){
        this.curro.innerHTML=this.disp(this.curr);
        if(this.oper!=null){
            this.prevo.innerHTML=`${this.prev} ${this.oper}`;
        }
        else{
            this.prevo.innerHTML=0;
            if(this.prev!=='0'){
                this.curr='0';
                this.prev='0';
            }
        }
    }
}
const nums=document.querySelectorAll('[data-num]');
const prev=document.querySelector('.prev');
const curr=document.querySelector('.curr');
const oper=document.querySelectorAll('.ope');
const del=document.querySelector('.del');
const clear=document.querySelector('.ac');
const eq=document.querySelector('.equal');
const calci = new calculator(curr,prev);
nums.forEach((button)=>{
    button.addEventListener('click',()=>{
        calci.app(button.innerText);
        calci.upd();
    })
})
oper.forEach((operator)=>{
    operator.addEventListener('click',()=>{
        calci.opera(operator.innerText);
        calci.upd();
    })
})
clear.addEventListener('click',()=>{
    calci.clear();
    calci.upd()
})
del.addEventListener('click',()=>{
    calci.del();
    calci.upd()
})
eq.addEventListener('click',()=>{
    calci.compute();
    calci.upd();
})
