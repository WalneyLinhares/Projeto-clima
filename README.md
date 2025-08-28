Sistema de Clima

Este é um sistema simples de clima, desenvolvido em HTML, CSS e JavaScript puro, que permite pesquisar o clima de uma cidade usando a [OpenWeather API](https://openweathermap.org/).

Funcionamento
- O usuário digita o nome da cidade e o sistema exibe as informações de clima.
- Caso **não exista uma chave de API configurada**, o sistema exibirá automaticamente os dados de uma **cidade de exemplo**.
- Se a chave da OpenWeather for configurada, o sistema passa a buscar os dados reais da cidade digitada.

Configuração da API
Para utilizar a API da OpenWeather:

1. Crie uma conta gratuita em: https://home.openweathermap.org/api_keys
2. Copie sua **API Key**.
3. No código, localize a variável `apikey` e insira sua chave:

```js
// Exemplo
const apikey = "SUA_CHAVE_AQUI";
