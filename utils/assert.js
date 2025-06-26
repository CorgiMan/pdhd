export * from 'jsr:@std/assert'
import { assertStringIncludes } from 'jsr:@std/assert'
import { createHttpError } from 'oak'

export async function assertPromiseThrows(promise, expectedMessage) {
    try {
        await promise
    } catch (e) {
        assertStringIncludes(e.message, expectedMessage)
        return
    }
    throw new Error('Function did not throw')
}

export function assertFound(item, varName) {
    if (!item) throw new createHttpError(404, `${varName} not found`)
}

export function assertOkRequest(condition, message) {
    if (!condition) throw new createHttpError(400, message)
}
