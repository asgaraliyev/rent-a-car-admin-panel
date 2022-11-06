export const header_html=()=>`
<header>
        <a href="/index" class="logo"><img src="img/logo.png" alt=""> <sub>Rent a Car</sub></a>

            <div class="hamburger">
              <svg class="ham hamRotate ham4" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
                <path
                      class="line top"
                      d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                <path
                      class="line middle"
                      d="m 70,50 h -40" />
                <path
                      class="line bottom"
                      d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
              </svg>
            </div>
        <div class="nav-bar">

              <ul class="menuu">
                    <li>
                        <a href="/index" class="activee"> Ana Səhifə</a>
                    </li>
                    <li>
                        <a href="/cars">Avtomobillər</a>
                    </li>

                    <li>
                        <a href="#elaqe"> Əlaqə</a>
                    </li>
              </ul>
        </div>
  </header>
`