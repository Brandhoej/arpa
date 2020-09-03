# Iterations
In this section different iterations is covered in reverse chronological order.

## Backlog
---
 * Tree structure for command layout handling. This can enable quicker searches.
 * Triggers which are just boolean variables but with a default value of false and they are set to true if they are defined.
 * The command object should first be parsed such that it contains as little information as possible. (eg. triggers are converted to variables).

## 0.0.1 (WIP)
---
This version is the minimal viable product (MVP).

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