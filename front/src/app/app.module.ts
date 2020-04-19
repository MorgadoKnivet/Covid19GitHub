import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';

import { DragScrollModule } from 'ngx-drag-scroll';
import { ListaCardsComponent } from './components/lista-cards/lista-cards.component';
import { CardsComponent } from './components/lista-cards/card/card.component';
import { BandaComponent } from './pages/banda/banda.component';
import { ShowComponent } from './pages/show/show.component';
import { LiveComponent } from './pages/live/live.component';
import { ComprarComponent } from './pages/show/comprar/comprar.component';
import { ChatComponent } from './pages/live/chat/chat.component';
import { AvaliarComponent } from './pages/live/avaliar/avaliar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    ListaCardsComponent,
    CardsComponent,
    BandaComponent,
    ShowComponent,
    LiveComponent,
    ComprarComponent,
    ChatComponent,
    AvaliarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DragScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
