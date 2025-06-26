//
// Run worker tasks like this:
// const result = await deps.worker.run('iterate', { until: Math.floor(Math.random() * 1000) + 1e9 }, { deadline: 800 })
//

export async function setupWorker({ numWorkers = 1 } = {}) {
    let taskId = 0
    const jobs = new Map()
    const workers = []

    const jobsInProgress = Array(numWorkers).fill(0)
    for (let i = 0; i < numWorkers; i++) {
        const worker = new Worker(new URL('./thread.js', import.meta.url).href, { type: 'module' })
        workers.push(worker)
    }

    function handleJobResult(workerIndex, e) {
        const { taskId, result, error } = e.data
        const job = jobs.get(taskId)
        if (!job) return // Task might have timed out already
        if (job.timeout) clearTimeout(job.timeout)
        const { resolve, reject } = job
        jobs.delete(taskId)
        jobsInProgress[workerIndex]--
        console.log('Jobs in progress', jobsInProgress)
        if (result) resolve(result)
        if (error) reject(error)
    }

    // handle messages from threads
    const promises = []
    for (const [i, worker] of workers.entries()) {
        // resolve when worker is ready
        let resolve, reject
        const promise = new Promise((res, rej) => {
            resolve = res
            reject = rej
        })

        worker.onmessage = (e) => {
            if (e.data.type === 'WORKER_READY') {
                return resolve()
            }
            handleJobResult(i, e)
        }

        worker.onerror = (error) => {
            console.error('Worker error:', error)
            reject(error)
        }

        promises.push(promise)
    }

    // wait until all workers are ready
    await Promise.all(promises)
    console.log('Workers ready!')

    // sends task to thread
    function run(task, input, options = {}) {
        // dispatch to worker with least jobs
        const i = jobsInProgress.minIndex()
        console.log('Dispatching to worker', i, jobsInProgress)

        let resolve, reject
        const promise = new Promise((res, rej) => {
            resolve = res
            reject = rej
        })

        const timeout = !options.deadline ? undefined : setTimeout(() => {
            jobs.delete(taskId)
            jobsInProgress[i]--
            reject(new Error('Task timed out'))
        }, options.deadline)

        jobs.set(taskId, { resolve, reject, timeout })
        jobsInProgress[i]++

        workers[i].postMessage({ taskId, task, input, options })
        taskId++
        return promise
    }

    return { run }
}
