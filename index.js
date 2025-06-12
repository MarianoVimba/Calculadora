const resultado = document.querySelector(".resultado");
const botones = document.querySelectorAll(".calculadora-item");
const modoOscuro = document.getElementById("modo-oscuro");

modoOscuro.addEventListener("change",()=>{
    if(modoOscuro.checked){
        document.body.classList.add("modo-oscuro-activado");
    }else{
        document.body.classList.remove("modo-oscuro-activado");
    }
})

let expresionTotal=""; // aca guardo todo en caso que use boton borrar
let parentesis = false; //saber si apreto en el parentesis
let historial = [];

botones.forEach(boton => {
    boton.addEventListener("click",(e)=>{

            let botonApretado = e.target.textContent;
            
            if(!isNaN(botonApretado) || botonApretado === "."  || botonApretado == "+" || botonApretado == "-" || botonApretado == "x" || botonApretado == "/" || botonApretado == "%"){
                expresionTotal+=botonApretado;
                resultado.innerHTML = expresionTotal;
        
            }else if(botonApretado === "()"){
                if(!parentesis){
                    expresionTotal+= "(";
                    parentesis = true; //se abrio un parentesis
                }else{
                    expresionTotal+= ")";
                    parentesis = false; //cerrado por lo q se tuvo q abrir y cerrar
            }
            resultado.innerHTML = expresionTotal;
            
            
        }else if(botonApretado === "=" && parentesis == false){
            if(expresionTotal.trim() === ""){//trim elimina los espacios
                resultado.innerHTML = "No hay para calcular";//si esta vacio al apretar el =
                return ; //para q salga 
            }
            try{
                expresionTotal = expresionTotal.replace(/x/g,"*"); // es /x/g para q remplaze todas las x sino eval no interpleta la x q es multiplicacion
                let cuenta =  eval(expresionTotal);//eval hace todas las operaciones automaticamente entre varios valores por lo que ahorra tener q hacer las fn con cada operacion o ir separando entre numeros distintos
                resultado.innerHTML = cuenta;
                historial.push(expresionTotal + `=`+ cuenta +`<br>`);
                expresionTotal = "";
            }catch(e){
                resultado.innerHTML = "Ingreso mal la cuenta";
                expresionTotal = "";
            }
            
        }else if(botonApretado == "AC"){
            limpiarValores();
            
        }else if(botonApretado == "borrar"){
            if(expresionTotal.slice(-1) === "("){
                parentesis = false;
            }
            expresionTotal = expresionTotal.slice(0,-1);//para borrar el ultimo
            resultado.innerHTML = expresionTotal;
        
        }else if(botonApretado =="Hist"){
            if(historial == ""){
                resultado.innerHTML = "No hay historial"
            }else{
                resultado.innerHTML = historial.join("");
            }
        }
    })
});

function limpiarValores(){
    valor = "";
    resultado.innerHTML = "";
    expresionTotal = "";
}



















