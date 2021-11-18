export default class Route{
    constructor(inicio) {
        this._inicio = inicio;
    }

    searchBase(name){
        let aux = this._inicio;
        if (aux.getName() == name) {
            return aux;
        }else{
            aux = aux.getNext();        
            while (aux != this._inicio) {
                if (name == aux.getName()) {
                return aux;
                }else {
                aux = aux.getNext();
                }
            }
            return null;
        }
    }

    addBase(nuevo){
        if (this._inicio == null){
            this._inicio = nuevo;
            this._inicio.setNext(this._inicio);
            this._inicio.setPrevious(this._inicio);
            return `${this._inicio.getInfo()}`;
        }else if(this.searchBase(nuevo.getName()) == null){
            let aux=this._inicio;
            while(aux.getNext()!= this._inicio){
                aux=aux.getNext();
            }
            aux.setNext(nuevo);
            nuevo.setPrevious(aux);
            nuevo.setNext(this._inicio);
            this._inicio.setPrevious(nuevo);
            console.log(this._inicio);
            return `${nuevo.getInfo()}`;
        }else{
            return `No se pudo agregar`;
        }
    }

    listBases(){
        if (this._inicio===null){
            return "Esta vacio";
        }else {
            return this._addToList(this._inicio);
        }
    }

    _addToList(aux){
        if (aux.getNext() == this._inicio) {
            return aux.getInfo();
        }else{
            return aux.getInfo() + this._addToList(aux.getNext());
        }
    }
}