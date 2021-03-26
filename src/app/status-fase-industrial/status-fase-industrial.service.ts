import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StatusFaseIndustrial } from "../models/status-fase-industrial";

@Injectable({
  providedIn: 'root'
})
export class StatusFaseIndustrialService {
  constructor(public http: HttpClient) { }

  /**
* Consulta o status de cada fase industrial
*/
  getStatusFaseIndustrial(): Observable<Array<StatusFaseIndustrial>> {
    return this.http.get<Array<StatusFaseIndustrial>>(environment.wsListarStatusFaseIndustrial);
  }
}