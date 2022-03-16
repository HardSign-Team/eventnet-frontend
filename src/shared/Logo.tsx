import React from "react"

type LogoSetting = {
    className: string,
    width: number,
    height: number
}
const Logo = ({className, width, height} : LogoSetting) => {
    return (
        <img src={require("./logo.svg").default} className={className} alt="Logo" width={width} height={height}/>
    )
}

export default Logo