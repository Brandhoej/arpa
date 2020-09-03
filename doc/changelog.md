# Changelog
In this section the change log is covered in reverse chronological order.

The intent for this codument is to make it easier for the users and contributers to see precisely what notable changes have been made between each release (or version) of this project.

## Sections
 * Added - The added functionality or feature.
 * Changed - Changes functionality or feature.
 * Removed - The removal of a functionality or feature.
 * Fixed - Bug, usability and other fixes.
 * Deprecated - For no longer in use functionality or feature.
 * Security - Changes or additions made based on security.

## Layout
[Version][Sections...][Entries...]

An etry must be formatted in an unordered manner with the component in bold followed by a colon and then a short description. The same components must follow one and another.

Eg.

**Added**
 * **Scanner:**  Literals now can contain special utf character such as æøå.

## 0.0.1
### Added
### Changed
### Removed
### Fixed
### Deprecated
### Security

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