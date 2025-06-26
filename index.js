import '@/utils/array-utils.js'
import { setupDependencies } from '@/dependencies.js'
import { setupServer } from '@/server/index.js'

const deps = await setupDependencies({ startWorker: true, runMigrations: true })
await setupServer(deps)
