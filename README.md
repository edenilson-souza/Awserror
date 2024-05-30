# OrError

The OrError library provides a class for handling errors in JavaScript/TypeScript in a structured and flexible manner. It allows the creation of error objects
with different levels of severity, additional data, and the emission of events associated with the errors.

## Installation

The library can be installed via npm using the following command:

```bash
npm i orerror
```

## Basic Usage

To use the library, import the OrError class into your code and instantiate it as needed. Below is an example of basic usage:

```typescript
import { OrError, OrErrorEvent } from "orerror";

// Creating a new error
const error = new OrError({
    message: "Internal server error",
    level: "error",
    status: 500,
    code: "INTERNAL_ERROR",
    entity: "Server",
    action: "Start",
    data: { additionalInfo: "Some additional information" },
    created_by: "System XYZ"
});

try {
    // Throwing an error
    // An "error" event will be emitted with all the error attributes
    // By default, it returns these attributes in the error message: message, data, level, status, timestamp
    error.throw();
    // Output message:
    // {
    //     message: "Internal server error",
    //     data: { additionalInfo: "Some additional information" },
    //     level: 'error',
    //     status: 500
    // }
    //
} catch (err) {
    console.error(err);
}

OrErrorEvent.on("error", error => {
    // Every thrown error will be captured here
    console.error("Error:", error.message);
});
```

## Customization

The OrError class allows customization of error messages and emitted events.

You can specify which attributes should be included in the error message and/or which events should be emitted.

Below are some examples of how to do this:

```typescript
// Customize the error output
// An "error" event will be emitted with all the error attributes
error.throw({ message: true, level: true, status: true, timestamp: false });
// Output message:
// {
//     message: "Internal server error",
//     level: 'error',
//     status: 500
// }
//

//
// Emitting only a specific event
error.emit({ code: true });
// An "INTERNAL_ERROR" event will be emitted with all the error attributes
//

//
// Throwing an error and emitting a specific event
error.emit({ code: true }).throw();
// An "INTERNAL_ERROR" event will be emitted with all the error attributes
// An "error" event will be emitted with all the error attributes
//

//
// Emitting a default event and a specific event
error.emit({ code: true, error: true });
// An "INTERNAL_ERROR" event will be emitted with all the error attributes
// An "error" event will be emitted with all the error attributes
```

## Methods

**throw(output?): never** This method throws the error. It can optionally receive a TypeErrorMessageOutput object to customize the error message.

**emitEvent(): void** Emits an event with all the error details as a `TOrError` object.

**getAll(): TOrError** Returns all the error details as a `TOrError` object.

**getError(atts?): TOrError** Returns the error details as a `TOrError` object with only the attributes specified in atts.

**getMessage(): string** Returns the formatted error message, including the severity level.

## Types

`TOrError` This type represents the structure of an error object and includes the following fields:

-   message (string): The error message.
-   level (string, optional): The severity level of the error.
-   status (number, optional): The HTTP status code associated with the error.
-   code (string, optional): A unique code to identify the type of error.
-   entity (string, optional): The entity affected by the error.
-   action (string, optional): The action that was being performed when the error occurred.
-   data (any, optional): Additional data related to the error.
-   timestamp (Date, optional): The timestamp of the error.
-   created_by (string, optional): The system or component that created the error.
-   system (string, optional): The name of the system where the error occurred.
-   stack (string, optional): The stack trace of the error.

`TypeErrorMessageOutput` This type represents the available options for customizing the error message when throwing an error. It includes the following boolean
fields:

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

## Events

The OrError class emits the following events:

`error`: Emitted whenever an error is thrown.

`attribute_value`: Emitted when a specific error is thrown. Specific events are named based on the value of the error attributes. For example, if the error code
is "INTERNAL_ERROR", the emitted event will be "INTERNAL_ERROR".

## Example

```typescript
import { OrError, OrErrorEvent } from "orerror";

// Function to simulate access to a resource on the server
function accessResource(resource: string): void {
    if (resource !== "valid") {
        new OrError({
            message: "Error accessing resource",
            level: "error",
            status: 404,
            code: "RESOURCE_NOT_FOUND",
            data: { resource },
            created_by: "User XYZ"
        }).throw();
    } else {
        console.log("Resource accessed successfully!");
    }
}

// Attempt to access an invalid resource
try {
    accessResource("invalid");
} catch (err) {
    console.error("Error:", err.message);
}

// Attempt to access a valid resource
try {
    accessResource("valid");
} catch (err) {
    console.error("Error:", err.message); // Should not reach this line
}

OrErrorEvent.on("error", error => {
    // Any error thrown will be captured here
});

OrErrorEvent.on("RESOURCE_NOT_FOUND", error => {
    // Specific errors can be captured here
    console.error("Specific Error:", error.message);
});
```
