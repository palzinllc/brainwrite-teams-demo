// npm run validate — checks every library file in this checkout.
//
// The rules live in validate-core.mjs (no file system access), shared with
// the teams.brainwrite.in site. This file only reads the checkout into
// memory and prints the result.
import { existsSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { validateLibrary } from "./validate-core.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Repository path -> UTF-8 text for catalog.json, packages/ and teams/ (recursively). */
export function readLibrary(libraryRoot) {
  const files = new Map();
  const add = (path) => {
    try {
      files.set(path, readFileSync(join(libraryRoot, path), "utf8"));
    } catch {
      // Missing or unreadable: the validator reports it where a rule needs it.
    }
  };
  if (existsSync(join(libraryRoot, "catalog.json"))) add("catalog.json");
  const walk = (directory) => {
    let entries;
    try {
      entries = readdirSync(join(libraryRoot, directory), { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) add(path);
    }
  };
  walk("packages");
  walk("teams");
  let teamFolders = [];
  try {
    teamFolders = readdirSync(join(libraryRoot, "teams"), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch {
    // No teams/ folder: nothing to cross-check.
  }
  return { files, teamFolders };
}

export function runValidation(libraryRoot) {
  const { files, teamFolders } = readLibrary(libraryRoot);
  return validateLibrary(files, { teamFolders });
}

/** True when this file is the program being run (also through a symlinked path). */
function isMain() {
  if (!process.argv[1]) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isMain()) {
  const result = runValidation(root);
  if (result.summary) console.log(result.summary);
  if (result.errors.length > 0) {
    for (const error of result.errors) console.error(`- ${error}`);
    process.exitCode = 1;
  }
}
