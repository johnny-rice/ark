import { TreeView, createTreeCollection } from '@ark-ui/solid/tree-view'
import { CheckSquareIcon, ChevronRightIcon, FileIcon, FolderIcon, Loader2Icon } from 'lucide-solid'
import { For, createSignal } from 'solid-js'
import { useTreeViewNodeContext } from '../use-tree-view-node-context'

// mock api result
const response: Record<string, Node[]> = {
  node_modules: [
    { id: 'zag-js', name: 'zag-js' },
    { id: 'pandacss', name: 'panda' },
    { id: '@types', name: '@types', childrenCount: 2 },
  ],
  'node_modules/@types': [
    { id: 'react', name: 'react' },
    { id: 'react-dom', name: 'react-dom' },
  ],
  src: [
    { id: 'app.tsx', name: 'app.tsx' },
    { id: 'index.ts', name: 'index.ts' },
  ],
}

// function to load children of a node
function loadChildren(details: TreeView.LoadChildrenDetails<Node>): Promise<Node[]> {
  const value = details.valuePath.join('/')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response[value] ?? [])
    }, 1200)
  })
}

export const AsyncLoading = () => {
  const [collection, setCollection] = createSignal(initialCollection)
  return (
    <TreeView.Root
      collection={collection()}
      loadChildren={loadChildren}
      onLoadChildrenComplete={(e) => setCollection(e.collection)}
    >
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <For each={collection().rootNode.children}>
          {(node, index) => <TreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeView.Tree>
    </TreeView.Root>
  )
}

function TreeNodeIndicator() {
  const nodeState = useTreeViewNodeContext()
  return nodeState().loading ? <Loader2Icon style={{ animation: 'spin 1s infinite' }} /> : <FolderIcon />
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      {node.children || node.childrenCount ? (
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.BranchText>
              <TreeNodeIndicator /> {node.name}
            </TreeView.BranchText>
            <TreeView.BranchIndicator>
              <ChevronRightIcon />
            </TreeView.BranchIndicator>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.BranchIndentGuide />
            <For each={node.children}>
              {(child, index) => <TreeNode node={child} indexPath={[...indexPath, index()]} />}
            </For>
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item>
          <TreeView.ItemIndicator>
            <CheckSquareIcon />
          </TreeView.ItemIndicator>
          <TreeView.ItemText>
            <FileIcon />
            {node.name}
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
  childrenCount?: number
}

const initialCollection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'node_modules', name: 'node_modules', childrenCount: 3 },
      { id: 'src', name: 'src', childrenCount: 2 },
      { id: 'panda.config', name: 'panda.config.ts' },
      { id: 'package.json', name: 'package.json' },
      { id: 'renovate.json', name: 'renovate.json' },
      { id: 'readme.md', name: 'README.md' },
    ],
  },
})
