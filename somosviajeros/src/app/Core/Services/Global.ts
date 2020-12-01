/** CARGA DE DATOS GLOBALES PARA LA APLICACION
 * @Observations : Este modelo se utiliza para cargar datos globales de la aplicacion
 */

 /** URL SERVICE
  * @Observations : Exporto url que se utilizara para las peticiones de la aplicacion.
  */
 export var Global = {
    urlService : 'https://dev.oficina.roddapp.com/api/',
    headers :  {
      'Content-Type':  'application/json', //x-www-form-urlencoded
      //'Accept' : '*/*',
      //'Access-Control-Allow-Origin': '*',
      //'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
      //'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'            
   }    
 };
