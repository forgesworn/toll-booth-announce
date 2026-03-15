import { describe, it, expect } from 'vitest'
import { slugify } from '../src/slugify.js'

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Valhalla Routing')).toBe('valhalla-routing')
  })

  it('strips non-alphanumeric characters', () => {
    expect(slugify('Sats-for-Laughs!')).toBe('sats-for-laughs')
  })

  it('collapses multiple hyphens', () => {
    expect(slugify('My   Great   API')).toBe('my-great-api')
  })

  it('trims leading and trailing hyphens', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world')
  })

  it('handles the default toll-booth service name', () => {
    expect(slugify('toll-booth')).toBe('toll-booth')
  })

  it('handles empty string', () => {
    expect(slugify('')).toBe('')
  })
})
