import {
  BuildEvent,
  Builder,
  BuilderConfiguration,
  BuilderContext,
} from '@angular-devkit/architect'
import { Observable } from 'rxjs'
import * as nodemon from 'nodemon'

export interface NgRunNodemonOptions {
  script: string
  tsConfig: string
  ext?: string
  ignore?: string[]
  watch?: string[]
  verbose?: boolean
}

export class NgRunNodemon implements Builder<NgRunNodemonOptions> {
  constructor(public context: BuilderContext) {}

  run(
    builderConfig: BuilderConfiguration<NgRunNodemonOptions>,
  ): Observable<BuildEvent> {
    const options = builderConfig.options

    const nodemonConfig = {
      script: options.script,
      exec: `ts-node --project ${options.tsConfig}`,
      ext: options.ext || 'ts,json',
      ignore: options.ignore || [],
      watch: options.watch || [],
      verbose: options.verbose || false,
    }

    return new Observable(obs => {
      nodemon(nodemonConfig)
        .on('log', msg => this.context.logger.info(msg.colour))
        .on('quit', () => {
          obs.next({ success: true })
          obs.complete()
        })
    })
  }
}

export default NgRunNodemon
