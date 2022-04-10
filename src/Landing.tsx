import "./Landing.css";
import phoneSrc from "./assets/images/phone.svg";
import background1Src from "./assets/images/background1.jpg";
import background2Src from "./assets/images/background2.jpg";
import background3Src from "./assets/images/background3.jpg";
import background4Src from "./assets/images/background4.jpg";
import background5Src from "./assets/images/background5.jpg";
import background6Src from "./assets/images/background6.jpg";
import RotatingImageBackground from "./components/RotatingImageBackground";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <RotatingImageBackground
      imageSrcs={[
        background1Src,
        background2Src,
        background3Src,
        background4Src,
        background5Src,
        background6Src,
      ]}
      timeout={5000}
    >
      <div className="app">
        <nav className="app-header">
          <div className="app-header-left">
            El Portal de <span className="arene-color">AReNe</span>
          </div>
          <div className="app-header-middle">
            <div>Asociacion de Rehabilitacion Neurológica</div>
            <div>"Alfredo F. Thomson"</div>
            <div>Reg. Púb. Com. N° 257/06</div>
          </div>
          <div className="app-header-right">
            <Link to={"/login"}>
              <Button size="sm">Ingresar</Button>
            </Link>
          </div>
        </nav>
        <main></main>
        <footer>
          <div className="footer-left">
            <div className="footer-phone">
              <img className="inline-img" src={phoneSrc} alt=""></img>
              <span>( 03442 ) - 15519170</span>
            </div>
            <div>Horario de Atención de Lun. a Vier. 09 a 17 hs.</div>
          </div>
          <div className="footer-right">
            <div>El Portal de AReNe - Concepción del Uruguay - Entre Ríos</div>
            <div>Acc. Luis Rodriguez Artuzi N° 2430, Esq. Villa Flor</div>
            <div>
              &copy; 2022 - Políticas de Privacidad - Términos y Condiciones -
              Desarrollado por Alumnos P.H.P. UTN
            </div>
          </div>
        </footer>
      </div>
    </RotatingImageBackground>
  );
}

export default Landing;
