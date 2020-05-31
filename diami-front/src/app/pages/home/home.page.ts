import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { SlideAnimationService } from 'src/app/utils/slide-animation.service';
import { IonSlides } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  news: any;
  slideOpts = null;

  @ViewChild(IonSlides) ionSlides: IonSlides;

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

  constructor(private newsService: NewsService, private iab: InAppBrowser) {
    this.slideOpts = SlideAnimationService.slideOptions;
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

  seeMore(url: string) {
    const browser = this.iab.create(url);
    browser.show();
  }
}
