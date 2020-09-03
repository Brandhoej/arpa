# Doc

## System definition
---
A CLI command handler which can improve how different paths based on CLI arguments are chosen with weight on useability and efficiency. The system can both be used with a virtual CLI and a console/terminal. The system is aimed towards programmers and it assists them in keeping there code clean by decoupling the command handling. The efficiency of the system shall be based on "bad" hardware and must perform without begin noticeable and the system must not use any dependecies other than them used under development. The system useability is ensured by hidding main functionality to the user, only a small subset of functions should be visible through the entry point. The system must support node but also other environments.

## Command precedence
---
The command executed is the one with most matches and if any is optional then it will prioritize another if it's precise.

eg. The collector contains the following command layout:
 1. 'run'   
 2. 'run test all'  
 3. 'run test some'  

|Input                  |Command                    |
|-----------------------|---------------------------|
|['run']                |1                          |
|['run', 'test']        |101 - ERR_COMMAND_NOT_FOUND|
|['run', 'test', 'all'] |2                          |
|['run', 'test', 'some']|3                          |

## Rules
---
Command layout:  
 * Any word must not be shared with command variables ('prefix + declaration.key + postfix' with command layout).
 * Words must be indentifer tokens.

Command variables:  
 * pre- and postfix must be composed of 0 or many '-' characters.
 * The seperator can be a space or '=' or any other string but not an identifer.
 * Must not share 'prefix + declaration.key + postfix' with command layout.

## Objects
---
The used syntax in the definitions:  
Composition:  
|Encapsulation      | Definition                   |
|-------------------|------------------------------|
|< >                |0 or many                     |  
|<< >>              |1 or many                     |  
|<n< >m>            |at least n and at most m      |  

### Command Object (CO)
Notes about the bindings found in the CO
 * layout: space seperated words.

```
{
    layout: string,
    variables: {
        prefix: string,
        postfix: string,
        seperator: string,
        defintions: object[
            <{
                key: string,
                default: any,
                description: string | undefined
            }>
        ],
    }
    handler: function(args: { <key: string: any> }) : void | object | string | number,
    description: string | undefined
}
```

### Refactored Command Object (RCO)
The refactoring from CO to RCO is based on the following action:  
 * The pre- and postfix of variables are moved into the variable declaration instead of being generic for all variable declarations. 
   * The reasoning behind this action is that triggers (WIP) will also be implemented as a variable in the RCO but not in the CO and they may not use the same pre- and postfix as variables. eg. variables use the prefix '-' and trigger use '--' but all in all triggers are just variables of type boolean with a default of false and they are set to true when the are declared in the arguments.
* The seperator is the is the 'key + seperator + value' for the variable initilaization.

```
{
    layout: string,
    variables: {
        defintions: object[
            <{
                key: string,
                prefix: string,
                postfix: string,
                seperator: string,
                default: any,
                description: string | undefined
            }>
        ],
    }
    handler: function(args: { <key: string: any> }) : void | object | string | number,
    description: string | undefined
}
```

### Command Finder Object (CFO)
Notes:  
 * The layout in the CFO is an array of multiple arrays containing multiple strings.
   * The reasoning behind this is that multiple values might mean the same in the CO layout (WIP). eg. run and execute and start might mean the same. This might be represented in the CO layout as '(run|execute|start) (mysql|mariadb)' and converted to a CFO it is [['run', 'execute', 'start'], ['mysql','mariadb'], ...]. If the user input the arguments ['run', 'mysql'] then it's CFO will be [['run'], ['mysql']].

```
{
    layout: [<<string[]>>],
    variables: {
        <key: string: any>
    }
}
```

## Tokens
---
|Type      |Definition                      |Lexeme    |Literals|
|----------|--------------------------------|----------|--------|
|Identifier|/[a-zA-Z]+/g                    |'abc'     |'abs'   |
|Dash      |<<'-'>>                         |'-'       |'-'     |
|Number    |/(-?.?[0-9]+)(e?(-?.?[0-9]+)?)/g|'123e-.1  |334.2...|
|String    ||||
|Boolean   ||||

## Codes
---
 * 1xx - ERR_*
   * 101 - ERR_COMMAND_NOT_FOUND (The Finder did not find a corresponding command based on the CLI arguments)
   * 102 - ERR_MISSING_COMMAND_BINDING (A binding in the command object passed to arpa is missing some information)
 * 2xx - WAR_*
 * 3xx - MSG_*

## Flow
The flow for **adding a CO** to the collection:  
collector → (refactor => RCO) → validator → scanner → (co-parser => CFO)

The flow for **parsing a CO to CFP**:  
scanner → (co-parser => CFO)


The flow for **parsing CLI arguments to CFP**:  
scanner → (arg-parser => CFO)

The flow for **executing CLI arguments**:  
runner → scanner → (arg-parser => CFO) → (finder => CO)

## How to's
---
### How to add a command
### How to execute a command based on CLI arguments