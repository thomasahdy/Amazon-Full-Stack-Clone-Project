import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrls: ['./cards.css']
})
export class Cards {
  relatedItems = [
    {
      title: 'Product One',
      image: '/images/1.1.png',
      price: '$24.99'
    },
    {
      title: 'Product Two',
      image: '/images/1.2.png',
      price: '$31.00'
    },
    {
      title: 'Product Three',
      image: '/images/1.3.png',
      price: '$18.50'
    },
    {
      title: 'Product Four',
      image: '/images/1.4.png',
      price: '$44.00'
    }
  ];

  alsoViewed = [
    {
      title: 'Product Five',
      image: '/images/2.1.png',
      price: '$65.99'
    },
    {
      title: 'Product Six',
      image: '/images/2.2.png',
      price: '$39.99'
    },
    {
      title: 'Product Seven',
      image: '/images/2.3.png',
      price: '$82.00'
    },
    {
      title: 'Product Eight',
      image: '/images/2.4.png',
      price: '$59.49'
    }
  ];
}
