import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

    public setSessionEntry(key: string, id: string): void {
        sessionStorage.setItem(key, id);
    }

	public getSessionEntry(key: string): any {
		return sessionStorage.getItem(key);
	}
}
