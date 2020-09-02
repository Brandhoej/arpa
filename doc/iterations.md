# Iterations
In this section different iterations is covered in reverse chronological order.

## 0.0.1 (WIP)
### Component changes
 * Reporter
   * Handles basic message support.
 * Scanner
   * Can scan some special characters, literals (string, nubmer, boolean), identifiers.
 * Parser
   * Can parse string, number, boolean types.
   * Can parse the CLI input based on a command input (It can parse the variables). 
 * Runner
   * Can take CLI arguments as input and invoke the handler for the correct command if one was found.
 * Finder
   * Can find the correct command based on CLI arguments.
 * arpa
   * Commands can be added to a dynamic collection.
   * A function 'run' which takes CLI arguments, then it calls the finder and then the runner.

### Functional
 * The runner should be able to handle multiple commands.
 * The command object should support:
   * "Layout" defining the "static" text (Not positional variables).
   * A handler as a binded arrow function.
 * Command variables should support:
   * Optional default values for optional variables.
   * Pre- and postfix string. (Read doc for supported characters)
 * The scanner should be able to create token types for:
   * Whitespace - Is used as a seperator. (Consider that the whitespace token should not contain the amount of whitespace. Just like a semicolon is a single character)
   * Dash (-) - Is used as a special character for pre- and postfix (eg. --show-messages, here '--' is the prefix and the trigger (in this case) will be stored with the key 'show-message', ignoring the prefix).
 * The handler should be invoked by the runner with parsed arguments which is a structured object with key value paris.
 * Variables should be stored as key value pairs where only the name (excluding the pre- and postfix characters).
 * Base reporter for reporting scanner, parser and runner messages.
 * Async invocation of the handler function.
 * Reporter which can handle error codes

### Non-functional
 * When the console reporter reports the log must contain the type of message first.
 * Parsing of command objects should only happen once.
 * Searching for a command should not be noticeable.

### Error codes
 * 1xx - ERR_*
   * 101 - ERR_NOCOMMANDFOUND (The Finder did not find a corresponding command based on the CLI arguments)
   * 102 - ERR_MISSINGCOMMANDBINDING (A binding in the command object passed to arpa is missing some information)
 * 2xx - WAR_*
 * 3xx - MSG_*

## Upcoming features
 * Tree structure for command layout handling. This can enable quicker searches.
 * Triggers which are just boolean variables but with a default value of false and they are set to true if they are defined.
 * The command object should first be parsed such that it contains as little information as possible. (eg. triggers are converted to variables).