import {replaceStr} from "./replace-str";

describe('replace-str', () => {
  test('single replacement', () => {
    const template = 'Hi {{name}}!'
    const dict = { name: 'John' }
    expect(replaceStr(template, dict)).toBe(`Hi ${dict.name}!`)
  })
  test('multiple replacement', () => {
    const template = 'Hi, {{prefix}} {{firstName}} {{lastName}}!'
    const dict = { prefix: 'Mr.', firstName: 'John', lastName: 'Doe' }
    expect(replaceStr(template, dict)).toBe(`Hi, ${dict.prefix} ${dict.firstName} ${dict.lastName}!`)
  })
  test('no replacements', () => {
    const template = 'Hello there!'
    const dict = { prefix: 'Mr.', firstName: 'John', lastName: 'Doe' }
    expect(replaceStr(template, dict)).toBe(template)
  })
  test('multiple lines replacements', () => {
    const template = `
      Hi, {{prefix}} {{name}},
      We charged your credit card {{totalCharged}} for {{product}}.

      Thanks for the purchase!
    `
    const dict = {
      prefix: 'Mr.',
      name: 'John Wick',
      firstName: 'John',
      lastName: 'Wick',
      totalCharged: `US$ ${(47.5).toFixed(2)}`,
      product: 'avenging your dog'
    }
    expect(replaceStr(template, dict)).toBe(`
      Hi, ${dict.prefix} ${dict.name},
      We charged your credit card ${dict.totalCharged} for ${dict.product}.

      Thanks for the purchase!
    `)
  })
});
