import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostWrapperComponent } from './components/post-wrapper/post-wrapper.component';
import { PostHeaderComponent } from './components/post-header/post-header.component';
import { PostBodyComponent } from './components/post-body/post-body.component';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { PostLoaderComponent } from './components/post-loader/post-loader.component';
import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {CommentsService} from './services/comments/comments.service';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {commentsReducer} from './store/reducers/comments.reducer';
import {CommentsEffect} from './store/effects/comments.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { PostErrorComponent } from './components/post-error/post-error.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    PostWrapperComponent,
    PostHeaderComponent,
    PostBodyComponent,
    PostCommentsComponent,
    PostLoaderComponent,
    PostErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // @ts-ignore
    StoreModule.forRoot({comments: commentsReducer}),
    EffectsModule.forRoot([CommentsEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
