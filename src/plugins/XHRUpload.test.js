const Plugin = require('./Plugin')
const XHRUpload = require('./XHRUpload')

const noop = () => {}
const mockUppyInstance = {
  on: noop,
  state: {},
  log: () => {},
  emit: () => {},
  addUploader: () => {},
  removeUploader: () => {}
}
const mockXHR = {
  addEventListener: noop,
  on: () => {},
  send: () => {},
  open: () => {},
  upload: {
    addEventListener: () => {}
  }
}
const mockFormData = {
  append: jest.fn()
}

window.XMLHttpRequest = jest.fn().mockImplementation(() => mockXHR)
window.FormData = jest.fn(() => mockFormData)

describe('XHRUpload plugin', () => {
  beforeEach(() => {
    mockFormData.append.mockClear()
  })

  it('is a class', () => {
    expect(typeof XHRUpload).toBe('function')
  })

  it('extends Plugin', () => {
    expect(new XHRUpload()).toBeInstanceOf(Plugin)
  })

  it('calls super\'s constructor')

  it('accepts two parameters', () => {
    expect(XHRUpload.length).toBe(2)
  })

  // instance options?

  describe('.createFormDataUpload', () => {
    let xhrUpload

    beforeEach(() => {
      xhrUpload = new XHRUpload()
    })

    it('is a function', () => {
      expect(typeof XHRUpload.prototype.createFormDataUpload).toBe('function')
    })

    it('accepts two parameters', () => {
      expect(XHRUpload.prototype.createFormDataUpload.length).toBe(2)
    })

    it('creates a new instance of FormData', () => {
      xhrUpload.createFormDataUpload({ meta: {} }, {})
      expect(window.FormData.mock.instances.length).toBe(1)
    })

    it('adds file meta data from file', () => {
      const file = {
        meta: {
          name: 'foo',
          size: 12345
        }
      }
      xhrUpload.createFormDataUpload(file, {})
      expect(mockFormData.append).toHaveBeenCalledWith('name', 'foo')
      expect(mockFormData.append).toHaveBeenCalledWith('size', 12345)
    })

    it('add filtered file meta data based on `metaFields` option', () => {
      const file = {
        data: { name: 'foo' },
        meta: {
          name: 'bar',
          size: 54321
        }
      }
      xhrUpload.createFormDataUpload(file, { metaFields: ['name'] })
      expect(mockFormData.append).toHaveBeenCalledWith('name', 'bar')
      expect(mockFormData.append).not.toHaveBeenCalledWith('size', 54321)
    })

    it('adds file to form data using `fieldName` option', () => {
      const file = {
        meta: {}
      }
      xhrUpload.createFormDataUpload(file, { fieldName: 'upload' })
      expect(mockFormData.append).toHaveBeenCalledWith('upload', file.data)
    })

    it('returns created form data')
  })

  describe('.createBareUpload', () => {
    it('is a function', () => {
      expect(typeof XHRUpload.prototype.createBareUpload).toBe('function')
    })

    it('accepts two parameters', () => {
      expect(XHRUpload.prototype.createBareUpload.length).toBe(2)
    })

    it('returns file data', () => {
      const xhrUpload = new XHRUpload()
      const upload = xhrUpload.createBareUpload({ data: { type: 'file', name: 'foo.jpg' } })
      expect(upload).toEqual({ type: 'file', name: 'foo.jpg' })
    })
  })

  describe('.upload', () => {
    it('is a function', () => {
      expect(typeof XHRUpload.prototype.upload).toBe('function')
    })

    it('accepts three parameters', () => {
      expect(XHRUpload.prototype.upload.length).toBe(3)
    })

    it('uses plugin instance options')

    it('extends instance options with plugin\'s core options')

    it('extends plugin\'s core options with file parameter options')

    it('returns a promise')

    // form data
    it('')

    // describe('upload', () => {
    it.skip('creates a new instance of XMLHttpRequest', () => {
      const plugin = new XHRUpload(mockUppyInstance)
      const file = {
        meta: [],
        data: {},
        xhrUpload: {
          method: 'POST',
          endpoint: ''
        }
      }
      /* return */plugin.upload(file, 1, 2)
    })
    // })
  })

  describe('.uploadRemote', () => {
    it('is a function', () => {
      expect(typeof XHRUpload.prototype.uploadRemote).toBe('function')
    })

    it('accepts three parameters', () => {
      expect(XHRUpload.prototype.uploadRemote.length).toBe(3)
    })

    it('returns a promise')
  })

  describe('.selectForUpload', () => {
    it('is a function', () => {
      expect(typeof XHRUpload.prototype.selectForUpload).toBe('function')
    })

    it('accepts one parameter', () => {
      expect(XHRUpload.prototype.selectForUpload.length).toBe(1)
    })

    it('returns a promise for all files')

    describe('form data upload', () => {
      it('uses `upload` method')
    })

    describe('remote upload', () => {
      it('uses `uploadRemote` method')
    })
  })

  describe('.handleUpload', () => {
    it('is a function', () => {
      expect(typeof XHRUpload.prototype.handleUpload).toBe('function')
    })

    it('accepts one parameter', () => {
      expect(XHRUpload.prototype.handleUpload.length).toBe(1)
    })

    it('returns a promise') // ?

    describe('no files', () => {
      it('resolves promise')

      it('logs no files to upload')
    })

    describe('files', () => {
      it('returns files from state')

      it('logs')
    })
  })

  describe('.install', () => {
    it('is a function', () => {
      expect(typeof XHRUpload.prototype.install).toBe('function')
    })

    it('calls Uppy core\'s `addUploader` with `handleUpload` method', () => {
      const core = {
        addUploader: jest.fn()
      }
      const xhrUpload = new XHRUpload(core)
      xhrUpload.install()
      expect(core.addUploader.mock.calls[0][0]).toBe(xhrUpload.handleUpload)
    })
  })

  describe('.uninstall', () => {
    it('is a function', () => {
      expect(typeof XHRUpload.prototype.uninstall).toBe('function')
    })

    it('calls Uppy core\'s `removeUploader` with `handleUpload` method', () => {
      const core = {
        removeUploader: jest.fn()
      }
      const xhrUpload = new XHRUpload(core)
      xhrUpload.uninstall()
      expect(core.removeUploader.mock.calls[0][0]).toBe(xhrUpload.handleUpload)
    })
  })
})
