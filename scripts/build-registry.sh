#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGING_DIR="$(mktemp -d)"

cleanup() {
	rm -rf "$STAGING_DIR"
}

trap cleanup EXIT

rm -rf "$ROOT/dist"
mkdir -p "$STAGING_DIR/files"

cp "$ROOT/registry.json" "$STAGING_DIR/registry.json"
cp -R "$ROOT/src" "$STAGING_DIR/files/src"

ocx build "$STAGING_DIR" --cwd "$STAGING_DIR" --out "$ROOT/dist"
node "$ROOT/scripts/sync-dist-component-versions.mjs"

mkdir -p "$ROOT/dist/.well-known"
cp "$ROOT/.well-known/ocx.json" "$ROOT/dist/.well-known/ocx.json"
