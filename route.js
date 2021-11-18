export default class Route{
    constructor(inicio) {
        this._inicio = inicio;
    }

    addBase(base){
        if (this._inicio == null){
            this._inicio = base;
            base.setNext = base;
            return `${this._inicio.getInfo()}`;
        }else if(this.searchProduct(base.getCode()) == null){
            if (base.getCode() < this._inicio.getCode()){
                base.setNext(this._inicio);
                this._inicio.setPrevious(base);
                this._inicio = base;
                return `${base.getInfo()}`;
            }else if(this.findPosition(base.getCode()).getCode() < base.getCode()){
                base.setPrevious(this.findPosition(base.getCode()));
                this.findPosition(base.getCode()).setNext(base);
                return `${base.getInfo()}`;
            }else{
                base.setNext(this.findPosition(base.getCode()));
                base.setPrevious(this.findPosition(base.getCode()).getPrevious());
                this.findPosition(base.getCode()).setPrevious(base);
                base.getPrevious().setNext(base);
                return `${base.getInfo()}`;
            }
        }else{
            return `No se pudo agregar`;
        }
    }
}