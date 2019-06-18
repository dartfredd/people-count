'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}



// Complete the csRush function below.
function csRush(n, m, css, customers, vacant_css) {
    // FIltrando quem não está de férias
    let cssOk = css.filter(item => !vacant_css.includes(item[0]))
    // Encontrar a média de atendimento provável
    const media = Math.round(m / cssOk.length)
    // Ordena lista de CSS
    cssOk.sort((a, b) => {
        return a[1] - b[1]
    })
    // faz iteração adicionando uma nova posicao no array com a quant. de clientes
    customers.forEach(_customer => {
        //caso seja a primeira passada
        for (let index = 0; index < cssOk.length; index++){
            //incrementa o cliente
            if (cssOk[index][1] >= _customer[1]) {
                if (!cssOk[index][2]) {
                    cssOk[index].push(1)
                    break
                }
                cssOk[index][2] += 1
                    break
                }
        }
    })
    //realiza a troca de posicao para achar o maior peso ordenando o resulta
    let aux
    for (let index = 0; index < cssOk.length - 1; index++) {
        
        if (cssOk[index][2] > cssOk[index + 1][2] || !cssOk[index + 1][2]) {
            aux = cssOk[index + 1]
            cssOk[index + 1] = cssOk[index]
            cssOk[index] = aux
        }
    }
    //verifico quantos css eu tenho e seus valores, se é = 1
    if (cssOk.length == 1) {
        return cssOk[cssOk.length - 1][0]
    }
    //verifico se o peso dos ultimos são iguais retorna 0
    if (cssOk[cssOk.length - 1][2] == cssOk[cssOk.length - 2][2]) {
        return 0
    }
    //retorno o maior da lista    
    return cssOk[cssOk.length-1][0]
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let css = Array(n);

    for (let i = 0; i < n; i++) {
        css[i] = readLine().replace(/\s+$/g, '').split(' ').map(cssTemp => parseInt(cssTemp, 10));
    }

    const m = parseInt(readLine().trim(), 10);

    let customers = Array(m);

    for (let i = 0; i < m; i++) {
        customers[i] = readLine().replace(/\s+$/g, '').split(' ').map(customersTemp => parseInt(customersTemp, 10));
    }

    const vacant_cssCount = parseInt(readLine().trim(), 10);

    const vacant_css = readLine().replace(/\s+$/g, '').split(' ').map(vacant_cssTemp => parseInt(vacant_cssTemp, 10));

    const cs_distribution = csRush(n, m, css, customers, vacant_css);

    ws.write(cs_distribution + '\n');

    ws.end();
}  