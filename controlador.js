let formulario = document.getElementById("form-movimiento");
let btnp = document.getElementById("btn-prueba");
let tabla = document.querySelector("#conceptos tbody");


function validar(event){
    event.preventDefault();

    if(formulario.importe.value <= 0){
        alert("Ingrese un importe mayor a 0.");
        return;
    }

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
        td1.setAttribute('class', 'id');
    let txt1 = document.createTextNode(agregarID());
        td1.appendChild(txt1);

    let td2 = document.createElement("td");
    let txt2 = document.createTextNode(formulario.fecha.value);
        td2.appendChild(txt2);

    let td3 = document.createElement("td");
    let txt3 = document.createTextNode(formulario.concepto.value)
        td3.appendChild(txt3);

    let td4 = document.createElement("td");
        td4.setAttribute('class','deposito');

    let td5 = document.createElement("td");
        td5.setAttribute('class', 'retiro');

    let txt4 = document.createTextNode('$'+formulario.importe.value);
    
    if(formulario.operacion.value=='deposito'){
        td4.appendChild(txt4);
    }else{
        td5.appendChild(txt4);
    }

    //vamos a vlidar si hay renglones
    let n_renglones = document.querySelectorAll("#conceptos tbody tr");
    let td6 = document.createElement("td");
    td6.setAttribute('class', 'saldo')//identificar columnas que tengan saldo

    //valida que se escoja depósito al principio
    if(n_renglones.length == 0){
        if(formulario.operacion.value=='retiro'){
            alert("No cuenta con recurso suficiente para retiro");
            return;
        }
        let txt6 = document.createTextNode('$'+formulario.importe.value);
        td6.appendChild(txt6);
    }else{
        let anterior = tabla.lastChild.querySelector('.saldo');
        let saldo = 0;
        if(formulario.operacion.value=='deposito'){
            saldo = parseFloat(anterior.innerText.replace("$","")) + parseFloat(formulario.importe.value.replace("$","")) ;
        }else{
            if( parseFloat(anterior.innerText.replace("$","")) > parseFloat(formulario.importe.value.replace("$",""))){
                saldo = parseFloat(anterior.innerText.replace("$","")) - parseFloat(formulario.importe.value.replace("$",""));
            }else{
                alert("no cuentas con fondo suficiente");
                return; 
            }
        }
        let txt6 = document.createTextNode('$'+ saldo);
        console.log(anterior);
        td6.appendChild(txt6);
    }
    //AGREGAR BOTON ELIMINAR
    let td7 = document.createElement('td');
    let btn = document.createElement('button');
    btn.setAttribute("onclick","javascript:eliminar('"+agregarID()+"');");
    btn.innerText = "Eliminar";
    btn.setAttribute('class','btn');
    td7.appendChild(btn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    console.log(tr);

    //tabla
    tabla.appendChild(tr);

   /*  console.log(formulario.importe.value);
    console.log("Dentro de la función validar"); */
    totalDeposito();
    totalRetiro();
}

function totalDeposito(){
    let deposito = document.querySelectorAll(".deposito");
    let total = 0;
    let totalDec = 0;
    for(var i = 0; deposito.length > i; i++ ){
        if(deposito[i].innerText != ""){
            total = total + parseFloat(deposito[i].innerText.replace("$",""));
            totalDec = total.toFixed(2);
        }
    }
    console.log(total);
    document.getElementById("total_deposito").innerText = '$'+ totalDec;
}

function totalRetiro(){
    let retiro = document.querySelectorAll(".retiro");
    let total = 0;
    let totalDec = 0;

    for(var i = 0; retiro.length > i; i++){
        if(retiro[i].innerText != ""){
            total = total + parseFloat(retiro[i].innerText.replace("$",""));
            totalDec = total.toFixed(2);
        }
    }
    document.getElementById("total_retiro").innerText = '$'+ totalDec;
}

//Incremento id
function agregarID(){
    let id = document.querySelectorAll(".id");
    if(id.length == 0) return 1
    let numeros = Array.from(id).map(function(numero){
        return  parseInt(numero.innerText);
    })
    let mayor = Math.max(...numeros);
    return mayor + 1;
}

function eliminar(id){
    let renglones = document.querySelectorAll("#conceptos tbody tr");
    for(let i = 0; i < renglones.length;i++){
        if(renglones[i].querySelector('.id').innerText == id){
            renglones[i].remove();
            totalDeposito();
            totalRetiro();
            break;
        }
    }
}

formulario.addEventListener('submit', validar);
/* //ejemrplo de ageagar evento a boton
btnp.addEventListener('click', ()=>{
    console.log("Aqui van las instrucciones que deseamos ejecutar");
}) */