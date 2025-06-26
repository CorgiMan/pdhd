import { Translations } from './index.js'
import { assertEquals, assertPromiseThrows, assertThrows } from '@/utils/assert.js'

const testTranslations = {
    'en': {
        postCount: {
            0: 'You have no posts',
            1: 'You have one post',
            2: 'You have two posts',
            '': 'You have {} posts',
        },
    },
}

Deno.test('i18n', async () => {
    assertThrows(() => new Translations().translate('en', 'postCount', 1), Error, 'Translations not loaded')
    await assertPromiseThrows(new Translations().setup({ translations:{key: {}}, listen: async ()=>{}, fetch: async ()=>{} }), 'Language "key" is reserved')

    const translations = await new Translations().setup({translations:testTranslations, listen: async ()=>{}, fetch: async ()=>{}})
    const t = translations.translate.bind(translations)
    assertEquals(t('en', 'postCount', 1), 'You have one post')
    assertEquals(t('en', 'postCount', 4), 'You have 4 posts')
    assertEquals(t('key', 'postCount', 4), 'postCount.4')

    assertThrows(() => t(123, 'postCount', 1), Error, 'Language not string: 123')
    assertThrows(() => t('en', 123, 1), Error, 'Translation key not string: 123')
    assertThrows(() => t('en', 'keyNoExist', 5), Error, 'Translation keyNoExist not found in language en')
    assertThrows(() => t('en', 'postCount'), Error, 'Translation postCount: "You have {} posts" expects more arguments, {} expects argument 0')
})
