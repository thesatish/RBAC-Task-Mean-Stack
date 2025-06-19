import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private callCountingSubject = new Subject<void>();

  onCountCall$ = this.callCountingSubject.asObservable();

  triggerCountingCall() {
    this.callCountingSubject.next();
  }

  constructor() { }

  private moduleId = '';

  setModuleId(id: string) {
    this.moduleId = id;

    console.log("this.moduleId::SharedService::", this.moduleId);
  }

  getModuleId(): string {
    return this.moduleId;
  }

}
