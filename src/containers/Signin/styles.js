import logo from "../../images/signinnow.png";

export const styles = {
    body:{
        height: "100vh",
        background: "linear-gradient(45deg, rgba(133,50,218,1) 0%, rgba(100,100,231,1) 50%, rgba(6,213,255,1) 100%);" 
    },
    logoBoundingBox:{
        backgroundImage: "url(" + logo + ")",
        height: "75%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center"
    },
    loginRight:{
        height: "6vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: "1vw"
    },
    signinCenter:{
        height: "90vh",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    signinContainer:{
        textAlign: "center",
        justifyContent: "center",
        marginTop: "-10em"
    },
    loginSubmit:{
        width: "140px",
        marginTop: "1vh",
        marginBottom: "-5px"
    }
};