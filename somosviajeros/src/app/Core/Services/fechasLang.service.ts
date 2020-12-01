
export class fechasLangService {

    private diasEs: any = { 
        '0'  : 'Lunes',
        '1'  : 'Martes',
        '2'  : 'Miercoles',
        '3'  : 'Jueves',
        '4'  : 'Viernes',
        '5'  : 'Sabado',
        '6'  : 'Domingo'
    };
    private diasEn: any = { 
        '0'  : 'Monda',
        '1'  : 'Tuesday',
        '2'  : 'Wednesday',
        '3'  : 'Thursday',
        '4'  : 'Friday',
        '5'  : 'Saturday',
        '6'  : 'Sunday'
    };
    private diasPt: any = { 
        '0'  : 'Segunda-feira',
        '1'  : 'Terça-feira',
        '2'  : 'Quarta feira',
        '3'  : 'Quinta feira',
        '4'  : 'Sexta-feira',
        '5'  : 'Sábado',
        '6'  : 'Domingo'
    };
    private mesesEs: any = { 
        '0'  : 'Enero',
        '1'  : 'Febrero',
        '2'  : 'Marzo',
        '3'  : 'Abril',
        '4'  : 'Mayo',
        '5'  : 'Junio',
        '6'  : 'Julio',
        '7'  : 'Agosto',
        '8'  : 'Septiembre',
        '9'  : 'Octubre',
        '10' : 'Novimbre',
        '11' : 'Diciembre',
    };
    private mesesEn: any = { 
        '0'  : 'January',
        '1'  : 'February',
        '2'  : 'March',
        '3'  : 'April',
        '4'  : 'May',
        '5'  : 'June',
        '6'  : 'July',
        '7'  : 'August',
        '8'  : 'September',
        '9'  : 'October',
        '10' : 'November',
        '11' : 'December',
    };
    private mesesPt: any = { 
        '0'  : 'Janeiro',
        '1'  : 'Fevereiro',
        '2'  : 'Março',
        '3'  : 'Abril',
        '4'  : 'Maio',
        '5'  : 'Junho',
        '6'  : 'Julho',
        '7'  : 'Agosto',
        '8'  : 'Septembro',
        '9'  : 'Octobro',
        '10' : 'Novembro',
        '11' : 'Dezembro',
    };

    constructor() {
    }

    /** DIAS LANG
     * @Observations : Retorna traduccion de dias de la semana
     * dependiendo de la llave y idioma enviado por parametro.
     * 
     * @param llave : String clave de nombre a traducir
     * @param idioma : string clave de idioma a traducir
     */ 
    diasLang(llave : string, idioma : string ):string{
        let mensage: any;

        switch (idioma) {
            case 'es':
                mensage = this.returnName( this.diasEs,llave);
            break;

            case 'en':
                mensage = this.returnName( this.diasEn,llave);
            break;

            case 'pt':
                mensage = this.returnName( this.diasPt,llave);
            break;
        
        }
        return mensage;
    }
    /** MESES LANG
     * @Observations : Retorna traduccion de los mese del año
     * dependiendo de la llave y idioma enviado por parametro.
     * 
     * @param llave : String clave de indice a traducir
     * @param idioma : string clave de idioma a traducir
     */ 
    mesesLang(llave : string, idioma : string ):string{
        let mensage: any;

        switch (idioma) {
            case 'es':
                mensage = this.returnName( this.mesesEs,llave);
            break;

            case 'en':
                mensage = this.returnName( this.mesesEn,llave);
            break;

            case 'pt':
                mensage = this.returnName( this.mesesPt, llave );
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
