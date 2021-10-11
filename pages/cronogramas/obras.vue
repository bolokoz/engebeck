<template>
  <gantt :etapas="etapas" />
</template>

<script>
export default {
  asyncData({ app }) {
    const etapas = []
    etapas.push('Fundação')
    etapas.push('Estrutura')
    return { etapas }
  },
}
</script>
