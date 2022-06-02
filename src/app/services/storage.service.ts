import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { StorageChange } from '../interfaces/storage-change';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	public storageChange$: ReplaySubject<StorageChange> = new ReplaySubject();

    public setSessionEntry(key: string, id: string): void {
        sessionStorage.setItem(key, id);
		this.storageChange$.next({key, id});
    }

	public getSessionEntry(key: string): any {
		return sessionStorage.getItem(key);
	}
}
