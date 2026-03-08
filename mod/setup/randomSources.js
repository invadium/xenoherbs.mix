function randomSources() {
    lib.touch('source')
    const cosmology = lib.source.attach( math.createRandomGenerator(), 'cosmology')
    cosmology.setSeed( env.tune.seed.cosmology )
    const trip = lib.source.attach( math.createRandomGenerator(), 'trip')
    trip.setSeed( env.tune.seed.trip )
}
randomSources.Z = 2
