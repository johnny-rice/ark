<script lang="ts">
  import { PasswordInput } from '@ark-ui/svelte/password-input'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'
</script>

<PasswordInput.Root ignorePasswordManagers>
  <PasswordInput.Label>Password (no password manager)</PasswordInput.Label>
  <PasswordInput.Control>
    <PasswordInput.Input />
    <PasswordInput.VisibilityTrigger>
      <PasswordInput.Indicator>
        {#snippet fallback()}
          <EyeOffIcon />
        {/snippet}
        <EyeIcon />
      </PasswordInput.Indicator>
    </PasswordInput.VisibilityTrigger>
  </PasswordInput.Control>
</PasswordInput.Root>
