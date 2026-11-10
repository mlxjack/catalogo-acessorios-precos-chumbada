/* Promocao Atacado Novembro 2026 - catalogo de ACESSORIOS COM PRECO.
 * Fonte: planilha "Acessorios_Promocao_Atacado_Novembro_Vendedorab.xlsx" (aba "Subir na tabela").
 * Por SKU: [preco atual da unidade, total do kit 30, total do kit 100, total do kit 1.000].
 * O SKU da cor/variacao escolhida vem do findSkuEntry() do app.js (skuVariants do data.js).
 * Liga sozinho ate 30/11/2026 23:59:59 (horario de Brasilia). ?atacado=1 forca a exibicao.
 */
(function () {
  var END = Date.parse('2026-11-30T23:59:59-03:00');
  var KITS = [30, 100, 1000];
  var PRICES = {
    'PA11263': [16.1, 468.51, 1529.5, 14812], // Suporte de Vara Slim - 40cm; Preto
    'PA11272': [19.55, 568.91, 1857.25, 17986], // Suporte de Vara Slim - 60cm; Preto
    'PA11281': [26.45, 769.7, 2512.75, 24334], // Suporte de Vara Slim - 85cm; Preto
    'PA11448': [28.75, 836.63, 2731.25, 26450], // Suporte de Vara Slim - 1m; Preto
    'PA11457': [33.35, 970.49, 3168.25, 30682], // Suporte de Vara Slim - 1,2m; Preto
    'SV0704000': [18.88, 549.41, 1793.6, 17369.6], // Suporte de Vara Slim em Borracha - 40cm
    'SV0706000': [22.42, 652.42, 2129.9, 20626.4], // Suporte de Vara Slim em Borracha - 60cm
    'SV0708500': [29.5, 858.45, 2802.5, 27140], // Suporte de Vara Slim em Borracha - 85cm
    'SV0710000': [31.68, 921.89, 3009.6, 29145.6], // Suporte de Vara Slim em Borracha - 100cm
    'SV0712000': [36.58, 1064.48, 3475.1, 33653.6], // Suporte de Vara Slim em Borracha - 120cm
    'PA10190': [71, 2066.1, 6745, 65320], // Suporte de Vara Premium Completo - 1m; Preto
    'PA11677': [71, 2066.1, 6745, 65320], // Suporte de Vara Premium Completo - 1m; Branco
    'PA10194': [79.89, 2324.8, 7589.55, 73498.8], // Suporte de Vara Premium Completo - 1,20m; Preto
    'PA11687': [79.89, 2324.8, 7589.55, 73498.8], // Suporte de Vara Premium Completo - 1,20m; Branco
    'PA10195': [86.55, 2518.61, 8222.25, 79626], // Suporte de Vara Premium Completo - 1,35m; Preto
    'PA11697': [86.55, 2518.61, 8222.25, 79626], // Suporte de Vara Premium Completo - 1,35m; Branco
    'PA10196': [93.24, 2713.28, 8857.8, 85780.8], // Suporte de Vara Premium Completo - 1,50m; Preto
    'PA11707': [93.24, 2713.28, 8857.8, 85780.8], // Suporte de Vara Premium Completo - 1,50m; Branco
    'PA12965': [19, 541.5, 1767, 16150], // Adaptador da Secretária - Azul
    'PA12947': [19, 541.5, 1767, 16150], // Adaptador da Secretária - Branco
    'PA12948': [19, 541.5, 1767, 16150], // Adaptador da Secretária - Cinza
    'PA12949': [19, 541.5, 1767, 16150], // Adaptador da Secretária - Preto
    'IPA10197': [19, 541.5, 1767, 16150], // Adaptador de Carretilha Kit com 4 - Branco
    'PA12001': [19, 541.5, 1767, 16150], // Adaptador de Carretilha Kit com 4 - Preto
    'ADP42004': [19, 541.5, 1767, 16150], // Adaptador de Carretilha Kit com 4 - Branco Eco
    'ADP14004': [19, 541.5, 1767, 16150], // Adaptador de Carretilha Kit com 4 - Preto Eco
    'ADP07000004': [27, 769.5, 2511, 22950], // Adaptador de Vara para Suporte de Molinete
    'PA10438': [3.5, 99.75, 325.5, 2975], // Agulha de Tarrafa - 15cm; Azul
    'PA10437': [3.85, 109.73, 358.05, 3272.5], // Agulha de Tarrafa - 20cm; Azul
    '70020706': [6.9, 196.65, 641.7, 5865], // Alicate de Pesca - Amarelo Neon; Amarelo Neon
    '70020815': [7.9, 225.15, 734.7, 6715], // Alicate de Pesca - Glow (brilha no escuro); Glow (brilha no escuro)
    'PA10430': [6.9, 196.65, 641.7, 5865], // Alicate de Pesca - Laranja; Laranja
    'PA10436': [6.9, 196.65, 641.7, 5865], // Alicate de Pesca - Preto; Preto
    'PA12125': [17.9, 510.15, 1664.7, 15215], // Amarra Vara Velcro
    'PA12929': [19.9, 567.15, 1850.7, 16915], // Apoio para Barco com Elástico
    'PA10234': [1.5, 42.75, 139.5, 1275], // Carretel para Chicotes - Amarelo
    'PA10224': [1.5, 42.75, 139.5, 1275], // Carretel para Chicotes - Azul
    'PA10235': [1.5, 42.75, 139.5, 1275], // Carretel para Chicotes - Laranja
    'PA10239': [1.5, 42.75, 139.5, 1275], // Carretel para Chicotes - Preto
    '70060108000140': [0.65, 18.53, 60.45, 552.5], // Carretel Retangular - Azul
    '700601090140': [0.49, 13.97, 45.57, 416.5], // Carretel Retangular - Azul Eco
    '70060109020140': [0.65, 18.53, 60.45, 552.5], // Carretel Retangular - Preto
    '700601140140': [0.49, 13.97, 45.57, 416.5], // Carretel Retangular - Preto Eco
    'WPA2786': [4.45, 126.83, 413.85, 3782.5], // Clip Vara (com fita dupla face)
    'PA10094': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - G; Amarelo
    'PA10097': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - G; Azul Claro
    'PA10109': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - G; Laranja
    'PA10103': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - G; Translúcido
    'PA10121': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - G; Verde
    'PA10124': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - G; Vermelho
    'PA10093': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - M; Amarelo
    'PA10096': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - M; Azul Claro
    'PA10108': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - M; Laranja
    'PA10102': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - M; Translúcido
    'PA10120': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - M; Verde
    'PA10123': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - M; Vermelho
    'PA10092': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - P; Amarelo
    'PA10095': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - P; Azul Claro
    'PA10107': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - P; Laranja
    'PA10101': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - P; Translúcido
    'PA10119': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - P; Verde
    'PA10122': [4.62, 131.67, 429.66, 3927], // Cobrenó P, M e G - P; Vermelho
    'PA10197': [14.04, 400.14, 1305.72, 11934], // Componente do Suporte Premium - Somente copo; Preto
    'PA11667': [14.04, 400.14, 1305.72, 11934], // Componente do Suporte Premium - Somente copo; Branco
    'PA10198': [12.48, 355.68, 1160.64, 10608], // Componente do Suporte Premium - Somente ferradura; Preto
    'PA11657': [12.48, 355.68, 1160.64, 10608], // Componente do Suporte Premium - Somente ferradura; Branco
    'PInt2407': [4, 114, 372, 3400], // Componente do Suporte Slim de borracha - Apoio de Borracha (Reposição)
    'PInt2406': [5, 142.5, 465, 4250], // Componente do Suporte Slim de borracha - Copo de Borracha (Reposição)
    '70070110300909': [5, 142.5, 465, 4250], // Copo Organizador - G; Branco
    '70070110300902': [5, 142.5, 465, 4250], // Copo Organizador - G; Preto
    '70070111230909': [9.69, 276.17, 901.17, 8236.5], // Copo Organizador - Kit:P/M/G; Branco
    '70070111230902': [9.69, 276.17, 901.17, 8236.5], // Copo Organizador - Kit:P/M/G; Preto
    '70070110200909': [3.2, 91.2, 297.6, 2720], // Copo Organizador - M; Branco
    '70070110200902': [3.2, 91.2, 297.6, 2720], // Copo Organizador - M; Preto
    '70070110100909': [2.33, 66.41, 216.69, 1980.5], // Copo Organizador - P; Branco
    '70070110100902': [2.33, 66.41, 216.69, 1980.5], // Copo Organizador - P; Preto
    'PA10322': [5, 142.5, 465, 4250], // Copo para Carretel G - Roxo
    'PA10022': [21.45, 611.33, 1994.85, 18232.5], // Dedeira - Hard - G
    'PA10021': [21.45, 611.33, 1994.85, 18232.5], // Dedeira - Hard - M
    'PA10020': [21.45, 611.33, 1994.85, 18232.5], // Dedeira - Hard - P
    'PA11641': [21.45, 611.33, 1994.85, 18232.5], // Dedeira - Soft - G
    'PA11642': [21.45, 611.33, 1994.85, 18232.5], // Dedeira - Soft - M
    'PA11643': [21.45, 611.33, 1994.85, 18232.5], // Dedeira - Soft - P
    'PA11644': [21.45, 611.33, 1994.85, 18232.5], // Dedeira - Ultrasoft - G
    'PA11645': [21.45, 611.33, 1994.85, 18232.5], // Dedeira - Ultrasoft - M
    'PA11646': [21.45, 611.33, 1994.85, 18232.5], // Dedeira - Ultrasoft - P
    'PA0019': [2.3, 65.55, 213.9, 1955], // Elastricot 150m - Extra Fino
    'PA0018': [2.3, 65.55, 213.9, 1955], // Elastricot 150m - Fino
    '702728010': [190, 5415, 17670, 161500], // Estilingue - Pacote com 10 Unidades; Azul Eco
    '702731010': [190, 5415, 17670, 161500], // Estilingue - Pacote com 10 Unidades; Branco Eco
    '702719010': [190, 5415, 17670, 161500], // Estilingue - Pacote com 10 Unidades; Preto Eco
    'PA12140': [41.4, 1179.9, 3850.2, 35190], // Imã Fix
    'PA10189': [20, 570, 1860, 17000], // Iscador Agulhão
    'PA11460': [14.7, 418.95, 1367.1, 12495], // Iscador Duplo Branco ou Cristal - Cristal
    'WPA2679': [14.7, 418.95, 1367.1, 12495], // Iscador Duplo Branco ou Cristal - Preto
    'PA11459': [12.87, 366.8, 1196.91, 10939.5], // Iscador Preto ou Cristal - Cristal
    'PA10066': [12.87, 366.8, 1196.91, 10939.5], // Iscador Preto ou Cristal - Preto
    'PA12566': [29, 826.5, 2697, 24650], // Kit Suporte Carretilha e Molinete Individual - Preto
    'PA10071': [6.2, 176.7, 576.6, 5270], // Miçanga de Vidro - Pacote com 500; Amarela
    'PA10076': [6.2, 176.7, 576.6, 5270], // Miçanga de Vidro - Pacote com 500; Azul Clara
    'PA10077': [6.2, 176.7, 576.6, 5270], // Miçanga de Vidro - Pacote com 500; Azul Escura
    'PA10079': [6.2, 176.7, 576.6, 5270], // Miçanga de Vidro - Pacote com 500; Cristal
    'PA10080': [6.2, 176.7, 576.6, 5270], // Miçanga de Vidro - Pacote com 500; Laranja
    'PA10084': [6.2, 176.7, 576.6, 5270], // Miçanga de Vidro - Pacote com 500; Vermelha
    'PA10278': [4.36, 124.26, 405.48, 3706], // Micro Snap + Cobre Nó M - 10 unidades de cada; Amarelo
    'PA10280': [4.36, 124.26, 405.48, 3706], // Micro Snap + Cobre Nó M - 10 unidades de cada; Azul Claro
    'PA10282': [4.36, 124.26, 405.48, 3706], // Micro Snap + Cobre Nó M - 10 unidades de cada; Laranja
    'PA10286': [4.36, 124.26, 405.48, 3706], // Micro Snap + Cobre Nó M - 10 unidades de cada; Translúcido
    'PA10288': [4.36, 124.26, 405.48, 3706], // Micro Snap + Cobre Nó M - 10 unidades de cada; Verde
    'PA10289': [4.36, 124.26, 405.48, 3706], // Micro Snap + Cobre Nó M - 10 unidades de cada; Vermelho
    'MSec030800': [6.9, 196.65, 641.7, 5865], // Mini Secretária - Azul
    'MSec0309': [3.9, 111.15, 362.7, 3315], // Mini Secretária - Azul Eco
    'MSec030909': [6.9, 196.65, 641.7, 5865], // Mini Secretária - Branco
    'MSec0342': [3.9, 111.15, 362.7, 3315], // Mini Secretária - Branco Eco
    'MSec0319': [6.9, 196.65, 641.7, 5865], // Mini Secretária - Preto
    'MSec0314': [3.9, 111.15, 362.7, 3315], // Mini Secretária - Preto Eco
    'PA10064': [11, 313.5, 1023, 9350], // Nano Pipe Borracha - Preto
    'PA10418': [8.14, 231.99, 757.02, 6919], // Nó de Correr Kit com 4 peças
    'PA12747': [13, 370.5, 1209, 11050], // Peça plástica do Suporte Horizontal - Somente peça plástica
    'PA10065': [6, 171, 558, 5100], // Pipa Kit com 2
    'PA10220': [6.3, 179.55, 585.9, 5355], // Porta Elastricot - Azul
    'PA10221': [6.3, 179.55, 585.9, 5355], // Porta Elastricot - Laranja
    'PA10214': [6.3, 179.55, 585.9, 5355], // Porta Elastricot - Preto
    'PE70160814': [6.3, 179.55, 585.9, 5355], // Porta Elastricot - Translúcido
    '701742': [35, 997.5, 3255, 29750], // Porta Isca e Chumbada - Branco Eco
    '701714': [35, 997.5, 3255, 29750], // Porta Isca e Chumbada - Preto Eco
    'PA11980': [35, 997.5, 3255, 29750], // Porta Isca e Chumbada - Preto
    'PA10023': [35, 997.5, 3255, 29750], // Porta Isca e Chumbada - Branco
    'PA0168': [2.69, 76.67, 250.17, 2286.5], // Porta Pernada Cano - Apoio Anzol Cano
    'PA11291': [12.83, 365.66, 1193.19, 10905.5], // Porta Pernada Cano - Porta Pernada Completo - 20cm; Azul
    'PA11292': [12.83, 365.66, 1193.19, 10905.5], // Porta Pernada Cano - Porta Pernada Completo - 20cm; Marrom Claro
    'PA11290': [11.84, 337.44, 1101.12, 10064], // Porta Pernada Cano - Porta Pernada Completo - 20cm; Branco
    'PA0159': [14.29, 407.27, 1328.97, 12146.5], // Porta Pernada Cano - Porta Pernada Completo - 30cm; Azul
    'PA0151': [14.29, 407.27, 1328.97, 12146.5], // Porta Pernada Cano - Porta Pernada Completo - 30cm; Marrom Claro
    'PA0143': [13.06, 372.21, 1214.58, 11101], // Porta Pernada Cano - Porta Pernada Completo - 30cm; Branco
    'PA0160': [25.89, 737.87, 2407.77, 22006.5], // Porta Pernada Cano - Porta Pernada Completo - 30cm+30cm; Azul
    'PA0152': [25.89, 737.87, 2407.77, 22006.5], // Porta Pernada Cano - Porta Pernada Completo - 30cm+30cm; Marrom Claro
    'PA0144': [23.43, 667.76, 2178.99, 19915.5], // Porta Pernada Cano - Porta Pernada Completo - 30cm+30cm; Branco
    'PA0161': [15.88, 452.58, 1476.84, 13498], // Porta Pernada Cano - Porta Pernada Completo - 40cm; Azul
    'PA0153': [15.88, 452.58, 1476.84, 13498], // Porta Pernada Cano - Porta Pernada Completo - 40cm; Marrom Claro
    'PA0145': [14.38, 409.83, 1337.34, 12223], // Porta Pernada Cano - Porta Pernada Completo - 40cm; Branco
    'PA0162': [17.47, 497.9, 1624.71, 14849.5], // Porta Pernada Cano - Porta Pernada Completo - 50cm; Azul
    'PA0154': [17.47, 497.9, 1624.71, 14849.5], // Porta Pernada Cano - Porta Pernada Completo - 50cm; Marrom Claro
    'PA0146': [15.71, 447.74, 1461.03, 13353.5], // Porta Pernada Cano - Porta Pernada Completo - 50cm; Branco
    'PA0163': [19.3, 550.05, 1794.9, 16405], // Porta Pernada Cano - Porta Pernada Completo - 60cm; Azul
    'PA0155': [19.3, 550.05, 1794.9, 16405], // Porta Pernada Cano - Porta Pernada Completo - 60cm; Marrom Claro
    'PA0147': [17.23, 491.06, 1602.39, 14645.5], // Porta Pernada Cano - Porta Pernada Completo - 60cm; Branco
    'PA0164': [21, 598.5, 1953, 17850], // Porta Pernada Cano - Porta Pernada Completo - 70cm; Azul
    'PA0156': [21, 598.5, 1953, 17850], // Porta Pernada Cano - Porta Pernada Completo - 70cm; Marrom Claro
    'PA0148': [18.65, 531.53, 1734.45, 15852.5], // Porta Pernada Cano - Porta Pernada Completo - 70cm; Branco
    'PA0165': [22.84, 650.94, 2124.12, 19414], // Porta Pernada Cano - Porta Pernada Completo - 80cm; Azul
    'PA0157': [22.84, 650.94, 2124.12, 19414], // Porta Pernada Cano - Porta Pernada Completo - 80cm; Marrom Claro
    'PA0149': [20.18, 575.13, 1876.74, 17153], // Porta Pernada Cano - Porta Pernada Completo - 80cm; Branco
    'PA0166': [26.38, 751.83, 2453.34, 22423], // Porta Pernada Cano - Porta Pernada Completo - 100cm; Azul
    'PA0158': [26.38, 751.83, 2453.34, 22423], // Porta Pernada Cano - Porta Pernada Completo - 100cm; Marrom Claro
    'PA0150': [23.13, 659.21, 2151.09, 19660.5], // Porta Pernada Cano - Porta Pernada Completo - 100cm; Branco
    'PA11294': [5.94, 169.29, 552.42, 5049], // Porta Pernada Cano - Somente Cano - 20cm; Azul
    'PA11295': [5.94, 169.29, 552.42, 5049], // Porta Pernada Cano - Somente Cano - 20cm; Marrom Claro
    'PA11293': [4.95, 141.08, 460.35, 4207.5], // Porta Pernada Cano - Somente Cano - 20cm; Branco
    'PA0184': [7.4, 210.9, 688.2, 6290], // Porta Pernada Cano - Somente Cano - 30cm; Azul
    'PA10182': [7.4, 210.9, 688.2, 6290], // Porta Pernada Cano - Somente Cano - 30cm; Marrom Claro
    'PA0170': [6.17, 175.85, 573.81, 5244.5], // Porta Pernada Cano - Somente Cano - 30cm; Branco
    'PA0185': [8.99, 256.22, 836.07, 7641.5], // Porta Pernada Cano - Somente Cano - 40cm; Azul
    'PA10183': [8.99, 256.22, 836.07, 7641.5], // Porta Pernada Cano - Somente Cano - 40cm; Marrom Claro
    'PA0171': [7.49, 213.47, 696.57, 6366.5], // Porta Pernada Cano - Somente Cano - 40cm; Branco
    'PA0186': [10.58, 301.53, 983.94, 8993], // Porta Pernada Cano - Somente Cano - 50cm; Azul
    'PA10184': [10.58, 301.53, 983.94, 8993], // Porta Pernada Cano - Somente Cano - 50cm; Marrom Claro
    'PA0172': [8.82, 251.37, 820.26, 7497], // Porta Pernada Cano - Somente Cano - 50cm; Branco
    'PA0187': [12.41, 353.69, 1154.13, 10548.5], // Porta Pernada Cano - Somente Cano - 60cm; Azul
    'PA10185': [12.41, 353.69, 1154.13, 10548.5], // Porta Pernada Cano - Somente Cano - 60cm; Marrom Claro
    'PA0173': [10.34, 294.69, 961.62, 8789], // Porta Pernada Cano - Somente Cano - 60cm; Branco
    'PA0188': [14.11, 402.14, 1312.23, 11993.5], // Porta Pernada Cano - Somente Cano - 70cm; Azul
    'PA10186': [14.11, 402.14, 1312.23, 11993.5], // Porta Pernada Cano - Somente Cano - 70cm; Marrom Claro
    'PA0174': [11.76, 335.16, 1093.68, 9996], // Porta Pernada Cano - Somente Cano - 70cm; Branco
    'PA0189': [15.95, 454.58, 1483.35, 13557.5], // Porta Pernada Cano - Somente Cano - 80cm; Azul
    'PA10187': [15.95, 454.58, 1483.35, 13557.5], // Porta Pernada Cano - Somente Cano - 80cm; Marrom Claro
    'PA0175': [13.29, 378.77, 1235.97, 11296.5], // Porta Pernada Cano - Somente Cano - 80cm; Branco
    'PA0190': [19.49, 555.47, 1812.57, 16566.5], // Porta Pernada Cano - Somente Cano - 100cm; Azul
    'PA10188': [19.49, 555.47, 1812.57, 16566.5], // Porta Pernada Cano - Somente Cano - 100cm; Marrom Claro
    'PA0176': [16.24, 462.84, 1510.32, 13804], // Porta Pernada Cano - Somente Cano - 100cm; Branco
    'PA0167': [4.2, 119.7, 390.6, 3570], // Porta Pernada Cano - Trava Linha Cano (Borracha)
    'PA12181': [18.9, 538.65, 1757.7, 16065], // Porta Pernada Compacto - 30cm; Azul
    'PP1003007': [18.9, 538.65, 1757.7, 16065], // Porta Pernada Compacto - 30cm; Preto
    'PA12182': [28.9, 823.65, 2687.7, 24565], // Porta Pernada Compacto - 50cm; Azul
    'PP1005007': [28.9, 823.65, 2687.7, 24565], // Porta Pernada Compacto - 50cm; Preto
    '410200000005': [30, 855, 2790, 25500], // Porta Pernada e Chicote - Preto
    'PA10226': [59, 1681.5, 5487, 50150], // Resgata Isca
    'PA10045': [8.4, 239.4, 781.2, 7140], // Saca Anzol / Desembuchador - G
    'PA10046': [20.16, 574.56, 1874.88, 17136], // Saca Anzol / Desembuchador - Kit P, M, G
    'PA10044': [8.4, 239.4, 781.2, 7140], // Saca Anzol / Desembuchador - M
    'PA10043': [8.4, 239.4, 781.2, 7140], // Saca Anzol / Desembuchador - P
    'Sec0428': [23, 655.5, 2139, 19550], // Secretária Paredão - Azul
    'Sec0431': [23, 655.5, 2139, 19550], // Secretária Paredão - Branco
    'Sec0419': [23, 655.5, 2139, 19550], // Secretária Paredão - Preto
    'Sec0414': [14.9, 424.65, 1385.7, 12665], // Secretária Paredão - Preto Eco
    'PA10127': [4.39, 125.12, 408.27, 3731.5], // Snap Universal + Cobre nó G - Amarelo
    'PA10129': [4.39, 125.12, 408.27, 3731.5], // Snap Universal + Cobre nó G - Azul Claro
    'PA10131': [4.39, 125.12, 408.27, 3731.5], // Snap Universal + Cobre nó G - Laranja
    'PA10135': [4.39, 125.12, 408.27, 3731.5], // Snap Universal + Cobre nó G - Translúcido
    'PA10137': [4.39, 125.12, 408.27, 3731.5], // Snap Universal + Cobre nó G - Verde
    'PA10138': [4.39, 125.12, 408.27, 3731.5], // Snap Universal + Cobre nó G - Vermelho
    'PA10391': [8.13, 231.71, 756.09, 6910.5], // Stopper Cilíndrico P, M, G - G
    'PA10392': [8.13, 231.71, 756.09, 6910.5], // Stopper Cilíndrico P, M, G - M
    'PA10393': [8.13, 231.71, 756.09, 6910.5], // Stopper Cilíndrico P, M, G - P
    'PA10069': [8.13, 231.71, 756.09, 6910.5], // Stopper Oliva P, M, G - G
    'PA10068': [8.13, 231.71, 756.09, 6910.5], // Stopper Oliva P, M, G - M
    'PA10067': [8.13, 231.71, 756.09, 6910.5], // Stopper Oliva P, M, G - P
    'IPA10087': [42, 1197, 3906, 35700], // Suporte de Vara de Parede - Branco
    '730342': [42, 1197, 3906, 35700], // Suporte de Vara de Parede - Branco Eco
    'PA12742': [40.6, 1157.1, 3775.8, 34510], // Suporte Horizontal Completo - 1,2m
    'PA12743': [36, 1026, 3348, 30600], // Suporte Horizontal Completo - 1m
    'PA12746': [22.2, 632.7, 2064.6, 18870], // Suporte Horizontal Completo - 40cm
    'PA12745': [26.8, 763.8, 2492.4, 22780], // Suporte Horizontal Completo - 60cm
    'PA12744': [32.55, 927.68, 3027.15, 27667.5], // Suporte Horizontal Completo - 85cm
    '740109': [22, 627, 2046, 18700], // Suporte para Molinetes - Azul Eco
    '740114': [22, 627, 2046, 18700], // Suporte para Molinetes - Preto Eco
    'PA10379': [22, 627, 2046, 18700], // Suporte para Molinetes - Preto
    'IPA10198': [22, 627, 2046, 18700], // Suporte para Molinetes - Branco
    'PA11866': [4.5, 128.25, 418.5, 3825], // Tela de Espremer Iscas - Preta
    'PA11865': [4.5, 128.25, 418.5, 3825], // Tela de Espremer Iscas - Laranja
    'PA11864': [4.5, 128.25, 418.5, 3825], // Tela de Espremer Iscas - Azul
    'PA11993': [169, 4816.5, 15717, 143650], // Varal Chumbada - Completo
    'PA12463': [128.92, 3674.22, 11989.56, 109582], // Varal Chumbada - Superior com tubo
  };

  function active() {
    try { if (/[?&]atacado=1\b/.test(location.search)) return true; } catch (e) {}
    return Date.now() <= END;
  }
  function clean(sku) { return String(sku || '').replace(/^'/, ''); }
  function row(sku) { return PRICES[clean(sku)] || null; }
  function eligible(p) {
    return !!(p && p.skuVariants && p.skuVariants.some(function (v) { return row(v.sku); }));
  }
  function brl(n) {
    return 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function fmtQty(q) { return q >= 1000 ? '1.000' : String(q); }

  var CSS = '' +
    '.atc-ribbon{position:absolute;left:10px;bottom:10px;z-index:3;padding:4px 10px;border-radius:999px;background:#0f9d6b;color:#fff;font-size:11.5px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;box-shadow:0 4px 12px rgba(0,0,0,.3)}' +
    '.atc-box{margin:18px 0;padding:16px 16px 12px;border:1px solid rgba(15,157,107,.55);border-radius:14px;background:rgba(15,157,107,.08)}' +
    '.atc-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 4px}' +
    '.atc-title{margin:0;font-size:15px;font-weight:800;letter-spacing:.02em}' +
    '.atc-tag{padding:2px 8px;border-radius:999px;background:#0f9d6b;color:#fff;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.04em}' +
    '.atc-sub{margin:0 0 10px;font-size:12.5px;opacity:.75}' +
    '.atc-table{width:100%;border-collapse:collapse;font-size:14px}' +
    '.atc-table th{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;opacity:.65;text-align:left;padding:4px 6px}' +
    '.atc-table td{padding:8px 6px;border-top:1px solid rgba(127,127,127,.25);vertical-align:top}' +
    '.atc-table td:nth-child(2),.atc-table td:nth-child(3),.atc-table th:nth-child(2),.atc-table th:nth-child(3){text-align:right}' +
    '.atc-unit{font-weight:800;white-space:nowrap}' +
    '.atc-off{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:6px;background:#0f9d6b;color:#fff;font-size:11px;font-weight:800}' +
    '.atc-total{white-space:nowrap}' +
    '.atc-save{display:block;font-size:11.5px;color:#13b27a;white-space:nowrap}' +
    '.atc-note{margin:8px 0 0;font-size:12px;opacity:.7}' +
    '.atc-out{margin:0;font-size:13px;opacity:.8}' +
    '@media (max-width:480px){.atc-table{font-size:13px}.atc-table td,.atc-table th{padding-left:3px;padding-right:3px}.atc-off{display:block;margin:2px 0 0 auto;width:max-content}}';
  function injectCss() {
    if (document.getElementById('atc-css')) return;
    var s = document.createElement('style'); s.id = 'atc-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tableHtml(r) {
    var unit = r[0];
    var body = KITS.map(function (q, i) {
      var total = r[i + 1];
      // a planilha arredonda o preco de cada unidade PARA CIMA no centavo (14.812/1000 -> 14,82)
      var each = Math.ceil(Math.round(total / q * 1e6) / 1e4) / 100;
      var off = Math.round((1 - total / (unit * q)) * 100);
      var save = Math.round((unit * q - total) * 100) / 100;
      return '<tr><td>Kit ' + fmtQty(q) + ' un.</td>' +
        '<td><span class="atc-unit">' + brl(each) + '</span>' + (off > 0 ? '<span class="atc-off">-' + off + '%</span>' : '') + '</td>' +
        '<td><span class="atc-total">' + brl(total) + '</span>' + (save > 0 ? '<span class="atc-save">economiza ' + brl(save) + '</span>' : '') + '</td></tr>';
    }).join('');
    return '<table class="atc-table"><thead><tr><th>Kit</th><th>Cada unidade</th><th>Total do kit</th></tr></thead><tbody>' + body + '</tbody></table>' +
      '<p class="atc-note">Preço atual da unidade: ' + brl(unit) + '. Válido até 30/11 — combine o kit pelo WhatsApp.</p>';
  }

  window.ATACADO = {
    active: active,
    priceRow: row,
    eligible: function (p) { return active() && eligible(p); },
    ribbon: function (p) {
      if (!active() || !eligible(p)) return '';
      injectCss();
      return '<span class="atc-ribbon">Atacado</span>';
    },
    afterDetail: function (p) {
      if (!active() || !eligible(p) || typeof findSkuEntry !== 'function') return;
      injectCss();
      var box = document.createElement('div');
      box.className = 'info-section atc-box';
      box.id = 'atacado-box';
      box.innerHTML = '<div class="atc-head"><h2 class="atc-title">Preço de atacado</h2><span class="atc-tag">Promoção de novembro</span></div>' +
        '<p class="atc-sub">Preço de cada unidade comprando o kit fechado.</p><div class="atc-body"></div>';
      var bodyEl = box.querySelector('.atc-body');
      var host = document.querySelector('.selecao-add-row');
      var colors = document.getElementById('section-colors');
      var vars = document.getElementById('section-vars');
      if (host && host.parentNode) host.parentNode.insertBefore(box, host);
      else if (vars || colors) (vars || colors).after(box);
      else return;

      function refresh() {
        var off = window.BN_ACC && window.BN_ACC.offName && window.BN_ACC.offName(p);
        var i = state.selectedVariation[p.id];
        var varLabel = p.vars && p.vars[i] ? p.vars[i][0] : '';
        var entry = off ? null : findSkuEntry(p, state.selectedColor[p.id] || '', varLabel);
        var r = entry && row(entry.sku);
        bodyEl.innerHTML = r ? tableHtml(r)
          : '<p class="atc-out">Esta ' + (colors && vars ? 'cor/opção' : colors ? 'cor' : 'opção') +
            ' não entra na promoção de atacado. Escolha outra para ver o preço do kit.</p>';
      }
      [colors, vars].forEach(function (s) { if (s) s.addEventListener('click', function () { setTimeout(refresh, 0); }); });
      document.addEventListener('click', function h(e) {
        if (!document.body.contains(box)) { document.removeEventListener('click', h); return; }
        if (e.target.closest && e.target.closest('.bn-offpattern-chip')) setTimeout(refresh, 0);
      });
      refresh();
    }
  };
})();
