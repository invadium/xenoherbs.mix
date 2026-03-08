function randomSources() {
    lib.touch('source')
    const cosmology = lib.source.attach( math.createRandomGenerator(), 'cosmology')
    cosmology.setSeed( env.tune.seed.cosmology )
    const stars = lib.source.attach( math.createRandomGenerator(), 'stars')
    stars.setSeed( env.tune.seed.stars )
    const trip = lib.source.attach( math.createRandomGenerator(), 'trip')
    trip.setSeed( env.tune.seed.trip )
}
randomSources.Z = 2
