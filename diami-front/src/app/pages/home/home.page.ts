import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { SlideAnimationService } from 'src/app/utils/slide-animation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  news: any;
  slideOpts = null;

  slides = [
    {
      img: 'assets/png/RECOMENDACION1.png'
    },
    {
      img: 'assets/png/RECOMENDACION2.png'
    },
    {
      img: 'assets/png/RECOMENDACION3.png'
    }
  ];

  constructor(private newsService: NewsService) {
    this.slideOpts = SlideAnimationService.animationCoverFlow;
  }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.getNews('co').subscribe(
      (res: any) => {
        this.news = res.data;
      },
      (err) => console.log(err)
    );
  }
}
