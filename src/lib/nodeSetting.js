module.exports = createNodeSettings

function createNodeSettings(gui, renderer) {
  const nodeSettings = gui.addFolder('Current Node')
  const currentNode = {
    id: '',
    color: 0,
    size: 0,
    isPinned: false
  }

  nodeSettings.add(currentNode, 'id')
  nodeSettings.addColor(currentNode, 'color').onChange(setColor)
  nodeSettings.add(currentNode, 'size', 0, 200).onChange(setSize)
  nodeSettings.add(currentNode, 'isPinned').onChange(setPinned)

  return {
    setUI
  }

  function setUI(nodeUI) {
    if (nodeUI) {
      currentNode.id = nodeUI.id
      currentNode.color = nodeUI.color
      currentNode.size = nodeUI.size
      const layout = renderer.layout()
      if (layout?.pinNode) {
        currentNode.isPinned = layout.pinNode(nodeUI.id)
      }
    } else {
      currentNode.id = ''
      currentNode.color = 0
      currentNode.size = 0
      currentNode.isPinned = false
    }
    gui.update()
  }

  function setColor() {
    const node = renderer.getNode(currentNode.id)
    if (node) {
      node.color = currentNode.color
      renderer.focus()
    }
  }

  function setSize() {
    const node = renderer.getNode(currentNode.id)
    if (node) {
      node.size = currentNode.size
      renderer.focus()
    }
  }

  function setPinned() {
    if (!currentNode.id) return

    const layout = renderer.layout()
    if (layout.pinNode) {
      layout.pinNode(currentNode.id, currentNode.isPinned)
    } else {
      currentNode.isPinned = false
      gui.update()
    }
    renderer.focus()
  }
}
