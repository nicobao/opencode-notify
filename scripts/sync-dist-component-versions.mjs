import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const registryPath = path.join(root, "registry.json")
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))

for (const component of registry.components) {
	const manifestPath = path.join(root, "dist", "components", `${component.name}.json`)
	const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
	const versionEntries = Object.entries(manifest.versions ?? {})

	if (versionEntries.length !== 1) {
		throw new Error(`Expected exactly one generated version in ${manifestPath}`)
	}

	const [, manifestVersion] = versionEntries[0]
	manifest.versions = { [registry.version]: manifestVersion }
	manifest["dist-tags"] = {
		...(manifest["dist-tags"] ?? {}),
		latest: registry.version,
	}

	fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
}
