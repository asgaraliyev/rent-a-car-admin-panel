   // responsive navbar
   hamburger = document.querySelector(".hamburger");
   hamburger.onclick = function () {
     navBar = document.querySelector(".nav-bar");
     navBar.classList.toggle("active");
   }

   //Avto

   const card = document.getElementById("card")

   const  objects = [
     {
       image : "img/1.jpg",
       model : "Hundai Elantra" ,
       about : "Rahatlığı və ekonomik olmasi ilə göz oxşayır <br/> <span>50$</span>"
     },

     {
       image : "img/2.jpg",
       model : "Kia Serato" ,
       about : "Rahatlığı və ekonomik olmasi ilə göz oxşayır <br/> <span>50 $</span>"
     },
     {
       image : "img/3.jpg",
       model : "Hundai Sonata" ,
       about : "Rahatlığı və ekonomik olmasi ilə göz oxşayır <br/> <span>50 $</span>"
     },
     {
       image : "img/4.jpg",
       model : "Galenvagen" ,
       about : "Rahatlığı və ekonomik olmasi ilə göz oxşayır <br/> <span>50 $</span>"
     },
     {
       image : "img/5.jpg",
       model : "Mercedes G63" ,
       about : "Rahatlığı və ekonomik olmasi ilə göz oxşayır <br/> <span>50 $</span>"
     },
     {
       image : "img/6.jpg",
       model : "Chevralet Camaro" ,
       about : "Rahatlığı və ekonomik olmasi ilə göz oxşayır <br/> <span>50 $</span>"
     },
     {
       image : "img/7.jpg",
       model : "Nissan Tida " ,
       about : "Rahatlığı və ekonomik olmasi ilə göz oxşayır <br/> <span>50 $</span>"
     },
     {
       image : "img/8.jpg",
       model : "Tayota Prado" ,
       about : "Rahatlığı və ekonomik olmasi ilə göz oxşayır <br/> <span>50 $</span>"
     }
   ]

     objects.forEach(obj => {
       card.innerHTML += `   
        <div class="card m-3" style="width: 18rem;">
               <img  class="card-img-top" src="${obj.image}" alt="elantra-rentacarbaku">
               <div class="card-body">
                  <h5 class="card-title">${obj.model}</h5>
                  <p class="card-text">${obj.about}</p>
                <a href="https://wa.me/0517711111"  target="_blank" class="btn btn-success ">Whats app</a>

                <a href="tel:+994517711111" class="btn btn-primary">Zəng et</a>
             </div>
      </div>`
     });



    // !!!!!!! !!! !Ehtiyyat Slider !!!!!!!!!!!!!
    
    // const ANIMATING_CLASS = 'slider__item--animating';

    // const Slider = {
    //   init() {
    //     this.sliderEl = document.querySelector('.slider');
    //     this.slideInnerEl = document.querySelector('.slider__inner');
    //     this.sliderItemsEl = document.querySelectorAll('.slider__item');
    //     this.offset = 0;
    //     this.direction = 'left';
    //     this.maxOffset = (this.sliderItemsEl.length - 1) * 100;

    //     this.slideInnerEl.addEventListener('transitionend', this.onSliderTransitionEnd.bind(this));
    //     setInterval(this.slide.bind(this), 3000);
    //   },
    //   slide() {
    //     if (this.isMaxLeft()) {
    //       this.direction = 'right';
    //     } else if (this.isMaxRight()) {
    //       this.direction = 'left';
    //     }

    //     this.moveSlider();
    //   },
    //   isMaxLeft() {
    //     return this.offset <= -this.maxOffset;
    //   },
    //   isMaxRight() {
    //     return this.offset >= 0;
    //   },
    //   getCurrentPage() {
    //     if (this.offset < 0) {
    //       return (this.offset * -1) / 100;
    //     }

    //     return this.offset / 100;
    //   },
    //   getSignal() {
    //     return this.direction === 'left' ? -1 : 1;
    //   },
    //   onSliderTransitionEnd() {
    //     const signal = this.getSignal();
    //     const currentPage = this.getCurrentPage();

    //     this.sliderItemsEl.forEach(element => element.classList.remove(ANIMATING_CLASS));
    //   },
    //   moveSlider() {
    //     const signal = this.getSignal();
    //     const currentPage = this.getCurrentPage();

    //     this.offset = this.offset + (signal * 100);
    //     this.sliderItemsEl[currentPage].classList.add(ANIMATING_CLASS);
    //     this.sliderItemsEl[currentPage + (-1 * signal)].classList.add(ANIMATING_CLASS);
    //     this.slideInnerEl.style.setProperty('--slider-offset', `${this.offset}%`);
    //   }
    // };

    // const slider = Object.create(Slider);
    // slider.init();