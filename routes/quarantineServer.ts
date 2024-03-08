/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path = require('path')
import { type Request, type Response, type NextFunction } from 'express'

module.exports = function serveQuarantineFiles () {
  return ({ params, query }: Request, res: Response, next: NextFunction) => {
    const file = params.file

    if (!file.includes('/') && !file.includes('..')) {
      const filePath = path.resolve('ftp/quarantine/', file)
      if (filePath.startsWith(path.resolve('ftp/quarantine/'))) {
        res.sendFile(filePath)
      } else {
        res.status(403)
        next(new Error('Invalid file path!'))
      }
    } else {
      res.status(403)
      next(new Error('File names cannot contain forward slashes or parent directory references!'))
    }
  }
}
