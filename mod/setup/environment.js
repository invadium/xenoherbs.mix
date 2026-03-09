function environment() {
    for (const e in env.config) {
        if (e.startsWith('debug')
                || e.startsWith('trace')
                || e.startsWith('show')) {
            env[e] = env.config[e]
        }
    }
    job.spawn(dna.kinetix.Kinetix)
}
environment.Z = 1
