import LoadGuard from '../LoadGuard'

describe('LoadGuard', ()=>{
  test('should sync reset by stop', ()=>{
    const guard = new LoadGuard(1000)
    guard.start('url')
    expect(guard.isLoading).toBe(true)
    guard.stop()
    expect(guard.isLoading).toBe(false)
  })

  test('should async reset by stop', ()=>{
    const guard = new LoadGuard(1000)
    guard.start('url')
    expect(guard.isLoading).toBe(true)
    setTimeout(() => {
      guard.stop()
      expect(guard.isLoading).toBe(false)
    }, 200)
  })

  test('should reset guard after timeout', ()=>{
    const guard = new LoadGuard(1000)
    expect(guard.isLoading).toBe(false)
    guard.start('url')
    expect(guard.isLoading).toBe(true)
    setTimeout(()=>{
      expect(guard.isLoading).toBe(true)
    }, 500)
    setTimeout(()=>{
      expect(guard.isLoading).toBe(false)
    }, 1500)
  })

  test('start method should return true if started', ()=>{
    const guard = new LoadGuard(1000)
    expect(guard.start('url')).toBe(true)
    expect(guard.isLoading).toBe(true)
    expect(guard.start('url2')).toBe(false)
    expect(guard.isLoading).toBe(true)
    setTimeout(()=>{
      expect(guard.isLoading).toBe(false)
    }, 1500)
  })
})
