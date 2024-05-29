# OrError 2

A biblioteca OrError fornece uma classe para lidar com erros em JavaScript/TypeScript de uma maneira estruturada e flexível. Ela permite criar objetos de erro
com diferentes níveis de gravidade, dados adicionais e emitir eventos associados aos erros.

## Instalação

A biblioteca pode ser instalada via npm usando o seguinte comando:

```bash
npm i or-error
```

## Uso Básico

Para utilizar a biblioteca, importe a classe OrError em seu código e instancie-a conforme necessário. Abaixo está um exemplo de uso básico:

import { OrError } from 'or-error';

```typescript
// Criando um novo erro
const error = new OrError({
    message: "Erro interno do servidor",
    level: "error",
    status: 500,
    code: "INTERNAL_ERROR",
    entity: "Servidor",
    action: "Iniciar",
    data: { additionalInfo: "Alguma informação adicional" },
    created_by: "Sistema XYZ"
});

// Lançando o erro
try {
    error.throw();
} catch (err) {
    console.error(err);
}
```

## Métodos

**throw(output?: TypeErrorMessageOutput): never** Este método lança o erro. Ele pode opcionalmente receber um objeto TypeErrorMessageOutput para personalizar a
mensagem de erro.

**getAll(): TOrError** Retorna todos os detalhes do erro como um objeto `TOrError`.

**getMessage(): string** Retorna a mensagem formatada do erro, incluindo o nível de gravidade.

## Tipos

`TOrError` Este tipo representa a estrutura de um objeto de erro e inclui os seguintes campos:

-   message (string): A mensagem de erro.
-   level (string, opcional): O nível de gravidade do erro.
-   status (number, opcional): O código de status HTTP associado ao erro.
-   code (string, opcional): Um código único para identificar o tipo de erro.
-   entity (string, opcional): A entidade afetada pelo erro.
-   action (string, opcional): A ação que estava sendo executada quando o erro ocorreu.
-   data (any, opcional): Dados adicionais relacionados ao erro.
-   timestamp (Date, opcional): O timestamp do erro.
-   created_by (string, opcional): O sistema ou componente que criou o erro.
-   system (string, opcional): O nome do sistema onde o erro ocorreu.
-   stack (string, opcional): O stack trace do erro.

`TypeErrorMessageOutput` Este tipo representa as opções disponíveis para personalizar a mensagem de erro ao lançar um erro. Ele inclui os seguintes campos
booleanos:

-   level
-   status
-   code
-   entity
-   action
-   data
-   timestamp
-   created_by
-   system
-   stack

## Eventos

A classe OrError emite os seguintes eventos:

`error`: Emitido sempre que um erro é lançado. `codigo_de_erro`: Emitido quando um erro específico é lançado, com o `code` correspondente como nome do evento.

## Exemplo

```typescript
import { OrError } from "or-error";

// Função para simular acesso a um recurso no servidor
function accessResource(resource: string): void {
    if (resource !== "valido") {
        return new OrError({
            message: "Erro ao acessar recurso",
            level: "error",
            status: 404,
            code: "RESOURCE_NOT_FOUND",
            data: { resource },
            created_by: "Usuário XYZ"
        }).throw();
    } else {
        console.log("Recurso acessado com sucesso!");
    }
}

// Tentativa de acessar um recurso inválido
try {
    accessResource("invalido");
} catch (err) {
    console.error("Erro:", err.message);
}

// Tentativa de acessar um recurso válido
try {
    accessResource("valido");
} catch (err) {
    console.error("Erro:", err.message); // Não deve alcançar esta linha
}
```
