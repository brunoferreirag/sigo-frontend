import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { StatusFaseIndustrialService } from '../status-fase-industrial.service';
import { StatusFaseIndustrial } from 'src/app/models/status-fase-industrial';
 
export class StatusFaseIndustrialDataSource implements DataSource<StatusFaseIndustrial>{
 
    private paradaProducaoSubject = new BehaviorSubject<StatusFaseIndustrial[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();
 
    constructor(private statusFaseIndustrialService: StatusFaseIndustrialService) { }
 
    connect(collectionViewer: CollectionViewer): Observable<StatusFaseIndustrial[]> {
        return this.paradaProducaoSubject.asObservable();
    }
 
    disconnect(collectionViewer: CollectionViewer): void {
        this.paradaProducaoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }
 
    loadStatusFaseIndustrial() {
        this.loadingSubject.next(true);
        this.statusFaseIndustrialService.getStatusFaseIndustrial()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: Array<StatusFaseIndustrial>) => {
                this.paradaProducaoSubject.next(result);
                this.countSubject.next(result.length);
            }
            );
    }
 
}