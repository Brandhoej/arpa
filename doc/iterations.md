# Iterations
In this section different iterations is covered in reverse chronological order.

## Backlog
---
 * Tree structure for command layout handling. This can enable quicker searches.
 * Triggers which are just boolean variables but with a default value of false and they are set to true if they are defined.
 * The command object should first be parsed such that it contains as little information as possible. (eg. triggers are converted to variables).
 * Scanner support for backslash inside strings such that the string can contain possible cases

## 0.0.1 (WIP)
---
This version supports commands with a basic layout and variables.

### Requirements
 * command-collection
   * Must be able to store a large amount of COs in an array.
   * Must be able to validate commands before adding them
 * Processor (Refactor): RCO
   * Refactors the CO to a RCO
 * Validator
   * Validates based on rules wheter the RCO is valid
   * Validate wheter RCOs are the same
 * Scanner
   * Scanner does lexical analysis and must support '-', identifiers, numbers, booleans, strings.
 * co-parser
   * Parses a tokeniation of a CO layout to a [<<string[]>>]
 * arg-concatenator
   * Concatenates an any[] to a complete string
 * arg-parser: CFO
   * Takes a arg-concatenated string tokennization and parses it to a CFO
 * Runner
   * Takes arguments and a command handler to execute async
 * Finder: CO
   * Takes a CFO and findes the matching CO if any
   * This can be injected into the command-collection
 * Token
   * Must support literals, identifiers and '-'
   * Must store the index of the first charater
   * Must have a length getter