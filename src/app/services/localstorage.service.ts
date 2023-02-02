import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, of, Subject, tap } from 'rxjs';
import { Preferences as _Storage } from '@capacitor/preferences';

type Storage = { key: string, value: any }

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private storageConfig: { load: boolean, debug?: boolean }
  private storages$: BehaviorSubject<BehaviorSubject<Storage>[]>
  constructor() {
    this.storageConfig = { load: false }
    this.storages$ = new BehaviorSubject<BehaviorSubject<Storage>[]>([])
  }

  private formatter(input: any) {
    const checkStrJson = (str: string) => {
      try {
        let json = JSON.parse(str);
        return true
      } catch (error) {
        return false
      }
    }

    if (typeof input === 'object') return JSON.stringify(input);
    if (typeof input === 'string') return (checkStrJson(input) ? JSON.parse(input) : input);
    if (typeof input !== 'string' && typeof input !== 'object') return `${input}`
  }

  public async init(): Promise<void> {
    if (this.storageConfig.load) return
    if (!this.storageConfig.load) {
      const _keys: string[] = (await _Storage.keys()).keys
      if (_keys.length > 0) {
        for (const key of _keys) {
          const value = this.formatter((await _Storage.get({ key: key })).value);
          this.storages$.next([...this.storages$.value, new BehaviorSubject({ key, value })])
        }
      }
      this.storageConfig.load = true
    }
  }


  public get getStorages$() {
    return this.storages$.asObservable().pipe(filter(x => x.length > 0))
  }


  public getStorage$(key: string) {
    return this.storages$.pipe(filter(x => x.length > 0), tap(console.log))
  }


  public async setStorage(key: string, _value?: any) {
    if ((await _Storage.get({ key: key })).value == null) {// si no existe crea un storage nuevo
      const _refValue = { value: _value ?? null }
      await _Storage.set({ key, value: this.formatter(_refValue) });
      // this.storages$.next([...this.storages$.value, new BehaviorSubject({ key, value: _refValue })])
    }
  }

  // // public async check(id: string) {
  // //   return (await this.getKeys()).keys.includes(id)
  // // }

  // // //  To set an item, use set(key, value):
  // // public async set(key: string, value: {}) {
  // //   if (await this.get(key) == null) {
  // //     await Storage.set({ key, value: JSON.stringify(value) });
  // //   }// else { this element exist }
  // // }
  // // //To get the item back, use get(name):
  // // public async get(key: string) {
  // //   let data = await Storage.get({ key: key });
  // //   return JSON.parse(data.value);
  // // }
  // // // to update element insert
  // // public async update(key: string, value: {}) {
  // //   if (await this.get(key) != null) {
  // //     await Storage.set({ key, value: JSON.stringify(value) });
  // //   } else {
  // //     await this.set(key, value);
  // //   }
  // // }
  // // //To remove an item:
  // // public async remove(key: string) {
  // //   await Storage.remove({ key: key });
  // // }
  // // //To clear all items:
  // // public async clear() {
  // //   await Storage.clear();
  // // }
  // // //To get all keys stored:
  // // public async getKeys() {
  // //   return await Storage.keys()
  // // }
}
