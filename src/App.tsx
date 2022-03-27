import "./App.css";
import logoSrc from "./assets/images/header-logo.svg";
import phoneSrc from "./assets/images/phone.svg";
import backgroundSrc from "./assets/images/background5.jpg";

function App() {
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
          <img src={logoSrc} alt="" />
          <div>"Un mundo pensado para todos"</div>
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
  );
}

export default App;
