export function formatSessionTitle(title: string, options?: { prefix?: string }): string {
	const truncatedTitle = title.slice(0, 80)
	const prefix = options?.prefix

	if (!prefix || truncatedTitle.startsWith(prefix)) return truncatedTitle

	return `${prefix}${truncatedTitle}`
}
