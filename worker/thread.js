import '@/utils/array-utils.js'
import { setupDependencies } from '@/dependencies.js'

const deps = await setupDependencies({ setupWorker: false, runMigrations: false })

const tasks = new Map()

// iterate over endpoints directory
const files = Deno.readDir('./worker/cpu-intensive-tasks')
for await (const file of files) {
    if (file.name.endsWith('.js')) {
        const mod = await import(`./cpu-intensive-tasks/${file.name}`)
        const taskName = file.name.replace('.js', '')
        tasks.set(taskName, mod.run)
    }
}

self.postMessage({ type: 'WORKER_READY' })

self.onmessage = (e) => {
    const { taskId, task, input } = e.data
    console.log('Running task', tasks.get(task))
    const runFunction = tasks.get(task)
    if (!runFunction) {
        return self.postMessage({ taskId, error: new Error(`Task ${task} not found`) })
    }

    try {
        const result = runFunction(deps, input)
        self.postMessage({ taskId, result })
    } catch (error) {
        self.postMessage({ taskId, error })
    }
}
