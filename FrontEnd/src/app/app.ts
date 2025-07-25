import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './component/nav/nav';
import { Footer } from './component/footer/footer';
import { Categorynav } from './component/categorynav/categorynav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, Categorynav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('day_one');
}
