import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../shared/service/autenticacao.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private service: AutenticacaoService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let usuarioAtual = this.service.usuarioAtualValue;
        if (usuarioAtual && usuarioAtual.token) {
              return next.handle(this.obterHeaders(request,usuarioAtual.token));
              
        }

        return next.handle(request);
    }

    private obterHeaders(request: any, token: string): any {
        const headers =  request.headers
          .set('Content-Type', 'application/json; charset=utf-8')
          .append('Authorization', `Bearer ${token}`)
          .append('Cache-Control', 'no-cache')
          .append('Pragma', 'no-cache')
          .append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');

          const clonedReq = request.clone({
            headers
          });
          return clonedReq      
      }
}