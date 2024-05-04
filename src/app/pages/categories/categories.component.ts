import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'alte-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
    });
  }
}
