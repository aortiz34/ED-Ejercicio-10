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

    deleteBase(name){
        if (this._inicio == null) {
            return null;
        }else{
            let elim = null;
            if (name == this._inicio.getName()){
                if (this._inicio.getNext() != this._inicio){
                elim = this._inicio;
                this._inicio.getPrevious().setNext(this._inicio.getNext());
                this._inicio.getNext().setPrevious(this._inicio.getPrevious());
                this._inicio = this._inicio.getNext();
                elim.setNext(null);
                elim.setPrevious(null);
                return elim;
                }else{
                elim = this._inicio;
                this._inicio = null;
                return elim;
                }
            }else{
                let aux = this._inicio.getNext();
                while (aux != this._inicio) {
                    if (aux.getName() == name){
                        elim = aux;
                        aux.getPrevious().setNext(aux.getNext())
                        aux.getNext().setPrevious(aux.getPrevious());
                        elim.setNext(null);
                        elim.setPrevious(null);
                        return elim;
                    }else{
                        aux = aux.getNext();
                        }
                }
                return elim;
            }
        }
    }

    createCard(base,date,minutes){
        let contador = 1;
        let txt = `<div>
        ${contador}-${base}-${date.getHours()}:0${date.getMinutes()}
        </div>`;
        let baseInicio = this.searchBase(base);
        if (baseInicio != null) {
            let aux = baseInicio.getNext();
            while (minutes > 0) {
               let duration = Number(aux.getDuration());
               minutes -= duration;
               if (minutes < 0) {
                   return txt;
               }else{
                   contador ++;
                    date.setMinutes(date.getMinutes() + duration);
                    let minutos = date.getMinutes();
                    if(minutos < 10 ){
                        txt += `<div>
                        ${contador}-${aux.getName()}-${date.getHours()}:0${date.getMinutes()}
                        </div>`;
                    }else{
                        txt += `<div>
                        ${contador}-${aux.getName()}-${date.getHours()}:${date.getMinutes()}
                        </div>`;
                    }
                    aux = aux.getNext();
               }

            }
            return txt;
        }else{
            return `No existe esa base`;
        }
    }
}