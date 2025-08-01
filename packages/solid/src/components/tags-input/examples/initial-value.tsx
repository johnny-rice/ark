import { TagsInput } from '@ark-ui/solid/tags-input'
import { Index } from 'solid-js'

export const InitialValue = () => {
  return (
    <TagsInput.Root value={['React', 'Solid', 'Vue', 'Svelte']}>
      <TagsInput.Context>
        {(api) => (
          <>
            <TagsInput.Label>Frameworks</TagsInput.Label>
            <TagsInput.Control>
              <Index each={api().value}>
                {(value, index) => (
                  <TagsInput.Item index={index} value={value()}>
                    <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                    <TagsInput.ItemInput />
                    <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                  </TagsInput.Item>
                )}
              </Index>
            </TagsInput.Control>
            <TagsInput.Input placeholder="Add tag" />
            <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
          </>
        )}
      </TagsInput.Context>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  )
}
