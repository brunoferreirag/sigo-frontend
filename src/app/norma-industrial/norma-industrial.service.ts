import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Armazem } from "../models/armazem";
import { ArmazemListResponse } from "../models/armazem-list-response";
import { NormaIndustrial } from "../models/norma-industrial";
import { NormaIndustrialListResponse } from "../models/norma-industrial-response";

@Injectable({
    providedIn: 'root'
})
export class NormaIndustrialService {
    constructor(public http: HttpClient) { }

    /**
 * Consulta as normas industriais
 */
    getAll(codigo:string, titulo:string,versao:string,page: number, size: number): Observable<NormaIndustrialListResponse> {
      let url: string = environment.wsNormasIndustriaisBusca + '?page=' + page + '&size=' + size ;
      if(codigo){
        url+='&codigo='+codigo ;
      }

      if(titulo){
        url+='&titulo='+titulo ;
      }
      if(versao){
        url+='&versao='+versao ;
      }
        return this.http.get<NormaIndustrialListResponse>(url);
    }

      /**
   * Excluir Norma Industrial
   * @param id da norma industrial para exclusão 
   */
  excluirNormaIndustrial(id:string): Observable<any> {
    return this.http.delete<any>(environment.wsNormasIndustriais+'/'+id);
  }

      /**
   * Get Norma Industrial
   * @param id da norma 
   */
  getNormaIndustrialById(id:string): Observable<NormaIndustrial> {
    return this.http.get<any>(environment.wsNormasIndustriais+'/'+id);
  }

 /**
  * Incluir norma industrial
  * @param normaIndustrial
  */
  incluir(normaIndustrial:NormaIndustrial): Observable<any> {
    return this.http.post<any>(environment.wsNormasIndustriais,normaIndustrial);
  }

  /**
  * Editar norma industrial
  * @param armazem 
  */
 editar(normaIndustrial:NormaIndustrial): Observable<any> {
  return this.http.put<any>(environment.wsNormasIndustriais+ '/'+normaIndustrial.id,normaIndustrial);
}

}