import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Linha } from "../models/linha";
import { ParadaProducao } from "../models/parada-producao";
import { ParadaProducaoListResponse } from "../models/parada-producao-list-response";
import { Turno } from "../models/turno";

@Injectable({
  providedIn: 'root'
})
export class ParadaProducaoService {
  constructor(public http: HttpClient) { }

  /**
* Consulta as paradas de produção
*/
  getAllParadasProducao(page: number, size: number): Observable<ParadaProducaoListResponse> {
    return this.http.get<ParadaProducaoListResponse>(environment.wsListarParadaProducao + '?page=' + page + '&size=' + size);
  }

  /**
* Consulta as paradas de produção
*/
  getAllLinhasProducao(): Observable<Array<Linha>> {
    return this.http.get<Array<Linha>>(environment.wsListarLinhaProducao);
  }

   /**
* Consulta as paradas de produção
*/
getAllTurnos(): Observable<Array<Turno>> {
  return this.http.get<Array<Turno>>(environment.wsListarTurno);
}


  /**
* Excluir Parada Produção
* @param id da parada para exclusão 
*/
  excluirParadaProducao(id: string): Observable<any> {
    return this.http.delete<any>(environment.wsListarParadaProducao + '/' + id);
  }

  /**
* Get parada por id
* @param id do armazém para exclusão 
*/
  getParadaProducaoById(id: string): Observable<ParadaProducao> {
    return this.http.get<any>(environment.wsListarParadaProducao + '/' + id);
  }

  /**
   * Incluir parada produção
   * @param parada-producao 
   */
  incluir(paradaProducao: ParadaProducao): Observable<any> {
    return this.http.post<any>(environment.wsListarParadaProducao, paradaProducao);
  }

  /**
  * excluir parada - produção
  * @param parada-producao
  */
  editar(paradaProducao: ParadaProducao): Observable<any> {
    return this.http.put<any>(environment.wsListarParadaProducao + '/' + paradaProducao.id, paradaProducao);
  }
}