import cytoscape from 'cytoscape'
import fcose from 'cytoscape-fcose'
import force from 'cytoscape-ngraph.forcelayout'
import cola from 'cytoscape-cola'

cytoscape.use(cola)
cytoscape.use(fcose)
cytoscape.use(force)

export const LayoutEnum = {
  Concentric: 'concentric',
  FCose: 'fcose',
  Force: 'force',
  Cola: 'cola'
}

export const LayoutOption = {
  [LayoutEnum.Concentric]: {
    name: 'concentric',
    concentric(node: any) {
      // it will not more than 100 level
      return 100 - node.scratch().depLevel
    },
    levelWidth() {
      return 1
    }
  },
  [LayoutEnum.FCose]: {
    name: 'fcose',
    quality: 'proof',
    nodeDimensionsIncludeLabels: true,
  },
  [LayoutEnum.Force]: {
    name: 'fcose',
    async: {
      // tell layout that we want to compute all at once:
      maxIterations: 1000,
      stepsPerCycle: 30,

      // Run it till the end:
      waitForStep: false
    },
    physics: {
      springLength: 100,
      springCoeff: 0.0008,
      gravity: -1.2,
      theta: 0.8,

      /**
        * Drag force coefficient. Used to slow down system, thus should be less than 1.
        * The closer it is to 0 the less tight system will be.
        */
      dragCoeff: 0.02,

      /**
        * Default time step (dt) for forces integration
        */
      timeStep: 20,
      iterations: 10000,
      fit: true,

      /**
      * Maximum movement of the system which can be considered as stabilized
      */
      stableThreshold: 0.000009
    },
    iterations: 10000,
    refreshInterval: 16, // in ms
    refreshIterations: 10, // iterations until thread sends an update
    stableThreshold: 2,
    animate: true,
    fit: true
  },
  [LayoutEnum.Cola]: {
    name: 'cola'
  }
}
