import {ApplicationConfig, importProvidersFrom, ModuleWithProviders} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { environment } from './config/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {provideStorage} from "@angular/fire/storage";
import {getStorage} from "@firebase/storage";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {MatDialogRef} from "@angular/material/dialog";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    }),
    {
      provide: FIREBASE_OPTIONS, useValue: environment.firebase
    },
  ],
};
