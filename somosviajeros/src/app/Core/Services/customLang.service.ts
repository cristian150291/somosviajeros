export class customLangService {

    private wordES = {
        'parada' : 'parada'
    };

    private wordEN = {
        'parada' : 'stop'
    };

    private wordPT = {
        'parada' : "pare"
    };

    /**wordLang
     * @observations : Retorna la traduccion de la palabra necesaria
     * dandole la llave y el idioma
     * 
     * @param llave 
     * 
     * 
     * @param idioma 
     */

    wordLang(llave : string, idioma : string ):string{
        let mensage: any;

        switch (idioma) {
            case 'es':
                mensage = this.returnName( this.wordES,llave);
            break;

            case 'en':
                mensage = this.returnName( this.wordEN,llave);
            break;

            case 'pt':
                mensage = this.returnName( this.wordPT, llave );
            break;
        }
        return mensage;
    }

    returnName (array: any, llave: string ): String{
        let name : String = "";
        
        Object.entries(array).forEach((key) => {
            if( llave == key[0] ){
                name = key[1].toString();
            }
        });

        return name;
    }


}