import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  news;

  constructor(private newsService: NewsService) {

    this.getNews();
  }

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

  getNews() {
    this.newsService.getNews().subscribe(
      (res) => {
        //console.log(res);
        this.news = res;
        //console.log(this.news);
      },
      (err) => console.log(err)
    );
  }
}
