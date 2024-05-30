# OrError

A biblioteca OrError fornece uma classe para lidar com erros em JavaScript/TypeScript de uma maneira estruturada e flexível. Ela permite criar objetos de erro
com diferentes níveis de gravidade, dados adicionais e emitir eventos associados aos erros.

## Instalação

A biblioteca pode ser instalada via npm usando o seguinte comando:

```bash
npm i orerror
```

## Uso Básico

Para utilizar a biblioteca, importe a classe OrError em seu código e instancie-a conforme necessário. Abaixo está um exemplo de uso básico:

```typescript
import { OrError, OrErrorEvent } from "orerror";

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

try {
    // Lançando um erro
    // Um evento "error" será emitido com os todos os atributos do erro
    // Por padrão ele retorna esses atributos na messagem do erro: message, data, level, status, timestamp
    error.throw();
    // Mensagem de saída:
    // {
    //     message: "Erro interno do servidor",
    //     data: { additionalInfo: "Alguma informação adicional" },
    //     level: 'error',
    //     status: 500
    // }
    //
} catch (err) {
    console.error(err);
}

OrErrorEvent.on("error", error => {
    // Todo erro lançado será capturado aqui
    console.error("Erro:", error.message);
});
```

## Customização

A classe OrError permite personalizar mensagem de erro e os eventos emitidos.

Você pode especificar quais atributos devem ser incluídos na mensagem de erro e/ou quais eventos devem ser emitidos.

Abaixo estão alguns exemplos de como fazer isso:

```typescript
// Personalizar a saida do erro
// Um evento "error" será emitido com os todos os atributos do erro
error.throw({ message: true, level: true, status: true, timestamp: false });
// Mensagem de saída:
// {
//     message: "Erro interno do servidor",
//     level: 'error',
//     status: 500
// }
//

//
// Lançando apenas um evento específico
error.emit({ code: true });
// Um evento "INTERNAL_ERROR" será emitido com os todos os atributos do erro
//

//
// Lançando um erro e emitindo um evento específico
error.emit({ code: true }).throw();
// Um evento "INTERNAL_ERROR" será emitido com os todos os atributos do erro
// Um evento "error" será emitido com os todos os atributos do erro
//

//
// Lançando um evento padrão e um evento específico
error.emit({ code: true, error: true });
// Um evento "INTERNAL_ERROR" será emitido com os todos os atributos do erro
// Um evento "error" será emitido com os todos os atributos do erro
```

## Métodos

**throw(output?): never** Este método lança o erro. Ele pode opcionalmente receber um objeto TypeErrorMessageOutput para personalizar a mensagem de erro.

**emitEvent(): void** Emite um evento com todos os detalhes do erro como um objeto `TOrError`.

**getAll(): TOrError** Retorna todos os detalhes do erro como um objeto `TOrError`.

**getError(atts?): TOrError** Retorna os detalhes do erro como um objeto `TOrError` com apenas os atributos especificados em `atts`.

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

`error`: Emitido sempre que um erro é lançado.

`valor_atributo`: Emitido quando um erro específico é lançado. Os eventos específicos são nomeados com base no valor dos atributos do erro. Por exemplo, se o
código do erro for "INTERNAL_ERROR", o evento emitido será "INTERNAL_ERROR"

## Exemplo

```typescript
import { OrError, OrErrorEvent } from "orerror";

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

OrErrorEvent.on("error", error => {
    // Todo erro lançado será capturado aqui
});

OrErrorEvent.on("RESOURCE_NOT_FOUND", error => {
    // Erros específicos podem ser capturados aqui
    console.error("Erro específico:", error.message);
});
```
