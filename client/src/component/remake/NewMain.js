import logo from '../../img/handshake_logo.png'
import '../../css/newMain.css'

export default function NewMain() {
    return (
        <>
            <div style={{width: "100vw", height: "100vh", display: "flex", justifyContent : "center" , alignItems: "center"}}>
            <div style={{display: "flex",justifyContent : "center" , alignItems: "center", width: "60vw", height: "80vh"}}>
                    <div style={{marginTop : "150px", textAlign : "center"}}>
                        <img src={logo}/><br/>
                        <span id="subtext">수어로만나는대림대학교</span> <br/>
                        <div>
                            
                            <button id="btn-start">시작하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}