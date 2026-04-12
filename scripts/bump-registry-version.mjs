import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const registryPath = path.join(root, "registry.json")
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))

const versionMatch = /^(\d+)\.(\d+)\.(\d+)$/.exec(registry.version)
if (!versionMatch) {
	throw new Error(`Unsupported registry version: ${registry.version}`)
}

const nextVersion = `${versionMatch[1]}.${versionMatch[2]}.${Number(versionMatch[3]) + 1}`
registry.version = nextVersion

fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`)
process.stdout.write(`${nextVersion}\n`)
