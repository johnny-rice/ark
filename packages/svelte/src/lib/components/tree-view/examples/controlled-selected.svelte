<script lang="ts">
  import { TreeView, createTreeCollection } from '@ark-ui/svelte/tree-view'
  import { CheckSquareIcon, ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-svelte'

  interface Node {
    id: string
    name: string
    children?: Node[]
  }

  const collection = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [
        {
          id: 'node_modules',
          name: 'node_modules',
          children: [
            { id: 'node_modules/zag-js', name: 'zag-js' },
            { id: 'node_modules/pandacss', name: 'panda' },
          ],
        },
        {
          id: 'src',
          name: 'src',
          children: [
            { id: 'src/app.tsx', name: 'app.tsx' },
            { id: 'src/index.ts', name: 'index.ts' },
          ],
        },
        { id: 'package.json', name: 'package.json' },
      ],
    },
  })

  let selectedValue = $state(['package.json'])
</script>

<pre>Selected: {JSON.stringify(selectedValue)}</pre>

<TreeView.Root {collection} bind:selectedValue>
  <TreeView.Label>Tree</TreeView.Label>
  <TreeView.Tree>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      {@render renderNode(node, [index])}
    {/each}
  </TreeView.Tree>
</TreeView.Root>

{#snippet renderNode(node: Node, indexPath: number[])}
  <TreeView.NodeProvider {node} {indexPath}>
    {#if node.children}
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchText>
            <FolderIcon />
            {node.name}
          </TreeView.BranchText>
          <TreeView.BranchIndicator>
            <ChevronRightIcon />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {#each node.children as child, index (child.id)}
            {@render renderNode(child, [...indexPath, index])}
          {/each}
        </TreeView.BranchContent>
      </TreeView.Branch>
    {:else}
      <TreeView.Item>
        <TreeView.ItemIndicator>
          <CheckSquareIcon />
        </TreeView.ItemIndicator>
        <TreeView.ItemText>
          <FileIcon />
          {node.name}
        </TreeView.ItemText>
      </TreeView.Item>
    {/if}
  </TreeView.NodeProvider>
{/snippet}
