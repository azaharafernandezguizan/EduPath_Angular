import { DummyData, DummyUpdateData } from './../models/dummy';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DummyDeleteResponse, DummyDetailResponse, DummyListResponse, DummyUpdateResponse } from '../models/dummyResponses';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DummiRestApiService {
  constructor(private apiService: ApiService) { }

  getDummyList(): Observable<any>{
    return this.apiService.get('/employees');
  }

  getDummyDetail(dummyId: number): Observable<DummyDetailResponse>{
    return this.apiService.get('/employee/'+ dummyId);
  }

  postDummy(dummy: DummyUpdateData): Observable<DummyUpdateResponse>{
    return this.apiService.post('/create', dummy);
  }

  putDummy(dummy: DummyUpdateData, dummyId: number): Observable<DummyUpdateResponse>{
    return this.apiService.put('/update/' + dummyId, dummy);
  }

  deleteDummy(dummyId: number): Observable<DummyDeleteResponse>{
    return this.apiService.get('/delete/'+ dummyId);
  }

}
