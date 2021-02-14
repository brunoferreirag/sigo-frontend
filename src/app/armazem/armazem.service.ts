import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Armazem } from "../models/armazem";
import { ArmazemListResponse } from "../models/armazem-list-response";

@Injectable({
    providedIn: 'root'
})
export class ArmazemService {
    constructor(public http: HttpClient) { }

    /**
 * Consulta os armazéns no sistema
 */
    getAllArmazens(page: number, size: number): Observable<ArmazemListResponse> {
        return this.http.get<ArmazemListResponse>(environment.wsListarArmazem + '?page=' + page + '&size=' + size);
    }

      /**
   * Excluir Armazem
   * @param id do armazém para exclusão 
   */
  excluirArmazem(id:string): Observable<any> {
    return this.http.delete<any>(environment.wsListarArmazem+'/'+id);
  }

      /**
   * Excluir Armazem
   * @param id do armazém para exclusão 
   */
  getArmazemById(id:string): Observable<Armazem> {
    return this.http.get<any>(environment.wsListarArmazem+'/'+id);
  }

 /**
  * Incluir armazém
  * @param armazem 
  */
  incluir(armazem:Armazem): Observable<any> {
    return this.http.post<any>(environment.wsListarArmazem,armazem);
  }

  /**
  * Incluir armazém
  * @param armazem 
  */
 editar(armazem:Armazem): Observable<any> {
  return this.http.put<any>(environment.wsListarArmazem+ '/'+armazem.id,armazem);
}

}