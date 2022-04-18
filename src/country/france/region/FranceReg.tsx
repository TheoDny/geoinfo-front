import SvgFranceReg from "./map/SvgFranceReg"
import InfoFranceReg from "./info/InfoFranceReg";
import "./FranceReg.css"
import { useState } from "react";

function FranceReg(props: any){
  const [regFocus, setRegFocus] = useState("");
  const [regInfo, setRegInfo] = useState({
    name : ""
  })

  const changeFocus = (path: HTMLElement) => {
    setRegFocus( path.id )
    setRegInfo( {name:path.id} )
  }

  return (
    <section className="svg-and-info">
        <SvgFranceReg changeFocus={changeFocus} focus={regFocus} />
        <InfoFranceReg focus={regFocus} info={regInfo} />
    </section>
  )
}

export default FranceReg;