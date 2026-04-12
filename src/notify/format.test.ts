import { describe, expect, test } from "bun:test"
import { formatSessionTitle } from "./format"

describe("formatSessionTitle", () => {
	test("adds the prefix when the title does not already have it", () => {
		expect(formatSessionTitle("Solidago vs Vocdoni", { prefix: "OC | " })).toBe(
			"OC | Solidago vs Vocdoni",
		)
	})

	test("does not duplicate an existing prefix", () => {
		expect(formatSessionTitle("OC | Solidago vs Vocdoni", { prefix: "OC | " })).toBe(
			"OC | Solidago vs Vocdoni",
		)
	})

	test("truncates titles before returning them", () => {
		const longTitle = "x".repeat(90)

		expect(formatSessionTitle(longTitle)).toBe("x".repeat(80))
	})
})
