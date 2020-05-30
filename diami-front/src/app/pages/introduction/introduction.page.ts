import { Component, OnInit } from '@angular/core';
import { SlideAnimationService } from 'src/app/utils/slide-animation.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss']
})
export class IntroductionPage implements OnInit {
  slideOpts = null;

  constructor() {
    this.slideOpts = SlideAnimationService.animationCoverFlow;
  }

  ngOnInit() {}
}
