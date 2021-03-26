import { Linha } from "./linha";
import { Turno } from "./turno";

export class ParadaProducao {
	id:string;
	turno:Turno;
	linha:Linha;
	'data-hora-inicio':Date;	
	'data-hora-fim':Date;
}