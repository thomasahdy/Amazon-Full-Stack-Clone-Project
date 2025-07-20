import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  amazonLogo = "./images/Amazon.png";
  isAdmin = false; // Set to true if logged-in user is admin
}
