# visual-cost-of-modules

[Site](https://githoniel.github.io/visual-cost-of-modules/)

- use `[cytoscape](https://js.cytoscape.org/)` to display Graph
- use `https://registry.npmjs.cf/` as default registry

Note: office npm registry does not support cors

# Options

Click `Setting` on left top of page, you can change your setting, it will take some time to change layout if graph is very large

# Example

- Large scale graph with `fixedSize` and `Layout: Concentric` would be nice like a `Ring World` below

![Ring World](/assets/ring_world.png)

- `Layout: fCose` is recommended when there is a large scale graph with `fixedSize` unchecked when node size is determined by package size

![fCose](/assets/fcose.png)