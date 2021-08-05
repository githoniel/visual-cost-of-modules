export const StellarColor = [
  '#04b5e5',
  '#ffd148',
  '#ef7e48',
  '#50e3c2',
  '#42aae6'
]

export default function getStellarColor(index: number) {
  return StellarColor[index % StellarColor.length]
}
