 /** PASSWORD USER MODELS
 * @Observations : Modelos de estructura para cargar pass user al sistema.
 * 
 * Carga de pass de usaurio
 */
export class PasswordModel {
    constructor (
        public pass:string,
        public passConfirm:string
    ){

    }
}