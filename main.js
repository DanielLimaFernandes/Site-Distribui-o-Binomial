      
let yAcumulada = [1, 2, 3, 4, 5, 5];
let xValues = [1, 1, 2, 2, 3, 4];
let yValues = [0, 1, 2, 3, 4, 5];

let chart = null;

function makegrafico() {
  if(chart != null){
    chart.destroy();
  }
  
  chart = new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        label: "função de massa",
        backgroundColor: "blue",
        data: yValues
      },
      {
        label: "função acumulada",
        type: "scatter",
        fill: false,
        backgroundColor: "black",
        data: yAcumulada
      }]
    },
    options: {
      legend: {
        display: true
        
      },
      title: {
        display: true,
        text: "World Wine Production 2018"
      }
    }
  });

  xValues = [];
  yValues = [];
  //document.getElementById("probabilidade").value = "";
  //document.getElementById("repetições").value = "";
}

makegrafico();

function conta() {
  xValues = [];
  yValues = [];
  yAcumulada = [];
  let p = document.getElementById("probabilidade").value;
  let n = document.getElementById("repetições").value;

  if (p > 1 || p < 0) {
    alert("valor de p não aceito!");
    return;
  }

  let q = 1 - p;

  console.log("p: ", p, "  n: ", n);

  for (let i = 0; i <= n; i++) {
    xValues.push(i);

    let x = combinacao(n, i);
    let func = x * (p ** i) * (q ** (n - i))
    yValues.push(func);
  }

  
  for(let u = 0; u <= n; u++) {
    let soma = 0;
    for(let t = 0; t <= u; t++){
      let x = combinacao(n, t);
      let func = x * (p ** t) * (q ** (n - t))
      soma = soma + func;
    }
    yAcumulada.push(soma);
  }
  

    makegrafico();
}

function combinacao(n, k) {

  let q = n - k;
  let nfat = fatorial(n);
  let kfat = fatorial(k);
  let qfat = fatorial(q);

  let result = nfat / (kfat * qfat);

  return result;
}

function fatorial(v) {
  let vfat = 1;
  for (let i = 1; i <= v; i++) {
    vfat = vfat * i;
  }
  return vfat;
}

let botao = document.getElementById("botao");
console.log("botao: ", botao);
botao.addEventListener("click", conta);