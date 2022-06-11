import "./Landing.css";
import phoneSrc from "@/assets/images/phone.svg";
import background1Src from "@/assets/images/background1.jpg";
import background2Src from "@/assets/images/background2.jpg";
import background3Src from "@/assets/images/background3.jpg";
import background4Src from "@/assets/images/background4.jpg";
import background5Src from "@/assets/images/background5.jpg";
import background6Src from "@/assets/images/background6.jpg";
import RotatingImageBackground from "@/components/RotatingImageBackground/RotatingImageBackground";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";

function Landing() {
  return (
    <PublicLayout>
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
          <></>
        </RotatingImageBackground>
    </PublicLayout>
  );
}

export default Landing;
