import { ms, seconds, us } from './time.js'
import { assertEquals, assertThrows } from '@/utils/assert.js'

Deno.test('time functions', () => {
    assertEquals(us('1s'), 1e6)
    assertEquals(us('1m'), 60e6)
    assertEquals(ms('1h'), 3600000)
    assertEquals(ms('1d'), 86400000)
    assertEquals(seconds('1w'), 604800)
    assertEquals(seconds('1y'), 31556926)
    assertThrows(() => us('1x'), Error, 'Invalid time string 1x')
    assertThrows(() => us('xs'), Error, 'Invalid time string xs')
    assertThrows(() => us('1'), Error, 'Invalid time string 1')
    assertThrows(() => us(''), Error, 'Invalid time string ')
})
