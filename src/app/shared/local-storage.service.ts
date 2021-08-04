import { Injectable, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor( @Inject(PLATFORM_ID) protected platformId: Object) { }
  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value || null))
    }
  }
  getItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
      } else {
        return null
      }
    }
  }
  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key)
    }
  }
}

// This service was to add local storage to your app. It keeps the movies that are fetched in local storage since
// each service is provided in root, that sets up new instances of the service from each component that calls it.
// This local storage keeps the contents in one place so the components can access the movies.
